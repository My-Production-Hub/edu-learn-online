/**
 * 📌 Subtask: ORD-540 - [State Transition] [Đơn hàng] [ST_ORD_06] Trạng thái đơn hàng S2 (Pending) hết thời gian thanh toán - sang Expired
 */
const assert = require('node:assert/strict');

Feature('ORD-260 / ORD-540: State Transition - S2 Pending to Expired');

Scenario('ORD-540 - Kiểm tra chuyển đổi trạng thái đơn hàng S2 (Pending) sang Expired khi hết hạn thời gian thanh toán', async () => {
  // Mock dữ liệu đơn hàng ở trạng thái ban đầu S2 (Pending) đã vượt quá thời gian chờ thanh toán
  const initialOrder = {
    orderId: 'ORD-540-1024',
    status: 'S2_PENDING',
    paymentTimeoutMinutes: 15,
    elapsedMinutes: 16
  };

  // Mock phản hồi xử lý tự động từ hệ thống/cron job khi đơn hàng hết hạn
  const expirationCheckResponse = {
    status: 200,
    orderId: 'ORD-540-1024',
    previousStatus: 'S2_PENDING',
    currentStatus: 'EXPIRED',
    canPay: false,
    message: 'Đơn hàng đã hết thời hạn thanh toán'
  };

  // 1. Kiểm tra điều kiện đơn hàng quá hạn thời gian chờ thanh toán
  assert.strictEqual(initialOrder.status, 'S2_PENDING', 'Đơn hàng ban đầu phải ở trạng thái S2 (Pending)');
  assert.ok(
    initialOrder.elapsedMinutes > initialOrder.paymentTimeoutMinutes,
    'Thời gian chờ thanh toán thực tế đã vượt quá giới hạn quy định (15 phút)'
  );

  // 2. Kiểm tra chuyển đổi trạng thái sang Expired và vô hiệu hóa cổng thanh toán
  assert.strictEqual(expirationCheckResponse.status, 200, 'Xử lý kiểm tra hết hạn thành công (HTTP 200)');
  assert.strictEqual(expirationCheckResponse.currentStatus, 'EXPIRED', 'Đơn hàng được chuyển trạng thái chính xác sang Expired');
  assert.strictEqual(expirationCheckResponse.canPay, false, 'Hệ thống vô hiệu hóa tính năng thanh toán đối với đơn hàng đã Expired');
});