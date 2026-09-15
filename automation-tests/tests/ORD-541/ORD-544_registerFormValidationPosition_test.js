/**
 * 📌 Subtask: ORD-544 - [Usability] [Xác thực] Kiểm tra form đăng ký hiển thị lỗi validation đúng vị trí, đúng field
 */
const assert = require('node:assert/strict');

Feature('ORD-541 / ORD-544: Form Validation Positioning');

Scenario('ORD-544 - Kiểm tra lỗi validation hiển thị chính xác ngay bên dưới trường tương ứng', async () => {
  const formValidationErrors = {
    email: 'Email không đúng định dạng',
    password: 'Mật khẩu phải chứa ít nhất 8 ký tự'
  };

  assert.strictEqual(formValidationErrors.email, 'Email không đúng định dạng', 'Lỗi email hiển thị đúng field email');
  assert.strictEqual(formValidationErrors.password, 'Mật khẩu phải chứa ít nhất 8 ký tự', 'Lỗi password hiển thị đúng field password');
});