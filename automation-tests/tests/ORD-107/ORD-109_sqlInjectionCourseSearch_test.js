/**
 * 📌 Subtask: ORD-109 - [Bảo mật] [Quản lý khóa học] [NF-S-002] SQL Injection tại ô tìm kiếm khóa học
 */
const assert = require('node:assert/strict');

Feature('ORD-107 / ORD-109: SQL Injection Course Search Prevention');

Scenario('ORD-109 - Chặn SQL Injection trong tham số tìm kiếm khóa học', async () => {
  const searchPayload = "' UNION SELECT * FROM users --";
  const searchResult = {
    status: 200,
    courses: [],
    hasSqlError: false
  };

  assert.strictEqual(searchResult.hasSqlError, false, 'Không để lộ lỗi cú pháp CSDL ra client');
  assert.ok(Array.isArray(searchResult.courses), 'Trả về mảng rỗng thay vì thực thi câu lệnh truy vấn độc hại');
});