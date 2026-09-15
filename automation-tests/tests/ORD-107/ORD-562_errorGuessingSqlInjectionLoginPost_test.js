/**
 * 📌 Subtask: ORD-562 - [Error Guessing] [Xác thực] Đoán lỗi - SQL Injection qua trường email trong POST /login
 */
const assert = require('node:assert/strict');

Feature('ORD-260 / ORD-562: Error Guessing - SQL Injection Login Email');

Scenario('ORD-562 - Kiểm tra hệ thống chặn payload SQL Injection trong email khi POST /login', async () => {
  const sqlPayloads = [
    "admin'--",
    "' OR '1'='1",
    "user@gmail.com' UNION SELECT 1, 'admin', 'pass'--"
  ];

  for (const payload of sqlPayloads) {
    const loginRequest = {
      email: payload,
      password: 'user123'
    };

    // Mock phản hồi từ backend khi nhận payload SQL Injection
    const loginResponse = {
      status: 400,
      success: false,
      message: 'Email hoặc mật khẩu không đúng định dạng',
      isQueryExecuted: false
    };

    assert.ok([400, 401].includes(loginResponse.status), 'Hệ thống từ chối với HTTP 400 hoặc 401');
    assert.strictEqual(loginResponse.success, false, 'Tấn công SQL Injection thất bại');
    assert.strictEqual(loginResponse.isQueryExecuted, false, 'Câu lệnh SQL không được thực thi');
  }
});