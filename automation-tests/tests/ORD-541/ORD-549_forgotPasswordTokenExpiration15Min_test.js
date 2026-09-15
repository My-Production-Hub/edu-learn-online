Feature('ORD-549: Forgot Password Token Expiration');

Scenario('ORD-549 - Kiểm tra thời hạn Token quên mật khẩu 15 phút', async ({ I }) => {
  I.amOnPage('/forgot-password');
  I.waitForText('Khôi phục mật khẩu', 15);
  I.fillField('input[type="email"]', 'tuan.nguyen@gmail.com');
  I.click('Gửi yêu cầu');
  I.waitForText('Link khôi phục đã được gửi', 15);
});