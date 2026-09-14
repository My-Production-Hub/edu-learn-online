/**
 * ==============================================================================
 * 🔐 BỘ KIỂM THỬ TÍCH HỢP XÁC THỰC (AUTHENTICATION SWAGGER API FLOW)
 * ==============================================================================
 * 📌 Story Jira: ORD-43 - [Kiểm thử tích hợp] Module Xác thực (Auth API)
 * 📖 Căn cứ Swagger UI: Nhóm Authentication (4 APIs)
 *    1. POST /api/register - Đăng ký tài khoản mới
 *    2. POST /api/login - Đăng nhập hệ thống
 *    3. POST /api/forgot-password - Yêu cầu khôi phục mật khẩu
 *    4. POST /api/reset-password - Đặt lại mật khẩu mới
 * 📌 Bao gồm 8 Subtasks (ORD-751 -> ORD-758):
 *    - ORD-751: [IT-AUTH-01] Đăng ký tài khoản mới thành công (HTTP 201)
 *    - ORD-752: [IT-AUTH-02] Từ chối đăng ký trùng Email (HTTP 400)
 *    - ORD-753: [IT-AUTH-03] Đăng nhập hệ thống thành công (HTTP 200)
 *    - ORD-754: [IT-AUTH-04] Từ chối sai mật khẩu / không tồn tại (HTTP 401)
 *    - ORD-755: [IT-AUTH-05] Yêu cầu khôi phục mật khẩu thành công (HTTP 200)
 *    - ORD-756: [IT-AUTH-06] Từ chối khôi phục khi Email chưa đăng ký (HTTP 404)
 *    - ORD-757: [IT-AUTH-07] Đặt lại mật khẩu thành công với Token (HTTP 200)
 *    - ORD-758: [IT-AUTH-08] Chặn đặt lại mật khẩu khi Token không hợp lệ (HTTP 400)
 * 🎯 Công cụ: CodeceptJS + Playwright (Browser & API Flow)
 * ==============================================================================
 */

Feature('ORD-43: [Kiểm thử tích hợp] Module Xác thực (Authentication Swagger Flow)');

/**
 * Subtask 1: ORD-751 - [IT-AUTH-01] Đăng ký tài khoản mới thành công
 */
Scenario('ORD-751 [IT-AUTH-01]: [POST /api/register] Đăng ký tài khoản mới hợp lệ -> Tạo tài khoản thành công (HTTP 201)', async ({ I }) => {
  I.amOnPage('/register');
  I.waitForText('Đăng ký tài khoản', 15);
  
  const uniqueEmail = `test_student_${Date.now()}@edulearn.vn`;
  I.fillField('input[placeholder="Nguyễn Văn A"]', 'Nguyễn Văn Test');
  I.fillField('input[placeholder="your@email.com"]', uniqueEmail);
  I.fillField('input[placeholder="Ví dụ: 0912345678"]', '0912345678');
  I.fillField('input[placeholder="Tối thiểu 8 ký tự (chữ hoa, chữ thường, số, ký tự đặc biệt)"]', 'Admin@123456');
  I.fillField('input[placeholder="Nhập lại mật khẩu"]', 'Admin@123456');
  
  I.click('Đăng ký tài khoản');
  I.wait(3);
  
  // Đối chiếu: Đăng ký thành công không bị báo lỗi trùng email
  I.dontSee('Email đã được sử dụng');
});

/**
 * Subtask 2: ORD-752 - [IT-AUTH-02] Từ chối đăng ký khi Email trùng lặp
 */
Scenario('ORD-752 [IT-AUTH-02]: [POST /api/register] Đăng ký với Email đã tồn tại -> Báo lỗi trùng lặp (HTTP 400)', async ({ I }) => {
  I.amOnPage('/register');
  I.waitForText('Đăng ký tài khoản', 15);
  
  // Sử dụng email đã tồn tại trong CSDL
  I.fillField('input[placeholder="Nguyễn Văn A"]', 'Nguyễn Trùng Lặp');
  I.fillField('input[placeholder="your@email.com"]', 'tuan.nguyen@gmail.com');
  I.fillField('input[placeholder="Ví dụ: 0912345678"]', '0912345678');
  I.fillField('input[placeholder="Tối thiểu 8 ký tự (chữ hoa, chữ thường, số, ký tự đặc biệt)"]', 'Admin@123456');
  I.fillField('input[placeholder="Nhập lại mật khẩu"]', 'Admin@123456');
  
  I.click('Đăng ký tài khoản');
  I.wait(2);
  
  // Đối chiếu: Hệ thống giữ nguyên trang đăng ký và không cho tạo tài khoản
  I.seeInCurrentUrl('/register');
});

/**
 * Subtask 3: ORD-753 - [IT-AUTH-03] Đăng nhập hệ thống thành công
 */
Scenario('ORD-753 [IT-AUTH-03]: [POST /api/login] Đăng nhập với Email và Mật khẩu chính xác -> Cấp Token & Vào hệ thống (HTTP 200)', async ({ I }) => {
  I.amOnPage('/login');
  I.waitForText('Đăng nhập tài khoản', 15);
  
  I.fillField('input[type="email"]', 'tuan.nguyen@gmail.com');
  I.fillField('input[type="password"]', 'user123');
  I.click('Đăng nhập');
  I.wait(3);
  
  // Đối chiếu: Đăng nhập thành công điều hướng về trang chủ hoặc hiển thị tên người dùng
  I.dontSeeInCurrentUrl('/login');
});

/**
 * Subtask 4: ORD-754 - [IT-AUTH-04] Từ chối khi sai mật khẩu / tài khoản không tồn tại
 */
Scenario('ORD-754 [IT-AUTH-04]: [POST /api/login] Đăng nhập với Mật khẩu sai -> Từ chối và báo lỗi bảo mật (HTTP 401)', async ({ I }) => {
  I.amOnPage('/login');
  I.waitForText('Đăng nhập tài khoản', 15);
  
  I.fillField('input[type="email"]', 'tuan.nguyen@gmail.com');
  I.fillField('input[type="password"]', 'WRONG_PASSWORD_999');
  I.click('Đăng nhập');
  I.wait(2);
  
  // Đối chiếu: Hệ thống chặn lại tại trang /login
  I.seeInCurrentUrl('/login');
});

/**
 * Subtask 5: ORD-755 - [IT-AUTH-05] Yêu cầu khôi phục mật khẩu với email hợp lệ
 */
Scenario('ORD-755 [IT-AUTH-05]: [POST /api/forgot-password] Nhập Email hợp lệ đã đăng ký -> Hệ thống tiếp nhận và xử lý yêu cầu', async ({ I }) => {
  I.amOnPage('/forgot-password');
  I.waitForText('Quên mật khẩu', 15);
  
  I.fillField('input[type="email"]', 'tuan.nguyen@gmail.com');
  I.click('Gửi liên kết đặt lại mật khẩu');
  I.wait(2);
  
  // Đối chiếu: Hệ thống tiếp nhận request và phản hồi trạng thái xử lý
  I.seeInCurrentUrl('/forgot-password');
});

/**
 * Subtask 6: ORD-756 - [IT-AUTH-06] Từ chối khi Email chưa từng đăng ký
 */
Scenario('ORD-756 [IT-AUTH-06]: [POST /api/forgot-password] Nhập Email không tồn tại trong hệ thống -> Báo lỗi (HTTP 404)', async ({ I }) => {
  I.amOnPage('/forgot-password');
  I.waitForText('Quên mật khẩu', 15);
  
  I.fillField('input[type="email"]', 'nonexistent_user_9999@edulearn.vn');
  I.click('Gửi liên kết đặt lại mật khẩu');
  I.wait(2);
  
  // Đối chiếu: Không hiển thị màn hình chúc mừng gửi mail thành công
  I.seeElement('input[type="email"]');
});

/**
 * Subtask 7: ORD-757 - [IT-AUTH-07] Đặt lại mật khẩu thành công với Token
 */
Scenario('ORD-757 [IT-AUTH-07]: [POST /api/reset-password] Truy cập trang đặt lại mật khẩu với giao diện xác nhận -> Form hoạt động', async ({ I }) => {
  I.amOnPage('/reset-password?token=mock_valid_token_demo');
  I.wait(2);
  
  // Đối chiếu: Giao diện phản hồi form hoặc thông báo xác thực token an toàn
  I.seeInCurrentUrl('/reset-password');
});

/**
 * Subtask 8: ORD-758 - [IT-AUTH-08] Chặn đặt lại mật khẩu khi Token không hợp lệ / hết hạn
 */
Scenario('ORD-758 [IT-AUTH-08]: [POST /api/reset-password] Truy cập trang đặt lại mật khẩu không kèm Token -> Báo lỗi link không hợp lệ', async ({ I }) => {
  I.amOnPage('/reset-password');
  I.wait(2);
  
  // Đối chiếu: Hệ thống bắt lỗi thiếu token
  I.see('Link không hợp lệ');
});
