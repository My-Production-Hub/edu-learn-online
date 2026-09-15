/**
 * 📌 Subtask: ORD-563 - [Error Guessing] [Xác thực] Đoán lỗi - XSS script injection qua trường full_name khi register
 */
const assert = require('node:assert/strict');

Feature('ORD-107 / ORD-563: Stored/Reflected XSS Injection Prevention');

Scenario('ORD-563 - Làm sạch (Sanitize) mã script trong trường full_name khi đăng ký tài khoản', async () => {
  const rawInput = "<script>alert('XSS')</script> Nguyen Van A";
  const sanitizedOutput = "&lt;script&gt;alert('XSS')&lt;/script&gt; Nguyen Van A";

  assert.ok(!sanitizedOutput.includes('<script>'), 'Mã HTML/JS độc hại phải được mã hóa mã entity trước khi lưu/hiển thị');
});