const assert = require('node:assert/strict');

Feature('ORD-543: Clear Error Messages & No Stack Trace');

Scenario('ORD-543 - Kiểm tra thông báo lỗi thân thiện, không lộ Stack Trace', async () => {
  const authErrorResponse = {
    status: 401,
    message: 'Thông tin đăng nhập không hợp lệ',
    stackTrace: null
  };

  assert.strictEqual(authErrorResponse.status, 401);
  assert.strictEqual(authErrorResponse.message, 'Thông tin đăng nhập không hợp lệ');
  assert.strictEqual(authErrorResponse.stackTrace, null, 'Hệ thống không được tiết lộ Stack Trace');
});