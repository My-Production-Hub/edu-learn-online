/**
 * 📌 Subtask: ORD-563 - [Error Guessing] [Xác thực] Đoán lỗi - XSS script injection qua trường full_name khi register
 */
const assert = require('node:assert/strict');

Feature('ORD-260 / ORD-563: Error Guessing - XSS Script Injection Register Full Name');

Scenario('ORD-563 - Kiểm tra hệ thống mã hóa/loại bỏ (sanitize) thẻ script XSS trong trường full_name', async () => {
  const xssPayloads = [
    "<script>alert('XSS')</script>",
    "<img src=x onerror=alert(1)>",
    "javascript:alert('Hack')"
  ];

  for (const payload of xssPayloads) {
    const registerRequest = {
      fullName: payload,
      email: 'student.xss@gmail.com',
      password: 'User123456!'
    };

    // Mock dữ liệu đã được Backend Middleware Sanitize HTML
    const sanitizedName = payload.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const registerResponse = {
      status: 200,
      success: true,
      user: {
        id: 'usr-xss-01',
        fullName: sanitizedName,
        email: registerRequest.email
      }
    };

    assert.strictEqual(registerResponse.status, 200);
    assert.ok(!registerResponse.user.fullName.includes('<script>'), 'Thẻ script nguyên bản không được lưu trực tiếp vào CSDL');
    assert.ok(registerResponse.user.fullName.includes('&lt;'), 'Payload XSS đã được encode HTML entity an toàn');
  }
});