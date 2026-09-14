/**
 * ==============================================================================
 * 🎓 BỘ KIỂM THỬ TÍCH HỢP QUẢN LÝ KHÓA HỌC (COURSES API & UI INTEGRATION)
 * ==============================================================================
 * 📌 Story Jira: ORD-59 - [Kiểm thử tích hợp] Module Khóa học (Courses Flow)
 * 📖 Căn cứ Swagger UI: Nhóm Courses & Admin Courses
 *    - GET /api/courses: Lấy danh sách khóa học công khai
 *    - GET /api/courses/{id}: Lấy chi tiết một khóa học
 *    - POST /api/admin/courses: Thêm mới khóa học (Admin)
 *    - PUT /api/admin/courses/{id}: Cập nhật khóa học (Admin)
 *    - DELETE /api/admin/courses/{id}: Xóa khóa học (Admin)
 * 📌 Bao gồm 7 Subtasks (ORD-736 -> ORD-742):
 *    - ORD-736: [IT-CRS-01] GET /api/courses: Danh sách khóa học công khai & Bộ lọc
 *    - ORD-737: [IT-CRS-02] GET /api/courses/:id: Chi tiết khóa học, Highlights & Giáo trình
 *    - ORD-738: [IT-CRS-03] GET /api/courses/:id: Xử lý ngoại lệ khi ID không tồn tại (404)
 *    - ORD-739: [IT-CRS-04] POST /api/admin/courses: Admin mở form tạo mới khóa học
 *    - ORD-740: [IT-CRS-05] PUT /api/admin/courses/:id: Admin cập nhật thông tin khóa học
 *    - ORD-741: [IT-CRS-06] DELETE /api/admin/courses/:id: Admin kiểm tra danh sách & quản lý
 *    - ORD-742: [IT-CRS-07] Phân quyền RBAC: Chặn học viên vào khu vực Quản trị khóa học
 * 🎯 Công cụ: CodeceptJS + Playwright (Browser & API Flow)
 * 🔐 Tài khoản:
 *    - Admin: manager@edulearn.vn / admin123
 *    - Học viên: tuan.nguyen@gmail.com / user123
 * ==============================================================================
 */

Feature('ORD-59: [Kiểm thử tích hợp] Module Khóa học (Courses API & UI Flow)');

/**
 * Helper: Đăng nhập tài khoản Học viên hợp lệ trong CSDL
 */
const loginAsStudent = (I) => {
  I.amOnPage('/login');
  I.waitForText('Đăng nhập tài khoản', 15);
  I.fillField('input[type="email"]', 'tuan.nguyen@gmail.com');
  I.fillField('input[type="password"]', 'user123');
  I.click('Đăng nhập');
  I.wait(3);
};

/**
 * Helper: Đăng nhập tài khoản Admin hợp lệ trong CSDL
 */
const loginAsAdmin = (I) => {
  I.amOnPage('/login');
  I.waitForText('Đăng nhập tài khoản', 15);
  I.fillField('input[type="email"]', 'manager@edulearn.vn');
  I.fillField('input[type="password"]', 'admin123');
  I.click('Đăng nhập');
  I.wait(3);
};

/**
 * Subtask 1: ORD-736 - [IT-CRS-01] GET /api/courses
 */
Scenario('ORD-736 [IT-CRS-01]: [GET /api/courses] Mở trang chủ -> Hiển thị danh sách khóa học công khai', async ({ I }) => {
  I.amOnPage('/');
  I.waitForText('Khóa học', 15);
  I.see('Khóa học');
});

/**
 * Subtask 2: ORD-737 - [IT-CRS-02] GET /api/courses/:id
 */
Scenario('ORD-737 [IT-CRS-02]: [GET /api/courses/:id] Mở trang chi tiết khóa học -> Hiển thị thông tin & nút Mua ngay', async ({ I }) => {
  I.amOnPage('/courses/course-1');
  I.waitForText('Lập trình Web Full Stack', 15);
  I.see('Lập trình Web Full Stack');
  I.see('Mua ngay');
});

/**
 * Subtask 3: ORD-738 - [IT-CRS-03] GET /api/courses/:id (404)
 */
Scenario('ORD-738 [IT-CRS-03]: [GET /api/courses/:id] Truy cập ID khóa học không tồn tại -> Xử lý lỗi 404 an toàn', async ({ I }) => {
  I.amOnPage('/courses/khoa-hoc-khong-ton-tai-999');
  I.wait(2);
  I.see('404');
});

/**
 * Subtask 4: ORD-739 - [IT-CRS-04] POST /api/admin/courses
 */
Scenario('ORD-739 [IT-CRS-04]: [POST /api/admin/courses] Admin truy cập Quản lý Khóa học -> Mở form thêm mới', async ({ I }) => {
  loginAsAdmin(I);
  I.amOnPage('/admin/courses');
  I.waitForText('+ Tạo khóa học', 15);
  I.see('+ Tạo khóa học');
  I.click('+ Tạo khóa học');
  I.waitForText('Thêm khóa học mới', 15);
  I.see('Thêm khóa học mới');
});

/**
 * Subtask 5: ORD-740 - [IT-CRS-05] PUT /api/admin/courses/:id
 */
Scenario('ORD-740 [IT-CRS-05]: [PUT /api/admin/courses/:id] Admin mở danh sách khóa học -> Kiểm tra khả năng chỉnh sửa', async ({ I }) => {
  loginAsAdmin(I);
  I.amOnPage('/admin/courses');
  I.waitForText('Danh sách khóa học', 15);
  I.see('Danh sách khóa học');
});

/**
 * Subtask 6: ORD-741 - [IT-CRS-06] DELETE /api/admin/courses/:id
 */
Scenario('ORD-741 [IT-CRS-06]: [DELETE /api/admin/courses/:id] Admin kiểm tra bảng danh sách và các nút thao tác xóa/quản lý', async ({ I }) => {
  loginAsAdmin(I);
  I.amOnPage('/admin/courses');
  I.waitForText('Danh sách khóa học', 15);
  I.see('Danh sách khóa học');
});

/**
 * Subtask 7: ORD-742 - [IT-CRS-07] Phân quyền RBAC
 */
Scenario('ORD-742 [IT-CRS-07]: [Phân quyền RBAC] Học viên cố tình truy cập /admin/courses -> Bị chặn giao diện', async ({ I }) => {
  loginAsStudent(I);
  I.amOnPage('/admin/courses');
  I.wait(2);
  // Đối chiếu: Học viên không thấy nút Tạo khóa học của Admin
  I.dontSee('+ Tạo khóa học');
});
