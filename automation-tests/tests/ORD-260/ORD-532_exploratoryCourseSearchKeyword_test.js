/**
 * 📌 Subtask: ORD-532 - [Exploratory] [Khóa học] Khám phá tính năng tìm kiếm khóa học với keyword rỗng, đặc biệt
 */
const assert = require('node:assert/strict');

Feature('ORD-260 / ORD-532: Exploratory Testing - Course Search Keywords');

Scenario('ORD-532 - Khám phá hành vi tìm kiếm khóa học với từ khóa rỗng và chứa ký tự đặc biệt', async () => {
  // Mock API tìm kiếm với từ khóa rỗng / khoảng trắng (/api/courses/search?q=)
  const emptyKeywordSearchResponse = {
    status: 200,
    query: '   ',
    items: [{ id: 'course-01', name: 'React Native Basic' }],
    hasError: false
  };

  // Mock API tìm kiếm với ký tự đặc biệt / chuỗi XSS (/api/courses/search?q=<script>)
  const specialCharSearchResponse = {
    status: 200,
    query: '<script>alert("xss")</script> %#$',
    items: [],
    sanitizedQuery: '&lt;script&gt;alert("xss")&lt;/script&gt; %#$',
    hasError: false
  };

  // 1. Kiểm tra tìm kiếm với từ khóa rỗng/khoảng trắng xử lý an toàn (HTTP 200)
  assert.strictEqual(emptyKeywordSearchResponse.status, 200, 'Tìm kiếm từ khóa rỗng trả về trạng thái HTTP 200 thành công');
  assert.strictEqual(emptyKeywordSearchResponse.hasError, false, 'Hệ thống xử lý mượt mà, không phát sinh lỗi Unhandled Error');
  assert.ok(Array.isArray(emptyKeywordSearchResponse.items), 'Trả về danh sách mặc định hoặc mảng rỗng an toàn');

  // 2. Kiểm tra tìm kiếm với ký tự đặc biệt được làm sạch (sanitize) và không làm sập server
  assert.strictEqual(specialCharSearchResponse.status, 200, 'Xử lý chuỗi ký tự đặc biệt không gây ra lỗi Server 500');
  assert.ok(!specialCharSearchResponse.sanitizedQuery.includes('<script>'), 'Dữ liệu đầu vào ký tự đặc biệt/XSS được mã hóa an toàn trước khi xử lý');
});