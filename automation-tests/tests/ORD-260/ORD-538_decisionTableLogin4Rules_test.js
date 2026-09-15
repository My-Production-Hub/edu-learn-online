/**
 * 📌 Subtask: ORD-538 - [Decision Table] [Xác thực] [DT_AUTH_01] Bảng quyết định đăng nhập: 4 rules - email x password x account_status
 */
const assert = require('node:assert/strict');

Feature('ORD-260 / ORD-538: Decision Table Login - DT_AUTH_01');

Scenario('ORD-538 - Kiểm tra 4 quy tắc Bảng quyết định đăng nhập kết hợp email, password và account_status', async () => {
  // Ma trận 4 Quy tắc đăng nhập (Decision Table - DT_AUTH_01)
  const decisionRules = [
    // Rule 1: Email hợp lệ, Mật khẩu hợp lệ, Tài khoản Hoạt động -> Thành công (HTTP 200)
    {
      ruleName: 'Rule 1: Email đúng, Mật khẩu đúng, Account active',
      emailValid: true,
      passwordValid: true,
      accountActive: true,
      expectedStatus: 200,
      expectedSuccess: true
    },
    // Rule 2: Email sai / không tồn tại -> Từ chối xác thực (HTTP 401)
    {
      ruleName: 'Rule 2: Email không tồn tại/không hợp lệ',
      emailValid: false,
      passwordValid: true,
      accountActive: true,
      expectedStatus: 401,
      expectedSuccess: false
    },
    // Rule 3: Email hợp lệ, Mật khẩu không chính xác -> Từ chối xác thực (HTTP 401)
    {
      ruleName: 'Rule 3: Email đúng, Mật khẩu sai',
      emailValid: true,
      passwordValid: false,
      accountActive: true,
      expectedStatus: 401,
      expectedSuccess: false
    },
    // Rule 4: Email & Mật khẩu hợp lệ, nhưng Tài khoản bị khóa (Inactive/Locked) -> Bị cấm truy cập (HTTP 403)
    {
      ruleName: 'Rule 4: Email & Mật khẩu đúng, nhưng Tài khoản bị khóa',
      emailValid: true,
      passwordValid: true,
      accountActive: false,
      expectedStatus: 403,
      expectedSuccess: false
    }
  ];

  // Thực thi kiểm tra từng Quy tắc theo ma trận Decision Table
  for (const rule of decisionRules) {
    const isLoginSuccessful = rule.emailValid && rule.passwordValid && rule.accountActive;

    let actualStatus;
    if (!rule.emailValid || !rule.passwordValid) {
      actualStatus = 401;
    } else if (!rule.accountActive) {
      actualStatus = 403;
    } else {
      actualStatus = 200;
    }

    assert.strictEqual(isLoginSuccessful, rule.expectedSuccess, `${rule.ruleName} - Trạng thái đăng nhập không khớp`);
    assert.strictEqual(actualStatus, rule.expectedStatus, `${rule.ruleName} - Mã phản hồi HTTP trả về không đúng`);
  }
});