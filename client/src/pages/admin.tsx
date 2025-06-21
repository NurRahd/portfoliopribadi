import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { ProfileForm } from "@/components/admin/profile-form";
import { SkillForm } from "@/components/admin/skill-form";
import { ExperienceForm } from "@/components/admin/experience-form";
import { ArticleForm } from "@/components/admin/article-form";
import { DataTable } from "@/components/admin/data-table";
import { 
  Plus, Edit, Trash2, User, Code, Briefcase, 
  GraduationCap, Award, Heart, FileText, MessageSquare,
  Eye, EyeOff
} from "lucide-react";
import type { 
  Profile, Skill, Experience, Education, Certification, 
  Activity, Article, ContactMessage 
} from "@shared/schema";

interface EditState {
  type: 'skill' | 'experience' | 'education' | 'certification' | 'activity' | 'article' | null;
  item: any;
  isOpen: boolean;
}

export default function Admin() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState("profile");
  const [editState, setEditState] = useState<EditState>({ type: null, item: null, isOpen: false });

  // Queries
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

  const { data: articles = [], isLoading: articlesLoading } = useQuery<Article[]>({
    queryKey: ["/api/articles"],
  });

  const { data: contactMessages = [], isLoading: messagesLoading } = useQuery<ContactMessage[]>({
    queryKey: ["/api/contact-messages"],
  });

  // Delete mutations
  const deleteMutation = useMutation({
    mutationFn: async ({ type, id }: { type: string; id: number }) => {
      const endpoints = {
        skill: `/api/skills/${id}`,
        experience: `/api/experiences/${id}`,
        education: `/api/education/${id}`,
        certification: `/api/certifications/${id}`,
        activity: `/api/activities/${id}`,
        article: `/api/articles/${id}`,
        message: `/api/contact-messages/${id}`,
      };
      
      return apiRequest("DELETE", endpoints[type as keyof typeof endpoints]);
    },
    onSuccess: (_, { type }) => {
      toast({
        title: "Deleted Successfully",
        description: `${type} has been deleted.`,
      });
      
      const queryKeys = {
        skill: ["/api/skills"],
        experience: ["/api/experiences"],
        education: ["/api/education"],
        certification: ["/api/certifications"],
        activity: ["/api/activities"],
        article: ["/api/articles"],
        message: ["/api/contact-messages"],
      };
      
      queryClient.invalidateQueries({ queryKey: queryKeys[type as keyof typeof queryKeys] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete item. Please try again.",
        variant: "destructive",
      });
    },
  });

  const markAsReadMutation = useMutation({
    mutationFn: async (id: number) => {
      return apiRequest("PUT", `/api/contact-messages/${id}/read`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/contact-messages"] });
    },
  });

  const handleEdit = (type: EditState['type'], item: any) => {
    setEditState({ type, item, isOpen: true });
  };

  const handleAdd = (type: EditState['type']) => {
    setEditState({ type, item: null, isOpen: true });
  };

  const handleDelete = (type: string, id: number, name: string) => {
    if (confirm(`Are you sure you want to delete "${name}"?`)) {
      deleteMutation.mutate({ type, id });
    }
  };

  const closeModal = () => {
    setEditState({ type: null, item: null, isOpen: false });
  };

  const renderSkillsTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-foreground">Skills Management</h2>
        <Button onClick={() => handleAdd('skill')}>
          <Plus className="h-4 w-4 mr-2" />
          Add Skill
        </Button>
      </div>
      
      {skillsLoading ? (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Card key={i}>
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-4 w-48" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                  <div className="flex space-x-2">
                    <Skeleton className="h-9 w-9" />
                    <Skeleton className="h-9 w-9" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <DataTable
          data={skills}
          columns={[
            { key: 'name', label: 'Name' },
            { key: 'category', label: 'Category' },
            { 
              key: 'proficiency', 
              label: 'Proficiency',
              render: (value) => `${value}%`
            },
          ]}
          onEdit={(item) => handleEdit('skill', item)}
          onDelete={(item) => handleDelete('skill', item.id, item.name)}
        />
      )}
    </div>
  );

  const renderExperiencesTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-foreground">Experience Management</h2>
        <Button onClick={() => handleAdd('experience')}>
          <Plus className="h-4 w-4 mr-2" />
          Add Experience
        </Button>
      </div>
      
      {experiencesLoading ? (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <Skeleton className="h-6 w-2/3 mb-2" />
                <Skeleton className="h-4 w-1/3 mb-4" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {experiences.map((experience) => (
            <Card key={experience.id}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{experience.title}</h3>
                    <p className="text-accent font-medium">{experience.company}</p>
                    <p className="text-sm text-muted-foreground">
                      {experience.startDate} - {experience.endDate || "Present"}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleEdit('experience', experience)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleDelete('experience', experience.id, experience.title)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm mb-4">{experience.description}</p>
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
          ))}
        </div>
      )}
    </div>
  );

  const renderEducationTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-foreground">Education & Certifications</h2>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        {/* Education */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center">
                <GraduationCap className="h-5 w-5 mr-2" />
                Education
              </span>
              <Button size="sm" onClick={() => handleAdd('education')}>
                <Plus className="h-4 w-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {educationLoading ? (
              <div className="space-y-4">
                <Skeleton className="h-20 w-full" />
              </div>
            ) : (
              <DataTable
                data={education}
                columns={[
                  { key: 'degree', label: 'Degree' },
                  { key: 'institution', label: 'Institution' },
                  { key: 'year', label: 'Year' },
                ]}
                onEdit={(item) => handleEdit('education', item)}
                onDelete={(item) => handleDelete('education', item.id, item.degree)}
                compact
              />
            )}
          </CardContent>
        </Card>

        {/* Certifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center">
                <Award className="h-5 w-5 mr-2" />
                Certifications
              </span>
              <Button size="sm" onClick={() => handleAdd('certification')}>
                <Plus className="h-4 w-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {certificationsLoading ? (
              <div className="space-y-4">
                <Skeleton className="h-20 w-full" />
              </div>
            ) : (
              <DataTable
                data={certifications}
                columns={[
                  { key: 'name', label: 'Name' },
                  { key: 'issuer', label: 'Issuer' },
                  { key: 'year', label: 'Year' },
                ]}
                onEdit={(item) => handleEdit('certification', item)}
                onDelete={(item) => handleDelete('certification', item.id, item.name)}
                compact
              />
            )}
          </CardContent>
        </Card>
      </div>

      {/* Activities */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center">
              <Heart className="h-5 w-5 mr-2" />
              Activities & Interests
            </span>
            <Button size="sm" onClick={() => handleAdd('activity')}>
              <Plus className="h-4 w-4" />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {activitiesLoading ? (
            <div className="grid md:grid-cols-2 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-24 w-full" />
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {activities.map((activity) => (
                <Card key={activity.id} className="relative">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-foreground">{activity.title}</h4>
                      <div className="flex space-x-1">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8"
                          onClick={() => handleEdit('activity', activity)}
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8"
                          onClick={() => handleDelete('activity', activity.id, activity.title)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-muted-foreground text-sm">{activity.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );

  const renderArticlesTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-foreground">Articles Management</h2>
        <Button onClick={() => handleAdd('article')}>
          <Plus className="h-4 w-4 mr-2" />
          Add Article
        </Button>
      </div>
      
      {articlesLoading ? (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Card key={i}>
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-64" />
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                  <div className="flex space-x-2">
                    <Skeleton className="h-9 w-9" />
                    <Skeleton className="h-9 w-9" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {articles.map((article) => (
            <Card key={article.id}>
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-semibold text-foreground">{article.title}</h3>
                      {article.featured && (
                        <Badge variant="default">Featured</Badge>
                      )}
                      <Badge variant={article.published ? "default" : "secondary"}>
                        {article.published ? "Published" : "Draft"}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {new Date(article.createdAt!).toLocaleDateString()} • {article.category}
                    </p>
                    <Badge variant="outline" className="mt-1">
                      {article.readTime} min read
                    </Badge>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleEdit('article', article)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleDelete('article', article.id, article.title)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );

  const renderMessagesTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-foreground">Contact Messages</h2>
        <Badge variant="secondary">
          {contactMessages.filter(m => !m.read).length} unread
        </Badge>
      </div>
      
      {messagesLoading ? (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <Skeleton className="h-6 w-1/3 mb-2" />
                <Skeleton className="h-4 w-1/4 mb-4" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {contactMessages.map((message) => (
            <Card key={message.id} className={message.read ? "opacity-75" : ""}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">
                      {message.firstName} {message.lastName}
                    </h3>
                    <p className="text-muted-foreground">{message.email}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(message.createdAt!).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => markAsReadMutation.mutate(message.id)}
                      disabled={message.read}
                    >
                      {message.read ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleDelete('message', message.id, message.subject)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <h4 className="font-medium text-foreground mb-2">{message.subject}</h4>
                <p className="text-muted-foreground">{message.message}</p>
              </CardContent>
            </Card>
          ))}
          
          {contactMessages.length === 0 && (
            <div className="text-center py-12">
              <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No Messages</h3>
              <p className="text-muted-foreground">
                Contact messages will appear here when received.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );

  return (
    <div className="pt-24 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Admin Dashboard</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Manage your portfolio content, skills, experience, and other information
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="profile" className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Profile</span>
            </TabsTrigger>
            <TabsTrigger value="skills" className="flex items-center space-x-2">
              <Code className="h-4 w-4" />
              <span className="hidden sm:inline">Skills</span>
            </TabsTrigger>
            <TabsTrigger value="experience" className="flex items-center space-x-2">
              <Briefcase className="h-4 w-4" />
              <span className="hidden sm:inline">Experience</span>
            </TabsTrigger>
            <TabsTrigger value="education" className="flex items-center space-x-2">
              <GraduationCap className="h-4 w-4" />
              <span className="hidden sm:inline">Education</span>
            </TabsTrigger>
            <TabsTrigger value="articles" className="flex items-center space-x-2">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Articles</span>
            </TabsTrigger>
            <TabsTrigger value="messages" className="flex items-center space-x-2">
              <MessageSquare className="h-4 w-4" />
              <span className="hidden sm:inline">Messages</span>
            </TabsTrigger>
          </TabsList>

          <div className="mt-8">
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="h-5 w-5 mr-2" />
                    Profile Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ProfileForm profile={profile} isLoading={profileLoading} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="skills">
              {renderSkillsTab()}
            </TabsContent>

            <TabsContent value="experience">
              {renderExperiencesTab()}
            </TabsContent>

            <TabsContent value="education">
              {renderEducationTab()}
            </TabsContent>

            <TabsContent value="articles">
              {renderArticlesTab()}
            </TabsContent>

            <TabsContent value="messages">
              {renderMessagesTab()}
            </TabsContent>
          </div>
        </Tabs>

        {/* Modal Forms */}
        {editState.isOpen && editState.type === 'skill' && (
          <SkillForm
            skill={editState.item}
            isOpen={editState.isOpen}
            onClose={closeModal}
          />
        )}

        {editState.isOpen && editState.type === 'experience' && (
          <ExperienceForm
            experience={editState.item}
            isOpen={editState.isOpen}
            onClose={closeModal}
          />
        )}

        {editState.isOpen && editState.type === 'article' && (
          <ArticleForm
            article={editState.item}
            isOpen={editState.isOpen}
            onClose={closeModal}
          />
        )}
      </div>
    </div>
  );
}
