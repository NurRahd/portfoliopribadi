import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "wouter";
import { 
  MapPin, Phone, Mail, Calendar, User, Briefcase, 
  GraduationCap, Award, Heart, ExternalLink 
} from "lucide-react";
import type { Profile, Skill, Experience, Education, Certification, Activity } from "@shared/schema";
import { getSkillCategoryConfig } from "@/lib/types";

function LoadingSkeleton() {
  return (
    <div className="space-y-16">
      {/* Hero Skeleton */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <Skeleton className="h-12 w-3/4" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-2/3" />
              <div className="flex gap-4">
                <Skeleton className="h-12 w-32" />
                <Skeleton className="h-12 w-32" />
              </div>
            </div>
            <Skeleton className="h-80 w-full rounded-2xl" />
          </div>
        </div>
      </section>
    </div>
  );
}

export default function Home() {
  const { data: profile, isLoading: profileLoading } = useQuery<Profile>({
    queryKey: ["/api/profile"],
  });

  const { data: skills = [], isLoading: skillsLoading } = useQuery<Skill[]>({
    queryKey: ["/api/skills"],
  });

  const { data: experiences = [], isLoading: experiencesLoading } = useQuery<Experience[]>({
    queryKey: ["/api/experiences"],
  });

  const { data: education = [], isLoading: educationLoading } = useQuery<Education[]>({
    queryKey: ["/api/education"],
  });

  const { data: certifications = [], isLoading: certificationsLoading } = useQuery<Certification[]>({
    queryKey: ["/api/certifications"],
  });

  const { data: activities = [], isLoading: activitiesLoading } = useQuery<Activity[]>({
    queryKey: ["/api/activities"],
  });

  if (profileLoading) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-16 photography-gradient">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="animate-slide-up">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                Hi, Saya{" "}
                <span className="text-primary">Photographer</span> &{" "}
                <span className="text-accent">Developer</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                {profile?.bio || "Memadukan seni fotografi dengan teknologi modern untuk menciptakan solusi kreatif dan digital yang memukau. Spesialisasi dalam portrait photography, landscape, event photography, dan pengembangan aplikasi web."}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/gallery">
                  <Button size="lg" className="bg-primary hover:bg-primary/90">
                    Lihat Gallery
                  </Button>
                </Link>
                <Link href="/services">
                  <Button 
                    variant="outline" 
                    size="lg"
                  >
                    Layanan Saya
                  </Button>
                </Link>
              </div>
            </div>
            <div className="animate-slide-up">
              <img
                src="https://images.unsplash.com/photo-1542038784456-1ea8e2b75c4f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1000"
                alt="Professional photographer with camera"
                className="rounded-2xl shadow-2xl w-full h-auto max-w-md mx-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">About Me</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Learn more about my background, passion, and what drives me to create amazing digital experiences.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Full Name</h3>
                  <p className="text-muted-foreground">{profile?.fullName || "John Doe Developer"}</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Age</h3>
                  <p className="text-muted-foreground">{profile?.age ? `${profile.age} Years Old` : "28 Years Old"}</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-accent/20 p-3 rounded-lg border border-accent/30">
                  <MapPin className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Location</h3>
                  <p className="text-muted-foreground">{profile?.location || "Bali, Indonesia"}</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-accent/20 p-3 rounded-lg border border-accent/30">
                  <Briefcase className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Position</h3>
                  <p className="text-muted-foreground">{profile?.position || "Professional Photographer & IT Developer"}</p>
                </div>
              </div>
            </div>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-foreground mb-4">Personal Statement</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {profile?.bio || "I am a passionate developer with over 5 years of experience creating modern web applications. I love solving complex problems and turning creative ideas into functional, beautiful digital solutions. My approach combines technical expertise with user-centered design principles to deliver exceptional results."}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skillset" className="py-16 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Skills & Expertise</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Technologies and tools I use to bring ideas to life
            </p>
          </div>
          
          {skillsLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <Card key={i}>
                  <CardContent className="p-6">
                    <Skeleton className="h-12 w-12 rounded-lg mb-4" />
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-full mb-4" />
                    <Skeleton className="h-4 w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {skills.map((skill) => {
                const config = getSkillCategoryConfig(skill.category);
                return (
                  <Card key={skill.id} className="hover:shadow-lg hover:scale-105 transition-all duration-300 border-accent/20">
                    <CardContent className="p-6">
                      <div className="mb-4">
                        <div className="bg-accent/10 border border-accent/30 p-3 rounded-lg w-fit">
                          <i className={`${config.icon} text-accent text-xl`} />
                        </div>
                      </div>
                      <h3 className="font-semibold text-foreground mb-2">{skill.name}</h3>
                      <p className="text-muted-foreground text-sm mb-4">{skill.description}</p>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm font-medium">
                          <span className="text-foreground">{skill.category}</span>
                          <span className="text-accent">{skill.proficiency}%</span>
                        </div>
                        <div className="bg-muted rounded-full h-3 overflow-hidden">
                          <div 
                            className="bg-gradient-to-r from-accent to-primary h-3 rounded-full transition-all duration-500 ease-out"
                            style={{ width: `${skill.proficiency}%` }}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-16 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Work Experience</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              My professional journey and key achievements
            </p>
          </div>
          
          {experiencesLoading ? (
            <div className="space-y-8">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="relative pl-8 border-l-2 border-primary/20">
                  <Skeleton className="absolute -left-2 top-0 w-4 h-4 rounded-full" />
                  <Card>
                    <CardContent className="p-6">
                      <Skeleton className="h-6 w-2/3 mb-2" />
                      <Skeleton className="h-4 w-1/3 mb-4" />
                      <Skeleton className="h-4 w-full mb-2" />
                      <Skeleton className="h-4 w-3/4" />
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-8">
              {experiences.map((experience) => (
                <div key={experience.id} className="relative pl-8 border-l-2 border-primary/20">
                  <div className="absolute -left-2 top-0 w-4 h-4 bg-primary rounded-full" />
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex flex-wrap items-center justify-between mb-4">
                        <h3 className="text-xl font-semibold text-foreground">{experience.title}</h3>
                        <span className="text-primary font-medium">
                          {experience.startDate} - {experience.endDate || "Present"}
                        </span>
                      </div>
                      <p className="text-accent font-medium mb-2">{experience.company}</p>
                      <p className="text-muted-foreground mb-4">{experience.description}</p>
                      {experience.technologies && (
                        <div className="flex flex-wrap gap-2">
                          {experience.technologies.map((tech) => (
                            <Badge key={tech} variant="secondary">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Education Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Education</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Academic background and continuous learning journey
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Formal Education */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-primary/10 p-3 rounded-lg mr-4">
                    <GraduationCap className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">
                      {education[0]?.degree || "Computer Science"}
                    </h3>
                    <p className="text-accent font-medium">
                      {education[0]?.institution || "University of Indonesia"}
                    </p>
                  </div>
                </div>
                <p className="text-muted-foreground mb-2">
                  {education[0]?.year || "2015 - 2019"}
                </p>
                <p className="text-muted-foreground text-sm">
                  {education[0]?.description || 
                    "Focused on software engineering, data structures, algorithms, and web development. Final project: E-commerce platform with AI recommendations."}
                </p>
                {education[0]?.gpa && (
                  <p className="text-sm text-muted-foreground mt-2">
                    GPA: {education[0].gpa}
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Certifications */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-accent/10 p-3 rounded-lg mr-4">
                    <Award className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">Certifications</h3>
                    <p className="text-accent font-medium">Professional Development</p>
                  </div>
                </div>
                {certificationsLoading ? (
                  <div className="space-y-3">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div key={i} className="flex justify-between items-center">
                        <Skeleton className="h-4 w-2/3" />
                        <Skeleton className="h-3 w-12" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-3">
                    {certifications.map((cert) => (
                      <div key={cert.id} className="flex justify-between items-center">
                        <span className="text-foreground">{cert.name}</span>
                        <span className="text-xs text-muted-foreground">{cert.year}</span>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Activities Section */}
      <section className="py-16 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Activities & Interests</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Beyond coding - community involvement and personal interests
            </p>
          </div>
          
          {activitiesLoading ? (
            <div className="grid md:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <Card key={i}>
                  <CardContent className="p-6 text-center">
                    <Skeleton className="h-16 w-16 rounded-full mx-auto mb-4" />
                    <Skeleton className="h-6 w-3/4 mx-auto mb-2" />
                    <Skeleton className="h-4 w-full mb-1" />
                    <Skeleton className="h-4 w-2/3 mx-auto" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {activities.map((activity) => (
                <Card key={activity.id}>
                  <CardContent className="p-6 text-center">
                    <div className={`bg-${activity.color}-100 dark:bg-${activity.color}-900/20 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center`}>
                      <i className={`${activity.icon} text-${activity.color}-600 text-xl`} />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{activity.title}</h3>
                    <p className="text-muted-foreground text-sm">{activity.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
