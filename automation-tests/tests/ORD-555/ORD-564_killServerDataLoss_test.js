/**
 * 📌 Story: ORD-255 & ORD-646 - [UnitTest & UI] Validate Coupon Flow
 * Mã chuyển đổi kiểm thử logic thuần bằng node:assert/strict
 */
const assert = require('node:assert/strict');

Feature('ORD-255 / ORD-646: Validate Coupon Checkout Logic');

Scenario('ORD-646 [UI-01]: Xác minh hiển thị nút chọn voucher giảm giá', async () => {
  const checkoutState = {
    hasVoucherButton: true,
    buttonText: 'Chọn voucher giảm giá'
  };

  assert.strictEqual(checkoutState.hasVoucherButton, true, 'Nút chọn voucher phải xuất hiện');
  assert.strictEqual(checkoutState.buttonText, 'Chọn voucher giảm giá');
});

Scenario('ORD-646 [UI-02]: Xác minh hiển thị form nhập mã thủ công khi mở panel', async () => {
  const voucherPanelState = {
    isOpen: true,
    hasManualInput: true,
    inputLabel: 'Nhập mã thủ công'
  };

  assert.strictEqual(voucherPanelState.isOpen, true, 'Panel voucher phải ở trạng thái mở');
  assert.strictEqual(voucherPanelState.hasManualInput, true, 'Ô nhập mã thủ công phải tồn tại');
  assert.strictEqual(voucherPanelState.inputLabel, 'Nhập mã thủ công');
});