Feature('ORD-545: Normal Load Response Time');

Scenario('ORD-545 - Đánh giá thời gian phản hồi trang dưới tải bình thường', async ({ I }) => {
  I.amOnPage('/courses');
  I.waitForText('Danh sách khóa học', 15);
  I.see('Tất cả khóa học');
});