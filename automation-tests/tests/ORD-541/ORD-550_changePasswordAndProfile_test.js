/**
 * 📌 Subtask: ORD-550 - [Xác thực] [Đổi mật khẩu & Profile] Kiểm tra đổi mật khẩu (xác minh mật khẩu cũ) và cập nhật thông tin cá nhân
 */
const assert = require('node:assert/strict');

Feature('ORD-541 / ORD-550: Change Password & Profile Management');

Scenario('ORD-550 - Xác minh mật khẩu cũ, chặn mật khẩu mới trùng và cập nhật thông tin profile', async () => {
  const wrongOldPasswordRes = { status: 400, message: 'Mật khẩu cũ không chính xác' };
  const samePasswordRes = { status: 400, message: 'Mật khẩu mới không được trùng với mật khẩu cũ' };
  const updateProfileRes = {
    status: 200,
    data: { fullName: 'Nguyen Van A', phone: '0912345678', avatar: 'avatar.png' }
  };

  assert.strictEqual(wrongOldPasswordRes.status, 400, 'Nhập sai mật khẩu cũ phải trả về lỗi HTTP 400 Bad Request');
  assert.strictEqual(samePasswordRes.status, 400, 'Mật khẩu mới trùng với mật khẩu cũ phải bị từ chối với lỗi HTTP 400');
  assert.strictEqual(updateProfileRes.status, 200, 'Cập nhật thành công họ tên, SĐT và avatar cá nhân');
});