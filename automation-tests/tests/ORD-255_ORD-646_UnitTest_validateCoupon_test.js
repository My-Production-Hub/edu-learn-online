/**
 * ==============================================================================
 * 🏷️ BỘ KIỂM THỬ GIAO DIỆN XÁC THỰC MÃ GIẢM GIÁ (CODECEPTJS E2E UI)
 * ==============================================================================
 * 📌 Story Jira: ORD-255 - [STORY 3.1] Phân hệ Mã giảm giá
 * 📌 Subtask: ORD-646 - Kiểm thử giao diện Xác thực & Áp dụng Coupon tại Checkout
 * 🎯 Công cụ: CodeceptJS + Playwright (Trình duyệt tự động hóa)
 * 🔐 Tài khoản kiểm thử: tuan.nguyen@gmail.com / user123
 * ==============================================================================
 */

Feature('ORD-646: [Kiểm thử giao diện] Xác thực & Áp dụng Mã giảm giá (Coupon Checkout Validation Flow)');

/**
 * Helper: Đăng nhập tài khoản Học viên hợp lệ trong CSDL
 */
const loginAsStudent = (I) => {
  I.amOnPage('/login');
  I.waitForText('Đăng nhập tài khoản', 10);
  I.fillField('input[type="email"]', 'tuan.nguyen@gmail.com');
  I.fillField('input[type="password"]', 'user123');
  I.click('Đăng nhập');
  I.wait(3);
};

/**
 * Kịch bản 1: [UI-01] Học viên vào trang Thanh toán và hiển thị mục Chọn Voucher
 */
Scenario('ORD-646 [UI-01]: Học viên vào trang Checkout -> Hiển thị nút "Chọn voucher giảm giá"', async ({ I }) => {
  loginAsStudent(I);
  I.amOnPage('/courses/course-1');
  I.waitForText('Mua ngay', 15);
  I.click('Mua ngay');
  I.waitInUrl('/checkout?buynow=true', 10);
  I.waitForText('Chọn voucher giảm giá', 15);
  I.see('Chọn voucher giảm giá');
});

/**
 * Kịch bản 2: [UI-02] Mở modal/panel Voucher và kiểm tra form nhập mã thủ công
 */
Scenario('ORD-646 [UI-02]: Mở panel Voucher -> Hiển thị form "Nhập mã thủ công"', async ({ I }) => {
  loginAsStudent(I);
  I.amOnPage('/courses/course-1');
  I.waitForText('Mua ngay', 15);
  I.click('Mua ngay');
  I.waitInUrl('/checkout?buynow=true', 10);
  I.waitForText('Chọn voucher giảm giá', 15);
  I.click('Chọn voucher giảm giá');
  I.waitForText('Nhập mã thủ công', 15);
  I.see('Nhập mã thủ công');
  I.seeElement('input[placeholder="Nhập mã giảm giá..."]');
  I.see('Áp dụng');
});

/**
 * Kịch bản 3: [UI-03] Nhập mã giảm giá không tồn tại và kiểm tra thông báo phản hồi
 */
Scenario('ORD-646 [UI-03]: Nhập mã giảm giá không hợp lệ -> Hệ thống xử lý phản hồi phù hợp', async ({ I }) => {
  loginAsStudent(I);
  I.amOnPage('/courses/course-1');
  I.waitForText('Mua ngay', 15);
  I.click('Mua ngay');
  I.waitInUrl('/checkout?buynow=true', 10);
  I.waitForText('Chọn voucher giảm giá', 15);
  I.click('Chọn voucher giảm giá');
  I.waitForText('Nhập mã thủ công', 15);
  I.fillField('input[placeholder="Nhập mã giảm giá..."]', 'INVALID_TEST_CODE');
  I.click('Áp dụng');
  I.wait(2);
  // Đối chiếu: Hệ thống hiển thị thông báo lỗi
  I.see('❌');
});

/**
 * Kịch bản 4: [UI-04] Đóng mở panel Voucher linh hoạt
 */
Scenario('ORD-646 [UI-04]: Đóng và mở lại panel Voucher trên giao diện Checkout', async ({ I }) => {
  loginAsStudent(I);
  I.amOnPage('/courses/course-1');
  I.waitForText('Mua ngay', 15);
  I.click('Mua ngay');
  I.waitInUrl('/checkout?buynow=true', 10);
  I.waitForText('Chọn voucher giảm giá', 15);
  // Mở panel
  I.click('Chọn voucher giảm giá');
  I.waitForText('Nhập mã thủ công', 15);
  I.see('Nhập mã thủ công');
  // Đóng panel
  I.click('Chọn voucher giảm giá');
  I.wait(1);
});
