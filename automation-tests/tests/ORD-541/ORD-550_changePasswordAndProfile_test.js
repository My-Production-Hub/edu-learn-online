Feature('ORD-550: Change Password & Profile');

Scenario('ORD-550 - Kiểm tra tính năng đổi mật khẩu và cập nhật hồ sơ', async ({ I }) => {
  I.amOnPage('/login');
  I.waitForText('Đăng nhập tài khoản', 15);
  I.fillField('input[type="email"]', 'tuan.nguyen@gmail.com');
  I.fillField('input[type="password"]', 'user123');
  I.click('Đăng nhập');
  I.wait(2);
  I.amOnPage('/profile');
  I.waitForText('Thông tin cá nhân', 15);
});