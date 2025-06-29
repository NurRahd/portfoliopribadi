import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useTheme } from "@/components/theme-provider";
import { Menu, Moon, Sun, Camera, LogIn, LogOut, User } from "lucide-react";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/gallery", label: "Gallery" },
  { href: "/services", label: "Services" },
  { href: "/articles", label: "Articles" },
  { href: "/contact", label: "Contact" },
];

export function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  
  // Check if user is logged in
  useEffect(() => {
    const checkAuth = () => {
      const loggedIn = localStorage.getItem("isAdminLoggedIn") === "true";
      const adminUsername = localStorage.getItem("adminUsername") || "";
      setIsLoggedIn(loggedIn);
      setUsername(adminUsername);
    };

    checkAuth();

    // Listen for storage changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "isAdminLoggedIn") {
        checkAuth();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const handleLogout = () => {
    localStorage.removeItem("isAdminLoggedIn");
    localStorage.removeItem("adminUsername");
    setIsLoggedIn(false);
    setUsername("");
    navigate("/");
  };

  const NavLinks = ({ mobile = false }: { mobile?: boolean }) => (
    <>
      {navItems.map((item) => (
        <Link
          key={item.href}
          to={item.href}
          className={`transition-colors duration-200 ${
            mobile
              ? "block px-3 py-2 rounded-md text-base font-medium hover:bg-accent hover:text-accent-foreground"
              : "text-sm font-medium hover:text-primary"
          } ${
            location.pathname === item.href
              ? mobile
                ? "bg-accent text-accent-foreground"
                : "text-primary"
              : mobile
              ? "text-muted-foreground"
              : "text-muted-foreground"
          }`}
          onClick={mobile ? () => setIsOpen(false) : undefined}
        >
          {item.label}
        </Link>
      ))}
      
      {/* Admin link - only show if logged in */}
      {isLoggedIn && (
        <Link
          to="/admin"
          className={`transition-colors duration-200 ${
            mobile
              ? "block px-3 py-2 rounded-md text-base font-medium hover:bg-accent hover:text-accent-foreground"
              : "text-sm font-medium hover:text-primary"
          } ${
            location.pathname === "/admin"
              ? mobile
                ? "bg-accent text-accent-foreground"
                : "text-primary"
              : mobile
              ? "text-muted-foreground"
              : "text-muted-foreground"
          }`}
          onClick={mobile ? () => setIsOpen(false) : undefined}
        >
          Admin
        </Link>
      )}
    </>
  );

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-accent/20 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center gap-3 group">
            <div className="bg-primary p-2 rounded-lg group-hover:scale-110 transition-transform duration-200">
              <Camera className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-primary leading-tight">Rahd</h1>
              <p className="text-xs text-accent font-medium -mt-1">Photographer & Developer</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-8">
              <NavLinks />
              
              {/* User section */}
              {isLoggedIn ? (
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <User className="w-4 h-4" />
                    <span>{username}</span>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleLogout}
                    className="flex items-center space-x-2"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </Button>
                </div>
              ) : (
                <Link to="/login">
                  <Button variant="outline" size="sm" className="flex items-center space-x-2">
                    <LogIn className="w-4 h-4" />
                    <span>Login</span>
                  </Button>
                </Link>
              )}
              
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="h-9 w-9"
              >
                <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center space-x-4">
            {/* User section */}
            {isLoggedIn ? (
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                  <User className="w-3 h-3" />
                  <span className="hidden sm:inline">{username}</span>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleLogout}
                  className="flex items-center space-x-1"
                >
                  <LogOut className="w-3 h-3" />
                  <span className="hidden sm:inline">Logout</span>
                </Button>
              </div>
            ) : (
              <Link to="/login">
                <Button variant="outline" size="sm" className="flex items-center space-x-2">
                  <LogIn className="w-4 h-4" />
                  <span className="hidden sm:inline">Login</span>
                </Button>
              </Link>
            )}
            
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="h-9 w-9"
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <Menu className="h-4 w-4" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col space-y-1 mt-6">
                  <NavLinks mobile />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
