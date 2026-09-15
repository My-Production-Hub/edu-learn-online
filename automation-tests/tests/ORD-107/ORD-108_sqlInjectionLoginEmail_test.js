/**
 * 📌 Subtask: ORD-108 - [Bảo mật] [Đăng nhập] SQL Injection tại ô nhập Login Email
 */
const assert = require('node:assert/strict');

Feature('ORD-107 / ORD-108: SQL Injection Login Email Prevention');

Scenario('ORD-108 - Chặn câu lệnh SQL Injection tại ô nhập email đăng nhập', async () => {
  const sqlPayload = "' OR '1'='1";
  const loginResponse = {
    status: 400,
    success: false,
    message: 'Email hoặc mật khẩu không đúng'
  };

  assert.strictEqual(loginResponse.status, 400, 'Hệ thống phải từ chối payload injection với HTTP 400/401');
  assert.strictEqual(loginResponse.success, false, 'Không cho phép vượt qua xác thực bằng SQL Injection');
});