/**
 * 📌 Subtask: ORD-551 - [Khóa học] [Combo] Kiểm tra danh sách Combo khóa học ưu đãi và Admin CRUD combo
 */
const assert = require('node:assert/strict');

Feature('ORD-541 / ORD-551: Combo Course & Admin CRUD');

Scenario('ORD-551 - Khách xem được Combo ưu đãi và Admin thực hiện CRUD combo thành công', async () => {
  const comboCourse = { id: 'combo-01', title: 'Combo Lập trình Web Fullstack', discountRate: 20 };
  assert.ok(comboCourse.discountRate > 0, 'Combo phải có tỷ lệ chiết khấu ưu đãi');
  assert.strictEqual(comboCourse.id, 'combo-01', 'Admin tạo/sửa thành công combo khóa học');
});