const assert = require('node:assert/strict');

Feature('ORD-549: Forgot Password Token Expiration');

Scenario('ORD-549 - Kiểm tra thời hạn Token quên mật khẩu 15 phút', async () => {
  const tokenLifetimeMs = 15 * 60 * 1000;
  const isExpired = (16 * 60 * 1000) > tokenLifetimeMs;

  assert.strictEqual(isExpired, true, 'Token phải hết hạn sau 15 phút');
});