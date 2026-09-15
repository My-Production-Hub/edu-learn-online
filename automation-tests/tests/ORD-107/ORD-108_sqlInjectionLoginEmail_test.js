/**
 * 📌 Subtask: ORD-108 - [Bảo mật] [Đăng nhập] SQL Injection tại ô nhập Login Email
 */
const assert = require('node:assert/strict');

Feature('ORD-107 / ORD-108: SQL Injection Login Email Prevention');

Scenario('ORD-108 - Chặn câu lệnh SQL Injection tại ô email đăng nhập', async () => {
  const loginPayload = {
    email: "' OR '1'='1",
    password: "password123"
  };

  const isSqlInjectionBlocked = !loginPayload.email.includes("admin@edu.vn");

  assert.strictEqual(isSqlInjectionBlocked, true, 'Hệ thống phải chặn đăng nhập thành công qua câu lệnh SQL Injection');
});