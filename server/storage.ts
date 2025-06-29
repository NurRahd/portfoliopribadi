import { db } from './db';
import { eq } from 'drizzle-orm';
import { 
  users, profile, skills, experiences, education, certifications, activities, articles, contactMessages, galleries, services, projects,
  type User, type InsertUser, type Profile, type InsertProfile, type Skill, type InsertSkill,
  type Experience, type InsertExperience, type Education, type InsertEducation,
  type Certification, type InsertCertification, type Activity, type InsertActivity,
  type Article, type InsertArticle, type ContactMessage, type InsertContactMessage,
  type Gallery, type InsertGallery, type Service, type InsertService,
  type Project, type InsertProject
} from "@shared/schema";

export class SqliteStorage {
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result[0];
  }
  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username));
    return result[0];
  }
  async createUser(user: InsertUser): Promise<User> {
    const [created] = await db.insert(users).values(user).returning();
    return created;
  }

  // Profile methods
  async getProfile(): Promise<Profile | undefined> {
    const result = await db.select().from(profile);
    return result[0];
  }
  async updateProfile(profileData: InsertProfile): Promise<Profile> {
    // Cek apakah profile sudah ada
    const existing = await db.select().from(profile);
    if (existing.length > 0) {
      // Update profile pertama
      const [updated] = await db.update(profile)
        .set(profileData)
        .where(eq(profile.id, existing[0].id))
        .returning();
      return updated;
    } else {
      // Insert baru jika belum ada
      const [created] = await db.insert(profile).values(profileData).returning();
      return created;
    }
  }

  // Skills methods
  async getSkills(): Promise<Skill[]> {
    return await db.select().from(skills);
  }
  async createSkill(skill: InsertSkill): Promise<Skill> {
    const [created] = await db.insert(skills).values(skill).returning();
    return created;
  }
  async updateSkill(id: number, skill: Partial<InsertSkill>): Promise<Skill | undefined> {
    const [updated] = await db.update(skills).set(skill).where(eq(skills.id, id)).returning();
    return updated;
  }
  async deleteSkill(id: number): Promise<boolean> {
    const result = await db.delete(skills).where(eq(skills.id, id));
    return result.rowsAffected > 0;
  }

  // Experience methods
  async getExperiences(): Promise<Experience[]> {
    return await db.select().from(experiences);
  }
  async createExperience(experience: InsertExperience): Promise<Experience> {
    const [created] = await db.insert(experiences).values(experience).returning();
    return created;
  }
  async updateExperience(id: number, experience: Partial<InsertExperience>): Promise<Experience | undefined> {
    const [updated] = await db.update(experiences).set(experience).where(eq(experiences.id, id)).returning();
    return updated;
  }
  async deleteExperience(id: number): Promise<boolean> {
    const result = await db.delete(experiences).where(eq(experiences.id, id));
    return result.rowsAffected > 0;
  }

  // Education methods
  async getEducation(): Promise<Education[]> {
    return await db.select().from(education);
  }
  async createEducation(edu: InsertEducation): Promise<Education> {
    const [created] = await db.insert(education).values(edu).returning();
    return created;
  }
  async updateEducation(id: number, edu: Partial<InsertEducation>): Promise<Education | undefined> {
    const [updated] = await db.update(education).set(edu).where(eq(education.id, id)).returning();
    return updated;
  }
  async deleteEducation(id: number): Promise<boolean> {
    const result = await db.delete(education).where(eq(education.id, id));
    return result.rowsAffected > 0;
  }

  // Certification methods
  async getCertifications(): Promise<Certification[]> {
    return await db.select().from(certifications);
  }
  async createCertification(cert: InsertCertification): Promise<Certification> {
    const [created] = await db.insert(certifications).values(cert).returning();
    return created;
  }
  async updateCertification(id: number, cert: Partial<InsertCertification>): Promise<Certification | undefined> {
    const [updated] = await db.update(certifications).set(cert).where(eq(certifications.id, id)).returning();
    return updated;
  }
  async deleteCertification(id: number): Promise<boolean> {
    const result = await db.delete(certifications).where(eq(certifications.id, id));
    return result.rowsAffected > 0;
  }

  // Activity methods
  async getActivities(): Promise<Activity[]> {
    return await db.select().from(activities);
  }
  async createActivity(activity: InsertActivity): Promise<Activity> {
    const [created] = await db.insert(activities).values(activity).returning();
    return created;
  }
  async updateActivity(id: number, activity: Partial<InsertActivity>): Promise<Activity | undefined> {
    const [updated] = await db.update(activities).set(activity).where(eq(activities.id, id)).returning();
    return updated;
  }
  async deleteActivity(id: number): Promise<boolean> {
    const result = await db.delete(activities).where(eq(activities.id, id));
    return result.rowsAffected > 0;
  }

  // Article methods
  async getArticles(): Promise<Article[]> {
    return await db.select().from(articles);
  }
  async getPublishedArticles(): Promise<Article[]> {
    return (await db.select().from(articles)).filter(a => a.published);
  }
  async getFeaturedArticles(): Promise<Article[]> {
    return (await db.select().from(articles)).filter(a => a.published && a.featured);
  }
  async getArticleBySlug(slug: string): Promise<Article | undefined> {
    const result = await db.select().from(articles).where(eq(articles.slug, slug));
    return result[0];
  }
  async createArticle(article: InsertArticle): Promise<Article> {
    const [created] = await db.insert(articles).values(article).returning();
    return created;
  }
  async updateArticle(id: number, article: Partial<InsertArticle>): Promise<Article | undefined> {
    const [updated] = await db.update(articles).set(article).where(eq(articles.id, id)).returning();
    return updated;
  }
  async deleteArticle(id: number): Promise<boolean> {
    const result = await db.delete(articles).where(eq(articles.id, id));
    return result.rowsAffected > 0;
  }

  // Contact message methods
  async getContactMessages(): Promise<ContactMessage[]> {
    return await db.select().from(contactMessages);
  }
  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    const [created] = await db.insert(contactMessages).values(message).returning();
    return created;
  }
  async markMessageAsRead(id: number): Promise<boolean> {
    const [updated] = await db.update(contactMessages).set({ read: true }).where(eq(contactMessages.id, id)).returning();
    return !!updated;
  }
  async deleteContactMessage(id: number): Promise<boolean> {
    const result = await db.delete(contactMessages).where(eq(contactMessages.id, id));
    return result.rowsAffected > 0;
  }

  // Gallery methods
  async getGalleries(): Promise<Gallery[]> {
    return await db.select().from(galleries);
  }
  async getGalleriesByCategory(category: string): Promise<Gallery[]> {
    return (await db.select().from(galleries)).filter(g => g.category === category);
  }
  async getFeaturedGalleries(): Promise<Gallery[]> {
    return (await db.select().from(galleries)).filter(g => g.featured);
  }
  async createGallery(gallery: InsertGallery): Promise<Gallery> {
    const [created] = await db.insert(galleries).values(gallery).returning();
    return created;
  }
  async updateGallery(id: number, gallery: Partial<InsertGallery>): Promise<Gallery | undefined> {
    const [updated] = await db.update(galleries).set(gallery).where(eq(galleries.id, id)).returning();
    return updated;
  }
  async deleteGallery(id: number): Promise<boolean> {
    const result = await db.delete(galleries).where(eq(galleries.id, id));
    return result.rowsAffected > 0;
  }

  // Service methods
  async getServices(): Promise<Service[]> {
    return await db.select().from(services);
  }
  async getServicesByCategory(category: string): Promise<Service[]> {
    return (await db.select().from(services)).filter(s => s.category === category);
  }
  async createService(service: InsertService): Promise<Service> {
    const [created] = await db.insert(services).values(service).returning();
    return created;
  }
  async updateService(id: number, service: Partial<InsertService>): Promise<Service | undefined> {
    const [updated] = await db.update(services).set(service).where(eq(services.id, id)).returning();
    return updated;
  }
  async deleteService(id: number): Promise<boolean> {
    const result = await db.delete(services).where(eq(services.id, id));
    return result.rowsAffected > 0;
  }

  // Project methods
  async getProjects(): Promise<Project[]> {
    return await db.select().from(projects);
  }
  async getProjectsByCategory(category: string): Promise<Project[]> {
    return (await db.select().from(projects)).filter(p => p.category === category);
  }
  async getFeaturedProjects(): Promise<Project[]> {
    return (await db.select().from(projects)).filter(p => p.featured);
  }
  async createProject(project: InsertProject): Promise<Project> {
    const [created] = await db.insert(projects).values(project).returning();
    return created;
  }
  async updateProject(id: number, project: Partial<InsertProject>): Promise<Project | undefined> {
    const [updated] = await db.update(projects).set(project).where(eq(projects.id, id)).returning();
    return updated;
  }
  async deleteProject(id: number): Promise<boolean> {
    const result = await db.delete(projects).where(eq(projects.id, id));
    return result.rowsAffected > 0;
  }
}

export const storage = new SqliteStorage();
