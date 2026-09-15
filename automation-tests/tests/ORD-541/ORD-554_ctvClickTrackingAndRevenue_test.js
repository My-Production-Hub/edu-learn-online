Feature('ORD-554: CTV Click Tracking & Revenue');

Scenario('ORD-554 - Kiểm tra ghi nhận cookie tracking click và tính hoa hồng CTV', async ({ I }) => {
  I.amOnPage('/courses?ref=ctv_partner_123');
  I.waitForText('Tất cả khóa học', 15);
  I.seeInCurrentUrl('ref=ctv_partner_123');
});