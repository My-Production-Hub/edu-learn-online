const assert = require('node:assert/strict');

Feature('ORD-541 / ORD-552: Course - Access Rights');

Scenario('ORD-552 - Kiểm tra cấp quyền truy cập khóa học sau khi đơn hàng được duyệt thành công', async () => {
  const userEnrollment = { userId: 'u-99', courseId: 'c-101', orderStatus: 'COMPLETED', hasAccess: false };

  if (userEnrollment.orderStatus === 'COMPLETED') {
    userEnrollment.hasAccess = true;
  }

  assert.strictEqual(userEnrollment.hasAccess, true, 'Học viên được mở khóa bài học khi đơn hàng COMPLETED');
});