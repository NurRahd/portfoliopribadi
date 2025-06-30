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

export class MySqlStorage {
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
      await db.update(profile)
        .set(profileData)
        .where(eq(profile.id, existing[0].id));
      // Ambil data profile terbaru
      const updated = await db.select().from(profile).where(eq(profile.id, existing[0].id));
      return updated[0];
    } else {
      // Insert baru jika belum ada
      const [created] = await db.insert(profile).values(profileData);
      return created;
    }
  }

  // Skills methods
  async getSkills(): Promise<Skill[]> {
    return await db.select().from(skills);
  }
  async createSkill(skill: InsertSkill): Promise<Skill> {
    await db.insert(skills).values(skill);
    const result = await db.select().from(skills).orderBy(skills.id);
    return result[result.length - 1];
  }
  async updateSkill(id: number, skill: Partial<InsertSkill>): Promise<Skill | undefined> {
    await db.update(skills).set(skill).where(eq(skills.id, id));
    const result = await db.select().from(skills).where(eq(skills.id, id));
    return result[0];
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
    await db.insert(experiences).values(experience);
    const result = await db.select().from(experiences).orderBy(experiences.id);
    return result[result.length - 1];
  }
  async updateExperience(id: number, experience: Partial<InsertExperience>): Promise<Experience | undefined> {
    await db.update(experiences).set(experience).where(eq(experiences.id, id));
    const result = await db.select().from(experiences).where(eq(experiences.id, id));
    return result[0];
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
    await db.insert(education).values(edu);
    const result = await db.select().from(education).orderBy(education.id);
    return result[result.length - 1];
  }
  async updateEducation(id: number, edu: Partial<InsertEducation>): Promise<Education | undefined> {
    await db.update(education).set(edu).where(eq(education.id, id));
    const result = await db.select().from(education).where(eq(education.id, id));
    return result[0];
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
    await db.insert(certifications).values(cert);
    const result = await db.select().from(certifications).orderBy(certifications.id);
    return result[result.length - 1];
  }
  async updateCertification(id: number, cert: Partial<InsertCertification>): Promise<Certification | undefined> {
    await db.update(certifications).set(cert).where(eq(certifications.id, id));
    const result = await db.select().from(certifications).where(eq(certifications.id, id));
    return result[0];
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
    await db.insert(activities).values(activity);
    const result = await db.select().from(activities).orderBy(activities.id);
    return result[result.length - 1];
  }
  async updateActivity(id: number, activity: Partial<InsertActivity>): Promise<Activity | undefined> {
    await db.update(activities).set(activity).where(eq(activities.id, id));
    const result = await db.select().from(activities).where(eq(activities.id, id));
    return result[0];
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
    await db.insert(articles).values(article);
    const result = await db.select().from(articles).orderBy(articles.id);
    return result[result.length - 1];
  }
  async updateArticle(id: number, article: Partial<InsertArticle>): Promise<Article | undefined> {
    await db.update(articles).set(article).where(eq(articles.id, id));
    const result = await db.select().from(articles).where(eq(articles.id, id));
    return result[0];
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
    await db.insert(contactMessages).values(message);
    const result = await db.select().from(contactMessages).orderBy(contactMessages.id);
    return result[result.length - 1];
  }
  async markMessageAsRead(id: number): Promise<boolean> {
    await db.update(contactMessages).set({ read: true }).where(eq(contactMessages.id, id));
    return true;
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
    await db.insert(galleries).values(gallery);
    const result = await db.select().from(galleries).orderBy(galleries.id);
    return result[result.length - 1];
  }
  async updateGallery(id: number, gallery: Partial<InsertGallery>): Promise<Gallery | undefined> {
    await db.update(galleries).set(gallery).where(eq(galleries.id, id));
    const result = await db.select().from(galleries).where(eq(galleries.id, id));
    return result[0];
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
    await db.insert(services).values(service);
    const result = await db.select().from(services).orderBy(services.id);
    return result[result.length - 1];
  }
  async updateService(id: number, service: Partial<InsertService>): Promise<Service | undefined> {
    await db.update(services).set(service).where(eq(services.id, id));
    const result = await db.select().from(services).where(eq(services.id, id));
    return result[0];
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
    await db.insert(projects).values(project);
    const result = await db.select().from(projects).orderBy(projects.id);
    return result[result.length - 1];
  }
  async updateProject(id: number, project: Partial<InsertProject>): Promise<Project | undefined> {
    await db.update(projects).set(project).where(eq(projects.id, id));
    const result = await db.select().from(projects).where(eq(projects.id, id));
    return result[0];
  }
  async deleteProject(id: number): Promise<boolean> {
    const result = await db.delete(projects).where(eq(projects.id, id));
    return result.rowsAffected > 0;
  }
}

export const storage = new MySqlStorage();
