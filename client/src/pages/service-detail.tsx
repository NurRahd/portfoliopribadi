import { useQuery } from "@tanstack/react-query";
import { useParams, useLocation } from "wouter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, ArrowLeft } from "lucide-react";
import type { Service } from "@shared/schema";

export default function ServiceDetail() {
  const [params, setLocation] = useLocation();
  const { id } = useParams<{ id: string }>();

  const { data: services = [], isLoading } = useQuery<Service[]>({
    queryKey: ["/api/services"],
  });

  const service = services.find(s => String(s.id) === id);

  if (isLoading) {
    return <div className="text-center py-24 text-lg">Loading...</div>;
  }

  if (!service) {
    return <div className="text-center py-24 text-lg text-destructive">Layanan tidak ditemukan.</div>;
  }

  const isPhotography = service.category.toLowerCase() === "photography";
  const features = typeof service.features === 'string' ? (() => { try { const arr = JSON.parse(service.features || '[]'); return Array.isArray(arr) ? arr : []; } catch { return []; } })() : Array.isArray(service.features) ? service.features : [];

  return (
    <div className="pt-24 pb-12 min-h-screen bg-background text-foreground">
      <div className="max-w-2xl mx-auto px-4">
        <Button variant="ghost" className="mb-6" onClick={() => setLocation('/services')}>
          <ArrowLeft className="w-4 h-4 mr-2" /> Kembali ke Layanan
        </Button>
        <Card className="shadow-lg border-2 border-primary/20">
          <CardHeader>
            <CardTitle className="text-3xl font-bold mb-2 text-primary">{service.title}</CardTitle>
            <Badge variant={isPhotography ? "secondary" : "outline"} className="mb-2">
              {isPhotography ? "Photography" : "Development"}
            </Badge>
          </CardHeader>
          <CardContent>
            <p className="text-lg mb-4">{service.description}</p>
            {service.price && (
              <div className="mb-4">
                <span className="text-xl font-semibold text-primary">{service.price}</span>
              </div>
            )}
            {features.length > 0 && (
              <div className="mb-4">
                <h4 className="font-medium text-base text-muted-foreground uppercase tracking-wide mb-2">Yang Termasuk:</h4>
                <ul className="space-y-2">
                  {features.map((feature: string, idx: number) => (
                    <li key={idx} className="flex items-center gap-2 text-base">
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
      </div>
    </div>
  );
} 