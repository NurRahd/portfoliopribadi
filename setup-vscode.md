
# Setup Portfolio di VS Code

## 🚀 Quick Start Guide

### 1. Prerequisites
- Node.js 20+ ([Download](https://nodejs.org))
- VS Code ([Download](https://code.visualstudio.com))
- Git (opsional)

### 2. Download & Setup Project
```bash
# Extract ZIP file atau clone repo
cd portfolio-project

# Install dependencies
npm install
```

### 3. Setup Database (Pilih salah satu)

#### Option A: Cloud Database (Recommended - Gratis)
1. Daftar di [Neon.tech](https://neon.tech) (gratis)
2. Buat database baru
3. Copy connection string
4. Buat file `.env`:
```env
DATABASE_URL="postgresql://user:pass@host:5432/dbname?sslmode=require"
NODE_ENV=development
```

#### Option B: Local PostgreSQL
1. Install PostgreSQL di Windows
2. Buat database: `createdb portfolio_db`
3. Buat file `.env`:
```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/portfolio_db"
NODE_ENV=development
```

### 4. Initialize Database
```bash
npm run db:push
```

### 5. Start Development
```bash
npm run dev
```

### 6. Open Browser
- Portfolio: http://localhost:5000
- Admin Panel: http://localhost:5000/admin

## ✅ Troubleshooting

### Port 5000 sudah digunakan?
Edit `server/index.ts` line 58:
```typescript
const port = 3000; // ganti dari 5000
```

### Database connection error?
- Check format DATABASE_URL
- Pastikan PostgreSQL running (jika local)
- Test connection di admin panel

### Windows Command Prompt Error?
✅ Sudah fixed dengan `cross-env`

## 📁 Project Structure
```
portfolio-project/
├── client/          # React frontend
├── server/          # Express backend
├── shared/          # Database schema
├── .env            # Environment variables
└── package.json    # Dependencies
```

## 🎯 Next Steps
1. Edit profil di `/admin`
2. Customize design sesuai keinginan
3. Deploy ke Replit untuk presentasi
