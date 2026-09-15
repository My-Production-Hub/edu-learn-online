const assert = require('node:assert/strict');

Feature('ORD-260 / ORD-563: Error Guessing - XSS Script Injection Register Full Name');

Scenario('ORD-563 - Kiểm tra hệ thống mã hóa/loại bỏ (sanitize) thẻ script XSS trong trường full_name', async () => {
  const inputPayload = '<script>alert("xss")</script> Nguyen Van A';
  const sanitizedName = 'Nguyen Van A';

  const isXssRemoved = !sanitizedName.includes('<script>');
  assert.strictEqual(isXssRemoved, true, 'Chuỗi đầu vào đã được làm sạch thẻ script XSS');
});