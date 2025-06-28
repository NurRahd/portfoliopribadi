import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Clock, Eye, Calendar, Search, Filter } from "lucide-react";
import type { Article } from "@shared/schema";

function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-[#0D0D0D]">
      <div className="pt-24 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-[#1A1A1A] rounded-lg overflow-hidden animate-pulse">
                <div className="h-48 bg-[#333]" />
                <div className="p-6 space-y-3">
                  <div className="h-4 bg-[#333] rounded w-3/4" />
                  <div className="h-4 bg-[#333] rounded w-1/2" />
                  <div className="h-4 bg-[#333] rounded w-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ArticleCard({ article }: { article: Article }) {
  return (
    <article className="group bg-[#1A1A1A] rounded-xl overflow-hidden border border-[#333] hover:border-[#DCC6AA] transition-all duration-500 hover:-translate-y-2">
      <div className="aspect-[16/10] overflow-hidden">
        <img 
          src={article.imageUrl || `https://images.unsplash.com/photo-${article.id % 2 === 0 ? '1516035069371-29a1b244cc32' : '1507003211169-0a1dd7228f2d'}?q=80&w=1938&auto=format&fit=crop`}
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <Badge 
            variant="outline" 
            className="border-[#DCC6AA] text-[#DCC6AA] bg-[#DCC6AA]/10"
          >
            {article.category}
          </Badge>
          {article.featured && (
            <Badge className="bg-[#DCC6AA] text-[#0D0D0D] font-semibold">
              Featured
            </Badge>
          )}
        </div>
        
        <h3 className="text-xl font-['Playfair_Display'] font-bold text-white group-hover:text-[#DCC6AA] transition-colors duration-300 line-clamp-2">
          {article.title}
        </h3>
        
        <p className="text-gray-300 text-sm line-clamp-3 leading-relaxed">
          {article.excerpt}
        </p>
        
        <div className="flex items-center justify-between pt-4 border-t border-[#333]">
          <div className="flex items-center space-x-4 text-xs text-gray-400">
            <div className="flex items-center space-x-1">
              <Calendar size={12} />
              <span>{new Date(article.createdAt || '').toLocaleDateString()}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock size={12} />
              <span>{article.readTime} min read</span>
            </div>
          </div>
          
          <Button 
            variant="ghost" 
            size="sm"
            className="text-[#DCC6AA] hover:bg-[#DCC6AA] hover:text-[#0D0D0D] transition-all duration-300"
          >
            Read More →
          </Button>
        </div>
      </div>
    </article>
  );
}

export default function Articles() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  const { data: articles = [], isLoading } = useQuery<Article[]>({
    queryKey: ["/api/articles"],
  });

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  // Filter and sort articles
  const filteredArticles = articles
    .filter(article => article.published)
    .filter(article => 
      searchTerm === "" || 
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(article => 
      selectedCategory === "all" || 
      article.category.toLowerCase() === selectedCategory.toLowerCase()
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "oldest":
          return new Date(a.createdAt || '').getTime() - new Date(b.createdAt || '').getTime();
        case "reading-time":
          return a.readTime - b.readTime;
        case "newest":
        default:
          return new Date(b.createdAt || '').getTime() - new Date(a.createdAt || '').getTime();
      }
    });

  const featuredArticles = filteredArticles.filter(article => article.featured);
  const regularArticles = filteredArticles.filter(article => !article.featured);
  const categories = [...new Set(articles.map(article => article.category))];

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white">
      <div className="pt-24 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-['Playfair_Display'] font-bold text-[#DCC6AA] mb-6">
              Articles & Insights
            </h1>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Exploring the intersection of photography and technology through stories, 
              tutorials, and behind-the-scenes insights from my creative journey.
            </p>
          </div>

          {/* Search and Filter Bar */}
          <div className="bg-[#1A1A1A] rounded-xl border border-[#333] p-6 mb-12">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-[#0D0D0D] border-[#333] text-white placeholder:text-gray-500 focus:border-[#DCC6AA]"
                />
              </div>

              {/* Category Filter */}
              <div className="flex items-center space-x-2">
                <Filter size={18} className="text-gray-400" />
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-40 bg-[#0D0D0D] border-[#333] text-white focus:border-[#DCC6AA]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1A1A1A] border-[#333]">
                    <SelectItem value="all" className="text-white hover:bg-[#333]">All Categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category.toLowerCase()} className="text-white hover:bg-[#333]">
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Sort */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40 bg-[#0D0D0D] border-[#333] text-white focus:border-[#DCC6AA]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent className="bg-[#1A1A1A] border-[#333]">
                  <SelectItem value="newest" className="text-white hover:bg-[#333]">Newest First</SelectItem>
                  <SelectItem value="oldest" className="text-white hover:bg-[#333]">Oldest First</SelectItem>
                  <SelectItem value="reading-time" className="text-white hover:bg-[#333]">Reading Time</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Featured Articles */}
          {featuredArticles.length > 0 && (
            <section className="mb-16">
              <h2 className="text-3xl font-['Playfair_Display'] font-bold text-[#DCC6AA] mb-8 flex items-center">
                <span className="mr-3">✨</span>
                Featured Articles
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {featuredArticles.slice(0, 2).map((article) => (
                  <div key={article.id} className="relative">
                    <ArticleCard article={article} />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Regular Articles */}
          <section>
            <h2 className="text-3xl font-['Playfair_Display'] font-bold text-[#DCC6AA] mb-8">
              All Articles
              <span className="text-gray-400 text-lg font-normal ml-2">
                ({filteredArticles.length} {filteredArticles.length === 1 ? 'article' : 'articles'})
              </span>
            </h2>
            
            {filteredArticles.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-gray-400 text-lg mb-4">No articles found</div>
                <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {regularArticles.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            )}
          </section>

          {/* Newsletter CTA */}
          <section className="mt-20 bg-[#1A1A1A] rounded-xl border border-[#333] p-12 text-center">
            <h3 className="text-3xl font-['Playfair_Display'] font-bold text-[#DCC6AA] mb-4">
              Stay Updated
            </h3>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Get the latest articles and photography insights delivered to your inbox. 
              No spam, just quality content about creativity and technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                placeholder="Enter your email"
                className="flex-1 bg-[#0D0D0D] border-[#333] text-white placeholder:text-gray-500 focus:border-[#DCC6AA]"
              />
              <Button className="bg-[#DCC6AA] hover:bg-[#A08B72] text-[#0D0D0D] font-semibold">
                Subscribe
              </Button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}