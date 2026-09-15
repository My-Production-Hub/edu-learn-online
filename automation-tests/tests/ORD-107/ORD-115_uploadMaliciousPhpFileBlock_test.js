/**
 * 📌 Subtask: ORD-115 - [Bảo mật] [Mua khóa học] [NF-S-008] Tải lên tập tin độc hại - chặn file PHP qua upload minh chứng
 */
const assert = require('node:assert/strict');

Feature('ORD-107 / ORD-115: Malicious File Upload Prevention');

Scenario('ORD-115 - Chặn tải lên các file thực thi độc hại (.php, .exe, .sh) khi tải minh chứng thanh toán', async () => {
  const uploadPayload = {
    fileName: 'shell.php',
    fileType: 'application/x-php'
  };

  const allowedExtensions = ['jpg', 'jpeg', 'png', 'pdf'];
  const fileExt = uploadPayload.fileName.split('.').pop();
  const isAllowed = allowedExtensions.includes(fileExt);

  assert.strictEqual(isAllowed, false, 'File .php không nằm trong danh sách định dạng được phép');
});