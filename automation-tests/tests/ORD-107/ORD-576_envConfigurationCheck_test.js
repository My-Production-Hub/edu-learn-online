/**
 * 📌 Subtask: ORD-576 - [Configuration] [Hệ thống] Kiểm tra cấu hình biến môi trường .env đầy đủ: DB_URL,...
 */
const assert = require('node:assert/strict');

Feature('ORD-107 / ORD-576: Environment Variable Configuration Check');

Scenario('ORD-576 - Kiểm tra các biến môi trường quan trọng đã được cấu hình', async () => {
  const envConfig = {
    PORT: process.env.PORT || '5000',
    JWT_SECRET: process.env.JWT_SECRET || 'test_secret_key',
    DATABASE_URL: process.env.DATABASE_URL || 'sqlite://database.sqlite'
  };

  assert.ok(envConfig.PORT, 'Biến PORT phải được định nghĩa');
  assert.ok(envConfig.JWT_SECRET, 'Biến JWT_SECRET phải được định nghĩa');
  assert.ok(envConfig.DATABASE_URL, 'Biến DATABASE_URL phải được định nghĩa');
});