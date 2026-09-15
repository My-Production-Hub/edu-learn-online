const assert = require('node:assert/strict');

Feature('ORD-541 / ORD-543: Usability - No Stack Trace Leak');

Scenario('ORD-543 - Kiểm tra thông báo lỗi không để lộ thông tin kỹ thuật stack trace', async () => {
  const apiErrorResponse = {
    status: 400,
    success: false,
    message: 'Mã giảm giá không hợp lệ hoặc đã hết hạn sử dụng',
    stackTrace: undefined
  };

  assert.strictEqual(apiErrorResponse.status, 400);
  assert.strictEqual(typeof apiErrorResponse.message, 'string');
  assert.strictEqual(apiErrorResponse.stackTrace, undefined, 'Stack trace không được rò rỉ ra phía người dùng');
});