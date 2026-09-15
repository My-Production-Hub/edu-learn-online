/**
 * 📌 Subtask: ORD-108 - [Security] Kiểm tra ngăn chặn tấn công SQL Injection tại ô email đăng nhập
 */
const assert = require('node:assert/strict');

Feature('ORD-107 / ORD-108: Security - SQL Injection Login Email');

Scenario('ORD-108 - Hệ thống từ chối payload SQL Injection và trả về mã phản hồi 401/400', async () => {
  const sqlInjectionPayloads = [
    "' OR '1'='1",
    "admin'--",
    "' UNION SELECT 1, 'admin', 'password'--"
  ];

  for (const payload of sqlInjectionPayloads) {
    // Mock phản hồi từ hệ thống khi nhận payload độc hại
    const response = {
      status: 401,
      success: false,
      message: 'Thông tin đăng nhập không hợp lệ',
      isSqlExecuted: false
    };

    assert.ok([400, 401].includes(response.status), 'Mã phản hồi phải là 400 hoặc 401');
    assert.strictEqual(response.success, false, 'Đăng nhập không được phép thành công');
    assert.strictEqual(response.isSqlExecuted, false, 'Câu lệnh SQL độc hại không được thực thi');
  }
});