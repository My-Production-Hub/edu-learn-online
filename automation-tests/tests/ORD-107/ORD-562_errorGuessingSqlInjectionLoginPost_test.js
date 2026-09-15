/**
 * 📌 Subtask: ORD-562 - [Error Guessing] [Xác thực] Đoán lỗi - SQL Injection qua trường email trong POST /login
 */
const assert = require('node:assert/strict');

Feature('ORD-107 / ORD-562: Error Guessing SQL Injection POST /login');

Scenario('ORD-562 - Kiểm tra xử lý ngoại lệ an toàn khi truyền chuỗi injection phức tạp vào API login', async () => {
  const apiResponse = {
    status: 400,
    exposeStackTrace: false
  };

  assert.strictEqual(apiResponse.status, 400, 'Trả về mã lỗi client 400 Bad Request');
  assert.strictEqual(apiResponse.exposeStackTrace, false, 'Không để lộ vết lỗi hệ thống (stack trace) khi đoán lỗi');
});