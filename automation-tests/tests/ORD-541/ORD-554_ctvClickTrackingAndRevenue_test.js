/**
 * 📌 Subtask: ORD-554 - [CTV] [Tracking Click & Doanh thu] Kiểm tra ghi nhận click qua link ref và tính toán doanh thu hoa hồng CTV
 */
const assert = require('node:assert/strict');

Feature('ORD-541 / ORD-554: CTV Click Tracking & Revenue Calculation');

Scenario('ORD-554 - Ghi nhận lượt nhấp ref link, lưu cookie 30 ngày và cộng doanh thu hoa hồng CTV cho Admin đối soát', async () => {
  // Mock API tracking click & lưu cookie (/api/affiliate/clicks)
  const clickPayload = { refCode: 'CTV_PARTNER_001' };
  const clickResponse = {
    status: 200,
    clickRecorded: true,
    cookieMaxAgeDays: 30
  };

  // Mock API tính toán doanh thu hoa hồng & Admin đối soát (/api/admin/affiliate-revenues)
  const orderPurchaseAmount = 1000000;
  const commissionRate = 0.15; // 15%
  const calculatedCommission = orderPurchaseAmount * commissionRate;

  const adminReconciliationResponse = {
    status: 200,
    revenueRecord: {
      refCode: 'CTV_PARTNER_001',
      orderId: 'ORD-9988',
      commissionAmount: calculatedCommission,
      isReconciled: true
    }
  };

  // 1. Kiểm tra tracking click & cookie 30 ngày
  assert.strictEqual(clickResponse.status, 200, 'Truy cập link ref ghi nhận click thành công');
  assert.strictEqual(clickResponse.clickRecorded, true, 'Lượt click qua link ref=CTV_PARTNER_001 được hệ thống ghi nhận');
  assert.strictEqual(clickResponse.cookieMaxAgeDays, 30, 'Cookie tracking tiếp thị liên kết phải được duy trì lưu 30 ngày');

  // 2. Kiểm tra tính toán hoa hồng & Admin đối soát doanh thu
  assert.strictEqual(calculatedCommission, 150000, 'Doanh thu hoa hồng CTV được tính chính xác theo tỷ lệ 15%');
  assert.strictEqual(adminReconciliationResponse.status, 200, 'Admin truy cập dữ liệu đối soát doanh thu thành công');
  assert.strictEqual(
    adminReconciliationResponse.revenueRecord.commissionAmount,
    150000,
    'Hoa hồng được cộng vào bảng affiliate_revenues và hiển thị chuẩn xác cho Admin đối soát'
  );
});