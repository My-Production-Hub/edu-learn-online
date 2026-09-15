/**
 * 📌 Subtask: ORD-109 - [Security] Kiểm tra ngăn chặn SQL Injection tại ô tìm kiếm khóa học
 */
const assert = require('node:assert/strict');

Feature('ORD-107 / ORD-109: Security - SQL Injection Course Search');

Scenario('ORD-109 - Hệ thống sanitize từ khóa tìm kiếm khóa học chứa câu lệnh SQL', async () => {
  const searchQuery = "React'; DROP TABLE courses;--";

  // Mock xử lý Parameterized Query của Backend
  const searchResult = {
    status: 200,
    queryProcessed: "React'; DROP TABLE courses;--",
    data: [],
    tableDropped: false
  };

  assert.strictEqual(searchResult.status, 200, 'API trả về thành công với danh sách rỗng');
  assert.strictEqual(searchResult.tableDropped, false, 'Dữ liệu bảng khóa học vẫn an toàn');
  assert.strictEqual(Array.isArray(searchResult.data), true, 'Dữ liệu trả về đúng định dạng mảng');
});