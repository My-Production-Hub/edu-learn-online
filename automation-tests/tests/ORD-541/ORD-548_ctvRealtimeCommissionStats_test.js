Feature('ORD-548: CTV Realtime Commission Stats');

Scenario('ORD-548 - Kiểm tra thống kê hoa hồng thời gian thực phân hệ CTV', async ({ I }) => {
  I.amOnPage('/ctv/dashboard');
  I.waitForText('Thống kê cộng tác viên', 15);
  I.see('Hoa hồng tạm tính');
});