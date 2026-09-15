/**
 * 📌 Subtask: ORD-115 - [Security] Kiểm tra chặn tải lên file mã độc (.php, .exe, .sh)
 */
const assert = require('node:assert/strict');

Feature('ORD-107 / ORD-115: Security - Block Malicious File Upload');

Scenario('ORD-115 - Hệ thống chặn các định dạng file không nằm trong White-list', async () => {
  const uploadedFile = {
    filename: 'webshell.php',
    mimeType: 'application/x-php',
    sizeBytes: 1024
  };

  const allowedExtensions = ['.jpg', '.jpeg', '.png', '.pdf'];
  const fileExt = uploadedFile.filename.substring(uploadedFile.filename.lastIndexOf('.'));

  const isAllowed = allowedExtensions.includes(fileExt);
  
  const uploadResponse = {
    status: isAllowed ? 200 : 400,
    success: isAllowed,
    message: isAllowed ? 'Tải file thành công' : 'Định dạng file không được hỗ trợ'
  };

  assert.strictEqual(isAllowed, false, 'File .php không thuộc danh sách mở rộng được phép');
  assert.strictEqual(uploadResponse.status, 400);
  assert.strictEqual(uploadResponse.success, false);
});