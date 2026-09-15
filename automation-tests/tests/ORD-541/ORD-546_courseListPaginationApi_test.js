Feature('ORD-546: Course List Pagination API');

Scenario('ORD-546 - Kiểm tra tính năng phân trang danh sách khóa học', async ({ I }) => {
  I.amOnPage('/courses?page=1');
  I.waitForText('Khóa học', 15);
  I.seeElement('.pagination');
  I.click('2');
  I.waitInUrl('/courses?page=2', 10);
});