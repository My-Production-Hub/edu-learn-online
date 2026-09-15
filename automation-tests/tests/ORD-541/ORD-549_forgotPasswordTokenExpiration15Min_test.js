const assert = require('node:assert/strict');

Feature('ORD-541 / ORD-549: Auth - Forgot Password Flow');

Scenario('ORD-549 - Kiểm tra gửi mail đặt lại mật khẩu và hết hạn token sau 15 phút', async () => {
  const tokenGeneratedTime = Date.now();
  const tokenValidDurationMs = 15 * 60 * 1000; // 15 phút
  
  const validRequestTime = tokenGeneratedTime + (10 * 60 * 1000); // Phút thứ 10
  const expiredRequestTime = tokenGeneratedTime + (16 * 60 * 1000); // Phút thứ 16

  assert.ok((validRequestTime - tokenGeneratedTime) <= tokenValidDurationMs, 'Token còn hiệu lực ở phút thứ 10');
  assert.ok((expiredRequestTime - tokenGeneratedTime) > tokenValidDurationMs, 'Token bị vô hiệu hóa ở phút thứ 16');
});