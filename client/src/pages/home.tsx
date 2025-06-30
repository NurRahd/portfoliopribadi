import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Camera, Code, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import type { 
  Profile, 
  Skill, 
  Experience, 
  Education, 
  Certification, 
  Activity,
  Project
} from "@shared/schema";
import defaultProfile from "@/assets/default-profile.jpg";

function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      <div className="space-y-8">
        <Skeleton className="h-screen w-full" />
        <div className="container mx-auto px-6 py-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-48 w-full" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [currentActivity, setCurrentActivity] = useState(2);

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

  const { data: projects = [], isLoading: projectsLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  const { data: activities = [], isLoading: activitiesLoading } = useQuery<Activity[]>({
    queryKey: ["/api/activities"],
  });

  const isLoading = profileLoading || skillsLoading || experiencesLoading || educationLoading || certificationsLoading || projectsLoading || activitiesLoading;

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-primary mb-4">Profile not found</h1>
          <p className="text-muted-foreground">Please check back later.</p>
        </div>
      </div>
    );
  }

  const photographySkills = skills.filter(skill => skill.category.toLowerCase().includes("photography"));
  const developmentSkills = skills.filter(skill =>
    skill.category.toLowerCase().includes("development")
  );
  const designSkills = skills.filter(skill => skill.category.toLowerCase().includes("design"));

  // Debug log
  console.log("All skills:", skills);
  console.log("Development skills:", developmentSkills);
  console.log('Projects di home:', projects);

  const nextActivity = () => {
    setCurrentActivity((prev) => (prev + 1) % activities.length);
  };

  const prevActivity = () => {
    setCurrentActivity((prev) => (prev - 1 + activities.length) % activities.length);
  };

  const safeTechnologies = (tech: any) => {
    if (typeof tech === 'string') {
      try {
        const arr = JSON.parse(tech || '[]');
        return Array.isArray(arr) ? arr : [];
      } catch {
        return [];
      }
    } else if (Array.isArray(tech)) {
      return tech;
    }
    return [];
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-['Montserrat']">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center text-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1938&auto=format&fit=crop')",
            filter: "brightness(0.3) contrast(1.2)"
          }}
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-20 px-5">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-['Playfair_Display'] font-bold mb-2 tracking-wide text-white drop-shadow-lg">
            {profile.fullName}
          </h1>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-['Playfair_Display'] italic text-[#dcc6aa] mb-8 drop-shadow-lg">
            {profile.position}
          </h2>
          <p className="max-w-2xl mx-auto text-base md:text-lg lg:text-xl mb-10 opacity-90 leading-relaxed text-white drop-shadow">
            {profile.bio}
          </p>
          <button className="px-8 py-3 bg-transparent border-2 border-[#dcc6aa] text-white uppercase tracking-wider text-sm transition-all duration-300 hover:bg-[#dcc6aa] hover:text-black font-semibold drop-shadow">
            Explore My Work
          </button>
        </div>
      </section>

      {/* About Section with Profile Photo */}
      <section className="py-24 px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Profile Photo */}
            <div className="flex-1 flex justify-center">
              <div className="relative w-80 h-80 rounded-full overflow-hidden shadow-2xl border-4 border-primary">
                <img 
                  src={profile?.photoUrl && profile.photoUrl !== "url" ? profile.photoUrl : defaultProfile} 
                  alt="Profile Photo" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* About Content */}
            <div className="flex-1 space-y-6">
              <h3 className="text-5xl font-['Playfair_Display'] font-bold text-primary mb-6">About Me</h3>
              <p className="text-lg leading-relaxed opacity-90">
                I'm a passionate photographer and IT developer based in {profile.location}, 
                combining creative vision with technical expertise to create stunning visual 
                experiences and robust digital solutions.
              </p>
              <p className="text-lg leading-relaxed opacity-90">
                With years of experience in both photography and development, I bring a unique 
                perspective to every project, whether it's capturing the perfect moment or 
                building the perfect application.
              </p>
              <div className="h-px bg-border my-8" />
              <div className="space-y-4">
                <p className="text-base opacity-80">
                  Specializing in portrait photography, landscape captures, and full-stack 
                  development with modern technologies. Every project tells a story, and I'm 
                  here to help you tell yours.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-24 px-12 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-['Playfair_Display'] font-bold text-center mb-16 text-[#DCC6AA] relative">
            My Projects
            <div className="absolute bottom-[-15px] left-1/2 transform -translate-x-1/2 w-20 h-1 bg-[#DCC6AA]" />
          </h2>
          <div className="flex flex-col md:flex-row gap-8 justify-center">
            {projects.map((project, index) => (
              <div key={project.id} className="flex-1 max-w-sm bg-[#1A1A1A] rounded-md overflow-hidden border border-[#333] transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl">
                <img 
                  src={project.imageUrl || `https://images.unsplash.com/photo-${index === 0 ? '1558655146-d09347e92766' : index === 1 ? '1499951360447-b19be8fe80f5' : '1467232004584-a241de8bcf5'}?q=80&w=1964&auto=format&fit=crop`}
                  alt={project.title} 
                  className="w-full h-48 object-cover"
                />
                <div className="p-5">
                  <h3 className="text-xl font-['Playfair_Display'] font-bold text-[#DCC6AA] mb-3">{project.title}</h3>
                  <p className="text-sm mb-4 opacity-80">{project.description}</p>
                  {project.technologies && (
                    <p className="text-xs text-[#DCC6AA] mb-4">Tech: {safeTechnologies(project.technologies).join(', ')}</p>
                  )}
                  <div className="flex gap-2">
                    {project.projectUrl && (
                      <button className="px-3 py-1 bg-transparent border border-[#DCC6AA] text-white text-xs uppercase tracking-wide transition-all duration-300 hover:bg-[#DCC6AA] hover:text-[#0D0D0D]">
                        Live Demo
                      </button>
                    )}
                    {project.githubUrl && (
                      <button className="px-3 py-1 bg-transparent border border-[#DCC6AA] text-white text-xs uppercase tracking-wide transition-all duration-300 hover:bg-[#DCC6AA] hover:text-[#0D0D0D]">
                        GitHub
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-24 px-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-['Playfair_Display'] font-bold text-center mb-16 text-[#DCC6AA] relative">
            My Skills
            <div className="absolute bottom-[-15px] left-1/2 transform -translate-x-1/2 w-20 h-1 bg-[#DCC6AA]" />
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Photography Skills */}
            <div className="bg-[#1A1A1A] p-8 rounded-md border border-[#333]">
              <h3 className="text-xl font-semibold mb-6 text-[#DCC6AA]">Photography</h3>
              <div className="space-y-5">
                {photographySkills.map((skill) => (
                  <div key={skill.id}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[#DCC6AA] font-medium">{skill.name}</span>
                      <span className="text-sm">{skill.proficiency}%</span>
                    </div>
                    <div className="w-full bg-[#333] rounded-full h-2">
                      <div 
                        className="bg-[#DCC6AA] h-2 rounded-full transition-all duration-700" 
                        style={{ width: `${skill.proficiency}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Development Skills */}
            <div className="bg-[#1A1A1A] p-8 rounded-md border border-[#333]">
              <h3 className="text-xl font-semibold mb-6 text-[#DCC6AA]">Development</h3>
              <div className="space-y-5">
                {developmentSkills.map((skill) => (
                  <div key={skill.id}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[#DCC6AA] font-medium">{skill.name}</span>
                      <span className="text-sm">{skill.proficiency}%</span>
                    </div>
                    <div className="w-full bg-[#333] rounded-full h-2">
                      <div 
                        className="bg-[#DCC6AA] h-2 rounded-full transition-all duration-700" 
                        style={{ width: `${skill.proficiency}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Design Skills */}
            <div className="bg-[#1A1A1A] p-8 rounded-md border border-[#333]">
              <h3 className="text-xl font-semibold mb-6 text-[#DCC6AA]">Other Skills</h3>
              <div className="space-y-5">
                {designSkills.map((skill) => (
                  <div key={skill.id}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[#DCC6AA] font-medium">{skill.name}</span>
                      <span className="text-sm">{skill.proficiency}%</span>
                    </div>
                    <div className="w-full bg-[#333] rounded-full h-2">
                      <div 
                        className="bg-[#DCC6AA] h-2 rounded-full transition-all duration-700" 
                        style={{ width: `${skill.proficiency}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-24 px-12 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-['Playfair_Display'] font-bold text-center mb-16 text-[#DCC6AA] relative">
            Experience
            <div className="absolute bottom-[-15px] left-1/2 transform -translate-x-1/2 w-20 h-1 bg-[#DCC6AA]" />
          </h2>
          <div className="relative flex justify-center">
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-[#DCC6AA] z-10" />
            <div className="flex justify-between items-center w-full relative z-20">
              {experiences.slice(0, 6).map((experience, index) => (
                <div key={experience.id} className="flex flex-col items-center max-w-48">
                  <div className="w-5 h-5 bg-[#0D0D0D] border-3 border-[#DCC6AA] rounded-full mb-4" />
                  <div className="text-lg font-semibold mb-2 text-[#DCC6AA]">
                    {`${experience.startDate?.split('-')[0] || ''}-${experience.endDate?.split('-')[0] || 'Now'}`}
                  </div>
                  <div className="bg-[#1A1A1A] p-4 rounded-md text-center border border-[#333]">
                    <h4 className="font-semibold text-[#DCC6AA] mb-2">
                      {experience.title}
                    </h4>
                    <p className="text-sm opacity-80">
                      {experience.company}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Activity Section with Carousel */}
      <section className="py-24 px-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-['Playfair_Display'] font-bold text-center mb-16 text-[#DCC6AA] relative">
            My Activities
            <div className="absolute bottom-[-15px] left-1/2 transform -translate-x-1/2 w-20 h-1 bg-[#DCC6AA]" />
          </h2>
          <div className="relative flex items-center justify-center min-h-[420px]">
            <button 
              onClick={prevActivity}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 w-14 h-14 bg-black/70 border-2 border-[#DCC6AA] text-[#DCC6AA] rounded-full flex items-center justify-center hover:bg-[#DCC6AA] hover:text-[#0D0D0D] transition-all duration-200 z-30"
            >
              <ChevronLeft size={24} />
            </button>
            
            <div className="flex items-center justify-center w-full perspective-[1600px] min-h-[400px] relative">
              {activities.map((activity, index) => {
                const offset = index - currentActivity;
                const isActive = offset === 0;
                const isNear = Math.abs(offset) === 1;
                const isVisible = Math.abs(offset) <= 2;
                
                if (!isVisible) return null;
                
                return (
                  <div
                    key={activity.id}
                    className={`absolute w-80 h-96 bg-[#1A1A1A] rounded-2xl shadow-2xl border transition-all duration-600 overflow-hidden cursor-pointer ${
                      isActive 
                        ? 'opacity-100 z-20 border-[#DCC6AA] border-2 scale-100' 
                        : isNear 
                        ? 'opacity-80 z-10 border-[#333] scale-90' 
                        : 'opacity-50 z-5 border-[#333] scale-75'
                    }`}
                    style={{
                      transform: `translateX(${offset * 100}px) rotateY(${offset * 15}deg) scale(${isActive ? 1 : isNear ? 0.9 : 0.75})`,
                      filter: isActive ? 'none' : 'grayscale(0.2) blur(1px) brightness(0.7)'
                    }}
                  >
                    <div 
                      className="w-full h-full bg-cover bg-center flex items-end"
                      style={{
                        backgroundImage: `url(https://images.unsplash.com/photo-${index % 2 === 0 ? '1518837695005-2083093ee35b' : '1511578314322-379afb476865'}?q=80&w=2070&auto=format&fit=crop)`
                      }}
                    >
                      <div className="w-full p-6 bg-gradient-to-t from-[#0D0D0D]/95 to-transparent">
                        <h3 className="text-xl font-bold text-[#DCC6AA] mb-2">{activity.title}</h3>
                        <p className="text-white text-sm">{activity.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <button 
              onClick={nextActivity}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 w-14 h-14 bg-black/70 border-2 border-[#DCC6AA] text-[#DCC6AA] rounded-full flex items-center justify-center hover:bg-[#DCC6AA] hover:text-[#0D0D0D] transition-all duration-200 z-30"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}