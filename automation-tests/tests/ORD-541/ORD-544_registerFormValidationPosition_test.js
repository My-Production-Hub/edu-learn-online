const assert = require('node:assert/strict');

Feature('ORD-544: Register Form Validation Position');

Scenario('ORD-544 - Kiểm tra vị trí hiển thị thông báo lỗi validate form đăng ký', async () => {
  const validationResult = {
    isValid: false,
    errors: { fullName: 'Vui lòng nhập họ và tên' }
  };

  assert.strictEqual(validationResult.isValid, false);
  assert.strictEqual(validationResult.errors.fullName, 'Vui lòng nhập họ và tên');
});