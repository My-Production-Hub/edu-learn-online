Feature('ORD-543: Clear Error Messages & No Stack Trace');

Scenario('ORD-543 - Kiểm tra thông báo lỗi thân thiện, không lộ Stack Trace', async ({ I }) => {
  I.amOnPage('/login');
  I.waitForText('Đăng nhập tài khoản', 15);
  I.fillField('input[type="email"]', 'wrong@gmail.com');
  I.fillField('input[type="password"]', 'invalidpass');
  I.click('Đăng nhập');
  I.waitForText('Thông tin đăng nhập không hợp lệ', 15);
  I.dontSee('TypeError');
  I.dontSee('at Process.ChildProcess');
});