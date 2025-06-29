import { db } from './db';
import { profile, skills, experiences, education, certifications, activities, articles, galleries, services, projects } from '@shared/schema';

async function seed() {
  console.log('🌱 Seeding database...');

  try {
    // Clear existing data
    await db.delete(services);
    await db.delete(galleries);
    await db.delete(articles);
    await db.delete(activities);
    await db.delete(certifications);
    await db.delete(education);
    await db.delete(experiences);
    await db.delete(skills);
    await db.delete(profile);
    await db.delete(projects);

    // Insert Profile
    await db.insert(profile).values({
      fullName: "Nisa Nur Rahmadani",
      position: "Photographer & Design Developer",
      email: "rahn.capt@gmail.com",
      phone: "+62 821-7147-1351",
      location: "Karimun, Indonesia",
      bio: "Passionate photographer and IT developer with expertise in creating stunning visual experiences and robust digital solutions. Combining creative vision with technical skills to deliver exceptional results.",
      age: 20,
      linkedinUrl: "https://linkedin.com/in/",
      githubUrl: "https://github.com/Rahd",
      twitterUrl: "https://twitter.com/",
      instagramUrl: "https://instagram.com/@nisanurhmadani_",
      youtubeUrl: "https://youtube.com/@rahn.capt"
    });

    console.log('✅ Profile seeded');

    // Insert Skills
    await db.insert(skills).values([
      {
        name: "Portrait Photography",
        category: "Photography",
        proficiency: 95,
        description: "Expert in portrait photography with natural lighting"
      },
      {
        name: "Landscape Photography",
        category: "Photography", 
        proficiency: 90,
        description: "Specialized in landscape and nature photography"
      },
      {
        name: "React.js",
        category: "Frontend Development",
        proficiency: 85,
        description: "Modern React with hooks and TypeScript"
      },
      {
        name: "Node.js",
        category: "Backend Development",
        proficiency: 80,
        description: "Server-side JavaScript with Express"
      },
      {
        name: "TypeScript",
        category: "Frontend Development",
        proficiency: 75,
        description: "Type-safe JavaScript development"
      },
      {
        name: "UI/UX Design",
        category: "Design",
        proficiency: 70,
        description: "User interface and experience design"
      }
    ]);

    console.log('✅ Skills seeded');

    // Insert Experiences
    await db.insert(experiences).values([
      {
        title: "Senior Photographer",
        company: "Studio Foto Pro",
        startDate: "2023-01",
        endDate: null,
        description: "Lead photographer specializing in portrait and event photography",
        technologies: "Canon EOS R5, Adobe Lightroom, Photoshop"
      },
      {
        title: "Full Stack Developer",
        company: "Tech Solutions Inc",
        startDate: "2022-06",
        endDate: "2023-12",
        description: "Developed web applications using React, Node.js, and PostgreSQL",
        technologies: "React, Node.js, TypeScript, PostgreSQL"
      },
      {
        title: "Freelance Photographer",
        company: "Self-Employed",
        startDate: "2021-03",
        endDate: "2022-05",
        description: "Provided photography services for events, portraits, and commercial projects",
        technologies: "Canon EOS 90D, Adobe Creative Suite"
      }
    ]);

    console.log('✅ Experiences seeded');

    // Insert Education
    await db.insert(education).values([
      {
        degree: "Bachelor of Computer Science",
        institution: "Universitas Indonesia",
        year: "2024",
        description: "Specialized in software engineering and web development",
        gpa: "3.8"
      },
      {
        degree: "Photography Certification",
        institution: "International Photography Institute",
        year: "2022",
        description: "Professional photography techniques and business",
        gpa: "A+"
      }
    ]);

    console.log('✅ Education seeded');

    // Insert Certifications
    await db.insert(certifications).values([
      {
        name: "AWS Certified Developer",
        issuer: "Amazon Web Services",
        year: "2023",
        credentialUrl: "https://aws.amazon.com/certification/"
      },
      {
        name: "Adobe Certified Expert",
        issuer: "Adobe",
        year: "2022",
        credentialUrl: "https://www.adobe.com/certification/"
      }
    ]);

    console.log('✅ Certifications seeded');

    // Insert Activities
    await db.insert(activities).values([
      {
        title: "Photography Workshop",
        description: "Conducted photography workshop for beginners",
        icon: "camera",
        color: "blue"
      },
      {
        title: "Open Source Contribution",
        description: "Contributed to React ecosystem projects",
        icon: "code",
        color: "green"
      },
      {
        title: "Art Exhibition",
        description: "Featured photographer in local art gallery",
        icon: "image",
        color: "purple"
      }
    ]);

    console.log('✅ Activities seeded');

    // Insert Articles
    await db.insert(articles).values([
      {
        title: "Mastering Portrait Photography",
        slug: "mastering-portrait-photography",
        excerpt: "Learn the essential techniques for capturing stunning portraits",
        content: "Portrait photography is an art that requires understanding of lighting, composition, and human psychology...",
        category: "Photography",
        readTime: 8,
        imageUrl: "https://images.unsplash.com/photo-1558655146-d09347e92766",
        published: true,
        featured: true
      },
      {
        title: "Building Modern Web Apps with React",
        slug: "building-modern-web-apps-react",
        excerpt: "A comprehensive guide to building scalable React applications",
        content: "React has revolutionized the way we build user interfaces...",
        category: "Development",
        readTime: 12,
        imageUrl: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5",
        published: true,
        featured: false
      }
    ]);

    console.log('✅ Articles seeded');

    // Insert Galleries
    await db.insert(galleries).values([
      {
        title: "Portrait Collection",
        description: "Professional portrait photography",
        imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
        category: "portrait",
        featured: true,
        tags: JSON.stringify(["portrait","professional","lighting"])
      },
      {
        title: "Landscape Adventures",
        description: "Breathtaking landscape photography",
        imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
        category: "landscape",
        featured: true,
        tags: JSON.stringify(["landscape","nature","adventure"])
      },
      {
        title: "Event Photography",
        description: "Capturing special moments",
        imageUrl: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622",
        category: "event",
        featured: false,
        tags: JSON.stringify(["event","celebration","moments"])
      }
    ]);

    console.log('✅ Galleries seeded');

    // Insert Services
    await db.insert(services).values([
      {
        title: "Portrait Photography",
        description: "Professional portrait sessions with high-quality editing",
        icon: "camera",
        category: "photography",
        price: "$150/session",
        features: JSON.stringify(["2-hour session", "20 edited photos", "online gallery"])
      },
      {
        title: "Web Development",
        description: "Custom web applications built with modern technologies",
        icon: "code",
        category: "development",
        price: "$2000/project",
        features: JSON.stringify(["Responsive design", "SEO optimized", "maintenance included"])
      },
      {
        title: "Event Photography",
        description: "Complete event coverage for special occasions",
        icon: "calendar",
        category: "photography",
        price: "$300/event",
        features: JSON.stringify(["Full day coverage", "100+ edited photos", "delivery within 48h"])
      }
    ]);

    console.log('✅ Services seeded');

    // Insert Projects
    await db.insert(projects).values([
      {
        title: 'Personal Portfolio',
        description: 'Website portfolio pribadi dengan React dan Tailwind.',
        imageUrl: 'https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1964&auto=format&fit=crop',
        category: 'Web',
        technologies: 'React, Tailwind, Node.js',
        projectUrl: 'https://your-portfolio.com',
        githubUrl: 'https://github.com/username/portfolio',
        featured: 1,
      },
      {
        title: 'Photo Gallery',
        description: 'Aplikasi galeri foto online.',
        imageUrl: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=1964&auto=format&fit=crop',
        category: 'Web',
        technologies: 'Next.js, MySQL',
        projectUrl: 'https://your-gallery.com',
        githubUrl: 'https://github.com/username/gallery',
        featured: 0,
      },
    ]);

    console.log('✅ Projects seeded');

    console.log('🎉 Database seeded successfully!');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
}

// Run seed if this file is executed directly
seed().then(() => {
  console.log('✅ Seed completed');
  process.exit(0);
}).catch((error) => {
  console.error('❌ Seed failed:', error);
  process.exit(1);
}); 