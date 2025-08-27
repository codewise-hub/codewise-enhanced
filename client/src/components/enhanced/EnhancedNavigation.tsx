import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useAuth } from "@/hooks/useAuth";
import { 
  Home, 
  BookOpen, 
  Users, 
  Award, 
  Settings,
  School,
  GraduationCap,
  Cpu,
  Phone,
  DollarSign,
  ChevronDown,
  Menu,
  X
} from "lucide-react";

interface EnhancedNavigationProps {
  onAuthModalOpen?: (mode: 'signin' | 'signup', role?: string, ageGroup?: string) => void;
}

export function EnhancedNavigation({ onAuthModalOpen }: EnhancedNavigationProps = {}) {
  const { user } = useAuth();
  const isAuthenticated = !!user;
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    {
      title: "Learning",
      icon: <BookOpen className="w-4 h-4" />,
      items: [
        { title: "Young Coders (6-11)", href: "/learning/6-11", description: "Visual programming for kids" },
        { title: "Teen Coders (12-17)", href: "/learning/12-17", description: "Advanced programming for teens" },
        { title: "Courses", href: "/courses/6-11", description: "Age-appropriate coding courses" },
        { title: "Study Materials", href: "/study-materials/6-11", description: "Resources and guides" }
      ]
    },
    {
      title: "For Schools",
      icon: <School className="w-4 h-4" />,
      items: [
        { title: "Curriculum Integration", href: "/curriculum", description: "CAPS-aligned learning pathways" },
        { title: "Teacher Training", href: "/teacher-training", description: "Professional development programs" }
      ]
    },
    {
      title: "Resources",
      icon: <Award className="w-4 h-4" />,
      items: [
        { title: "Certification", href: "/certification", description: "Industry-recognized credentials" },
        { title: "Competitions", href: "#competitions", description: "Coding contests and challenges" },
        { title: "Help Center", href: "/help", description: "Support and documentation" }
      ]
    }
  ];

  const quickActions = [
    { title: "Pricing", href: "/pricing", icon: <DollarSign className="w-4 h-4" /> }
  ];

  const isActiveRoute = (href: string) => {
    return location === href || (href !== '/' && location.startsWith(href));
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center gap-3 hover:opacity-80 transition-opacity cursor-pointer">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Cpu className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-xl font-bold text-gray-900">CodewiseHub</div>
                <div className="text-xs text-gray-600">Professional STEM Education</div>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <NavigationMenu>
              <NavigationMenuList>
                {navigationItems.map((item) => (
                  <NavigationMenuItem key={item.title}>
                    <NavigationMenuTrigger className="flex items-center gap-2">
                      {item.icon}
                      {item.title}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="grid w-[600px] grid-cols-2 gap-3 p-6">
                        {item.items.map((subItem) => (
                          <Link key={subItem.href} href={subItem.href}>
                            <NavigationMenuLink
                              className={`block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground ${
                                isActiveRoute(subItem.href) ? 'bg-blue-50 text-blue-700' : ''
                              }`}
                            >
                              <div className="text-sm font-medium leading-none">
                                {subItem.title}
                              </div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                {subItem.description}
                              </p>
                            </NavigationMenuLink>
                          </Link>
                        ))}
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>

            {/* Quick Actions */}
            <div className="flex items-center gap-4">
              {quickActions.map((action) => (
                <Link key={action.href} href={action.href}>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`flex items-center gap-2 ${
                      isActiveRoute(action.href) ? 'bg-blue-50 text-blue-700' : ''
                    }`}
                  >
                    {action.icon}
                    {action.title}
                  </Button>
                </Link>
              ))}
            </div>
          </div>

          {/* User Menu / Auth Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">{user?.name}</div>
                  <div className="text-xs text-gray-600 capitalize flex items-center gap-1">
                    {user?.role}
                    {user?.ageGroup && (
                      <Badge variant="outline" className="text-xs px-1 py-0">
                        {user.ageGroup === '6-11' ? 'Little Coder' : 'Teen Coder'}
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                  {user?.name?.charAt(0)?.toUpperCase()}
                </div>
                <Link href="/settings">
                  <Button variant="ghost" size="sm">
                    <Settings className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  data-testid="button-signin"
                  onClick={() => onAuthModalOpen?.('signin')}
                >
                  Sign In
                </Button>
                <Button 
                  size="sm" 
                  data-testid="button-signup"
                  onClick={() => onAuthModalOpen?.('signup')}
                >
                  Get Started
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 py-4">
            <div className="space-y-4">
              {navigationItems.map((item) => (
                <div key={item.title}>
                  <div className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-900">
                    {item.icon}
                    {item.title}
                  </div>
                  <div className="ml-6 space-y-2">
                    {item.items.map((subItem) => (
                      <Link key={subItem.href} href={subItem.href}>
                        <div
                          className={`block px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md ${
                            isActiveRoute(subItem.href) ? 'bg-blue-50 text-blue-700' : ''
                          }`}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {subItem.title}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}

              {/* Mobile Quick Actions */}
              <div className="border-t pt-4">
                {quickActions.map((action) => (
                  <Link key={action.href} href={action.href}>
                    <div
                      className={`flex items-center gap-3 px-3 py-2 text-sm font-medium hover:bg-gray-50 rounded-md ${
                        isActiveRoute(action.href) ? 'bg-blue-50 text-blue-700' : 'text-gray-900'
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {action.icon}
                      {action.title}
                    </div>
                  </Link>
                ))}
              </div>

              {/* Mobile Auth */}
              <div className="border-t pt-4">
                {isAuthenticated ? (
                  <div className="px-3 py-2">
                    <div className="text-sm font-medium text-gray-900">{user?.name}</div>
                    <div className="text-xs text-gray-600 mb-3">{user?.role}</div>
                    <Link href="/settings">
                      <Button variant="ghost" size="sm" className="w-full justify-start">
                        <Settings className="w-4 h-4 mr-2" />
                        Settings
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-2 px-3">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="w-full justify-start"
                      onClick={() => onAuthModalOpen?.('signin')}
                    >
                      Sign In
                    </Button>
                    <Button 
                      size="sm" 
                      className="w-full"
                      onClick={() => onAuthModalOpen?.('signup')}
                    >
                      Get Started
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}