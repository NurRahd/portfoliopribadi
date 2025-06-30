var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// server/db.ts
import "dotenv/config";
import mysql from "mysql2/promise";
import { drizzle } from "drizzle-orm/mysql2";

// shared/schema.ts
var schema_exports = {};
__export(schema_exports, {
  activities: () => activities,
  articles: () => articles,
  certifications: () => certifications,
  contactMessages: () => contactMessages,
  education: () => education,
  experiences: () => experiences,
  galleries: () => galleries,
  insertActivitySchema: () => insertActivitySchema,
  insertArticleSchema: () => insertArticleSchema,
  insertCertificationSchema: () => insertCertificationSchema,
  insertContactMessageSchema: () => insertContactMessageSchema,
  insertEducationSchema: () => insertEducationSchema,
  insertExperienceSchema: () => insertExperienceSchema,
  insertGallerySchema: () => insertGallerySchema,
  insertProfileSchema: () => insertProfileSchema,
  insertProjectSchema: () => insertProjectSchema,
  insertServiceSchema: () => insertServiceSchema,
  insertSkillSchema: () => insertSkillSchema,
  insertUserSchema: () => insertUserSchema,
  profile: () => profile,
  projects: () => projects,
  services: () => services,
  skills: () => skills,
  users: () => users
});
import { mysqlTable, varchar, int, text, timestamp, tinyint } from "drizzle-orm/mysql-core";
import { createInsertSchema } from "drizzle-zod";
var users = mysqlTable("users", {
  id: int("id").primaryKey().autoincrement(),
  username: varchar("username", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull()
});
var profile = mysqlTable("profile", {
  id: int("id").primaryKey().autoincrement(),
  fullName: varchar("full_name", { length: 255 }).notNull(),
  position: varchar("position", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 255 }),
  location: varchar("location", { length: 255 }),
  bio: text("bio"),
  age: int("age"),
  linkedinUrl: varchar("linkedin_url", { length: 255 }),
  githubUrl: varchar("github_url", { length: 255 }),
  twitterUrl: varchar("twitter_url", { length: 255 }),
  instagramUrl: varchar("instagram_url", { length: 255 }),
  youtubeUrl: varchar("youtube_url", { length: 255 }),
  photoUrl: varchar("photo_url", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
var skills = mysqlTable("skills", {
  id: int("id").primaryKey().autoincrement(),
  name: varchar("name", { length: 255 }).notNull(),
  category: varchar("category", { length: 255 }).notNull(),
  proficiency: int("proficiency").notNull(),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow()
});
var experiences = mysqlTable("experiences", {
  id: int("id").primaryKey().autoincrement(),
  title: varchar("title", { length: 255 }).notNull(),
  company: varchar("company", { length: 255 }).notNull(),
  startDate: varchar("start_date", { length: 255 }).notNull(),
  endDate: varchar("end_date", { length: 255 }),
  description: text("description"),
  technologies: text("technologies"),
  createdAt: timestamp("created_at").defaultNow()
});
var education = mysqlTable("education", {
  id: int("id").primaryKey().autoincrement(),
  degree: varchar("degree", { length: 255 }).notNull(),
  institution: varchar("institution", { length: 255 }).notNull(),
  year: varchar("year", { length: 255 }).notNull(),
  description: text("description"),
  gpa: varchar("gpa", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow()
});
var certifications = mysqlTable("certifications", {
  id: int("id").primaryKey().autoincrement(),
  name: varchar("name", { length: 255 }).notNull(),
  issuer: varchar("issuer", { length: 255 }).notNull(),
  year: varchar("year", { length: 255 }).notNull(),
  credentialUrl: varchar("credential_url", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow()
});
var activities = mysqlTable("activities", {
  id: int("id").primaryKey().autoincrement(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  icon: varchar("icon", { length: 255 }).notNull(),
  color: varchar("color", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow()
});
var galleries = mysqlTable("galleries", {
  id: int("id").primaryKey().autoincrement(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  imageUrl: varchar("image_url", { length: 255 }).notNull(),
  category: varchar("category", { length: 255 }).notNull(),
  featured: tinyint("featured").default(0),
  tags: text("tags"),
  createdAt: timestamp("created_at").defaultNow()
});
var services = mysqlTable("services", {
  id: int("id").primaryKey().autoincrement(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  icon: varchar("icon", { length: 255 }).notNull(),
  category: varchar("category", { length: 255 }).notNull(),
  price: varchar("price", { length: 255 }),
  features: text("features"),
  createdAt: timestamp("created_at").defaultNow()
});
var projects = mysqlTable("projects", {
  id: int("id").primaryKey().autoincrement(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  imageUrl: varchar("image_url", { length: 255 }),
  category: varchar("category", { length: 255 }).notNull(),
  technologies: text("technologies"),
  projectUrl: varchar("project_url", { length: 255 }),
  githubUrl: varchar("github_url", { length: 255 }),
  featured: tinyint("featured").default(0),
  createdAt: timestamp("created_at").defaultNow()
});
var articles = mysqlTable("articles", {
  id: int("id").primaryKey().autoincrement(),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  category: varchar("category", { length: 255 }).notNull(),
  readTime: int("read_time").notNull(),
  imageUrl: varchar("image_url", { length: 255 }),
  published: tinyint("published").default(0),
  featured: tinyint("featured").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
var contactMessages = mysqlTable("contact_messages", {
  id: int("id").primaryKey().autoincrement(),
  firstName: varchar("first_name", { length: 255 }).notNull(),
  lastName: varchar("last_name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  subject: varchar("subject", { length: 255 }).notNull(),
  message: text("message").notNull(),
  read: tinyint("read").default(0),
  createdAt: timestamp("created_at").defaultNow()
});
var insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true
});
var insertProfileSchema = createInsertSchema(profile).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});
var insertSkillSchema = createInsertSchema(skills).omit({
  id: true,
  createdAt: true
});
var insertExperienceSchema = createInsertSchema(experiences).omit({
  id: true,
  createdAt: true
});
var insertEducationSchema = createInsertSchema(education).omit({
  id: true,
  createdAt: true
});
var insertCertificationSchema = createInsertSchema(certifications).omit({
  id: true,
  createdAt: true
});
var insertActivitySchema = createInsertSchema(activities).omit({
  id: true,
  createdAt: true
});
var insertArticleSchema = createInsertSchema(articles).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});
var insertContactMessageSchema = createInsertSchema(contactMessages).omit({
  id: true,
  read: true,
  createdAt: true
});
var insertGallerySchema = createInsertSchema(galleries).omit({
  id: true,
  createdAt: true
});
var insertServiceSchema = createInsertSchema(services).omit({
  id: true,
  createdAt: true
});
var insertProjectSchema = createInsertSchema(projects).omit({
  id: true,
  createdAt: true
});

// server/db.ts
var pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "",
  database: process.env.DB_NAME || "portfolio",
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});
var db = drizzle(pool, { schema: schema_exports, mode: "default" });

// server/storage.ts
import { eq } from "drizzle-orm";
var SqliteStorage = class {
  // User methods
  async getUser(id) {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result[0];
  }
  async getUserByUsername(username) {
    const result = await db.select().from(users).where(eq(users.username, username));
    return result[0];
  }
  async createUser(user) {
    const [created] = await db.insert(users).values(user).returning();
    return created;
  }
  // Profile methods
  async getProfile() {
    const result = await db.select().from(profile);
    return result[0];
  }
  async updateProfile(profileData) {
    const existing = await db.select().from(profile);
    if (existing.length > 0) {
      const [updated] = await db.update(profile).set(profileData).where(eq(profile.id, existing[0].id)).returning();
      return updated;
    } else {
      const [created] = await db.insert(profile).values(profileData).returning();
      return created;
    }
  }
  // Skills methods
  async getSkills() {
    return await db.select().from(skills);
  }
  async createSkill(skill) {
    const [created] = await db.insert(skills).values(skill).returning();
    return created;
  }
  async updateSkill(id, skill) {
    const [updated] = await db.update(skills).set(skill).where(eq(skills.id, id)).returning();
    return updated;
  }
  async deleteSkill(id) {
    const result = await db.delete(skills).where(eq(skills.id, id));
    return result.rowsAffected > 0;
  }
  // Experience methods
  async getExperiences() {
    return await db.select().from(experiences);
  }
  async createExperience(experience) {
    const [created] = await db.insert(experiences).values(experience).returning();
    return created;
  }
  async updateExperience(id, experience) {
    const [updated] = await db.update(experiences).set(experience).where(eq(experiences.id, id)).returning();
    return updated;
  }
  async deleteExperience(id) {
    const result = await db.delete(experiences).where(eq(experiences.id, id));
    return result.rowsAffected > 0;
  }
  // Education methods
  async getEducation() {
    return await db.select().from(education);
  }
  async createEducation(edu) {
    const [created] = await db.insert(education).values(edu).returning();
    return created;
  }
  async updateEducation(id, edu) {
    const [updated] = await db.update(education).set(edu).where(eq(education.id, id)).returning();
    return updated;
  }
  async deleteEducation(id) {
    const result = await db.delete(education).where(eq(education.id, id));
    return result.rowsAffected > 0;
  }
  // Certification methods
  async getCertifications() {
    return await db.select().from(certifications);
  }
  async createCertification(cert) {
    const [created] = await db.insert(certifications).values(cert).returning();
    return created;
  }
  async updateCertification(id, cert) {
    const [updated] = await db.update(certifications).set(cert).where(eq(certifications.id, id)).returning();
    return updated;
  }
  async deleteCertification(id) {
    const result = await db.delete(certifications).where(eq(certifications.id, id));
    return result.rowsAffected > 0;
  }
  // Activity methods
  async getActivities() {
    return await db.select().from(activities);
  }
  async createActivity(activity) {
    const [created] = await db.insert(activities).values(activity).returning();
    return created;
  }
  async updateActivity(id, activity) {
    const [updated] = await db.update(activities).set(activity).where(eq(activities.id, id)).returning();
    return updated;
  }
  async deleteActivity(id) {
    const result = await db.delete(activities).where(eq(activities.id, id));
    return result.rowsAffected > 0;
  }
  // Article methods
  async getArticles() {
    return await db.select().from(articles);
  }
  async getPublishedArticles() {
    return (await db.select().from(articles)).filter((a) => a.published);
  }
  async getFeaturedArticles() {
    return (await db.select().from(articles)).filter((a) => a.published && a.featured);
  }
  async getArticleBySlug(slug) {
    const result = await db.select().from(articles).where(eq(articles.slug, slug));
    return result[0];
  }
  async createArticle(article) {
    const [created] = await db.insert(articles).values(article).returning();
    return created;
  }
  async updateArticle(id, article) {
    const [updated] = await db.update(articles).set(article).where(eq(articles.id, id)).returning();
    return updated;
  }
  async deleteArticle(id) {
    const result = await db.delete(articles).where(eq(articles.id, id));
    return result.rowsAffected > 0;
  }
  // Contact message methods
  async getContactMessages() {
    return await db.select().from(contactMessages);
  }
  async createContactMessage(message) {
    const [created] = await db.insert(contactMessages).values(message).returning();
    return created;
  }
  async markMessageAsRead(id) {
    const [updated] = await db.update(contactMessages).set({ read: true }).where(eq(contactMessages.id, id)).returning();
    return !!updated;
  }
  async deleteContactMessage(id) {
    const result = await db.delete(contactMessages).where(eq(contactMessages.id, id));
    return result.rowsAffected > 0;
  }
  // Gallery methods
  async getGalleries() {
    return await db.select().from(galleries);
  }
  async getGalleriesByCategory(category) {
    return (await db.select().from(galleries)).filter((g) => g.category === category);
  }
  async getFeaturedGalleries() {
    return (await db.select().from(galleries)).filter((g) => g.featured);
  }
  async createGallery(gallery) {
    const [created] = await db.insert(galleries).values(gallery).returning();
    return created;
  }
  async updateGallery(id, gallery) {
    const [updated] = await db.update(galleries).set(gallery).where(eq(galleries.id, id)).returning();
    return updated;
  }
  async deleteGallery(id) {
    const result = await db.delete(galleries).where(eq(galleries.id, id));
    return result.rowsAffected > 0;
  }
  // Service methods
  async getServices() {
    return await db.select().from(services);
  }
  async getServicesByCategory(category) {
    return (await db.select().from(services)).filter((s) => s.category === category);
  }
  async createService(service) {
    const [created] = await db.insert(services).values(service).returning();
    return created;
  }
  async updateService(id, service) {
    const [updated] = await db.update(services).set(service).where(eq(services.id, id)).returning();
    return updated;
  }
  async deleteService(id) {
    const result = await db.delete(services).where(eq(services.id, id));
    return result.rowsAffected > 0;
  }
  // Project methods
  async getProjects() {
    return await db.select().from(projects);
  }
  async getProjectsByCategory(category) {
    return (await db.select().from(projects)).filter((p) => p.category === category);
  }
  async getFeaturedProjects() {
    return (await db.select().from(projects)).filter((p) => p.featured);
  }
  async createProject(project) {
    const [created] = await db.insert(projects).values(project).returning();
    return created;
  }
  async updateProject(id, project) {
    const [updated] = await db.update(projects).set(project).where(eq(projects.id, id)).returning();
    return updated;
  }
  async deleteProject(id) {
    const result = await db.delete(projects).where(eq(projects.id, id));
    return result.rowsAffected > 0;
  }
};
var storage = new SqliteStorage();

// server/routes.ts
import path from "path";
import fs from "fs";
import multer from "multer";
console.log("ROUTES LOADED");
var uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
var storageMulter = multer({ dest: uploadDir });
async function registerRoutes(app2) {
  app2.get("/api/profile", async (req, res) => {
    try {
      const profile2 = await storage.getProfile();
      res.json(profile2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch profile" });
    }
  });
  app2.put("/api/profile", async (req, res) => {
    try {
      const profileData = insertProfileSchema.parse(req.body);
      const profile2 = await storage.updateProfile(profileData);
      res.json(profile2);
    } catch (error) {
      res.status(400).json({ message: "Invalid profile data" });
    }
  });
  app2.get("/api/skills", async (req, res) => {
    try {
      const skills2 = await storage.getSkills();
      res.json(skills2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch skills" });
    }
  });
  app2.post("/api/skills", async (req, res) => {
    try {
      const skillData = insertSkillSchema.parse(req.body);
      const skill = await storage.createSkill(skillData);
      res.json(skill);
    } catch (error) {
      res.status(400).json({ message: "Invalid skill data" });
    }
  });
  app2.put("/api/skills/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const skillData = insertSkillSchema.partial().parse(req.body);
      const skill = await storage.updateSkill(id, skillData);
      if (skill) {
        res.json(skill);
      } else {
        res.status(404).json({ message: "Skill not found" });
      }
    } catch (error) {
      console.error("Skill update error:", error);
      res.status(400).json({ message: "Invalid skill data", detail: error instanceof Error ? error.message : error });
    }
  });
  app2.delete("/api/skills/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteSkill(id);
      if (deleted) {
        res.json({ message: "Skill deleted successfully" });
      } else {
        res.status(404).json({ message: "Skill not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to delete skill" });
    }
  });
  app2.get("/api/experiences", async (req, res) => {
    try {
      const experiences2 = await storage.getExperiences();
      res.json(experiences2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch experiences" });
    }
  });
  app2.post("/api/experiences", async (req, res) => {
    try {
      const experienceData = insertExperienceSchema.parse(req.body);
      const experience = await storage.createExperience(experienceData);
      res.json(experience);
    } catch (error) {
      res.status(400).json({ message: "Invalid experience data" });
    }
  });
  app2.put("/api/experiences/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const experienceData = insertExperienceSchema.partial().parse(req.body);
      const experience = await storage.updateExperience(id, experienceData);
      if (experience) {
        res.json(experience);
      } else {
        res.status(404).json({ message: "Experience not found" });
      }
    } catch (error) {
      res.status(400).json({ message: "Invalid experience data" });
    }
  });
  app2.delete("/api/experiences/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteExperience(id);
      if (deleted) {
        res.json({ message: "Experience deleted successfully" });
      } else {
        res.status(404).json({ message: "Experience not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to delete experience" });
    }
  });
  app2.get("/api/education", async (req, res) => {
    try {
      const education2 = await storage.getEducation();
      res.json(education2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch education" });
    }
  });
  app2.post("/api/education", async (req, res) => {
    try {
      const educationData = insertEducationSchema.parse(req.body);
      const education2 = await storage.createEducation(educationData);
      res.json(education2);
    } catch (error) {
      res.status(400).json({ message: "Invalid education data" });
    }
  });
  app2.put("/api/education/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const educationData = insertEducationSchema.partial().parse(req.body);
      const education2 = await storage.updateEducation(id, educationData);
      if (education2) {
        res.json(education2);
      } else {
        res.status(404).json({ message: "Education not found" });
      }
    } catch (error) {
      res.status(400).json({ message: "Invalid education data" });
    }
  });
  app2.delete("/api/education/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteEducation(id);
      if (deleted) {
        res.json({ message: "Education deleted successfully" });
      } else {
        res.status(404).json({ message: "Education not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to delete education" });
    }
  });
  app2.get("/api/certifications", async (req, res) => {
    try {
      const certifications2 = await storage.getCertifications();
      res.json(certifications2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch certifications" });
    }
  });
  app2.post("/api/certifications", async (req, res) => {
    try {
      const certificationData = insertCertificationSchema.parse(req.body);
      const certification = await storage.createCertification(certificationData);
      res.json(certification);
    } catch (error) {
      res.status(400).json({ message: "Invalid certification data" });
    }
  });
  app2.put("/api/certifications/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const certificationData = insertCertificationSchema.partial().parse(req.body);
      const certification = await storage.updateCertification(id, certificationData);
      if (certification) {
        res.json(certification);
      } else {
        res.status(404).json({ message: "Certification not found" });
      }
    } catch (error) {
      res.status(400).json({ message: "Invalid certification data" });
    }
  });
  app2.delete("/api/certifications/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteCertification(id);
      if (deleted) {
        res.json({ message: "Certification deleted successfully" });
      } else {
        res.status(404).json({ message: "Certification not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to delete certification" });
    }
  });
  app2.get("/api/activities", async (req, res) => {
    try {
      const activities2 = await storage.getActivities();
      res.json(activities2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch activities" });
    }
  });
  app2.post("/api/activities", async (req, res) => {
    try {
      const activityData = insertActivitySchema.parse(req.body);
      const activity = await storage.createActivity(activityData);
      res.json(activity);
    } catch (error) {
      res.status(400).json({ message: "Invalid activity data" });
    }
  });
  app2.put("/api/activities/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const activityData = insertActivitySchema.partial().parse(req.body);
      const activity = await storage.updateActivity(id, activityData);
      if (activity) {
        res.json(activity);
      } else {
        res.status(404).json({ message: "Activity not found" });
      }
    } catch (error) {
      res.status(400).json({ message: "Invalid activity data" });
    }
  });
  app2.delete("/api/activities/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteActivity(id);
      if (deleted) {
        res.json({ message: "Activity deleted successfully" });
      } else {
        res.status(404).json({ message: "Activity not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to delete activity" });
    }
  });
  app2.get("/api/articles", async (req, res) => {
    try {
      const published = req.query.published === "true";
      const featured = req.query.featured === "true";
      let articles2;
      if (featured) {
        articles2 = await storage.getFeaturedArticles();
      } else if (published) {
        articles2 = await storage.getPublishedArticles();
      } else {
        articles2 = await storage.getArticles();
      }
      res.json(articles2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch articles" });
    }
  });
  app2.get("/api/articles/:slug", async (req, res) => {
    try {
      const article = await storage.getArticleBySlug(req.params.slug);
      if (article) {
        res.json(article);
      } else {
        res.status(404).json({ message: "Article not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch article" });
    }
  });
  app2.post("/api/articles", async (req, res) => {
    try {
      const articleData = insertArticleSchema.parse(req.body);
      const article = await storage.createArticle(articleData);
      res.json(article);
    } catch (error) {
      res.status(400).json({ message: "Invalid article data" });
    }
  });
  app2.put("/api/articles/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const articleData = insertArticleSchema.partial().parse(req.body);
      const article = await storage.updateArticle(id, articleData);
      if (article) {
        res.json(article);
      } else {
        res.status(404).json({ message: "Article not found" });
      }
    } catch (error) {
      res.status(400).json({ message: "Invalid article data" });
    }
  });
  app2.delete("/api/articles/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteArticle(id);
      if (deleted) {
        res.json({ message: "Article deleted successfully" });
      } else {
        res.status(404).json({ message: "Article not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to delete article" });
    }
  });
  app2.get("/api/contact-messages", async (req, res) => {
    try {
      const messages = await storage.getContactMessages();
      res.json(messages);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch contact messages" });
    }
  });
  app2.post("/api/contact-messages", async (req, res) => {
    try {
      console.log("Contact message received:", req.body);
      const messageData = insertContactMessageSchema.parse(req.body);
      const message = await storage.createContactMessage(messageData);
      res.json(message);
    } catch (error) {
      console.error("Contact message error:", error);
      res.status(400).json({ message: "Invalid message data" });
    }
  });
  app2.put("/api/contact-messages/:id/read", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const marked = await storage.markMessageAsRead(id);
      if (marked) {
        res.json({ message: "Message marked as read" });
      } else {
        res.status(404).json({ message: "Message not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to mark message as read" });
    }
  });
  app2.delete("/api/contact-messages/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteContactMessage(id);
      if (deleted) {
        res.json({ message: "Message deleted successfully" });
      } else {
        res.status(404).json({ message: "Message not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to delete message" });
    }
  });
  app2.get("/api/galleries", async (req, res) => {
    try {
      const category = req.query.category;
      const featured = req.query.featured === "true";
      let galleries2;
      if (featured) {
        galleries2 = await storage.getFeaturedGalleries();
      } else if (category) {
        galleries2 = await storage.getGalleriesByCategory(category);
      } else {
        galleries2 = await storage.getGalleries();
      }
      res.json(galleries2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch galleries" });
    }
  });
  app2.post("/api/galleries", async (req, res) => {
    try {
      const galleryData = insertGallerySchema.parse(req.body);
      const gallery = await storage.createGallery(galleryData);
      res.json(gallery);
    } catch (error) {
      res.status(400).json({ message: "Invalid gallery data" });
    }
  });
  app2.put("/api/galleries/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const galleryData = insertGallerySchema.partial().parse(req.body);
      const gallery = await storage.updateGallery(id, galleryData);
      if (gallery) {
        res.json(gallery);
      } else {
        res.status(404).json({ message: "Gallery not found" });
      }
    } catch (error) {
      res.status(400).json({ message: "Invalid gallery data" });
    }
  });
  app2.delete("/api/galleries/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteGallery(id);
      if (deleted) {
        res.json({ message: "Gallery deleted successfully" });
      } else {
        res.status(404).json({ message: "Gallery not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to delete gallery" });
    }
  });
  app2.get("/api/services", async (req, res) => {
    try {
      const category = req.query.category;
      let services2;
      if (category) {
        services2 = await storage.getServicesByCategory(category);
      } else {
        services2 = await storage.getServices();
      }
      res.json(services2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch services" });
    }
  });
  app2.post("/api/services", async (req, res) => {
    try {
      const serviceData = insertServiceSchema.parse(req.body);
      const service = await storage.createService(serviceData);
      res.json(service);
    } catch (error) {
      res.status(400).json({ message: "Invalid service data" });
    }
  });
  app2.put("/api/services/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const serviceData = insertServiceSchema.partial().parse(req.body);
      const service = await storage.updateService(id, serviceData);
      if (service) {
        res.json(service);
      } else {
        res.status(404).json({ message: "Service not found" });
      }
    } catch (error) {
      res.status(400).json({ message: "Invalid service data" });
    }
  });
  app2.delete("/api/services/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteService(id);
      if (deleted) {
        res.json({ message: "Service deleted successfully" });
      } else {
        res.status(404).json({ message: "Service not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to delete service" });
    }
  });
  app2.get("/api/projects", async (req, res) => {
    try {
      const category = req.query.category;
      const featured = req.query.featured === "true";
      let projects2;
      if (featured) {
        projects2 = await storage.getFeaturedProjects();
      } else if (category) {
        projects2 = await storage.getProjectsByCategory(category);
      } else {
        projects2 = await storage.getProjects();
      }
      res.json(projects2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch projects" });
    }
  });
  app2.post("/api/projects", async (req, res) => {
    try {
      const projectData = insertProjectSchema.parse(req.body);
      const project = await storage.createProject(projectData);
      res.json(project);
    } catch (error) {
      res.status(400).json({ message: "Invalid project data" });
    }
  });
  app2.put("/api/projects/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const projectData = insertProjectSchema.partial().parse(req.body);
      const project = await storage.updateProject(id, projectData);
      if (project) {
        res.json(project);
      } else {
        res.status(404).json({ message: "Project not found" });
      }
    } catch (error) {
      res.status(400).json({ message: "Invalid project data" });
    }
  });
  app2.delete("/api/projects/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteProject(id);
      if (deleted) {
        res.json({ message: "Project deleted successfully" });
      } else {
        res.status(404).json({ message: "Project not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to delete project" });
    }
  });
  app2.post("/api/upload/profile-photo", storageMulter.single("file"), (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    const ext = path.extname(req.file.originalname);
    const newFilename = req.file.filename + ext;
    const newPath = path.join(uploadDir, newFilename);
    fs.renameSync(req.file.path, newPath);
    const fileUrl = `/uploads/${newFilename}`;
    res.json({ url: fileUrl });
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs2 from "fs";
import path3 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// client/vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path2 from "path";
import { fileURLToPath } from "url";
var __filename = fileURLToPath(import.meta.url);
var __dirname = path2.dirname(__filename);
var vite_config_default = defineConfig({
  plugins: [
    react()
  ],
  resolve: {
    alias: {
      "@": path2.resolve(__dirname, "src"),
      "@shared": path2.resolve(__dirname, "..", "shared"),
      "@assets": path2.resolve(__dirname, "..", "attached_assets")
    }
  },
  build: {
    outDir: path2.resolve(__dirname, "..", "dist/public"),
    emptyOutDir: true
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"]
    }
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path3.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs2.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}

// server/index.ts
import path4 from "path";
import { fileURLToPath as fileURLToPath2 } from "url";
var __filename2 = fileURLToPath2(import.meta.url);
var __dirname2 = path4.dirname(__filename2);
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path5 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path5.startsWith("/api")) {
      let logLine = `${req.method} ${path5} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    app.use(express2.static(path4.join(__dirname2, "public")));
    app.get("*", (req, res) => {
      res.sendFile(path4.join(__dirname2, "public/index.html"));
    });
  }
  const port = process.env.PORT || 5001;
  server.listen(port, () => {
    log(`serving on port ${port}`);
  });
})();
