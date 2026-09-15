Feature('ORD-541: UI/UX, Subsystems & Master E2E Flow');

Scenario('ORD-541 - Tổng thể luồng E2E người dùng', async ({ I }) => {
  I.amOnPage('/login');
  I.waitForText('Đăng nhập tài khoản', 15);
  I.fillField('input[type="email"]', 'tuan.nguyen@gmail.com');
  I.fillField('input[type="password"]', 'user123');
  I.click('Đăng nhập');
  I.wait(2);
  I.seeInCurrentUrl('/');
});