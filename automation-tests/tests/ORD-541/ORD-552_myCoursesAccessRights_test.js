Feature('ORD-552: My Courses Access Rights');

Scenario('ORD-552 - Kiểm tra quyền truy cập vào bài học sau khi hoàn tất thanh toán', async ({ I }) => {
  I.amOnPage('/login');
  I.waitForText('Đăng nhập tài khoản', 15);
  I.fillField('input[type="email"]', 'tuan.nguyen@gmail.com');
  I.fillField('input[type="password"]', 'user123');
  I.click('Đăng nhập');
  I.wait(2);
  I.amOnPage('/my-courses');
  I.waitForText('Khóa học của tôi', 15);
});