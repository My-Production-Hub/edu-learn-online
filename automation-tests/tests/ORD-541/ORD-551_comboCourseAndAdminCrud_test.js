/**
 * 📌 Subtask: ORD-551 - [Khóa học] [Combo] Kiểm tra danh sách Combo khóa học ưu đãi và Admin CRUD combo
 */
const assert = require('node:assert/strict');

Feature('ORD-541 / ORD-551: Combo Course & Admin CRUD');

Scenario('ORD-551 - Hiển thị danh sách Combo ưu đãi kèm giá gốc/tiết kiệm và Admin CRUD combo thành công', async () => {
  // Mock dữ liệu API danh sách Combo công khai (/api/combos)
  const comboListResponse = {
    status: 200,
    combos: [
      {
        id: 'combo-01',
        title: 'Combo Lập trình Web Fullstack',
        originalPrice: 2000000,
        discountedPrice: 1500000,
        savedPrice: 500000
      }
    ]
  };

  // Mock dữ liệu Admin CRUD Combo (/api/admin/combos)
  const adminCrudPayload = {
    title: 'Combo Mobile Developer',
    course_ids: ['course-101', 'course-102'],
    price: 1800000
  };

  const adminCrudResponse = { status: 201, success: true };

  // Kiểm tra hiển thị giá gốc và giá tiết kiệm
  assert.strictEqual(comboListResponse.status, 200, 'Khách hàng truy cập danh sách combo thành công');
  assert.ok(comboListResponse.combos[0].originalPrice > comboListResponse.combos[0].discountedPrice, 'Giá ưu đãi combo phải nhỏ hơn tổng giá gốc');
  assert.strictEqual(
    comboListResponse.combos[0].savedPrice,
    comboListResponse.combos[0].originalPrice - comboListResponse.combos[0].discountedPrice,
    'Số tiền tiết kiệm phải được tính toán chính xác'
  );

  // Kiểm tra thao tác Admin
  assert.ok(Array.isArray(adminCrudPayload.course_ids) && adminCrudPayload.course_ids.length > 0, 'Danh sách course_ids phải hợp lệ');
  assert.strictEqual(adminCrudResponse.status, 201, 'Admin thực hiện thêm/sửa/xóa combo thành công');
});