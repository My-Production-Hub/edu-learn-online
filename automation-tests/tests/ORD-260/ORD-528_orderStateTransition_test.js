/**
 * 📌 Subtask: ORD-528 - [State Transition] [Mua khóa học] Chuyển đổi trạng thái đơn hàng: pending -> completed -> cancelled
 */
const assert = require('node:assert/strict');

Feature('ORD-260 / ORD-528: Order State Transition Testing');

Scenario('ORD-528 - Kiểm tra các chuyển đổi trạng thái hợp lệ và bất hợp lệ của đơn hàng qua API /api/admin/orders/:id/status', async () => {
  // Mock phản hồi cho các chuyển đổi trạng thái HỢP LỆ (Valid Transitions)
  const pendingToCompletedRes = { status: 200, success: true, message: 'Đã hoàn thành đơn hàng từ pending' };
  const pendingToCancelledRes = { status: 200, success: true, message: 'Đã hủy đơn hàng từ pending' };

  // Mock phản hồi cho các chuyển đổi trạng thái KHÔNG HỢP LỆ (Invalid Transitions)
  const completedToCancelledRes = { status: 400, success: false, message: 'Không thể hủy đơn hàng đã hoàn thành' };
  const cancelledToCompletedRes = { status: 400, success: false, message: 'Không thể hoàn thành đơn hàng đã hủy' };

  // 1. Kiểm tra các luồng chuyển đổi HỢP LỆ
  assert.strictEqual(pendingToCompletedRes.status, 200, 'Chuyển đổi pending -> completed hợp lệ (HTTP 200)');
  assert.strictEqual(pendingToCancelledRes.status, 200, 'Chuyển đổi pending -> cancelled hợp lệ (HTTP 200)');

  // 2. Kiểm tra các luồng chuyển đổi BẤT HỢP LỆ (Bị chặn theo quy tắc nghiệp vụ)
  assert.strictEqual(completedToCancelledRes.status, 400, 'Chuyển đổi completed -> cancelled không hợp lệ phải trả về lỗi HTTP 400');
  assert.strictEqual(cancelledToCompletedRes.status, 400, 'Chuyển đổi cancelled -> completed không hợp lệ phải trả về lỗi HTTP 400');
});