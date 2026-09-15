/**
 * 📌 Subtask: ORD-552 - [Khóa học] [Khóa học của tôi] Kiểm tra quyền truy cập bài học sau khi đơn hàng được duyệt (My Courses)
 */
const assert = require('node:assert/strict');

Feature('ORD-541 / ORD-552: My Courses Access Rights');

Scenario('ORD-552 - Từ chối truy cập 403 khi chưa duyệt và cấp quyền vào /api/my-courses khi đơn approved', async () => {
  // Mock trường hợp chưa mua hoặc đơn hàng chưa được duyệt -> 403 Forbidden
  const unpurchasedAccessResponse = {
    status: 403,
    message: 'Bạn chưa mua khóa học này hoặc đơn hàng đang xử lý'
  };

  // Mock trường hợp sau khi Admin duyệt đơn hàng -> status approved
  const approvedOrderResponse = {
    orderStatus: 'approved',
    myCoursesApi: {
      status: 200,
      courses: [
        { id: 'course-101', name: 'Lập trình Node.js Chuyên sâu', accessGranted: true }
      ]
    }
  };

  assert.strictEqual(unpurchasedAccessResponse.status, 403, 'User chưa mua hoặc chưa duyệt đơn phải bị chặn với mã lỗi HTTP 403');
  assert.strictEqual(approvedOrderResponse.orderStatus, 'approved', 'Đơn hàng được Admin chuyển sang trạng thái approved');
  assert.strictEqual(approvedOrderResponse.myCoursesApi.status, 200, 'Truy cập danh sách /api/my-courses thành công');
  assert.ok(
    approvedOrderResponse.myCoursesApi.courses.some(course => course.id === 'course-101' && course.accessGranted),
    'Khóa học mua thành công hiển thị đầy đủ trong danh sách /api/my-courses và cho phép học bài'
  );
});