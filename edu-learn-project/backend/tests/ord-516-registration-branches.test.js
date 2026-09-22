'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const espree = require('espree');

const source = fs.readFileSync(path.join(__dirname, '..', 'index.js'), 'utf8');
const ast = espree.parse(source, { ecmaVersion: 2022, range: true });
const helperNames = [
  'checkRegisterTypes', 'checkRegisterFormats', 'validateRegisterInput', 'handleRegisterEmailConflict'
];
const helpers = helperNames.map((name) => {
  const declaration = ast.body.find((node) => node.type === 'FunctionDeclaration' && node.id.name === name);
  assert.ok(declaration, `Missing registration helper: ${name}`);
  return source.slice(...declaration.range);
});
const registration = ast.body.find((node) => node.type === 'ExpressionStatement' &&
  node.expression.type === 'CallExpression' && node.expression.callee.object?.name === 'app' &&
  node.expression.callee.property?.name === 'post' &&
  node.expression.arguments[0]?.value === '/api/auth/register');
assert.ok(registration, 'Missing POST /api/auth/register');
const handlerSource = source.slice(...registration.expression.arguments.at(-1).range);

const valid = {
  full_name: 'Test User', email: 'new@example.invalid', phone: '0912345678', password: 'Test@12345'
};

function fixture(options = {}) {
  const queries = [];
  const writes = [];
  let dbRequests = 0;
  const db = {
    async get(sql, params) {
      queries.push({ sql, params });
      if (options.dbError) throw options.dbError;
      if (sql.includes('WHERE email')) return options.existingEmail || undefined;
      if (sql.includes('WHERE phone')) return options.existingPhone || undefined;
      throw new Error(`Unexpected query: ${sql}`);
    },
    async run(sql, params) { writes.push({ sql, params }); }
  };
  const context = {
    getDatabase: async () => { dbRequests++; return db; },
    bcrypt: { hash: async () => 'test-only-hash' }
  };
  const handler = vm.runInNewContext(`${helpers.join('\n')}\n(${handlerSource})`, context);
  async function post(body) {
    const res = {
      code: null,
      body: null,
      status(code) { this.code = code; return this; },
      json(value) { this.body = value; return this; }
    };
    await handler({ body }, res);
    return res;
  }
  return { post, queries, writes, get dbRequests() { return dbRequests; } };
}

test('ORD-516 missing registration body returns 400 before database access', async () => {
  const run = fixture();
  const res = await run.post(null);
  assert.equal(res.code, 400);
  assert.equal(run.dbRequests, 0);
});

test('ORD-516 non-string input returns 400 before trim()', async () => {
  const run = fixture();
  const res = await run.post({ ...valid, phone: 912345678 });
  assert.equal(res.code, 400);
  assert.match(res.body.message, /phải là chuỗi/);
  assert.equal(run.dbRequests, 0);
});

for (const [name, input, message] of [
  ['missing name', { ...valid, full_name: '  ' }, /đầy đủ thông tin/],
  ['invalid email', { ...valid, email: 'not-an-email' }, /Email không đúng/],
  ['invalid phone', { ...valid, phone: '09123456789' }, /10 chữ số/],
  ['weak password', { ...valid, password: 'password' }, /Mật khẩu phải có/]
]) {
  test(`ORD-516 ${name} returns 400 before database access`, async () => {
    const run = fixture();
    const res = await run.post(input);
    assert.equal(res.code, 400);
    assert.match(res.body.message, message);
    assert.equal(run.dbRequests, 0);
  });
}

test('ORD-516 new email and phone create USER with normalized input', async () => {
  const run = fixture();
  const res = await run.post({ ...valid, full_name: ' Test User ', email: ' NEW@EXAMPLE.INVALID ' });
  assert.equal(res.code, 201);
  assert.equal(run.queries.length, 2);
  assert.equal(run.queries[0].params[0], 'new@example.invalid');
  assert.equal(run.writes.length, 1);
  assert.match(run.writes[0].sql, /INSERT INTO users/);
  assert.equal(run.writes[0].params[1], 'Test User');
  assert.equal(run.writes[0].params[5], 'USER');
});

test('ORD-516 existing USER email is rejected without checking phone', async () => {
  const run = fixture({ existingEmail: { id: 'u1', role: 'USER', status: 'active' } });
  const res = await run.post(valid);
  assert.equal(res.code, 400);
  assert.equal(res.body.message, 'Bạn đã có tài khoản.');
  assert.equal(run.queries.length, 1);
  assert.equal(run.writes.length, 0);
});

test('ORD-516 active STAFF email is rejected', async () => {
  const run = fixture({ existingEmail: { id: 's1', role: 'STAFF', status: 'active' } });
  const res = await run.post(valid);
  assert.equal(res.code, 400);
  assert.equal(res.body.message, 'Email đã tồn tại trên hệ thống.');
  assert.equal(run.writes.length, 0);
});

test('ORD-516 blocked AFFILIATE email is not eligible for replacement', async () => {
  const run = fixture({ existingEmail: { id: 'a1', role: 'AFFILIATE', status: 'blocked' } });
  const res = await run.post(valid);
  assert.equal(res.code, 400);
  assert.equal(res.body.message, 'Email đã tồn tại trên hệ thống.');
  assert.equal(run.writes.length, 0);
});

test('ORD-516 blocked STAFF email is removed before registration', async () => {
  const run = fixture({ existingEmail: { id: 's1', role: 'STAFF', status: 'blocked' } });
  const res = await run.post(valid);
  assert.equal(res.code, 201);
  assert.equal(run.writes.length, 2);
  assert.match(run.writes[0].sql, /DELETE FROM users/);
  assert.match(run.writes[1].sql, /INSERT INTO users/);
});

test('ORD-516 existing phone is rejected after free email', async () => {
  const run = fixture({ existingPhone: { id: 'u2' } });
  const res = await run.post(valid);
  assert.equal(res.code, 400);
  assert.equal(res.body.message, 'Số điện thoại đã tồn tại trên hệ thống.');
  assert.equal(run.queries.length, 2);
  assert.equal(run.writes.length, 0);
});

test('ORD-516 database error returns 500', async () => {
  const run = fixture({ dbError: new Error('test-only failure') });
  const res = await run.post(valid);
  assert.equal(res.code, 500);
  assert.equal(run.writes.length, 0);
});
