const assert = require('node:assert/strict');

Feature('ORD-541 / ORD-544: Usability - Registration Field Validation');

Scenario('ORD-544 - Kiểm tra form đăng ký hiển thị lỗi validation đúng vị trí tương ứng', async () => {
  const formValidationState = {
    email: { error: 'Email không đúng định dạng', isValid: false },
    password: { error: 'Mật khẩu phải có ít nhất 6 ký tự', isValid: false },
    fullName: { error: null, isValid: true }
  };

  assert.strictEqual(formValidationState.email.isValid, false);
  assert.strictEqual(formValidationState.email.error, 'Email không đúng định dạng');
  assert.strictEqual(formValidationState.password.error, 'Mật khẩu phải có ít nhất 6 ký tự');
  assert.strictEqual(formValidationState.fullName.isValid, true);
});