import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Switch } from "@/components/ui/switch";
import { 
  LayoutDashboard, 
  FileText, 
  Camera, 
  FolderOpen, 
  MessageSquare, 
  Settings, 
  User, 
  BookOpen,
  Award,
  Activity,
  Plus,
  Edit,
  Trash2,
  Users,
  Eye,
  EyeOff
} from "lucide-react";
import type { 
  Profile, 
  Skill, 
  Experience, 
  Education, 
  Certification, 
  Activity as ActivityType,
  Article,
  ContactMessage,
  Gallery,
  Service,
  Project
} from "@shared/schema";
import { CRUDTable } from "@/components/admin/crud-table";
import { FormComponent, FormField } from "@/components/admin/form-component";
import { useToast } from "@/hooks/use-toast";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  description?: string;
}

function StatCard({ title, value, icon, description }: StatCardProps) {
  return (
    <Card className="bg-card border-border hover:border-primary transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-primary text-lg font-medium">{title}</div>
            <div className="text-3xl font-bold text-foreground mt-2">{value}</div>
            {description && (
              <div className="text-muted-foreground text-sm mt-1">{description}</div>
            )}
          </div>
          <div className="text-primary opacity-80">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface ActivityItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  time: string;
  color: string;
}

function ActivityItem({ icon, title, description, time, color }: ActivityItemProps) {
  return (
    <div className="flex items-start space-x-4 p-4 hover:bg-muted rounded-lg transition-colors">
      <div className={`p-2 rounded-full ${color}`}>
        {icon}
      </div>
      <div className="flex-1">
        <h4 className="text-foreground font-medium">{title}</h4>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
      <div className="text-muted-foreground text-sm">{time}</div>
    </div>
  );
}

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", value: "dashboard" },
  { icon: User, label: "Profile", value: "profile" },
  { icon: BookOpen, label: "Skills", value: "skills" },
  { icon: Activity, label: "Experience", value: "experience" },
  { icon: Activity, label: "Activities", value: "activity" },
  { icon: Award, label: "Certifications", value: "certifications" },
  { icon: FolderOpen, label: "Projects", value: "projects" },
  { icon: FileText, label: "Articles", value: "articles" },
  { icon: Camera, label: "Gallery", value: "gallery" },
  { icon: FolderOpen, label: "Services", value: "services" },
  { icon: MessageSquare, label: "Messages", value: "messages" },
  { icon: Settings, label: "Settings", value: "settings" },
];

export default function Admin() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Fetch all data
  const { data: profile } = useQuery<Profile>({ queryKey: ["/api/profile"] });
  const { data: skills = [] } = useQuery<Skill[]>({ queryKey: ["/api/skills"] });
  const { data: education = [] } = useQuery<Education[]>({ queryKey: ["/api/education"] });
  const { data: experiences = [] } = useQuery<Experience[]>({ queryKey: ["/api/experiences"] });
  const { data: activities = [] } = useQuery<ActivityType[]>({ queryKey: ["/api/activities"] });
  const { data: certifications = [] } = useQuery<Certification[]>({ queryKey: ["/api/certifications"] });
  const { data: projects = [] } = useQuery<Project[]>({ queryKey: ["/api/projects"] });
  const { data: articles = [] } = useQuery<Article[]>({ queryKey: ["/api/articles"] });
  const { data: galleries = [] } = useQuery<Gallery[]>({ queryKey: ["/api/galleries"] });
  const { data: services = [] } = useQuery<Service[]>({ queryKey: ["/api/services"] });
  const { data: messages = [] } = useQuery<ContactMessage[]>({ queryKey: ["/api/contact-messages"] });

  // Mutations
  const createMutation = useMutation({
    mutationFn: async ({ endpoint, data }: { endpoint: string; data: any }) => {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/skills"] });
      queryClient.invalidateQueries();
      setIsFormOpen(false);
      setEditingItem(null);
      toast({
        title: "Success",
        description: "Data created successfully!",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create data. Please try again.",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ endpoint, data }: { endpoint: string; data: any }) => {
      let url = endpoint;
      const cleanData: Record<string, any> = {};
      getFormConfig(activeTab).fields.forEach(f => {
        cleanData[f.name] = f.type === 'number' ? Number(data[f.name]) : data[f.name];
      });
      
      // Handle different endpoint patterns
      if (endpoint === '/api/profile') {
        // Profile doesn't use ID in URL
        url = endpoint;
      } else if (editingItem && editingItem.id) {
        // Other endpoints use ID
        url = `${endpoint}/${editingItem.id}`;
      }
      
      const response = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cleanData),
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/skills"] });
      queryClient.refetchQueries({ queryKey: ["/api/skills"] });
      queryClient.invalidateQueries();
      setIsFormOpen(false);
      setEditingItem(null);
      toast({
        title: "Success",
        description: "Data updated successfully!",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update data. Please try again.",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async ({ endpoint, id }: { endpoint: string; id: number }) => {
      const response = await fetch(`${endpoint}/${id}`, {
        method: 'DELETE',
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });

  const handleCreate = () => {
    setEditingItem(null);
    setIsFormOpen(true);
  };

  const handleEdit = (item: any) => {
    if (!item) return;
    setEditingItem(item);
    setIsFormOpen(true);
  };

  const handleDelete = (item: any) => {
    const endpoint = getEndpointForTab(activeTab);
    deleteMutation.mutate({ endpoint, id: item.id });
  };

  const handleSubmit = (formData: any) => {
    const endpoint = getEndpointForTab(activeTab);
    if (editingItem) {
      // Ambil field yang diperlukan dari formConfig.fields
      const formFields = getFormConfig(activeTab).fields;
      const data: Record<string, any> = {};
      formFields.forEach(f => {
        if (f.type === 'number') {
          data[f.name] = Number(formData[f.name]);
        } else {
          data[f.name] = formData[f.name];
        }
      });
      updateMutation.mutate({ endpoint, data });
      return;
    }
    // Create baru
    createMutation.mutate({ endpoint, data: formData });
  };

  const getEndpointForTab = (tab: string) => {
    switch (tab) {
      case 'profile': return '/api/profile';
      case 'skills': return '/api/skills';
      case 'experience': return '/api/experiences';
      case 'activity': return '/api/activities';
      case 'certifications': return '/api/certifications';
      case 'projects': return '/api/projects';
      case 'articles': return '/api/articles';
      case 'gallery': return '/api/galleries';
      case 'services': return '/api/services';
      case 'messages': return '/api/contact-messages';
      default: return '/api/profile';
    }
  };

  const getFormConfig = (tab: string): { title: string; fields: FormField[] } => {
    switch (tab) {
      case 'profile':
        return {
          title: editingItem ? 'Edit Profile' : 'Create Profile',
          fields: [
            { name: 'fullName', label: 'Full Name', type: 'text', required: true },
            { name: 'position', label: 'Position', type: 'text', required: true },
            { name: 'bio', label: 'Bio', type: 'textarea', required: true },
            { name: 'location', label: 'Location', type: 'text', required: true },
            { name: 'email', label: 'Email', type: 'email', required: true },
            { name: 'phone', label: 'Phone', type: 'text' },
            { name: 'website', label: 'Website', type: 'text' },
            { name: 'profilePhoto', label: 'Profile Photo', type: 'text' },
          ]
        };
      case 'skills':
        return {
          title: editingItem ? 'Edit Skill' : 'Add Skill',
          fields: [
            { name: 'name', label: 'Skill Name', type: 'text', required: true },
            { name: 'category', label: 'Category', type: 'select', required: true, options: ['Photography', 'Development', 'Design', 'Other'] },
            { name: 'proficiency', label: 'Proficiency (%)', type: 'number', required: true, min: 0, max: 100 },
          ]
        };
      case 'experience':
        return {
          title: editingItem ? 'Edit Experience' : 'Add Experience',
          fields: [
            { name: 'title', label: 'Title', type: 'text', required: true },
            { name: 'company', label: 'Company', type: 'text', required: true },
            { name: 'startDate', label: 'Start Date', type: 'text', required: true },
            { name: 'endDate', label: 'End Date', type: 'text' },
            { name: 'description', label: 'Description', type: 'textarea', required: true },
          ]
        };
      case 'activity':
        return {
          title: editingItem ? 'Edit Activity' : 'Add Activity',
          fields: [
            { name: 'title', label: 'Title', type: 'text', required: true },
            { name: 'description', label: 'Description', type: 'textarea', required: true },
            { name: 'date', label: 'Date', type: 'text', required: true },
          ]
        };
      case 'certifications':
        return {
          title: editingItem ? 'Edit Certification' : 'Add Certification',
          fields: [
            { name: 'name', label: 'Certification Name', type: 'text', required: true },
            { name: 'issuer', label: 'Issuer', type: 'text', required: true },
            { name: 'date', label: 'Date', type: 'text', required: true },
            { name: 'description', label: 'Description', type: 'textarea' },
            { name: 'credentialId', label: 'Credential ID', type: 'text' },
          ]
        };
      case 'projects':
        return {
          title: editingItem ? 'Edit Project' : 'Add Project',
          fields: [
            { name: 'title', label: 'Title', type: 'text', required: true },
            { name: 'description', label: 'Description', type: 'textarea', required: true },
            { name: 'imageUrl', label: 'Image URL', type: 'text' },
            { name: 'category', label: 'Category', type: 'text', required: true },
            { name: 'technologies', label: 'Technologies', type: 'text' },
            { name: 'projectUrl', label: 'Project URL', type: 'text' },
            { name: 'githubUrl', label: 'GitHub URL', type: 'text' },
            { name: 'featured', label: 'Featured', type: 'switch' },
          ]
        };
      case 'articles':
        return {
          title: editingItem ? 'Edit Article' : 'Add Article',
          fields: [
            { name: 'title', label: 'Title', type: 'text', required: true },
            { name: 'content', label: 'Content', type: 'textarea', required: true },
            { name: 'excerpt', label: 'Excerpt', type: 'textarea', required: true },
            { name: 'author', label: 'Author', type: 'text', required: true },
            { name: 'publishedAt', label: 'Published Date', type: 'text', required: true },
            { name: 'featuredImage', label: 'Featured Image', type: 'text' },
          ]
        };
      case 'gallery':
        return {
          title: editingItem ? 'Edit Gallery Item' : 'Add Gallery Item',
          fields: [
            { name: 'title', label: 'Title', type: 'text', required: true },
            { name: 'description', label: 'Description', type: 'textarea' },
            { name: 'imageUrl', label: 'Image URL', type: 'text', required: true },
            { name: 'category', label: 'Category', type: 'text' },
            { name: 'tags', label: 'Tags', type: 'text' },
            { name: 'featured', label: 'Featured', type: 'switch' },
          ]
        };
      case 'services':
        return {
          title: editingItem ? 'Edit Service' : 'Add Service',
          fields: [
            { name: 'title', label: 'Title', type: 'text', required: true },
            { name: 'description', label: 'Description', type: 'textarea', required: true },
            { name: 'category', label: 'Category', type: 'text', required: true },
            { name: 'price', label: 'Price', type: 'text' },
            { name: 'imageUrl', label: 'Image URL', type: 'text' },
          ]
        };
      default:
        return {
          title: 'Edit Content',
          fields: []
        };
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <>
            <div className="mb-8">
              <h1 className="text-4xl font-['Playfair_Display'] font-bold text-primary">Dashboard</h1>
              <p className="text-muted-foreground mt-2">Welcome to your portfolio admin panel</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard
                title="Skills"
                value={skills.length}
                icon={<BookOpen className="w-6 h-6" />}
                description="Total skills"
              />
              <StatCard
                title="Experience"
                value={experiences.length}
                icon={<Activity className="w-6 h-6" />}
                description="Work experiences"
              />
              <StatCard
                title="Education"
                value={education.length}
                icon={<Award className="w-6 h-6" />}
                description="Education history"
              />
              <StatCard
                title="Certifications"
                value={certifications.length}
                icon={<Award className="w-6 h-6" />}
                description="Professional certifications"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard
                title="Activities"
                value={activities.length}
                icon={<Activity className="w-6 h-6" />}
                description="Recent activities"
              />
              <StatCard
                title="Articles"
                value={articles.length}
                icon={<FileText className="w-6 h-6" />}
                description="Published articles"
              />
              <StatCard
                title="Gallery"
                value={galleries.length}
                icon={<Camera className="w-6 h-6" />}
                description="Gallery items"
              />
              <StatCard
                title="Services"
                value={services.length}
                icon={<FolderOpen className="w-6 h-6" />}
                description="Services offered"
              />
            </div>

            {/* Recent Activity */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-primary">Recent Activities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activities.slice(0, 5).map((activity) => (
                    <ActivityItem
                      key={activity.id}
                      icon={<Activity className="w-5 h-5" />}
                      title={activity.title}
                      description={activity.description}
                      time={activity.date || 'Recent'}
                      color="bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400"
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </>
        );

      case 'profile':
        return (
          <>
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-4xl font-['Playfair_Display'] font-bold text-primary">Profile</h1>
              <Button onClick={() => handleEdit(profile)} className="bg-primary hover:bg-primary/90" disabled={!profile}>
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            </div>
            {profile && (
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-primary">Profile Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label className="text-primary">Full Name</Label>
                      <p className="text-foreground">{profile.fullName}</p>
                    </div>
                    <div>
                      <Label className="text-primary">Position</Label>
                      <p className="text-foreground">{profile.position}</p>
                    </div>
                    <div>
                      <Label className="text-primary">Email</Label>
                      <p className="text-foreground">{profile.email}</p>
                    </div>
                    <div>
                      <Label className="text-primary">Location</Label>
                      <p className="text-foreground">{profile.location}</p>
                    </div>
                    <div className="md:col-span-2">
                      <Label className="text-primary">Bio</Label>
                      <p className="text-foreground">{profile.bio}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </>
        );

      case 'skills':
        return (
          <>
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-4xl font-['Playfair_Display'] font-bold text-primary">Skills</h1>
              <Button onClick={handleCreate} className="bg-primary hover:bg-primary/90">
                <Plus className="w-4 h-4 mr-2" />
                Add Skill
              </Button>
            </div>
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-primary">Skills Management</CardTitle>
              </CardHeader>
              <CardContent>
                <CRUDTable
                  data={skills}
                  columns={[
                    { key: 'name', label: 'Skill Name' },
                    { key: 'category', label: 'Category' },
                    { 
                      key: 'proficiency', 
                      label: 'Proficiency',
                      render: (skill) => `${skill.proficiency}%`
                    },
                    { key: 'description', label: 'Description' },
                  ]}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              </CardContent>
            </Card>
          </>
        );

      case 'experience':
        return (
          <>
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-4xl font-['Playfair_Display'] font-bold text-primary">Experience</h1>
              <Button onClick={handleCreate} className="bg-primary hover:bg-primary/90">
                <Plus className="w-4 h-4 mr-2" />
                Add Experience
              </Button>
            </div>
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-primary">Experience Management</CardTitle>
              </CardHeader>
              <CardContent>
                <CRUDTable
                  data={experiences}
                  columns={[
                    { key: 'title', label: 'Job Title' },
                    { key: 'company', label: 'Company' },
                    { key: 'startDate', label: 'Start Date' },
                    { key: 'endDate', label: 'End Date' },
                    { key: 'technologies', label: 'Technologies' },
                  ]}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              </CardContent>
            </Card>
          </>
        );

      case 'activity':
        return (
          <>
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-4xl font-['Playfair_Display'] font-bold text-primary">Activities</h1>
              <Button onClick={handleCreate} className="bg-primary hover:bg-primary/90">
                <Plus className="w-4 h-4 mr-2" />
                Add Activity
              </Button>
            </div>
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-primary">Activities Management</CardTitle>
              </CardHeader>
              <CardContent>
                <CRUDTable
                  data={activities}
                  columns={[
                    { key: 'title', label: 'Title' },
                    { key: 'description', label: 'Description' },
                    { key: 'date', label: 'Date' },
                  ]}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              </CardContent>
            </Card>
          </>
        );

      case 'certifications':
        return (
          <>
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-4xl font-['Playfair_Display'] font-bold text-primary">Certifications</h1>
              <Button onClick={handleCreate} className="bg-primary hover:bg-primary/90">
                <Plus className="w-4 h-4 mr-2" />
                Add Certification
              </Button>
            </div>
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-primary">Certifications Management</CardTitle>
              </CardHeader>
              <CardContent>
                <CRUDTable
                  data={certifications}
                  columns={[
                    { key: 'name', label: 'Name' },
                    { key: 'issuer', label: 'Issuer' },
                    { key: 'date', label: 'Date' },
                    { key: 'description', label: 'Description' },
                    { key: 'credentialId', label: 'Credential ID' },
                  ]}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              </CardContent>
            </Card>
          </>
        );

      case 'projects':
        return (
          <>
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-4xl font-['Playfair_Display'] font-bold text-primary">Projects</h1>
              <Button onClick={handleCreate} className="bg-primary hover:bg-primary/90">
                <Plus className="w-4 h-4 mr-2" />
                Add Project
              </Button>
            </div>
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-primary">Projects Management</CardTitle>
              </CardHeader>
              <CardContent>
                <CRUDTable
                  data={articles}
                  columns={[
                    { key: 'title', label: 'Title' },
                    { key: 'category', label: 'Category' },
                    { 
                      key: 'published', 
                      label: 'Status',
                      render: (article) => (
                        <Badge variant={article.published ? "default" : "secondary"}>
                          {article.published ? "Published" : "Draft"}
                        </Badge>
                      )
                    },
                    { 
                      key: 'createdAt', 
                      label: 'Date',
                      render: (article) => new Date(article.createdAt || '').toLocaleDateString()
                    },
                  ]}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              </CardContent>
            </Card>
          </>
        );

      case 'gallery':
        return (
          <>
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-4xl font-['Playfair_Display'] font-bold text-primary">Gallery</h1>
              <Button onClick={handleCreate} className="bg-primary hover:bg-primary/90">
                <Plus className="w-4 h-4 mr-2" />
                Add Photo
              </Button>
            </div>
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-primary">Gallery Management</CardTitle>
              </CardHeader>
              <CardContent>
                <CRUDTable
                  data={galleries}
                  columns={[
                    { key: 'title', label: 'Title' },
                    { key: 'category', label: 'Category' },
                    { 
                      key: 'featured', 
                      label: 'Featured',
                      render: (gallery) => (
                        <Badge variant={gallery.featured ? "default" : "secondary"}>
                          {gallery.featured ? "Featured" : "Regular"}
                        </Badge>
                      )
                    },
                    { key: 'tags', label: 'Tags' },
                  ]}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              </CardContent>
            </Card>
          </>
        );

      case 'services':
        return (
          <>
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-4xl font-['Playfair_Display'] font-bold text-primary">Services</h1>
              <Button onClick={handleCreate} className="bg-primary hover:bg-primary/90">
                <Plus className="w-4 h-4 mr-2" />
                Add Service
              </Button>
            </div>
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-primary">Services Management</CardTitle>
              </CardHeader>
              <CardContent>
                <CRUDTable
                  data={services}
                  columns={[
                    { key: 'title', label: 'Title' },
                    { key: 'category', label: 'Category' },
                    { key: 'price', label: 'Price' },
                    { key: 'description', label: 'Description' },
                  ]}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              </CardContent>
            </Card>
          </>
        );

      case 'messages':
        return (
          <>
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-4xl font-['Playfair_Display'] font-bold text-primary">Messages</h1>
            </div>
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-primary">Contact Messages</CardTitle>
              </CardHeader>
              <CardContent>
                <CRUDTable
                  data={messages}
                  columns={[
                    { 
                      key: 'name', 
                      label: 'Name',
                      render: (message) => `${message.firstName} ${message.lastName}`
                    },
                    { key: 'email', label: 'Email' },
                    { key: 'subject', label: 'Subject' },
                    { 
                      key: 'read', 
                      label: 'Status',
                      render: (message) => (
                        <Badge variant={message.read ? "default" : "secondary"}>
                          {message.read ? "Read" : "Unread"}
                        </Badge>
                      )
                    },
                    { 
                      key: 'createdAt', 
                      label: 'Date',
                      render: (message) => new Date(message.createdAt || '').toLocaleDateString()
                    },
                  ]}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              </CardContent>
            </Card>
          </>
        );

      default:
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-primary mb-4">
              {sidebarItems.find(item => item.value === activeTab)?.label} Management
            </h2>
            <p className="text-muted-foreground">Content management for {activeTab} will be implemented here.</p>
          </div>
        );
    }
  };

  const formConfig = getFormConfig(activeTab);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-card border-r border-border min-h-screen">
          <div className="p-6">
            <h1 className="text-2xl font-['Playfair_Display'] font-bold text-primary">Portfolio</h1>
          </div>
          <nav className="px-4">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.value}
                  onClick={() => setActiveTab(item.value)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg mb-2 transition-all duration-200 ${
                    activeTab === item.value
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-primary"
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {renderTabContent()}
        </div>
      </div>

      {/* Form Modal */}
      {isFormOpen && (activeTab !== 'profile' || profile) && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="form-modal-solid border border-border rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-primary">{formConfig.title}</h2>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setIsFormOpen(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                ✕
              </Button>
            </div>
            <div className="relative z-50">
              <FormComponent 
                fields={formConfig.fields} 
                initialData={activeTab === 'profile' ? (editingItem || profile) : editingItem} 
                onSubmit={handleSubmit}
                isLoading={createMutation.isPending || updateMutation.isPending}
                mode={formConfig.title?.toLowerCase().includes('edit') ? 'edit' : 'create'}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}