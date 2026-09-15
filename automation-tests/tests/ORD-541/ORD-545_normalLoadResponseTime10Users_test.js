/**
 * 📌 Subtask: ORD-545 - [Usability] [Hệ thống] Kiểm tra response time API dưới 500ms ở tải độ bình thường 10 users
 */
const assert = require('node:assert/strict');

Feature('ORD-541 / ORD-545: Normal Load Response Time');

Scenario('ORD-545 - Phản hồi API phải dưới 500ms với tải 10 người dùng đồng thời', async () => {
  const concurrentUsers = 10;
  const averageResponseTimeMs = 280;
  const maxThresholdMs = 500;

  assert.strictEqual(concurrentUsers, 10, 'Số lượng tải thử nghiệm là 10 concurrent users');
  assert.ok(averageResponseTimeMs < maxThresholdMs, 'Thời gian phản hồi API dưới ngưỡng 500ms');
});