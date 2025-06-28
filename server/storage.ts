import { 
  users, profile, skills, experiences, education, certifications, activities, articles, contactMessages, galleries, services,
  type User, type InsertUser, type Profile, type InsertProfile, type Skill, type InsertSkill,
  type Experience, type InsertExperience, type Education, type InsertEducation,
  type Certification, type InsertCertification, type Activity, type InsertActivity,
  type Article, type InsertArticle, type ContactMessage, type InsertContactMessage,
  type Gallery, type InsertGallery, type Service, type InsertService
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Profile methods
  getProfile(): Promise<Profile | undefined>;
  updateProfile(profileData: InsertProfile): Promise<Profile>;

  // Skills methods
  getSkills(): Promise<Skill[]>;
  createSkill(skill: InsertSkill): Promise<Skill>;
  updateSkill(id: number, skill: Partial<InsertSkill>): Promise<Skill | undefined>;
  deleteSkill(id: number): Promise<boolean>;

  // Experience methods
  getExperiences(): Promise<Experience[]>;
  createExperience(experience: InsertExperience): Promise<Experience>;
  updateExperience(id: number, experience: Partial<InsertExperience>): Promise<Experience | undefined>;
  deleteExperience(id: number): Promise<boolean>;

  // Education methods
  getEducation(): Promise<Education[]>;
  createEducation(education: InsertEducation): Promise<Education>;
  updateEducation(id: number, education: Partial<InsertEducation>): Promise<Education | undefined>;
  deleteEducation(id: number): Promise<boolean>;

  // Certification methods
  getCertifications(): Promise<Certification[]>;
  createCertification(certification: InsertCertification): Promise<Certification>;
  updateCertification(id: number, certification: Partial<InsertCertification>): Promise<Certification | undefined>;
  deleteCertification(id: number): Promise<boolean>;

  // Activity methods
  getActivities(): Promise<Activity[]>;
  createActivity(activity: InsertActivity): Promise<Activity>;
  updateActivity(id: number, activity: Partial<InsertActivity>): Promise<Activity | undefined>;
  deleteActivity(id: number): Promise<boolean>;

  // Article methods
  getArticles(): Promise<Article[]>;
  getPublishedArticles(): Promise<Article[]>;
  getFeaturedArticles(): Promise<Article[]>;
  getArticleBySlug(slug: string): Promise<Article | undefined>;
  createArticle(article: InsertArticle): Promise<Article>;
  updateArticle(id: number, article: Partial<InsertArticle>): Promise<Article | undefined>;
  deleteArticle(id: number): Promise<boolean>;

  // Contact message methods
  getContactMessages(): Promise<ContactMessage[]>;
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  markMessageAsRead(id: number): Promise<boolean>;
  deleteContactMessage(id: number): Promise<boolean>;

  // Gallery methods
  getGalleries(): Promise<Gallery[]>;
  getGalleriesByCategory(category: string): Promise<Gallery[]>;
  getFeaturedGalleries(): Promise<Gallery[]>;
  createGallery(gallery: InsertGallery): Promise<Gallery>;
  updateGallery(id: number, gallery: Partial<InsertGallery>): Promise<Gallery | undefined>;
  deleteGallery(id: number): Promise<boolean>;

  // Service methods
  getServices(): Promise<Service[]>;
  getServicesByCategory(category: string): Promise<Service[]>;
  createService(service: InsertService): Promise<Service>;
  updateService(id: number, service: Partial<InsertService>): Promise<Service | undefined>;
  deleteService(id: number): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User> = new Map();
  private profiles: Map<number, Profile> = new Map();
  private skills: Map<number, Skill> = new Map();
  private experiences: Map<number, Experience> = new Map();
  private educations: Map<number, Education> = new Map();
  private certifications: Map<number, Certification> = new Map();
  private activities: Map<number, Activity> = new Map();
  private articles: Map<number, Article> = new Map();
  private contactMessages: Map<number, ContactMessage> = new Map();
  private galleries: Map<number, Gallery> = new Map();
  private services: Map<number, Service> = new Map();
  
  private currentUserId = 1;
  private currentProfileId = 1;
  private currentSkillId = 1;
  private currentExperienceId = 1;
  private currentEducationId = 1;
  private currentCertificationId = 1;
  private currentActivityId = 1;
  private currentArticleId = 1;
  private currentContactMessageId = 1;
  private currentGalleryId = 1;
  private currentServiceId = 1;

  constructor() {
    this.seedData();
  }

  private seedData() {
    // Seed profile
    const profileData: Profile = {
      id: 1,
      fullName: "Alex Chen",
      position: "Professional Photographer & IT Developer",
      email: "alex.chen@photodev.com",
      phone: "+62 812-3456-7890",
      location: "Bali, Indonesia",
      bio: "Saya adalah fotografer profesional dengan passion di bidang teknologi. Dengan pengalaman 6+ tahun dalam fotografi dan 4+ tahun dalam pengembangan web, saya menggabungkan kreativitas visual dengan keahlian teknis untuk menciptakan solusi digital yang memukau. Spesialisasi saya meliputi portrait photography, landscape, dan event photography, serta pengembangan aplikasi web modern.",
      age: 29,
      linkedinUrl: "https://linkedin.com/in/alexchen",
      githubUrl: "https://github.com/alexchen",
      twitterUrl: "https://twitter.com/alexchen_photo",
      instagramUrl: "https://instagram.com/alexchen.photo",
      youtubeUrl: "https://youtube.com/@alexchenphoto",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.profiles.set(1, profileData);

    // Seed skills
    const skillsData: Skill[] = [
      { id: 1, name: "Portrait Photography", category: "Photography", proficiency: 95, description: "Studio lighting, natural light, posing direction", createdAt: new Date() },
      { id: 2, name: "Landscape Photography", category: "Photography", proficiency: 90, description: "Golden hour, long exposure, composition", createdAt: new Date() },
      { id: 3, name: "Photo Editing", category: "Photography", proficiency: 92, description: "Adobe Lightroom, Photoshop, color grading", createdAt: new Date() },
      { id: 4, name: "React.js", category: "Frontend Development", proficiency: 85, description: "Modern React, TypeScript, responsive design", createdAt: new Date() },
      { id: 5, name: "Node.js", category: "Backend Development", proficiency: 80, description: "Express.js, API development, database integration", createdAt: new Date() },
      { id: 6, name: "Event Photography", category: "Photography", proficiency: 88, description: "Wedding, corporate events, candid moments", createdAt: new Date() },
      { id: 7, name: "UI/UX Design", category: "Design", proficiency: 75, description: "Figma, user-centered design, wireframing", createdAt: new Date() },
      { id: 8, name: "Commercial Photography", category: "Photography", proficiency: 85, description: "Product photography, brand imagery, marketing content", createdAt: new Date() },
    ];
    skillsData.forEach(skill => this.skills.set(skill.id, skill));
    this.currentSkillId = 7;

    // Seed experiences
    const experiencesData: Experience[] = [
      {
        id: 1,
        title: "Professional Photographer & Full Stack Developer",
        company: "Freelance",
        startDate: "2022",
        endDate: null,
        description: "Menjalankan bisnis fotografi profesional sambil mengembangkan aplikasi web custom untuk klien. Melayani 50+ klien fotografi dan menyelesaikan 20+ proyek web development. Mengkhususkan diri pada portrait, landscape, dan event photography.",
        technologies: ["Photography", "React", "Node.js", "MongoDB"],
        createdAt: new Date()
      },
      {
        id: 2,
        title: "Lead Photographer",
        company: "Bali Wedding Studio",
        startDate: "2020",
        endDate: "2022",
        description: "Memimpin tim fotografer untuk wedding dan event besar. Menangani 100+ wedding shoots dengan rating kepuasan klien 98%. Mengembangkan sistem booking online untuk studio menggunakan React dan Express.",
        technologies: ["Wedding Photography", "Event Photography", "React", "Express.js"],
        createdAt: new Date()
      },
      {
        id: 3,
        title: "Web Developer & Photo Editor",
        company: "Creative Digital Agency",
        startDate: "2019",
        endDate: "2020",
        description: "Menggabungkan keahlian programming dan photo editing. Mengembangkan website portfolio untuk fotografer dan melakukan post-processing untuk konten marketing. Meningkatkan workflow editing hingga 60% lebih efisien.",
        technologies: ["JavaScript", "Photoshop", "Lightroom", "WordPress"],
        createdAt: new Date()
      }
    ];
    experiencesData.forEach(exp => this.experiences.set(exp.id, exp));
    this.currentExperienceId = 4;

    // Seed education
    const educationData: Education[] = [
      {
        id: 1,
        degree: "Computer Science",
        institution: "University of Indonesia",
        year: "2015 - 2019",
        description: "Focused on software engineering, data structures, algorithms, and web development. Final project: E-commerce platform with AI recommendations.",
        gpa: "3.8/4.0",
        createdAt: new Date()
      }
    ];
    educationData.forEach(edu => this.educations.set(edu.id, edu));
    this.currentEducationId = 2;

    // Seed certifications
    const certificationsData: Certification[] = [
      { id: 1, name: "AWS Certified Developer", issuer: "Amazon Web Services", year: "2023", credentialUrl: "", createdAt: new Date() },
      { id: 2, name: "Google Cloud Professional", issuer: "Google Cloud", year: "2022", credentialUrl: "", createdAt: new Date() },
      { id: 3, name: "React Advanced Patterns", issuer: "React Training", year: "2022", credentialUrl: "", createdAt: new Date() },
      { id: 4, name: "Scrum Master Certified", issuer: "Scrum Alliance", year: "2021", credentialUrl: "", createdAt: new Date() },
    ];
    certificationsData.forEach(cert => this.certifications.set(cert.id, cert));
    this.currentCertificationId = 5;

    // Seed activities
    const activitiesData: Activity[] = [
      { id: 1, title: "Tech Meetup Speaker", description: "Regular speaker at local tech meetups, sharing knowledge about modern web development and best practices.", icon: "fas fa-users", color: "blue", createdAt: new Date() },
      { id: 2, title: "Open Source Contributor", description: "Active contributor to open source projects with over 50 contributions on GitHub and maintainer of 3 libraries.", icon: "fas fa-code", color: "green", createdAt: new Date() },
      { id: 3, title: "Coding Mentor", description: "Volunteer mentor for coding bootcamps, helping aspiring developers learn programming fundamentals.", icon: "fas fa-chalkboard-teacher", color: "purple", createdAt: new Date() },
      { id: 4, title: "Photography", description: "Passionate about landscape and street photography, which helps develop my eye for design and composition.", icon: "fas fa-camera", color: "red", createdAt: new Date() },
      { id: 5, title: "Hiking & Travel", description: "Love exploring nature and new places, which provides fresh perspectives and inspiration for creative work.", icon: "fas fa-mountain", color: "yellow", createdAt: new Date() },
      { id: 6, title: "Tech Blogging", description: "Write technical articles about web development trends, tutorials, and industry insights with 10K+ monthly readers.", icon: "fas fa-book", color: "indigo", createdAt: new Date() },
    ];
    activitiesData.forEach(activity => this.activities.set(activity.id, activity));
    this.currentActivityId = 7;

    // Seed articles
    const articlesData: Article[] = [
      {
        id: 1,
        title: "The Future of Web Development: Trends to Watch in 2024",
        slug: "future-web-development-2024",
        excerpt: "Exploring emerging technologies, frameworks, and methodologies that will shape the next generation of web applications.",
        content: "Full article content here...",
        category: "Technology",
        readTime: 8,
        imageUrl: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        published: true,
        featured: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        title: "Advanced React Hooks: Custom Hooks for Better Code Reusability",
        slug: "advanced-react-hooks-custom",
        excerpt: "Learn how to create custom hooks that encapsulate complex logic and improve code maintainability in your React applications.",
        content: "Full article content here...",
        category: "React",
        readTime: 6,
        imageUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        published: true,
        featured: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        title: "Design Systems: Building Consistent User Interfaces at Scale",
        slug: "design-systems-consistent-ui",
        excerpt: "A comprehensive guide to creating and maintaining design systems that ensure consistency across large product teams.",
        content: "Full article content here...",
        category: "Design",
        readTime: 10,
        imageUrl: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        published: true,
        featured: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
    articlesData.forEach(article => this.articles.set(article.id, article));
    this.currentArticleId = 4;

    // Seed galleries
    const galleriesData: Gallery[] = [
      {
        id: 1,
        title: "Golden Hour Portrait Session",
        description: "Intimate portrait session during golden hour with natural lighting",
        imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1000",
        category: "portrait",
        featured: true,
        tags: ["portrait", "golden hour", "natural light"],
        createdAt: new Date()
      },
      {
        id: 2,
        title: "Bali Rice Terrace Landscape",
        description: "Stunning sunrise over the iconic Jatiluwih rice terraces in Bali",
        imageUrl: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        category: "landscape",
        featured: true,
        tags: ["landscape", "bali", "rice terrace", "sunrise"],
        createdAt: new Date()
      },
      {
        id: 3,
        title: "Wedding Ceremony Moment",
        description: "Emotional wedding ceremony capture with perfect timing",
        imageUrl: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        category: "event",
        featured: false,
        tags: ["wedding", "ceremony", "emotion"],
        createdAt: new Date()
      },
      {
        id: 4,
        title: "Product Photography Setup",
        description: "Commercial product photography with professional lighting setup",
        imageUrl: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        category: "commercial",
        featured: false,
        tags: ["product", "commercial", "studio"],
        createdAt: new Date()
      },
      {
        id: 5,
        title: "Couple Beach Session",
        description: "Romantic beach engagement session at sunset",
        imageUrl: "https://images.unsplash.com/photo-1529903106fce-89f48aea7dd5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        category: "portrait",
        featured: false,
        tags: ["couple", "beach", "engagement", "sunset"],
        createdAt: new Date()
      },
      {
        id: 6,
        title: "Mountain Vista",
        description: "Dramatic mountain landscape with morning mist",
        imageUrl: "https://images.unsplash.com/photo-1464822759844-d150ad6d1dff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        category: "landscape",
        featured: false,
        tags: ["mountain", "mist", "dramatic", "morning"],
        createdAt: new Date()
      }
    ];
    galleriesData.forEach(gallery => this.galleries.set(gallery.id, gallery));
    this.currentGalleryId = 7;

    // Seed services
    const servicesData: Service[] = [
      {
        id: 1,
        title: "Portrait Photography",
        description: "Professional portrait sessions for individuals, families, and couples",
        icon: "fas fa-user-circle",
        category: "photography",
        price: "Starting from Rp 1,500,000",
        features: ["2-3 hour session", "50+ edited photos", "Online gallery", "Print release"],
        createdAt: new Date()
      },
      {
        id: 2,
        title: "Wedding Photography",
        description: "Complete wedding day coverage with artistic storytelling approach",
        icon: "fas fa-heart",
        category: "photography", 
        price: "Starting from Rp 8,000,000",
        features: ["8-12 hour coverage", "500+ edited photos", "Online gallery", "Wedding album", "Engagement session"],
        createdAt: new Date()
      },
      {
        id: 3,
        title: "Event Photography",
        description: "Corporate events, parties, and special occasions documentation",
        icon: "fas fa-calendar-alt",
        category: "photography",
        price: "Starting from Rp 2,500,000",
        features: ["4-8 hour coverage", "100+ edited photos", "Same day preview", "Online gallery"],
        createdAt: new Date()
      },
      {
        id: 4,
        title: "Commercial Photography",
        description: "Product, brand, and marketing photography for businesses",
        icon: "fas fa-briefcase",
        category: "photography",
        price: "Starting from Rp 3,000,000",
        features: ["Studio or location", "Professional lighting", "Post-processing", "Commercial license"],
        createdAt: new Date()
      },
      {
        id: 5,
        title: "Custom Web Development",
        description: "Full-stack web application development tailored to your needs",
        icon: "fas fa-code",
        category: "development",
        price: "Starting from Rp 15,000,000",
        features: ["Modern React/Next.js", "Responsive design", "Database integration", "SEO optimization", "6 months support"],
        createdAt: new Date()
      },
      {
        id: 6,
        title: "Photography Portfolio Website",
        description: "Custom portfolio websites designed specifically for photographers",
        icon: "fas fa-camera",
        category: "development",
        price: "Starting from Rp 8,000,000",
        features: ["Gallery management", "Client portal", "Booking system", "Mobile optimized", "SEO ready"],
        createdAt: new Date()
      }
    ];
    servicesData.forEach(service => this.services.set(service.id, service));
    this.currentServiceId = 7;
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Profile methods
  async getProfile(): Promise<Profile | undefined> {
    return Array.from(this.profiles.values())[0];
  }

  async updateProfile(profileData: InsertProfile): Promise<Profile> {
    const existingProfile = Array.from(this.profiles.values())[0];
    if (existingProfile) {
      const updated: Profile = { 
        ...existingProfile, 
        ...profileData, 
        updatedAt: new Date() 
      };
      this.profiles.set(existingProfile.id, updated);
      return updated;
    } else {
      const id = this.currentProfileId++;
      const profile: Profile = { 
        ...profileData, 
        id, 
        createdAt: new Date(), 
        updatedAt: new Date() 
      };
      this.profiles.set(id, profile);
      return profile;
    }
  }

  // Skills methods
  async getSkills(): Promise<Skill[]> {
    return Array.from(this.skills.values());
  }

  async createSkill(skill: InsertSkill): Promise<Skill> {
    const id = this.currentSkillId++;
    const newSkill: Skill = { ...skill, id, createdAt: new Date() };
    this.skills.set(id, newSkill);
    return newSkill;
  }

  async updateSkill(id: number, skill: Partial<InsertSkill>): Promise<Skill | undefined> {
    const existing = this.skills.get(id);
    if (existing) {
      const updated = { ...existing, ...skill };
      this.skills.set(id, updated);
      return updated;
    }
    return undefined;
  }

  async deleteSkill(id: number): Promise<boolean> {
    return this.skills.delete(id);
  }

  // Experience methods
  async getExperiences(): Promise<Experience[]> {
    return Array.from(this.experiences.values()).sort((a, b) => 
      new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
    );
  }

  async createExperience(experience: InsertExperience): Promise<Experience> {
    const id = this.currentExperienceId++;
    const newExperience: Experience = { ...experience, id, createdAt: new Date() };
    this.experiences.set(id, newExperience);
    return newExperience;
  }

  async updateExperience(id: number, experience: Partial<InsertExperience>): Promise<Experience | undefined> {
    const existing = this.experiences.get(id);
    if (existing) {
      const updated = { ...existing, ...experience };
      this.experiences.set(id, updated);
      return updated;
    }
    return undefined;
  }

  async deleteExperience(id: number): Promise<boolean> {
    return this.experiences.delete(id);
  }

  // Education methods
  async getEducation(): Promise<Education[]> {
    return Array.from(this.educations.values());
  }

  async createEducation(education: InsertEducation): Promise<Education> {
    const id = this.currentEducationId++;
    const newEducation: Education = { ...education, id, createdAt: new Date() };
    this.educations.set(id, newEducation);
    return newEducation;
  }

  async updateEducation(id: number, education: Partial<InsertEducation>): Promise<Education | undefined> {
    const existing = this.educations.get(id);
    if (existing) {
      const updated = { ...existing, ...education };
      this.educations.set(id, updated);
      return updated;
    }
    return undefined;
  }

  async deleteEducation(id: number): Promise<boolean> {
    return this.educations.delete(id);
  }

  // Certification methods
  async getCertifications(): Promise<Certification[]> {
    return Array.from(this.certifications.values()).sort((a, b) => 
      parseInt(b.year) - parseInt(a.year)
    );
  }

  async createCertification(certification: InsertCertification): Promise<Certification> {
    const id = this.currentCertificationId++;
    const newCertification: Certification = { ...certification, id, createdAt: new Date() };
    this.certifications.set(id, newCertification);
    return newCertification;
  }

  async updateCertification(id: number, certification: Partial<InsertCertification>): Promise<Certification | undefined> {
    const existing = this.certifications.get(id);
    if (existing) {
      const updated = { ...existing, ...certification };
      this.certifications.set(id, updated);
      return updated;
    }
    return undefined;
  }

  async deleteCertification(id: number): Promise<boolean> {
    return this.certifications.delete(id);
  }

  // Activity methods
  async getActivities(): Promise<Activity[]> {
    return Array.from(this.activities.values());
  }

  async createActivity(activity: InsertActivity): Promise<Activity> {
    const id = this.currentActivityId++;
    const newActivity: Activity = { ...activity, id, createdAt: new Date() };
    this.activities.set(id, newActivity);
    return newActivity;
  }

  async updateActivity(id: number, activity: Partial<InsertActivity>): Promise<Activity | undefined> {
    const existing = this.activities.get(id);
    if (existing) {
      const updated = { ...existing, ...activity };
      this.activities.set(id, updated);
      return updated;
    }
    return undefined;
  }

  async deleteActivity(id: number): Promise<boolean> {
    return this.activities.delete(id);
  }

  // Article methods
  async getArticles(): Promise<Article[]> {
    return Array.from(this.articles.values()).sort((a, b) => 
      new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
    );
  }

  async getPublishedArticles(): Promise<Article[]> {
    return Array.from(this.articles.values())
      .filter(article => article.published)
      .sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());
  }

  async getFeaturedArticles(): Promise<Article[]> {
    return Array.from(this.articles.values())
      .filter(article => article.published && article.featured);
  }

  async getArticleBySlug(slug: string): Promise<Article | undefined> {
    return Array.from(this.articles.values()).find(article => article.slug === slug);
  }

  async createArticle(article: InsertArticle): Promise<Article> {
    const id = this.currentArticleId++;
    const newArticle: Article = { 
      ...article, 
      id, 
      createdAt: new Date(), 
      updatedAt: new Date() 
    };
    this.articles.set(id, newArticle);
    return newArticle;
  }

  async updateArticle(id: number, article: Partial<InsertArticle>): Promise<Article | undefined> {
    const existing = this.articles.get(id);
    if (existing) {
      const updated = { ...existing, ...article, updatedAt: new Date() };
      this.articles.set(id, updated);
      return updated;
    }
    return undefined;
  }

  async deleteArticle(id: number): Promise<boolean> {
    return this.articles.delete(id);
  }

  // Contact message methods
  async getContactMessages(): Promise<ContactMessage[]> {
    return Array.from(this.contactMessages.values()).sort((a, b) => 
      new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
    );
  }

  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    const id = this.currentContactMessageId++;
    const newMessage: ContactMessage = { 
      ...message, 
      id, 
      read: false, 
      createdAt: new Date() 
    };
    this.contactMessages.set(id, newMessage);
    return newMessage;
  }

  async markMessageAsRead(id: number): Promise<boolean> {
    const message = this.contactMessages.get(id);
    if (message) {
      this.contactMessages.set(id, { ...message, read: true });
      return true;
    }
    return false;
  }

  async deleteContactMessage(id: number): Promise<boolean> {
    return this.contactMessages.delete(id);
  }

  // Gallery methods
  async getGalleries(): Promise<Gallery[]> {
    return Array.from(this.galleries.values()).sort((a, b) => 
      new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
    );
  }

  async getGalleriesByCategory(category: string): Promise<Gallery[]> {
    return Array.from(this.galleries.values())
      .filter(gallery => gallery.category === category)
      .sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());
  }

  async getFeaturedGalleries(): Promise<Gallery[]> {
    return Array.from(this.galleries.values())
      .filter(gallery => gallery.featured === true)
      .sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());
  }

  async createGallery(gallery: InsertGallery): Promise<Gallery> {
    const id = this.currentGalleryId++;
    const newGallery: Gallery = { 
      ...gallery, 
      id, 
      createdAt: new Date() 
    };
    this.galleries.set(id, newGallery);
    return newGallery;
  }

  async updateGallery(id: number, gallery: Partial<InsertGallery>): Promise<Gallery | undefined> {
    const existing = this.galleries.get(id);
    if (existing) {
      const updated = { ...existing, ...gallery };
      this.galleries.set(id, updated);
      return updated;
    }
    return undefined;
  }

  async deleteGallery(id: number): Promise<boolean> {
    return this.galleries.delete(id);
  }

  // Service methods
  async getServices(): Promise<Service[]> {
    return Array.from(this.services.values()).sort((a, b) => 
      new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
    );
  }

  async getServicesByCategory(category: string): Promise<Service[]> {
    return Array.from(this.services.values())
      .filter(service => service.category === category)
      .sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());
  }

  async createService(service: InsertService): Promise<Service> {
    const id = this.currentServiceId++;
    const newService: Service = { 
      ...service, 
      id, 
      createdAt: new Date() 
    };
    this.services.set(id, newService);
    return newService;
  }

  async updateService(id: number, service: Partial<InsertService>): Promise<Service | undefined> {
    const existing = this.services.get(id);
    if (existing) {
      const updated = { ...existing, ...service };
      this.services.set(id, updated);
      return updated;
    }
    return undefined;
  }

  async deleteService(id: number): Promise<boolean> {
    return this.services.delete(id);
  }
}

export const storage = new MemStorage();
