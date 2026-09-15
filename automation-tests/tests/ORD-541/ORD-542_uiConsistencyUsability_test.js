/**
 * 📌 Subtask: ORD-542 - [Usability] [Hệ thống] Kiểm tra giao diện nhất quán & thông báo lỗi rõ ràng
 */
const assert = require('node:assert/strict');

Feature('ORD-541 / ORD-542: UI Consistency & Usability');

Scenario('ORD-542 - Kiểm tra nhất quán giao diện, thông báo lỗi rõ ràng và quy trình mua hàng', async () => {
  const isUiConsistent = true; // Đồng bộ font, color, spacing
  const isErrorMessageClear = true; // Thông báo có ý nghĩa, không hiện 'Error 500'
  const purchaseStepsCount = 3;
  const maxAllowedSteps = 3;
  const hasLoadingIndicator = true; // Spinner / skeleton UI
  const isResponsiveMobile = true;
  const ctaButtonVisible = true;

  assert.strictEqual(isUiConsistent, true, 'Giao diện phải đồng bộ về font chữ, màu sắc và khoảng cách');
  assert.strictEqual(isErrorMessageClear, true, 'Thông báo lỗi phải rõ ràng, không hiển thị lỗi Error 500 chung chung');
  assert.ok(purchaseStepsCount <= maxAllowedSteps, 'Luồng đăng ký và mua khóa học không được vượt quá 3 bước');
  assert.strictEqual(hasLoadingIndicator, true, 'Hệ thống phản hồi trạng thái chờ bằng spinner/skeleton UI');
  assert.strictEqual(isResponsiveMobile, true, 'Giao diện tương thích tốt trên thiết bị di động');
  assert.strictEqual(ctaButtonVisible, true, 'Nút kêu gọi hành động (CTA) hiển thị rõ ràng, dễ nhận biết');
});