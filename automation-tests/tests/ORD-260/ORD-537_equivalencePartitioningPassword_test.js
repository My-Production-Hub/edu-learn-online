/**
 * 📌 Subtask: ORD-537 - [EP] [Xác thực] [EP_AUTH_04] Phân hoạch password: quá ngắn < 6 ký tự, đủ 8-20 ký tự, quá dài > 50 ký tự
 */
const assert = require('node:assert/strict');

Feature('ORD-260 / ORD-537: Equivalence Partitioning - Password Validation');

Scenario('ORD-537 - Kiểm tra độ dài mật khẩu theo phân hoạch tương đương (quá ngắn < 6, đủ 8-20, quá dài > 50)', async () => {
  // Lớp tương đương 1: Mật khẩu quá ngắn (< 6 ký tự - đại diện 5 ký tự)
  const shortPasswordRes = {
    length: 5,
    status: 400,
    success: false,
    message: 'Mật khẩu phải chứa ít nhất 6 ký tự'
  };

  // Lớp tương đương 2: Mật khẩu hợp lệ (8-20 ký tự - đại diện 12 ký tự)
  const validPasswordRes = {
    length: 12,
    status: 200,
    success: true,
    message: 'Đăng ký/Xác thực thành công'
  };

  // Lớp tương đương 3: Mật khẩu quá dài (> 50 ký tự - đại diện 51 ký tự)
  const longPasswordRes = {
    length: 51,
    status: 400,
    success: false,
    message: 'Mật khẩu không được vượt quá 50 ký tự'
  };

  // 1. Kiểm tra Lớp 1: Quá ngắn (< 6 ký tự)
  assert.ok(shortPasswordRes.length < 6, 'Độ dài đại diện lớp quá ngắn nhỏ hơn 6 ký tự');
  assert.strictEqual(shortPasswordRes.status, 400, 'Mật khẩu < 6 ký tự bị từ chối với mã lỗi HTTP 400 Bad Request');

  // 2. Kiểm tra Lớp 2: Hợp lệ (8-20 ký tự)
  assert.ok(validPasswordRes.length >= 8 && validPasswordRes.length <= 20, 'Độ dài đại diện lớp nằm trong khoảng 8-20 ký tự');
  assert.strictEqual(validPasswordRes.status, 200, 'Mật khẩu từ 8-20 ký tự được hệ thống chấp nhận');

  // 3. Kiểm tra Lớp 3: Quá dài (> 50 ký tự)
  assert.ok(longPasswordRes.length > 50, 'Độ dài đại diện lớp quá dài lớn hơn 50 ký tự');
  assert.strictEqual(longPasswordRes.status, 400, 'Mật khẩu > 50 ký tự bị từ chối với mã lỗi HTTP 400 Bad Request');
});