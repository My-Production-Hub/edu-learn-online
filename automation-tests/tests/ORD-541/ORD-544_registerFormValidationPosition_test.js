Feature('ORD-544: Register Form Validation Position');

Scenario('ORD-544 - Kiểm tra vị trí hiển thị thông báo lỗi validate form đăng ký', async ({ I }) => {
  I.amOnPage('/register');
  I.waitForText('Đăng ký tài khoản', 15);
  I.click('Đăng ký');
  I.waitForText('Vui lòng nhập họ và tên', 15);
  I.see('Vui lòng nhập email');
});