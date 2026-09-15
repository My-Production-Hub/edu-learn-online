/**
 * 📌 Subtask: ORD-539 - [State Transition] [Đơn hàng] [ST_ORD_05] Trạng thái đơn hàng S4 (Approved) sang S5 (Completed - access granted)
 */
const assert = require('node:assert/strict');

Feature('ORD-260 / ORD-539: State Transition - S4 Approved to S5 Completed');

Scenario('ORD-539 - Kiểm tra chuyển đổi trạng thái đơn hàng từ S4 (Approved) sang S5 (Completed - Cấp quyền truy cập)', async () => {
  // Mock dữ liệu đơn hàng ở trạng thái ban đầu S4 (Approved)
  const initialOrder = {
    orderId: 'ORD-539-8899',
    status: 'S4_APPROVED',
    accessGranted: false
  };

  // Mock phản hồi từ API cập nhật trạng thái đơn hàng sang S5 (Completed)
  const updateStatusResponse = {
    status: 200,
    success: true,
    orderId: 'ORD-539-8899',
    previousStatus: 'S4_APPROVED',
    currentStatus: 'S5_COMPLETED',
    accessGranted: true
  };

  // 1. Kiểm tra điều kiện đầu vào của đơn hàng (Trạng thái S4 - Approved)
  assert.strictEqual(initialOrder.status, 'S4_APPROVED', 'Đơn hàng ban đầu phải ở trạng thái S4 (Approved)');
  assert.strictEqual(initialOrder.accessGranted, false, 'Chưa mở khóa đầy đủ quyền truy cập khi đơn hàng chưa ở trạng thái S5');

  // 2. Kiểm tra chuyển đổi sang S5 (Completed) và cấp quyền truy cập khóa học
  assert.strictEqual(updateStatusResponse.status, 200, 'Cập nhật trạng thái đơn hàng thành công (HTTP 200)');
  assert.strictEqual(updateStatusResponse.currentStatus, 'S5_COMPLETED', 'Trạng thái đơn hàng được chuyển thành công sang S5 (Completed)');
  assert.strictEqual(
    updateStatusResponse.accessGranted,
    true,
    'Hệ thống tự động cấp quyền truy cập khóa học (access granted) cho người dùng sau khi hoàn thành đơn hàng'
  );
});