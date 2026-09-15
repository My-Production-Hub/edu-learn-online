Feature('ORD-547: Order Status Display');

Scenario('ORD-547 - Kiểm tra hiển thị trạng thái đơn hàng trong lịch sử mua hàng', async ({ I }) => {
  I.amOnPage('/login');
  I.waitForText('Đăng nhập tài khoản', 15);
  I.fillField('input[type="email"]', 'tuan.nguyen@gmail.com');
  I.fillField('input[type="password"]', 'user123');
  I.click('Đăng nhập');
  I.wait(2);
  I.amOnPage('/my-orders');
  I.waitForText('Lịch sử đơn hàng', 15);
});