import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import type { Service } from "@shared/schema";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera, Code, CheckCircle } from "lucide-react";

function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <Card key={i} className="animate-pulse">
          <CardHeader>
            <div className="h-6 bg-muted rounded w-3/4 mb-2" />
            <div className="h-4 bg-muted rounded w-full" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="h-4 bg-muted rounded w-full" />
              <div className="h-4 bg-muted rounded w-2/3" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function ServiceCard({ service }: { service: Service }) {
  const isPhotography = service.category === "photography";
  let features: string[] = [];
  if (typeof service.features === 'string') {
    try {
      features = JSON.parse(service.features || '[]');
      if (!Array.isArray(features)) features = [];
    } catch {
      features = [];
    }
  } else if (Array.isArray(service.features)) {
    features = service.features;
  }
  
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${isPhotography ? 'bg-amber-100 text-amber-600 dark:bg-amber-900 dark:text-amber-300' : 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300'}`}>
              {isPhotography ? <Camera className="h-6 w-6" /> : <Code className="h-6 w-6" />}
            </div>
            <div>
              <CardTitle className="text-xl group-hover:text-primary transition-colors">
                {service.title}
              </CardTitle>
              <Badge variant={isPhotography ? "secondary" : "outline"} className="mt-1">
                {isPhotography ? "Photography" : "Development"}
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base mb-4">
          {service.description}
        </CardDescription>
        
        {service.price && (
          <div className="mb-4">
            <p className="text-lg font-semibold text-primary">{service.price}</p>
          </div>
        )}

        {features.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Yang Termasuk:</h4>
            <ul className="space-y-2">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <Button className="w-full mt-6" variant={isPhotography ? "default" : "outline"}>
          Konsultasi Gratis
        </Button>
      </CardContent>
    </Card>
  );
}

export default function Services() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const { data: services = [], isLoading } = useQuery<Service[]>({
    queryKey: selectedCategory === "all" 
      ? ["/api/services"] 
      : ["/api/services", { category: selectedCategory }],
  });

  const categories = [
    { value: "all", label: "Semua Layanan" },
    { value: "photography", label: "Photography", icon: Camera },
    { value: "development", label: "Development", icon: Code }
  ];

  if (isLoading) {
    return (
      <div className="pt-24 pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">Layanan Profesional</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Solusi kreatif dan teknologi untuk kebutuhan bisnis Anda
            </p>
          </div>
          <LoadingSkeleton />
        </div>
      </div>
    );
  }

  const displayServices = selectedCategory === "all" ? services : services;
  const photographyServices = services.filter(s => s.category === "photography");
  const developmentServices = services.filter(s => s.category === "development");

  return (
    <div className="pt-24 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Layanan Profesional</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Menggabungkan kreativitas fotografi dengan keahlian teknologi untuk memberikan solusi terbaik bagi klien
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Button
                key={category.value}
                variant={selectedCategory === category.value ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.value)}
                className="rounded-full"
              >
                {Icon && <Icon className="h-4 w-4 mr-2" />}
                {category.label}
              </Button>
            );
          })}
        </div>

        {/* Services Grid */}
        {selectedCategory === "all" ? (
          <div className="space-y-12">
            {/* Photography Services */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Camera className="h-6 w-6 text-amber-600" />
                <h2 className="text-2xl font-bold text-foreground">Layanan Fotografi</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {photographyServices.map((service) => (
                  <ServiceCard key={service.id} service={service} />
                ))}
              </div>
            </div>

            {/* Development Services */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Code className="h-6 w-6 text-blue-600" />
                <h2 className="text-2xl font-bold text-foreground">Layanan Development</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {developmentServices.map((service) => (
                  <ServiceCard key={service.id} service={service} />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        )}

        {displayServices.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              Belum ada layanan untuk kategori yang dipilih
            </p>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-16 text-center bg-muted/50 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Siap Memulai Proyek Bersama?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Hubungi saya untuk konsultasi gratis dan diskusi lebih lanjut tentang kebutuhan proyek Anda. 
            Mari wujudkan visi kreatif dan teknologi Anda bersama-sama.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="rounded-full">
              Konsultasi Gratis
            </Button>
            <Button size="lg" variant="outline" className="rounded-full">
              Lihat Portfolio
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}