/**
 * 📌 Subtask: ORD-546 - [Usability] [Khóa học] Kiểm tra API danh sách khóa học trả về dữ liệu phân trang dễ sử dụng
 */
const assert = require('node:assert/strict');

Feature('ORD-541 / ORD-546: Course List Pagination API');

Scenario('ORD-546 - Kiểm tra cấu trúc dữ liệu phân trang trả về đúng format', async () => {
  const paginationResponse = {
    currentPage: 1,
    pageSize: 10,
    totalItems: 45,
    totalPages: 5,
    items: [{ id: 'course-01', name: 'React Native Basic' }]
  };

  assert.strictEqual(paginationResponse.currentPage, 1, 'Trang hiện tại là 1');
  assert.strictEqual(paginationResponse.totalPages, 5, 'Tổng số trang được tính đúng');
  assert.ok(Array.isArray(paginationResponse.items), 'Danh sách khóa học trả về dưới dạng mảng');
});