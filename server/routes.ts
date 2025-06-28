import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertProfileSchema, insertSkillSchema, insertExperienceSchema, 
  insertEducationSchema, insertCertificationSchema, insertActivitySchema, 
  insertArticleSchema, insertContactMessageSchema, insertGallerySchema, insertServiceSchema
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Profile routes
  app.get("/api/profile", async (req, res) => {
    try {
      const profile = await storage.getProfile();
      res.json(profile);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch profile" });
    }
  });

  app.put("/api/profile", async (req, res) => {
    try {
      const profileData = insertProfileSchema.parse(req.body);
      const profile = await storage.updateProfile(profileData);
      res.json(profile);
    } catch (error) {
      res.status(400).json({ message: "Invalid profile data" });
    }
  });

  // Skills routes
  app.get("/api/skills", async (req, res) => {
    try {
      const skills = await storage.getSkills();
      res.json(skills);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch skills" });
    }
  });

  app.post("/api/skills", async (req, res) => {
    try {
      const skillData = insertSkillSchema.parse(req.body);
      const skill = await storage.createSkill(skillData);
      res.json(skill);
    } catch (error) {
      res.status(400).json({ message: "Invalid skill data" });
    }
  });

  app.put("/api/skills/:id", async (req, res) => {
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
      res.status(400).json({ message: "Invalid skill data" });
    }
  });

  app.delete("/api/skills/:id", async (req, res) => {
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

  // Experiences routes
  app.get("/api/experiences", async (req, res) => {
    try {
      const experiences = await storage.getExperiences();
      res.json(experiences);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch experiences" });
    }
  });

  app.post("/api/experiences", async (req, res) => {
    try {
      const experienceData = insertExperienceSchema.parse(req.body);
      const experience = await storage.createExperience(experienceData);
      res.json(experience);
    } catch (error) {
      res.status(400).json({ message: "Invalid experience data" });
    }
  });

  app.put("/api/experiences/:id", async (req, res) => {
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

  app.delete("/api/experiences/:id", async (req, res) => {
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

  // Education routes
  app.get("/api/education", async (req, res) => {
    try {
      const education = await storage.getEducation();
      res.json(education);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch education" });
    }
  });

  app.post("/api/education", async (req, res) => {
    try {
      const educationData = insertEducationSchema.parse(req.body);
      const education = await storage.createEducation(educationData);
      res.json(education);
    } catch (error) {
      res.status(400).json({ message: "Invalid education data" });
    }
  });

  app.put("/api/education/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const educationData = insertEducationSchema.partial().parse(req.body);
      const education = await storage.updateEducation(id, educationData);
      if (education) {
        res.json(education);
      } else {
        res.status(404).json({ message: "Education not found" });
      }
    } catch (error) {
      res.status(400).json({ message: "Invalid education data" });
    }
  });

  app.delete("/api/education/:id", async (req, res) => {
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

  // Certifications routes
  app.get("/api/certifications", async (req, res) => {
    try {
      const certifications = await storage.getCertifications();
      res.json(certifications);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch certifications" });
    }
  });

  app.post("/api/certifications", async (req, res) => {
    try {
      const certificationData = insertCertificationSchema.parse(req.body);
      const certification = await storage.createCertification(certificationData);
      res.json(certification);
    } catch (error) {
      res.status(400).json({ message: "Invalid certification data" });
    }
  });

  app.put("/api/certifications/:id", async (req, res) => {
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

  app.delete("/api/certifications/:id", async (req, res) => {
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

  // Activities routes
  app.get("/api/activities", async (req, res) => {
    try {
      const activities = await storage.getActivities();
      res.json(activities);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch activities" });
    }
  });

  app.post("/api/activities", async (req, res) => {
    try {
      const activityData = insertActivitySchema.parse(req.body);
      const activity = await storage.createActivity(activityData);
      res.json(activity);
    } catch (error) {
      res.status(400).json({ message: "Invalid activity data" });
    }
  });

  app.put("/api/activities/:id", async (req, res) => {
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

  app.delete("/api/activities/:id", async (req, res) => {
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

  // Articles routes
  app.get("/api/articles", async (req, res) => {
    try {
      const published = req.query.published === 'true';
      const featured = req.query.featured === 'true';
      
      let articles;
      if (featured) {
        articles = await storage.getFeaturedArticles();
      } else if (published) {
        articles = await storage.getPublishedArticles();
      } else {
        articles = await storage.getArticles();
      }
      
      res.json(articles);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch articles" });
    }
  });

  app.get("/api/articles/:slug", async (req, res) => {
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

  app.post("/api/articles", async (req, res) => {
    try {
      const articleData = insertArticleSchema.parse(req.body);
      const article = await storage.createArticle(articleData);
      res.json(article);
    } catch (error) {
      res.status(400).json({ message: "Invalid article data" });
    }
  });

  app.put("/api/articles/:id", async (req, res) => {
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

  app.delete("/api/articles/:id", async (req, res) => {
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

  // Contact messages routes
  app.get("/api/contact-messages", async (req, res) => {
    try {
      const messages = await storage.getContactMessages();
      res.json(messages);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch contact messages" });
    }
  });

  app.post("/api/contact-messages", async (req, res) => {
    try {
      const messageData = insertContactMessageSchema.parse(req.body);
      const message = await storage.createContactMessage(messageData);
      res.json(message);
    } catch (error) {
      res.status(400).json({ message: "Invalid message data" });
    }
  });

  app.put("/api/contact-messages/:id/read", async (req, res) => {
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

  app.delete("/api/contact-messages/:id", async (req, res) => {
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

  // Gallery routes
  app.get("/api/galleries", async (req, res) => {
    try {
      const category = req.query.category as string;
      const featured = req.query.featured === 'true';
      
      let galleries;
      if (featured) {
        galleries = await storage.getFeaturedGalleries();
      } else if (category) {
        galleries = await storage.getGalleriesByCategory(category);
      } else {
        galleries = await storage.getGalleries();
      }
      
      res.json(galleries);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch galleries" });
    }
  });

  app.post("/api/galleries", async (req, res) => {
    try {
      const galleryData = insertGallerySchema.parse(req.body);
      const gallery = await storage.createGallery(galleryData);
      res.json(gallery);
    } catch (error) {
      res.status(400).json({ message: "Invalid gallery data" });
    }
  });

  app.put("/api/galleries/:id", async (req, res) => {
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

  app.delete("/api/galleries/:id", async (req, res) => {
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

  // Services routes
  app.get("/api/services", async (req, res) => {
    try {
      const category = req.query.category as string;
      
      let services;
      if (category) {
        services = await storage.getServicesByCategory(category);
      } else {
        services = await storage.getServices();
      }
      
      res.json(services);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch services" });
    }
  });

  app.post("/api/services", async (req, res) => {
    try {
      const serviceData = insertServiceSchema.parse(req.body);
      const service = await storage.createService(serviceData);
      res.json(service);
    } catch (error) {
      res.status(400).json({ message: "Invalid service data" });
    }
  });

  app.put("/api/services/:id", async (req, res) => {
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

  app.delete("/api/services/:id", async (req, res) => {
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

  const httpServer = createServer(app);
  return httpServer;
}
