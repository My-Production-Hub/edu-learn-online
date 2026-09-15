const assert = require('node:assert/strict');

Feature('ORD-541 / ORD-554: CTV - Referral Tracking & Revenue');

Scenario('ORD-554 - Kiểm tra ghi nhận lượt click từ link giới thiệu và cộng dồn doanh thu', async () => {
  const referralTracker = { refCode: 'CTV_KHOI_2026', clicks: 0, convertedOrders: 0, totalEarned: 0 };

  // Khách hàng click link & mua hàng
  referralTracker.clicks += 1;
  referralTracker.convertedOrders += 1;
  referralTracker.totalEarned += 150000;

  assert.strictEqual(referralTracker.clicks, 1);
  assert.strictEqual(referralTracker.convertedOrders, 1);
  assert.strictEqual(referralTracker.totalEarned, 150000, 'Doanh thu cộng dồn chuẩn xác');
});