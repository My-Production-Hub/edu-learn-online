Feature('ORD-553: Blog News & Category Admin');

Scenario('ORD-553 - Kiểm tra phân hệ Tin tức / Blog và danh mục bài viết', async ({ I }) => {
  I.amOnPage('/blog');
  I.waitForText('Tin tức & Bài viết', 15);
  I.seeElement('.blog-post');
});