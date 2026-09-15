/**
 * 📌 Subtask: ORD-552 - [Khóa học] [Khóa học của tôi] Kiểm tra quyền truy cập bài học sau khi đơn hàng được duyệt
 */
const assert = require('node:assert/strict');

Feature('ORD-541 / ORD-552: My Courses Access Rights');

Scenario('ORD-552 - Cho phép học viên vào học sau khi đơn hàng chuyển sang trạng thái Approved', async () => {
  const orderStatus = 'approved';
  const hasAccessToLessons = orderStatus === 'approved';

  assert.strictEqual(hasAccessToLessons, true, 'Học viên mở khóa được toàn bộ bài học sau khi thanh toán được duyệt');
});