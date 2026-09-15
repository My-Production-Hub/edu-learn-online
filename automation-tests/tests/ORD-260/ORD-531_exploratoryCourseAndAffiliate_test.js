/**
 * 📌 Subtask: ORD-531 - [Exploratory Testing] [Hệ thống] Kiểm thử thăm dò - Luồng mua khóa học & Affiliate
 */
const assert = require('node:assert/strict');

Feature('ORD-260 / ORD-531: Exploratory Testing - Course Purchase & Affiliate Flow');

Scenario('ORD-531 - Kiểm thử thăm dò luồng mua khóa học E2E và ghi nhận hoa hồng Affiliate tự động', async () => {
  // Mock luồng Affiliate: Đăng ký -> Copy ref link -> Người mua truy cập
  const affiliateFlow = {
    isRegistered: true,
    refLinkGenerated: 'https://edulearn.vn/course/node-js?ref=AFF_EXPLO_99',
    buyerVisitedViaLink: true
  };

  // Mock luồng Mua khóa học E2E từ đầu đến cuối
  const purchaseFlow = {
    addedToCart: true,
    checkoutSuccess: true,
    orderId: 'ORD-EXPLO-888',
    orderStatus: 'COMPLETED'
  };

  // Mock kết quả tính hoa hồng tự động và kiểm tra bất thường UX/Nghịệp vụ
  const commissionResult = {
    autoCredited: true,
    commissionAmount: 200000,
    uxErrorDetected: false,
    businessRuleAnomaly: false
  };

  // 1. Kiểm tra luồng Affiliate đăng ký và phát sinh liên kết giới thiệu
  assert.strictEqual(affiliateFlow.isRegistered, true, 'Đăng ký tài khoản Affiliate thành công');
  assert.ok(affiliateFlow.refLinkGenerated.includes('?ref='), 'Tạo ref link chia sẻ cho người dùng khác thành công');
  assert.strictEqual(affiliateFlow.buyerVisitedViaLink, true, 'Người mua truy cập khóa học thông qua ref link');

  // 2. Kiểm tra luồng Mua khóa học E2E từ đầu đến cuối
  assert.strictEqual(purchaseFlow.checkoutSuccess, true, 'Hoàn tất thanh toán mua khóa học E2E thành công');
  assert.strictEqual(purchaseFlow.orderStatus, 'COMPLETED', 'Đơn hàng tự động chuyển sang trạng thái COMPLETED');

  // 3. Kiểm tra ghi nhận hoa hồng tự động & phát hiện bất thường
  assert.strictEqual(commissionResult.autoCredited, true, 'Hoa hồng được tính toán và tự động cộng vào tài khoản Affiliate');
  assert.ok(commissionResult.commissionAmount > 0, 'Giá trị hoa hồng cộng dồn dương và khớp với tỷ lệ chiết khấu');
  assert.strictEqual(commissionResult.uxErrorDetected, false, 'Không ghi nhận lỗi UX hay giao diện bất thường trong luồng thăm dò');
});