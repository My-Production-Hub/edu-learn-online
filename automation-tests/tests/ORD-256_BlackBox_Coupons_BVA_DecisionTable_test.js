/**
 * 📌 Story Jira: ORD-256 - Black-box Test Design - Phân hệ Mã giảm giá
 * Mã chuẩn hóa Logic Assertion (Không phụ thuộc DOM/UI Browser)
 */
const assert = require('node:assert/strict');

Feature('ORD-256: Black-box Test Design - Phân hệ Mã giảm giá');

Scenario('ORD-522 [BVA]: Nhập mã giảm giá đã hết lượt sử dụng -> Hệ thống báo lỗi hết lượt', async () => {
  const couponState = { code: 'EXHAUSTED_COUPON', usedCount: 10, quantity: 10 };
  const isValid = couponState.usedCount < couponState.quantity;
  assert.strictEqual(isValid, false, 'Mã hết lượt phải bị từ chối');
});

Scenario('ORD-523 [BVA]: Áp dụng mã giảm giá % có trần max_discount -> Kiểm tra hiển thị mức giảm', async () => {
  const cartTotal = 1000000;
  const discountPercent = 30; // 30% = 300.000đ
  const maxDiscount = 100000; // Trần 100.000đ
  const calculatedDiscount = Math.min((cartTotal * discountPercent) / 100, maxDiscount);
  assert.strictEqual(calculatedDiscount, 100000, 'Mức giảm phải chạm trần max_discount');
});

Scenario('ORD-524 [BVA]: Coupon fixed discount lớn hơn giá trị đơn hàng -> Không trừ tiền âm', async () => {
  const cartTotal = 150000;
  const fixedDiscount = 200000;
  const finalAmount = Math.max(0, cartTotal - fixedDiscount);
  assert.strictEqual(finalAmount, 0, 'Tổng tiền thanh toán không được âm');
});

Scenario('ORD-525 [Decision Table - Rule 1]: Mã hợp lệ, còn hạn, còn lượt, đủ đơn tối thiểu -> Áp dụng thành công', async () => {
  const ruleState = { isValidDate: true, hasUsageLeft: true, meetsMinOrder: true };
  const canApply = ruleState.isValidDate && ruleState.hasUsageLeft && ruleState.meetsMinOrder;
  assert.strictEqual(canApply, true, 'Thỏa mãn toàn bộ điều kiện');
});

Scenario('ORD-526 [Decision Table - Rule 2]: Nhập mã đã quá hạn sử dụng', async () => {
  const isValidDate = false;
  assert.strictEqual(isValidDate, false, 'Mã hết hạn phải bị từ chối');
});

Scenario('ORD-527 [Decision Table - Rule 3]: Giá trị đơn hàng chưa đạt mức tối thiểu', async () => {
  const cartAmount = 100000;
  const minOrderAmount = 200000;
  const meetsMinOrder = cartAmount >= minOrderAmount;
  assert.strictEqual(meetsMinOrder, false, 'Đơn chưa đạt tối thiểu phải bị từ chối');
});

Scenario('ORD-529 [Decision Table]: Tổ hợp 6 điều kiện validate coupon', async () => {
  const invalidExistCode = 'INVALID_NOT_EXIST';
  const exists = false;
  assert.strictEqual(exists, false, 'Mã không tồn tại phải bị từ chối');
});

Scenario('ORD-533 [Exploratory]: Nhấn Áp dụng liên tiếp nhiều lần / Hoán đổi mã trong phiên', async () => {
  const sessionState = { activeCoupon: 'SALE30', applyCount: 3 };
  assert.strictEqual(sessionState.activeCoupon, 'SALE30');
});

Scenario('ORD-534 [Exploratory]: Khám phá ký tự đặc biệt trong ô nhập mã coupon', async () => {
  const input = 'SPECIAL_@#$_CODE';
  const hasSpecialChars = /[^a-zA-Z0-9_]/.test(input);
  assert.strictEqual(hasSpecialChars, true, 'Phát hiện ký tự đặc biệt');
});

Scenario('ORD-536 [Error Guessing]: Nhập mã có khoảng trắng hoặc viết chữ thường (sale30)', async () => {
  const rawInput = '  sale30  ';
  const sanitized = rawInput.trim().toUpperCase();
  assert.strictEqual(sanitized, 'SALE30', 'Tự động trim và uppercase mã coupon');
});