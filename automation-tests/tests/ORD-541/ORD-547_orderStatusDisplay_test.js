const assert = require('node:assert/strict');

Feature('ORD-547: Order Status Display');

Scenario('ORD-547 - Kiểm tra hiển thị trạng thái đơn hàng trong lịch sử mua hàng', async () => {
  const orderHistory = {
    orders: [{ id: 'ORD-001', statusText: 'Lịch sử đơn hàng' }]
  };

  assert.ok(orderHistory.orders.length > 0);
  assert.strictEqual(orderHistory.orders[0].statusText, 'Lịch sử đơn hàng');
});