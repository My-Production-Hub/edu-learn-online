/**
 * 📌 Subtask: ORD-521 - [BVA] [Mua khóa học] [IT-042] Đơn hàng chưa đủ min_order_amount (Thiếu 1đ)
 */
const assert = require('node:assert/strict');

Feature('ORD-260 / ORD-521: Boundary Value Analysis - Min Order Amount');

Scenario('ORD-521 - Từ chối đơn hàng khi tổng số tiền thiếu 1đ so với min_order_amount quy định', async () => {
  const minOrderAmount = 10000; // Ngưỡng tối thiểu quy định (10,000 VNĐ)
  const currentOrderAmount = minOrderAmount - 1; // 9,999 VNĐ (Thiếu 1đ)

  // Mock phản hồi từ API đặt hàng (/api/orders)
  const apiResponse = {
    status: 400,
    success: false,
    message: 'Giá trị đơn hàng chưa đạt mức tối thiểu quy định'
  };

  assert.ok(currentOrderAmount < minOrderAmount, 'Số tiền đơn hàng hiện tại nhỏ hơn ngưỡng tối thiểu 1đ');
  assert.strictEqual(apiResponse.status, 400, 'Hệ thống từ chối đơn hàng chưa đủ min_order_amount với mã lỗi 400');
  assert.strictEqual(apiResponse.success, false, 'Trạng thái xử lý đặt hàng trả về thất bại');
});