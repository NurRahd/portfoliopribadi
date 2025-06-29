import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import type { Gallery } from "@shared/schema";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="aspect-[4/5] bg-muted animate-pulse rounded-lg" />
      ))}
    </div>
  );
}

function GalleryCard({ gallery, onImageLoad, onPreview }: { gallery: Gallery, onImageLoad?: (id: number, width: number, height: number) => void, onPreview?: (gallery: Gallery) => void }) {
  // Parse tags if it's a JSON string
  let tags: string[] = [];
  if (typeof gallery.tags === 'string') {
    try {
      tags = JSON.parse(gallery.tags || '[]');
      if (!Array.isArray(tags)) tags = [];
    } catch {
      tags = [];
    }
  } else if (Array.isArray(gallery.tags)) {
    tags = gallery.tags;
  }

  return (
    <div className="group relative overflow-hidden rounded-xl bg-card border border-accent/20 shadow-md hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 hover:rotate-1">
      <div className="aspect-[4/5] overflow-hidden cursor-pointer" onClick={() => onPreview && onPreview(gallery)}>
        <img
          src={gallery.imageUrl}
          alt={gallery.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          onLoad={e => {
            if (onImageLoad) {
              const img = e.currentTarget;
              onImageLoad(gallery.id, img.naturalWidth, img.naturalHeight);
            }
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end">
          <div className="p-6 text-white w-full">
            <h3 className="text-xl font-bold mb-2 text-cream-100">{gallery.title}</h3>
            {gallery.description && (
              <p className="text-sm text-cream-200 mb-3 line-clamp-2">{gallery.description}</p>
            )}
            <div className="flex flex-wrap gap-2">
              {tags.map((tag: string, index: number) => (
                <Badge key={index} className="bg-accent/20 text-accent-foreground border border-accent/40 text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
      {gallery.featured && (
        <div className="absolute top-4 right-4 bg-accent text-accent-foreground px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
          ⭐ Featured
        </div>
      )}
    </div>
  );
}

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [imageOrientations, setImageOrientations] = useState<Record<number, "portrait" | "landscape" | "square">>({});
  const [previewGallery, setPreviewGallery] = useState<Gallery | null>(null);

  const { data: galleries = [], isLoading } = useQuery<Gallery[]>({
    queryKey: ["/api/galleries"],
  });

  const categories = [
    { value: "all", label: "Semua" },
    { value: "portrait", label: "Portrait" },
    { value: "landscape", label: "Landscape" },
    { value: "event", label: "Event" },
    { value: "commercial", label: "Commercial" }
  ];

  // Filter galleries by tab
  let displayGalleries = galleries;
  if (selectedCategory !== "all") {
    if (selectedCategory === "portrait") {
      displayGalleries = galleries.filter(gallery =>
        imageOrientations[gallery.id] === "portrait"
      );
    } else if (selectedCategory === "landscape") {
      displayGalleries = galleries.filter(gallery =>
        imageOrientations[gallery.id] === "landscape"
      );
    } else if (selectedCategory === "event" || selectedCategory === "commercial") {
      displayGalleries = galleries.filter(gallery =>
        gallery.category === selectedCategory
      );
    }
  }

  // Get featured galleries
  const featuredGalleries = galleries.filter(gallery => gallery.featured);

  // Handler for image load
  const handleImageLoad = (id: number, width: number, height: number) => {
    setImageOrientations(prev => ({
      ...prev,
      [id]: width === height ? "square" : width > height ? "landscape" : "portrait"
    }));
  };

  if (isLoading) {
    return (
      <div className="pt-24 pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">Gallery Fotografi</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Koleksi karya fotografi terbaik dari berbagai kategori dan momen
            </p>
          </div>
          <LoadingSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Gallery Fotografi</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Koleksi karya fotografi terbaik dari berbagai kategori dan momen berharga
          </p>
        </div>

        {/* Featured Section */}
        {featuredGalleries.length > 0 && selectedCategory === "all" && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">Karya Unggulan</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuredGalleries.slice(0, 2).map((gallery) => {
                let tags: string[] = [];
                if (typeof gallery.tags === 'string') {
                  try {
                    tags = JSON.parse(gallery.tags || '[]');
                    if (!Array.isArray(tags)) tags = [];
                  } catch {
                    tags = [];
                  }
                } else if (Array.isArray(gallery.tags)) {
                  tags = gallery.tags;
                }
                return (
                  <div key={gallery.id} className="group relative overflow-hidden rounded-xl bg-background shadow-xl">
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={gallery.imageUrl}
                        alt={gallery.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
                        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                          <h3 className="text-2xl font-bold mb-2">{gallery.title}</h3>
                          {gallery.description && (
                            <p className="text-gray-200 mb-4">{gallery.description}</p>
                          )}
                          <div className="flex flex-wrap gap-2">
                            {tags.map((tag: string, index: number) => (
                              <Badge key={index} variant="outline" className="border-white/30 text-white">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map((category) => (
            <Button
              key={category.value}
              variant={selectedCategory === category.value ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.value)}
              className="rounded-full"
            >
              {category.label}
            </Button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayGalleries.map((gallery) => (
            <GalleryCard key={gallery.id} gallery={gallery} onImageLoad={handleImageLoad} onPreview={setPreviewGallery} />
          ))}
        </div>

        {displayGalleries.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              Belum ada foto untuk kategori {categories.find(c => c.value === selectedCategory)?.label.toLowerCase()}
            </p>
          </div>
        )}
      </div>

      {/* Preview Modal */}
      {previewGallery && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80" onClick={() => setPreviewGallery(null)}>
          <div className="relative max-w-3xl w-full flex flex-col items-center" onClick={e => e.stopPropagation()}>
            <button className="absolute top-2 right-2 bg-white/80 rounded-full px-3 py-1 text-black font-bold text-lg z-10" onClick={() => setPreviewGallery(null)}>
              &times;
            </button>
            <img src={previewGallery.imageUrl} alt={previewGallery.title} className="max-h-[80vh] w-auto rounded-lg shadow-lg" />
            <div className="mt-4 text-white text-center">
              <h2 className="text-2xl font-bold mb-2">{previewGallery.title}</h2>
              {previewGallery.description && <p className="mb-2">{previewGallery.description}</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}