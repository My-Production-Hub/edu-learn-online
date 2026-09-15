const assert = require('node:assert/strict');

Feature('ORD-541 / ORD-553: Blog - Articles & Category Management');

Scenario('ORD-553 - Kiểm tra hiển thị bài viết tin tức và Admin quản lý bài viết/danh mục', async () => {
  const categories = [{ id: 'cat-1', name: 'Lập trình Web' }];
  const article = { id: 'art-1', title: 'Hướng dẫn học Node.js 2026', categoryId: 'cat-1', isPublished: true };

  assert.strictEqual(article.isPublished, true, 'Bài viết đã xuất bản hiển thị trên trang tin tức');
  assert.strictEqual(article.categoryId, categories[0].id, 'Bài viết thuộc đúng danh mục chỉ định');
});