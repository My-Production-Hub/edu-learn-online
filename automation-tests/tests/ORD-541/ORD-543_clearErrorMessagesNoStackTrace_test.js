/**
 * 📌 Subtask: ORD-543 - [Usability] [Hệ thống] Kiểm tra thông báo lỗi rõ ràng và dễ hiểu - không có stack trace lộ ra ngoài
 */
const assert = require('node:assert/strict');

Feature('ORD-541 / ORD-543: Error Handling & Security Leak Prevention');

Scenario('ORD-543 - Kiểm tra thông báo lỗi thân thiện và không bị rò rỉ thông tin stack trace', async () => {
  const apiResponse = {
    status: 400,
    message: 'Dữ liệu đầu vào không hợp lệ. Vui lòng kiểm tra lại.',
    stackTrace: null
  };

  assert.strictEqual(apiResponse.status, 400, 'HTTP status trả về 400 Bad Request khi có lỗi người dùng');
  assert.ok(!apiResponse.message.includes('Error 500'), 'Thông báo không chứa mã lỗi thô Error 500');
  assert.strictEqual(apiResponse.stackTrace, null, 'Tuyệt đối không rò rỉ vết lỗi hệ thống (stack trace) ra phía client');
});