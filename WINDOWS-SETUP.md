
# Setup di Windows - VS Code

## 🚀 Langkah-langkah Cepat

### 1. Download & Extract
- Extract file ZIP ke folder baru
- Buka folder di VS Code

### 2. Install Dependencies
Buka terminal di VS Code (`Ctrl+` ` ) dan jalankan:
```bash
npm run setup
```

### 3. Setup Database
**Pilihan A: Cloud Database (Mudah)**
1. Buka [neon.tech](https://neon.tech)
2. Buat akun gratis
3. Buat database baru
4. Copy connection string
5. Rename `.env.example` jadi `.env`
6. Paste connection string di `DATABASE_URL`

**Pilihan B: Local PostgreSQL**
1. Download PostgreSQL dari postgresql.org
2. Install dengan password yang mudah diingat
3. Rename `.env.example` jadi `.env`
4. Update `DATABASE_URL` dengan password Anda

### 4. Jalankan Aplikasi
```bash
npm run dev
```

**ATAU double-click file `start-vscode.bat`**

### 5. Buka Browser
- Portfolio: http://localhost:5000
- Admin: http://localhost:5000/admin

## ⚡ Quick Commands

```bash
# Start development server
npm run dev

# Setup database tables
npm run db:push

# Check database (browser-based)
npm run db:studio

# Clean install
npm run clean
```

## 🔧 VS Code Tips

1. Install recommended extensions (VS Code akan suggest otomatis)
2. Gunakan `Ctrl+` ` untuk buka terminal
3. Hot reload aktif - edit file langsung terlihat
4. TypeScript auto-completion untuk database

## 🎯 Edit Portfolio

1. Buka http://localhost:5000/admin
2. Login: admin/admin
3. Edit semua data pribadi
4. Refresh portfolio untuk lihat perubahan

Portfolio siap untuk tugas IMK! 🚀
