import { 
  users, profile, skills, experiences, education, certifications, activities, articles, contactMessages,
  type User, type InsertUser, type Profile, type InsertProfile, type Skill, type InsertSkill,
  type Experience, type InsertExperience, type Education, type InsertEducation,
  type Certification, type InsertCertification, type Activity, type InsertActivity,
  type Article, type InsertArticle, type ContactMessage, type InsertContactMessage
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
  
  private currentUserId = 1;
  private currentProfileId = 1;
  private currentSkillId = 1;
  private currentExperienceId = 1;
  private currentEducationId = 1;
  private currentCertificationId = 1;
  private currentActivityId = 1;
  private currentArticleId = 1;
  private currentContactMessageId = 1;

  constructor() {
    this.seedData();
  }

  private seedData() {
    // Seed profile
    const profileData: Profile = {
      id: 1,
      fullName: "John Doe Developer",
      position: "Senior Full Stack Developer",
      email: "john.doe@example.com",
      phone: "+62 812-3456-7890",
      location: "Jakarta, Indonesia",
      bio: "I am a passionate developer with over 5 years of experience creating modern web applications. I love solving complex problems and turning creative ideas into functional, beautiful digital solutions. My approach combines technical expertise with user-centered design principles to deliver exceptional results.",
      age: 28,
      linkedinUrl: "https://linkedin.com/in/johndoe",
      githubUrl: "https://github.com/johndoe",
      twitterUrl: "https://twitter.com/johndoe",
      instagramUrl: "https://instagram.com/johndoe",
      youtubeUrl: "https://youtube.com/@johndoe",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.profiles.set(1, profileData);

    // Seed skills
    const skillsData: Skill[] = [
      { id: 1, name: "React.js", category: "Frontend Development", proficiency: 90, description: "HTML5, CSS3, JavaScript, React, Vue.js", createdAt: new Date() },
      { id: 2, name: "Node.js", category: "Backend Development", proficiency: 85, description: "Node.js, Python, PHP, MongoDB, MySQL", createdAt: new Date() },
      { id: 3, name: "Figma", category: "UI/UX Design", proficiency: 80, description: "Figma, Adobe XD, Sketch, Photoshop", createdAt: new Date() },
      { id: 4, name: "AWS", category: "DevOps & Cloud", proficiency: 75, description: "AWS, Docker, Git, CI/CD", createdAt: new Date() },
      { id: 5, name: "React Native", category: "Mobile Development", proficiency: 70, description: "React Native, Flutter, iOS, Android", createdAt: new Date() },
      { id: 6, name: "Team Leadership", category: "Soft Skills", proficiency: 85, description: "Leadership, Communication, Problem Solving", createdAt: new Date() },
    ];
    skillsData.forEach(skill => this.skills.set(skill.id, skill));
    this.currentSkillId = 7;

    // Seed experiences
    const experiencesData: Experience[] = [
      {
        id: 1,
        title: "Senior Full Stack Developer",
        company: "TechCorp Indonesia",
        startDate: "2022",
        endDate: null,
        description: "Leading a team of 5 developers in building scalable web applications. Responsible for architecture decisions, code reviews, and mentoring junior developers. Successfully delivered 15+ projects with 99% client satisfaction.",
        technologies: ["React", "Node.js", "AWS", "MongoDB"],
        createdAt: new Date()
      },
      {
        id: 2,
        title: "Frontend Developer",
        company: "Digital Agency XYZ",
        startDate: "2020",
        endDate: "2022",
        description: "Developed responsive web applications for various clients. Collaborated with designers and backend developers to create seamless user experiences. Improved website performance by 40% through optimization techniques.",
        technologies: ["Vue.js", "JavaScript", "SASS"],
        createdAt: new Date()
      },
      {
        id: 3,
        title: "Junior Web Developer",
        company: "Startup InnovateID",
        startDate: "2019",
        endDate: "2020",
        description: "Started my professional journey building web applications from scratch. Learned best practices in coding, version control, and agile development methodologies. Contributed to the company's main product launch.",
        technologies: ["PHP", "MySQL", "jQuery"],
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
}

export const storage = new MemStorage();
