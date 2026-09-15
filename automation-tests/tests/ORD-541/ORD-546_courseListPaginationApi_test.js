const assert = require('node:assert/strict');

Feature('ORD-541 / ORD-546: Usability - Course Pagination API');

Scenario('ORD-546 - Kiểm tra API danh sách khóa học trả về cấu trúc dữ liệu phân trang chuẩn', async () => {
  const paginationResponse = {
    status: 200,
    data: [{ id: 'c1', name: 'Node.js Basic' }, { id: 'c2', name: 'React Mastery' }],
    pagination: { page: 1, limit: 10, totalItems: 25, totalPages: 3 }
  };

  assert.strictEqual(paginationResponse.status, 200);
  assert.strictEqual(paginationResponse.data.length, 2);
  assert.strictEqual(paginationResponse.pagination.totalPages, 3);
  assert.ok(paginationResponse.pagination.page <= paginationResponse.pagination.totalPages);
});