import { useParams, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Article } from "@shared/schema";

export default function ArticleDetail() {
  const [, setLocation] = useLocation();
  const { data: articles = [], isLoading } = useQuery<Article[]>({
    queryKey: ["/api/articles"],
  });
  
  // Get article ID from URL
  const currentPath = window.location.pathname;
  const articleId = currentPath.split('/').pop();
  const article = articles.find((a) => String(a.id) === String(articleId));

  if (isLoading) return <div className="min-h-screen bg-[#0D0D0D] text-white flex items-center justify-center">Loading...</div>;
  if (!article) return <div className="min-h-screen bg-[#0D0D0D] text-white flex items-center justify-center">Artikel tidak ditemukan.</div>;

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white pt-24 pb-16 px-6">
      <div className="max-w-3xl mx-auto">
        <button onClick={() => setLocation('/articles')} className="mb-8 flex items-center text-[#DCC6AA] hover:underline">
          <ArrowLeft className="mr-2" /> Kembali
        </button>
        <img
          src={article.imageUrl || `https://images.unsplash.com/photo-${article.id % 2 === 0 ? '1516035069371-29a1b244cc32' : '1507003211169-0a1dd7228f2d'}?q=80&w=1938&auto=format&fit=crop`}
          alt={article.title}
          className="w-full h-72 object-cover rounded-xl mb-8"
        />
        <Badge className="mb-4 bg-[#DCC6AA] text-[#0D0D0D] font-semibold">{article.category}</Badge>
        <h1 className="text-4xl font-['Playfair_Display'] font-bold mb-4">{article.title}</h1>
        <div className="flex items-center space-x-6 text-gray-400 mb-8">
          <div className="flex items-center space-x-2">
            <Calendar size={16} />
            <span>{new Date(article.createdAt || '').toLocaleDateString()}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock size={16} />
            <span>{article.readTime} min read</span>
          </div>
        </div>
        <div className="prose prose-invert max-w-none text-lg leading-relaxed" dangerouslySetInnerHTML={{ __html: article.content || article.excerpt }} />
      </div>
    </div>
  );
} 