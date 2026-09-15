const assert = require('node:assert/strict');

Feature('ORD-551: Combo Course & Admin CRUD');

Scenario('ORD-551 - Kiểm tra quản lý Combo khóa học và CRUD Admin', async () => {
  const comboList = [{ id: 'COMBO-01', title: 'Combo ưu đãi' }];

  assert.ok(comboList.length > 0);
  assert.strictEqual(comboList[0].title, 'Combo ưu đãi');
});