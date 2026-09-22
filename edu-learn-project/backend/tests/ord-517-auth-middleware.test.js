'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const jwt = require('jsonwebtoken');

const secret = 'ord-517-test-only-secret';
const dbPath = require.resolve('../db');
const middlewarePath = require.resolve('../middleware');

function loadMiddleware(currentUser, options = {}) {
  const previousDb = require.cache[dbPath];
  const previousSecret = process.env.JWT_SECRET;
  const getDatabase = async () => {
    if (options.dbError) throw options.dbError;
    return { get: async () => currentUser };
  };
  require.cache[dbPath] = { id: dbPath, filename: dbPath, loaded: true, exports: { getDatabase } };
  if (options.missingSecret) delete process.env.JWT_SECRET;
  else process.env.JWT_SECRET = secret;
  delete require.cache[middlewarePath];
  try {
    return require('../middleware');
  } finally {
    delete require.cache[middlewarePath];
    if (previousDb) require.cache[dbPath] = previousDb;
    else delete require.cache[dbPath];
    if (previousSecret === undefined) delete process.env.JWT_SECRET;
    else process.env.JWT_SECRET = previousSecret;
  }
}

function response() {
  return {
    code: null,
    body: null,
    status(code) { this.code = code; return this; },
    json(body) { this.body = body; return this; }
  };
}

test('ORD-517 middleware refuses startup without JWT_SECRET', () => {
  assert.throws(() => loadMiddleware(null, { missingSecret: true }), /JWT_SECRET is required/);
});

test('ORD-517 requireRole: missing user is denied', () => {
  const { requireRole } = loadMiddleware(null);
  const res = response();
  let nextCalls = 0;
  requireRole(['MANAGER'])({}, res, () => nextCalls++);
  assert.equal(res.code, 403);
  assert.equal(nextCalls, 0);
});

test('ORD-517 requireRole: present user with excluded role is denied', () => {
  const { requireRole } = loadMiddleware(null);
  const res = response();
  let nextCalls = 0;
  requireRole(['MANAGER'])({ user: { role: 'USER' } }, res, () => nextCalls++);
  assert.equal(res.code, 403);
  assert.equal(nextCalls, 0);
});

test('ORD-517 requireRole: present user with included role proceeds', () => {
  const { requireRole } = loadMiddleware(null);
  const res = response();
  let nextCalls = 0;
  requireRole(['MANAGER'])({ user: { role: 'MANAGER' } }, res, () => nextCalls++);
  assert.equal(res.code, null);
  assert.equal(nextCalls, 1);
});

test('ORD-517 authenticateToken: missing token is denied', () => {
  const { authenticateToken } = loadMiddleware(null);
  const res = response();
  let nextCalls = 0;
  authenticateToken({ headers: {} }, res, () => nextCalls++);
  assert.equal(res.code, 401);
  assert.equal(nextCalls, 0);
});

test('ORD-517 authenticateToken: invalid token is denied', () => {
  const { authenticateToken } = loadMiddleware(null);
  const res = response();
  let nextCalls = 0;
  authenticateToken({ headers: { authorization: 'Bearer invalid-token' } }, res, () => nextCalls++);
  assert.equal(res.code, 403);
  assert.equal(nextCalls, 0);
});

test('ORD-517 authenticateToken: valid token populates user', () => {
  const { authenticateToken } = loadMiddleware(null);
  const token = jwt.sign({ id: 'u1', role: 'USER' }, secret);
  const req = { headers: { authorization: `Bearer ${token}` } };
  const res = response();
  let nextCalls = 0;
  authenticateToken(req, res, () => nextCalls++);
  assert.equal(req.user.id, 'u1');
  assert.equal(res.code, null);
  assert.equal(nextCalls, 1);
});

test('ORD-517 checkUserStatus: missing user ID is denied', async () => {
  const { checkUserStatus } = loadMiddleware(null);
  const res = response();
  let nextCalls = 0;
  await checkUserStatus({ user: {} }, res, () => nextCalls++);
  assert.equal(res.code, 401);
  assert.equal(nextCalls, 0);
});

test('ORD-517 checkUserStatus: deleted account is denied', async () => {
  const { checkUserStatus } = loadMiddleware(null);
  const res = response();
  let nextCalls = 0;
  await checkUserStatus({ user: { id: 'u1' } }, res, () => nextCalls++);
  assert.equal(res.code, 403);
  assert.equal(nextCalls, 0);
});

test('ORD-517 checkUserStatus: blocked account is denied despite token status', async () => {
  const { checkUserStatus } = loadMiddleware({ id: 'u1', status: 'blocked', role: 'USER' });
  const res = response();
  let nextCalls = 0;
  await checkUserStatus({ user: { id: 'u1', status: 'active' } }, res, () => nextCalls++);
  assert.equal(res.code, 403);
  assert.equal(nextCalls, 0);
});

test('ORD-517 checkUserStatus: current account status and role are refreshed', async () => {
  const { checkUserStatus } = loadMiddleware({ id: 'u1', status: 'active', role: 'MANAGER' });
  const req = { user: { id: 'u1', status: 'blocked', role: 'USER' } };
  const res = response();
  let nextCalls = 0;
  await checkUserStatus(req, res, () => nextCalls++);
  assert.equal(req.user.status, 'active');
  assert.equal(req.user.role, 'MANAGER');
  assert.equal(res.code, null);
  assert.equal(nextCalls, 1);
});

test('ORD-517 checkUserStatus: database failure returns 500', async () => {
  const { checkUserStatus } = loadMiddleware(null, { dbError: new Error('test database failure') });
  const res = response();
  let nextCalls = 0;
  await checkUserStatus({ user: { id: 'u1' } }, res, () => nextCalls++);
  assert.equal(res.code, 500);
  assert.equal(nextCalls, 0);
});
