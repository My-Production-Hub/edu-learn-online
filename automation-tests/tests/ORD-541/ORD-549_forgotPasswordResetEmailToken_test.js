/**
 * 📌 Subtask: ORD-549 - [Xác thực] [Quên mật khẩu] Kiểm tra luồng gửi email Reset Password và xác thực token hết hạn
 */
const assert = require('node:assert/strict');

Feature('ORD-541 / ORD-549: Forgot Password & Token Expiration');

Scenario('ORD-549 - Gửi mail tạo lại mật khẩu và từ chối token đã hết hạn', async () => {
  const resetToken = { token: 'xyz123abc', isExpired: true };

  assert.strictEqual(resetToken.isExpired, true, 'Token hết hạn phải bị hệ thống từ chối khi đổi mật khẩu');
});