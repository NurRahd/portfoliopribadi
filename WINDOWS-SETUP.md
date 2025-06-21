
# Setup Portfolio dengan MySQL di Windows

## Prerequisites
1. **MySQL Server** - Download dan install dari [mysql.com](https://dev.mysql.com/downloads/mysql/)
2. **Node.js 20+** - Download dari [nodejs.org](https://nodejs.org/)
3. **VS Code** (recommended)

## Langkah Setup MySQL

### 1. Install MySQL Server
- Download MySQL Community Server
- Jalankan installer dan ikuti wizard setup
- **Penting:** Catat username dan password root MySQL

### 2. Buat Database Portfolio
Buka **MySQL Command Line Client** atau **MySQL Workbench**:

```sql
-- Login sebagai root
mysql -u root -p

-- Buat database baru
CREATE DATABASE portfolio;

-- Buat user baru (opsional tapi recommended)
CREATE USER 'portfolio_user'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON portfolio.* TO 'portfolio_user'@'localhost';
FLUSH PRIVILEGES;

-- Gunakan database
USE portfolio;
```

### 3. Setup Project
1. **Extract project ke folder baru**
2. **Buka VS Code dan open folder tersebut**
3. **Install dependencies:**
   ```bash
   npm install
   ```

### 4. Setup Environment Variables
1. **Copy `.env.example` menjadi `.env`**
2. **Update `DATABASE_URL` di file `.env`:**
   ```
   # Jika menggunakan root user
   DATABASE_URL="mysql://root:your_mysql_password@localhost:3306/portfolio"
   
   # Atau jika menggunakan user khusus
   DATABASE_URL="mysql://portfolio_user:your_password@localhost:3306/portfolio"
   ```

### 5. Setup Database Tables
```bash
npm run db:push
```

### 6. Start Development Server
```bash
npm run dev
```

### 7. Akses Portfolio
- **Website:** http://localhost:5000
- **Admin Panel:** http://localhost:5000/admin
- **Login Admin:** username: `admin`, password: `password`

## Commands Berguna

```bash
# Install dependencies
npm install

# Setup database tables
npm run db:push

# Start development
npm run dev

# View database (browser-based)
npm run db:studio

# Clean install
npm run clean
```

## Troubleshooting

### Error "Access denied for user"
- Pastikan username/password MySQL benar di `.env`
- Pastikan MySQL service berjalan di Windows Services

### Error "connect ECONNREFUSED"
- Pastikan MySQL server berjalan
- Check port 3306 tidak diblokir firewall

### Error "Unknown database 'portfolio'"
- Pastikan sudah membuat database `portfolio` di MySQL

### Port 5000 sudah digunakan
- Ubah `PORT=5001` di file `.env`
- Atau matikan aplikasi lain yang menggunakan port 5000

## Tips
- Gunakan **MySQL Workbench** untuk management database yang lebih mudah
- Backup database secara berkala untuk keamanan data
- Pastikan MySQL service start otomatis di Windows startup
