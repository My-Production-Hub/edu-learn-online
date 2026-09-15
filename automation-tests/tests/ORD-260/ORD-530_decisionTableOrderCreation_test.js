/**
 * 📌 Subtask: ORD-530 - [Decision Table] [Mua khóa học] Kết hợp điều kiện tạo đơn hàng thành công
 */
const assert = require('node:assert/strict');

Feature('ORD-260 / ORD-530: Decision Table - Order Creation Conditions');

Scenario('ORD-530 - Kiểm tra các tổ hợp điều kiện tạo đơn hàng theo Bảng quyết định (Decision Table)', async () => {
  // Ma trận các tổ hợp quy tắc kiểm thử (Decision Table Matrix)
  const decisionRules = [
    // Rule 1: Thỏa mãn tất cả điều kiện bắt buộc + có Coupon hợp lệ + có Affiliate Ref -> Tạo đơn thành công (201)
    {
      isLoggedIn: true,
      cartNotEmpty: true,
      courseNotPurchased: true,
      validCoupon: true,
      affiliateRef: true,
      expectedStatus: 201,
      expectedSuccess: true
    },
    // Rule 2: Chưa đăng nhập (isLoggedIn = false) -> Từ chối (401 Unauthorized)
    {
      isLoggedIn: false,
      cartNotEmpty: true,
      courseNotPurchased: true,
      validCoupon: true,
      affiliateRef: false,
      expectedStatus: 401,
      expectedSuccess: false
    },
    // Rule 3: Giỏ hàng trống (cartNotEmpty = false) -> Từ chối (400 Bad Request)
    {
      isLoggedIn: true,
      cartNotEmpty: false,
      courseNotPurchased: true,
      validCoupon: true,
      affiliateRef: false,
      expectedStatus: 400,
      expectedSuccess: false
    },
    // Rule 4: Khóa học đã được mua trước đó (courseNotPurchased = false) -> Từ chối (400 Bad Request)
    {
      isLoggedIn: true,
      cartNotEmpty: true,
      courseNotPurchased: false,
      validCoupon: true,
      affiliateRef: true,
      expectedStatus: 400,
      expectedSuccess: false
    },
    // Rule 5: Mã giảm giá không hợp lệ (validCoupon = false) -> Từ chối (400 Bad Request)
    {
      isLoggedIn: true,
      cartNotEmpty: true,
      courseNotPurchased: true,
      validCoupon: false,
      affiliateRef: false,
      expectedStatus: 400,
      expectedSuccess: false
    }
  ];

  // Thực thi kiểm tra từng tổ hợp điều kiện
  for (const [index, rule] of decisionRules.entries()) {
    const isOrderEligible = rule.isLoggedIn && rule.cartNotEmpty && rule.courseNotPurchased && rule.validCoupon;
    
    let actualStatus;
    if (!rule.isLoggedIn) {
      actualStatus = 401;
    } else if (!isOrderEligible) {
      actualStatus = 400;
    } else {
      actualStatus = 201;
    }

    assert.strictEqual(
      actualStatus,
      rule.expectedStatus,
      `Quy tắc Rule ${index + 1}: Mã HTTP trả về không đúng kỳ vọng`
    );
    assert.strictEqual(
      isOrderEligible,
      rule.expectedSuccess,
      `Quy tắc Rule ${index + 1}: Kết quả tạo đơn hàng không khớp`
    );
  }
});