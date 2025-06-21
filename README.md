
# Portfolio Website - Local Development Setup

## Prerequisites
- Node.js 20+
- PostgreSQL database
- VS Code (recommended)

## Setup Instructions

1. **Clone/Download the project**
2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Setup environment variables:**
   - Copy `.env.example` to `.env`
   - Update `DATABASE_URL` with your PostgreSQL connection string

4. **Setup database:**
   ```bash
   npm run db:push
   ```

5. **Start development server:**
   ```bash
   npm run dev
   ```

6. **Access the application:**
   - Open http://localhost:5000 in your browser
   - Admin panel: http://localhost:5000/admin

## Database Options

### Option 1: Local PostgreSQL
```
DATABASE_URL="postgresql://postgres:password@localhost:5432/portfolio"
```

### Option 2: Cloud Database (Neon/Supabase)
```
DATABASE_URL="postgresql://user:pass@host:5432/dbname?sslmode=require"
```

## Troubleshooting

- **Port already in use:** Change port in server/index.ts
- **Database connection error:** Check DATABASE_URL and ensure PostgreSQL is running
- **Module not found:** Run `npm install` again

## Project Structure
- `/client` - React frontend
- `/server` - Express backend
- `/shared` - Shared types and schema
- Database schema in `/shared/schema.ts`
