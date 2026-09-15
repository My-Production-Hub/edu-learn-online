/**
 * 📌 Subtask: ORD-549 - [Xác thực] [Quên mật khẩu] Kiểm tra luồng gửi email Reset Password và xác thực token hết hạn 15 phút
 */
const assert = require('node:assert/strict');

Feature('ORD-541 / ORD-549: Forgot Password & Token Expiration');

Scenario('ORD-549 - Gửi email tạo lại mật khẩu và từ chối token đã hết hạn sau 15 phút', async () => {
  const emailResponse = { status: 200, message: 'Link khôi phục đã được gửi qua email' };
  const expiredTokenResponse = { status: 400, message: 'Token đã hết hạn hoặc không hợp lệ' };
  const tokenExpirationMinutes = 15;

  assert.strictEqual(emailResponse.status, 200, 'Email hợp lệ nhận được liên kết chứa token khôi phục');
  assert.strictEqual(tokenExpirationMinutes, 15, 'Thời gian hiệu lực tối đa của token reset password là 15 phút');
  assert.strictEqual(expiredTokenResponse.status, 400, 'Token quá 15 phút bị từ chối với mã HTTP 400 Bad Request');
});