Feature('ORD-551: Combo Course & Admin CRUD');

Scenario('ORD-551 - Kiểm tra quản lý Combo khóa học và CRUD Admin', async ({ I }) => {
  I.amOnPage('/combos');
  I.waitForText('Combo ưu đãi', 15);
  I.see('Tiết kiệm');
});