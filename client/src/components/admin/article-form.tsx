import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { insertArticleSchema, type Article, type InsertArticle } from "@shared/schema";
import { generateSlug } from "@/lib/types";
import { useState } from "react";

interface ArticleFormProps {
  article?: Article;
  isOpen: boolean;
  onClose: () => void;
}

const categories = [
  "Technology",
  "React",
  "JavaScript",
  "Design",
  "Backend",
  "DevOps",
  "Tutorial",
  "Opinion",
];

export function ArticleForm({ article, isOpen, onClose }: ArticleFormProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [autoSlug, setAutoSlug] = useState(true);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<InsertArticle>({
    resolver: zodResolver(insertArticleSchema),
    defaultValues: article ? {
      title: article.title,
      slug: article.slug,
      excerpt: article.excerpt,
      content: article.content,
      category: article.category,
      readTime: article.readTime,
      imageUrl: article.imageUrl || "",
      published: article.published,
      featured: article.featured,
    } : {
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      category: "Technology",
      readTime: 5,
      imageUrl: "",
      published: false,
      featured: false,
    },
  });

  const title = watch("title");

  // Auto-generate slug when title changes
  if (autoSlug && title && !article) {
    const newSlug = generateSlug(title);
    if (newSlug !== watch("slug")) {
      setValue("slug", newSlug);
    }
  }

  const articleMutation = useMutation({
    mutationFn: async (data: InsertArticle) => {
      const url = article ? `/api/articles/${article.id}` : "/api/articles";
      const method = article ? "PUT" : "POST";
      const response = await apiRequest(method, url, data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: article ? "Article Updated" : "Article Created",
        description: `Article has been ${article ? "updated" : "created"} successfully.`,
      });
      queryClient.invalidateQueries({ queryKey: ["/api/articles"] });
      onClose();
    },
    onError: () => {
      toast({
        title: "Error",
        description: `Failed to ${article ? "update" : "create"} article. Please try again.`,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertArticle) => {
    articleMutation.mutate(data);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{article ? "Edit Article" : "Add New Article"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              {...register("title")}
              className="mt-2"
            />
            {errors.title && (
              <p className="text-sm text-destructive mt-1">{errors.title.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="slug">Slug</Label>
            <Input
              id="slug"
              {...register("slug")}
              className="mt-2"
              onChange={(e) => {
                setAutoSlug(false);
                setValue("slug", e.target.value);
              }}
            />
            {errors.slug && (
              <p className="text-sm text-destructive mt-1">{errors.slug.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="category">Category</Label>
              <Select
                defaultValue={watch("category")}
                onValueChange={(value) => setValue("category", value)}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.category && (
                <p className="text-sm text-destructive mt-1">{errors.category.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="readTime">Read Time (minutes)</Label>
              <Input
                id="readTime"
                type="number"
                {...register("readTime", { valueAsNumber: true })}
                className="mt-2"
              />
              {errors.readTime && (
                <p className="text-sm text-destructive mt-1">{errors.readTime.message}</p>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="imageUrl">Image URL</Label>
            <Input
              id="imageUrl"
              {...register("imageUrl")}
              className="mt-2"
              placeholder="https://example.com/image.jpg"
            />
            {errors.imageUrl && (
              <p className="text-sm text-destructive mt-1">{errors.imageUrl.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="excerpt">Excerpt</Label>
            <Textarea
              id="excerpt"
              rows={3}
              {...register("excerpt")}
              className="mt-2 resize-none"
            />
            {errors.excerpt && (
              <p className="text-sm text-destructive mt-1">{errors.excerpt.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              rows={8}
              {...register("content")}
              className="mt-2 resize-none"
            />
            {errors.content && (
              <p className="text-sm text-destructive mt-1">{errors.content.message}</p>
            )}
          </div>

          <div className="flex space-x-6">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="published"
                {...register("published")}
              />
              <Label htmlFor="published">Published</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="featured"
                {...register("featured")}
              />
              <Label htmlFor="featured">Featured</Label>
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={articleMutation.isPending}
              className="bg-primary hover:bg-primary/90"
            >
              {articleMutation.isPending ? (
                <div className="loading-dots">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              ) : (
                article ? "Update Article" : "Add Article"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
