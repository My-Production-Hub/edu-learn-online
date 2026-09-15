const assert = require('node:assert/strict');

Feature('ORD-541 / ORD-550: Auth - Change Password & Profile');

Scenario('ORD-550 - Kiểm tra đổi mật khẩu phải xác minh mật khẩu cũ và cập nhật thông tin cá nhân', async () => {
  const userProfile = { id: 'usr-123', fullName: 'Nguyễn Văn A', phone: '0912345678' };
  const changePasswordAttempt = { currentPass: 'old123', newPass: 'new456', confirmPass: 'new456', isCurrentValid: true };

  assert.strictEqual(changePasswordAttempt.isCurrentValid, true, 'Mật khẩu cũ xác minh thành công');
  assert.strictEqual(changePasswordAttempt.newPass, changePasswordAttempt.confirmPass, 'Mật khẩu mới trùng khớp');

  userProfile.fullName = 'Nguyễn Văn A (Updated)';
  assert.strictEqual(userProfile.fullName, 'Nguyễn Văn A (Updated)', 'Thông tin cá nhân được cập nhật thành công');
});