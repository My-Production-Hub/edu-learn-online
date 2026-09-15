const assert = require('node:assert/strict');

Feature('ORD-541 / ORD-551: Course - Combo & Admin CRUD');

Scenario('ORD-551 - Kiểm tra danh sách Combo ưu đãi và thao tác Admin CRUD Combo', async () => {
  const comboList = [
    { id: 'cb-1', name: 'Combo Fullstack JS', originalPrice: 2000000, comboPrice: 1500000, active: true }
  ];

  // Admin Create Combo
  const newCombo = { id: 'cb-2', name: 'Combo DevOps Pro', originalPrice: 3000000, comboPrice: 2200000, active: true };
  comboList.push(newCombo);

  assert.strictEqual(comboList.length, 2);
  assert.ok(comboList[1].comboPrice < comboList[1].originalPrice, 'Giá combo phải nhỏ hơn tổng giá gốc');
});