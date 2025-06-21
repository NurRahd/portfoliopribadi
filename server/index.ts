
import express from "express";
import session from "express-session";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import { registerVite } from "./vite";
import { registerRoutes } from "./routes";

const app = express();
const port = process.env.PORT || 5000;

// Database setup
const pool = mysql.createPool({
  uri: process.env.DATABASE_URL!,
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
});

export const db = drizzle(pool);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET || "your-secret-key",
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === "production",
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

app.use(passport.initialize());
app.use(passport.session());

// Passport configuration
passport.use(new LocalStrategy(
  async (username: string, password: string, done) => {
    // Simple authentication - replace with proper password hashing
    if (username === "admin" && password === "password") {
      return done(null, { id: 1, username: "admin" });
    }
    return done(null, false);
  }
));

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser((id: number, done) => {
  done(null, { id, username: "admin" });
});

registerRoutes(app);
registerVite(app);

const server = app.listen(port, "0.0.0.0", () => {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [express] serving on port ${port}`);
});

server.on("error", (error: Error) => {
  if (error.message.includes("EADDRINUSE")) {
    console.log(`Port ${port} is in use. Please use a different port.`);
  } else {
    console.log("Server error:", error.message);
  }
});
