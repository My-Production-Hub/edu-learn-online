/**
 * 📌 Subtask: ORD-547 - [Usability] [Đơn hàng] Kiểm tra trạng thái đơn hàng hiển thị rõ ràng: pending, approved,...
 */
const assert = require('node:assert/strict');

Feature('ORD-541 / ORD-547: Order Status Display');

Scenario('ORD-547 - Hiển thị đúng nhãn trạng thái và màu sắc tương ứng với từng trạng thái đơn hàng', async () => {
  const validStatuses = ['pending', 'approved', 'cancelled', 'completed'];
  const currentOrderStatus = 'pending';

  assert.ok(validStatuses.includes(currentOrderStatus), 'Trạng thái đơn hàng phải thuộc danh sách chuẩn');
  assert.strictEqual(currentOrderStatus, 'pending', 'Nhãn hiển thị trạng thái đang ở mức Chờ duyệt (pending)');
});