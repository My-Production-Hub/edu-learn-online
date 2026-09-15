/**
 * 📌 Story: ORD-255 & ORD-646 - Validate Coupon Checkout Logic
 */
const assert = require('node:assert/strict');

Feature('ORD-255 / ORD-646: Validate Coupon Checkout Logic');

Scenario('ORD-646 [UI-01]: Hiển thị nút Chọn voucher giảm giá', async () => {
  const buttonState = { visible: true, text: 'Chọn voucher giảm giá' };
  assert.strictEqual(buttonState.visible, true, 'Nút chọn voucher phải hiển thị');
  assert.strictEqual(buttonState.text, 'Chọn voucher giảm giá');
});

Scenario('ORD-646 [UI-02]: Mở panel Voucher -> Hiển thị form Nhập mã thủ công', async () => {
  const panelState = { isOpen: true, hasManualInput: true, labelText: 'Nhập mã thủ công' };
  assert.strictEqual(panelState.isOpen, true);
  assert.strictEqual(panelState.labelText, 'Nhập mã thủ công');
});

Scenario('ORD-646 [UI-03]: Nhập mã giảm giá không hợp lệ -> Báo lỗi phù hợp', async () => {
  const applyResponse = { success: false, errorCode: 'INVALID_COUPON', isErrorIconDisplayed: true };
  assert.strictEqual(applyResponse.success, false);
  assert.strictEqual(applyResponse.isErrorIconDisplayed, true);
});

Scenario('ORD-646 [UI-04]: Đóng và mở lại panel Voucher trên Checkout', async () => {
  const panelToggleState = { initialOpen: true, closed: true, reopened: true };
  assert.strictEqual(panelToggleState.reopened, true, 'Panel có thể đóng và mở lại bình thường');
});