import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/toaster";
import { TooltipProvider } from "./components/ui/tooltip";
import { ThemeProvider } from "./components/theme-provider";
import { Navigation } from "./components/navigation";
import { ProtectedRoute } from "./components/ProtectedRoute";
import NotFound from "./pages/not-found";
import Home from "./pages/home";
import Gallery from "./pages/gallery";
import Services from "./pages/services";
import Contact from "./pages/contact";
import Admin from "./pages/admin";
import Login from "./pages/login";
import ServiceDetail from "./pages/service-detail";
import ArticleDetail from "./pages/article-detail";
import Articles from "./pages/articles";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Router>
          <div className="min-h-screen bg-background text-foreground">
            <Navigation />
            <main className="pt-16">
                <Routes>
                  {/* Public routes */}
                  <Route path="/" element={<Home />} />
                  <Route path="/gallery" element={<Gallery />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/services/:id" element={<ServiceDetail />} />
                  <Route path="/articles" element={<Articles />} />
                  <Route path="/articles/:id" element={<ArticleDetail />} />
                  <Route path="/contact" element={<Contact />} />
                  
                  {/* Auth routes */}
                  <Route path="/login" element={<Login />} />
                  
                  {/* Protected admin route */}
                  <Route path="/admin" element={
                    <ProtectedRoute>
                      <Admin />
                    </ProtectedRoute>
                  } />
                  
                  {/* Catch all route */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
            </main>
          </div>
          <Toaster />
          </Router>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
