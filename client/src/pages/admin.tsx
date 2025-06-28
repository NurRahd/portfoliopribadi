import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
  Users
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
  Service
} from "@shared/schema";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  description?: string;
}

function StatCard({ title, value, icon, description }: StatCardProps) {
  return (
    <Card className="bg-[#1A1A1A] border-[#333] hover:border-[#DCC6AA] transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[#DCC6AA] text-lg font-medium">{title}</div>
            <div className="text-3xl font-bold text-white mt-2">{value}</div>
            {description && (
              <div className="text-gray-400 text-sm mt-1">{description}</div>
            )}
          </div>
          <div className="text-[#DCC6AA] opacity-80">
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
    <div className="flex items-start space-x-4 p-4 hover:bg-[#0D0D0D] rounded-lg transition-colors">
      <div className={`p-2 rounded-full ${color}`}>
        {icon}
      </div>
      <div className="flex-1">
        <h4 className="text-white font-medium">{title}</h4>
        <p className="text-gray-400 text-sm">{description}</p>
      </div>
      <div className="text-gray-500 text-sm">{time}</div>
    </div>
  );
}

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", value: "dashboard" },
  { icon: FileText, label: "Articles", value: "articles" },
  { icon: Camera, label: "Gallery", value: "gallery" },
  { icon: FolderOpen, label: "Projects", value: "projects" },
  { icon: MessageSquare, label: "Messages", value: "messages" },
  { icon: Settings, label: "Settings", value: "settings" },
  { icon: User, label: "Profile", value: "profile" },
  { icon: BookOpen, label: "Skills", value: "skills" },
  { icon: Award, label: "Education", value: "education" },
  { icon: Activity, label: "Experience", value: "experience" },
  { icon: Activity, label: "Activity", value: "activity" },
];

export default function Admin() {
  const [activeTab, setActiveTab] = useState("dashboard");

  // Fetch all data for dashboard stats
  const { data: articles = [] } = useQuery<Article[]>({ queryKey: ["/api/articles"] });
  const { data: galleries = [] } = useQuery<Gallery[]>({ queryKey: ["/api/galleries"] });
  const { data: messages = [] } = useQuery<ContactMessage[]>({ queryKey: ["/api/contact-messages"] });
  const { data: services = [] } = useQuery<Service[]>({ queryKey: ["/api/services"] });

  const publishedArticles = articles.filter(article => article.published);
  const unreadMessages = messages.filter(message => !message.read);

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-[#1A1A1A] border-r border-[#333] min-h-screen">
          <div className="p-6">
            <h1 className="text-2xl font-['Playfair_Display'] font-bold text-[#DCC6AA]">Portfolio</h1>
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
                      ? "bg-[#DCC6AA] text-[#0D0D0D]"
                      : "text-gray-300 hover:bg-[#0D0D0D] hover:text-[#DCC6AA]"
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
          {activeTab === "dashboard" && (
            <>
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h1 className="text-4xl font-['Playfair_Display'] font-bold text-[#DCC6AA]">Dashboard</h1>
                  <p className="text-gray-400 mt-2">Welcome back, Admin 👋</p>
                </div>
                <div className="flex items-center space-x-2 text-white">
                  <Users className="w-5 h-5" />
                  <span>Welcome back, Admin</span>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard
                  title="Total Photos"
                  value={galleries.length}
                  icon={<Camera size={32} />}
                />
                <StatCard
                  title="Published Articles"
                  value={publishedArticles.length}
                  icon={<FileText size={32} />}
                />
                <StatCard
                  title="Active Projects"
                  value={services.length}
                  icon={<FolderOpen size={32} />}
                />
                <StatCard
                  title="Unread Messages"
                  value={unreadMessages.length}
                  icon={<MessageSquare size={32} />}
                />
              </div>

              {/* Recent Activity */}
              <Card className="bg-[#1A1A1A] border-[#333]">
                <CardHeader>
                  <CardTitle className="text-[#DCC6AA] text-xl">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="space-y-2">
                    <ActivityItem
                      icon={<Plus size={16} className="text-white" />}
                      title="New photo added to Portfolio"
                      description="Added new landscape photography to gallery"
                      time="2 hours ago"
                      color="bg-green-600"
                    />
                    <ActivityItem
                      icon={<Edit size={16} className="text-white" />}
                      title="Article 'Web Design Trends' updated"
                      description="Updated content and featured image"
                      time="5 hours ago"
                      color="bg-yellow-600"
                    />
                    <ActivityItem
                      icon={<MessageSquare size={16} className="text-white" />}
                      title="New contact form submission"
                      description="Client inquiry about photography services"
                      time="1 day ago"
                      color="bg-blue-600"
                    />
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {activeTab === "articles" && (
            <>
              <div className="flex items-center justify-between mb-8">
                <h1 className="text-4xl font-['Playfair_Display'] font-bold text-[#DCC6AA]">Articles</h1>
                <Button className="bg-green-600 hover:bg-green-700 text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  New Article
                </Button>
              </div>

              <Card className="bg-[#1A1A1A] border-[#333]">
                <CardHeader>
                  <CardTitle className="text-[#DCC6AA]">Articles Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-[#333]">
                          <th className="text-left text-[#DCC6AA] font-medium py-3">Title</th>
                          <th className="text-left text-[#DCC6AA] font-medium py-3">Category</th>
                          <th className="text-left text-[#DCC6AA] font-medium py-3">Status</th>
                          <th className="text-left text-[#DCC6AA] font-medium py-3">Date</th>
                          <th className="text-left text-[#DCC6AA] font-medium py-3">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {articles.slice(0, 5).map((article) => (
                          <tr key={article.id} className="border-b border-[#333]/50">
                            <td className="py-4 text-white">{article.title}</td>
                            <td className="py-4 text-gray-300">{article.category}</td>
                            <td className="py-4">
                              <Badge 
                                variant={article.published ? "default" : "secondary"}
                                className={article.published ? "bg-green-600" : "bg-gray-600"}
                              >
                                {article.published ? "Published" : "Draft"}
                              </Badge>
                            </td>
                            <td className="py-4 text-gray-300">
                              {new Date(article.createdAt || '').toLocaleDateString()}
                            </td>
                            <td className="py-4">
                              <div className="flex space-x-2">
                                <Button size="sm" variant="outline" className="border-[#DCC6AA] text-[#DCC6AA] hover:bg-[#DCC6AA] hover:text-[#0D0D0D]">
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button size="sm" variant="outline" className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white">
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {/* Add other tab content here */}
          {activeTab !== "dashboard" && activeTab !== "articles" && (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-[#DCC6AA] mb-4">
                {sidebarItems.find(item => item.value === activeTab)?.label} Management
              </h2>
              <p className="text-gray-400">Content management for {activeTab} will be implemented here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}