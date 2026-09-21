# EduLearn Operations Guide (Hướng dẫn Vận hành Hệ thống)

> **Tài liệu tham chiếu chi tiết:** [06-operations-guide.md](./vi/developer/06-operations-guide.md)

---

## 1. Quick Start (Khởi chạy hệ thống với Persistent Volumes)

Cấu hình `docker-compose.yml` đã được thiết lập sẵn các **Persistent Volumes** kết nối trực tiếp CSDL (`database.sqlite`), thư mục media (`uploads/`) và thư mục sao lưu (`backups/`) giữa máy chủ host và container:

```yaml
version: '3.8'

services:
  backend:
    build:
      context: ./edu-learn-project/backend
      dockerfile: Dockerfile
    ports:
      - "5000:5000"
    environment:
      - PORT=5000
      - JWT_SECRET=edulearn-secret-key-2024
      - FRONTEND_URL=http://localhost:3000
    volumes:
      - ./edu-learn-project/backend/database.sqlite:/app/database.sqlite
      - ./edu-learn-project/backend/uploads:/app/uploads
      - ./backups:/app/backups
    restart: always

  frontend:
    build:
      context: ./edu-learn-project/frontend
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_API_URL=http://localhost:5000/api
    depends_on:
      - backend
    restart: always
```

```bash
# Khởi chạy toàn bộ dịch vụ (Frontend, Backend, Database)
docker compose up -d --build

# Kiểm tra trạng thái và log vận hành
docker compose ps
docker compose logs -f
```

---

## 2. Sao lưu CSDL Chuẩn (Online Safe Backup)

Thực hiện sao lưu trực tiếp từ container đang chạy mà không gây khóa cơ sở dữ liệu và tự động ghi ra thư mục `./backups/` trên máy host:

> **Yêu cầu cài đặt:** Cài đặt công cụ SQLite CLI trên máy host: `sudo apt-get install -y sqlite3` (hoặc chạy kiểm tra trực tiếp qua Node.js/Docker).

```bash
# Tạo thư mục lưu trữ backup trên host nếu chưa có
mkdir -p ./backups

# 1. Thực hiện Online Backup an toàn bằng VACUUM INTO
docker compose exec backend node -e "
const { getDatabase } = require('./db.js');
(async () => {
  const db = await getDatabase();
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupFile = '/app/backups/backup_' + timestamp + '.sqlite';
  await db.run(\`VACUUM INTO '\${backupFile}'\`);
  console.log('✅ Online Backup created successfully:', backupFile);
  process.exit(0);
})().catch(err => { console.error('❌ Backup failed:', err); process.exit(1); });
"

# 2. Kiểm tra tính toàn vẹn (Integrity Check) của bản backup vừa tạo
LATEST_BACKUP=$(ls -t ./backups/*.sqlite | head -n 1)
sqlite3 "$LATEST_BACKUP" "PRAGMA integrity_check;"

# 3. Sao lưu thư mục tệp tin tải lên (uploads) đúng đường dẫn
tar -czvf ./backups/uploads_$(date +%Y%m%d_%H%M%S).tar.gz -C ./edu-learn-project/backend uploads
```

---

## 3. Khôi phục CSDL (Verified Restore)

Khi xảy ra sự cố hỏng dữ liệu, thực hiện phục hồi theo các bước kiểm soát sau:

```bash
# 1. Tạm dừng Backend container
docker compose stop backend

# 2. Tạo bản sao lưu dự phòng cho database hiện tại trước khi khôi phục
cp ./edu-learn-project/backend/database.sqlite ./edu-learn-project/backend/database.sqlite.bak.$(date +%s)

# 3. Khôi phục file SQLite từ bản Backup đã được kiểm tra tính toàn vẹn
cp ./backups/backup_CHOOSE_DATE.sqlite ./edu-learn-project/backend/database.sqlite

# 4. Kiểm tra tính toàn vẹn file sau khi copy
sqlite3 ./edu-learn-project/backend/database.sqlite "PRAGMA integrity_check;"

# 5. Khôi phục thư mục uploads (giải nén đúng vào thư mục backend)
tar -xzvf ./backups/uploads_CHOOSE_DATE.tar.gz -C ./edu-learn-project/backend/

# 6. Khởi động lại Backend và kiểm tra log
docker compose start backend
docker compose logs -f backend
```

---

## 4. Quy trình Hoàn tác Phiên bản (Rollback Procedure)

> **LƯU Ý QUAN TRỌNG:** Tuyệt đối **không** chạy `docker compose up -d --build` trước khi thực hiện bước sao lưu dữ liệu hiện tại (`database.sqlite` & `uploads/`) ra thư mục an toàn!

```bash
# 1. Sao lưu snapshot toàn bộ dữ liệu hiện tại trước khi rollback
TS=$(date +%Y%m%d_%H%M%S)
mkdir -p ./backups/pre-rollback-$TS
cp ./edu-learn-project/backend/database.sqlite ./backups/pre-rollback-$TS/
cp -r ./edu-learn-project/backend/uploads ./backups/pre-rollback-$TS/

# 2. Quay lại phiên bản mã nguồn ổn định đã được kiểm thử
git checkout <STABLE_COMMIT_HASH>

# 3. Re-build container với persistent volumes được bảo toàn
docker compose up -d --build
```

---

## 5. Xử lý sự cố (Troubleshooting)

* **SQLite Database Locked**: Kiểm tra WAL mode bằng `PRAGMA journal_mode=WAL;`.
* **CORS Error**: Kiểm tra biến `FRONTEND_URL` trong file cấu hình môi trường của Backend.
* **Uploads Permission**: Cấp quyền ghi `chmod -R 755 ./edu-learn-project/backend/uploads`.
