'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import {
  Sparkles,
  LayoutGrid,
  Menu,
  X,
  LayoutDashboard,
  Wand2,
  History,
  BarChart3,
  Users,
  ShieldCheck,
  User,
  LogOut,
  LogIn,
  ChevronDown,
  BookOpen,
  Info,
  Mail,
  HelpCircle,
} from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ThemeToggle } from '@/components/shared/theme-toggle';
import { useAuthStore } from '@/store/authStore';
import { APP_NAME, ROUTES } from '@/constants';
import { cn } from '@/lib/utils';

// ─── 4 public nav links (logged out) ─────────────────────────────────────────
const publicNav = [
  { label: 'Home',      href: ROUTES.HOME },
  { label: 'Templates', href: ROUTES.TEMPLATES, icon: LayoutGrid },
  { label: 'Features',  href: '/#features' },
  { label: 'Pricing',   href: '/#pricing' },
  { label: 'Blog',      href: '/blog',    icon: BookOpen },
  { label: 'About',     href: '/about',   icon: Info },
  { label: 'Contact',   href: '/contact', icon: Mail },
];

// ─── 6 authenticated nav links (logged in) ───────────────────────────────────
const authNavBase = [
  { label: 'Dashboard',    href: ROUTES.DASHBOARD,    icon: LayoutDashboard },
  { label: 'Templates',    href: ROUTES.TEMPLATES,    icon: Sparkles },
  { label: 'AI Generator', href: ROUTES.AI_GENERATOR, icon: Wand2 },
  { label: 'History',      href: ROUTES.HISTORY,      icon: History },
  { label: 'Analytics',    href: ROUTES.ANALYTICS,    icon: BarChart3 },
  { label: 'Team',         href: ROUTES.TEAM,         icon: Users },
];

const adminNavItem = { label: 'Admin', href: ROUTES.ADMIN, icon: ShieldCheck };

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuthStore();

  // Build auth nav — include Admin link only for ADMIN role
  const authNav = [
    ...authNavBase,
    ...(user?.role === 'ADMIN' ? [adminNavItem] : []),
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setIsOpen(false); }, [pathname]);

  const handleLogout = () => { logout(); router.push(ROUTES.LOGIN); };

  const initials = user?.name
    ?.split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const isActive = (href: string) =>
    pathname === href || (href !== '/' && pathname.startsWith(href + '/'));

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-background/95 backdrop-blur-md border-b border-border shadow-sm'
          : 'bg-transparent'
      )}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">

        {/* ── Logo ── */}
        <Link href={ROUTES.HOME} className="flex items-center gap-2.5 font-bold text-lg">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary shadow-sm">
            <Sparkles className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="hidden sm:block">{APP_NAME}</span>
        </Link>

        {/* ── Desktop Nav ── */}
        <div className="hidden items-center gap-0.5 md:flex">
          {isAuthenticated
            ? authNav.map(({ label, href, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    'flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                    isActive(href)
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </Link>
              ))
            : publicNav.map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    'rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                    isActive(href)
                      ? 'text-foreground font-semibold'
                      : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  {label}
                </Link>
              ))}
        </div>

        {/* ── Right Actions ── */}
        <div className="flex items-center gap-2">
          <ThemeToggle />

          {isAuthenticated && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-2 rounded-full pl-1 pr-2 py-1 hover:bg-accent transition-colors outline-none">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden flex-col items-start md:flex">
                  <span className="text-xs font-semibold leading-tight">{user.name}</span>
                  <Badge variant="secondary" className="h-4 px-1 text-[10px]">
                    {user.role}
                  </Badge>
                </div>
                <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52">
                <DropdownMenuItem onClick={() => router.push(ROUTES.PROFILE)}>
                  <User className="mr-2 h-4 w-4" /> Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push(ROUTES.DASHBOARD)}>
                  <LayoutDashboard className="mr-2 h-4 w-4" /> Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push('/help')}>
                  <HelpCircle className="mr-2 h-4 w-4" /> Help Center
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-destructive focus:text-destructive"
                >
                  <LogOut className="mr-2 h-4 w-4" /> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden items-center gap-2 sm:flex">
              <Button variant="ghost" size="sm" onClick={() => router.push(ROUTES.LOGIN)}>
                <LogIn className="mr-1.5 h-4 w-4" /> Login
              </Button>
              <Button size="sm" onClick={() => router.push(ROUTES.REGISTER)}>
                Get Started
              </Button>
            </div>
          )}

          {/* Mobile hamburger */}
          <button
            className="flex h-9 w-9 items-center justify-center rounded-lg hover:bg-accent md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* ── Mobile Menu ── */}
      {isOpen && (
        <div className="border-t border-border bg-background/95 backdrop-blur-md md:hidden">
          <div className="mx-auto max-w-7xl space-y-1 px-4 py-3">
            {isAuthenticated
              ? authNav.map(({ label, href, icon: Icon }) => (
                  <Link
                    key={href}
                    href={href}
                    className={cn(
                      'flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                      isActive(href)
                        ? 'bg-primary/10 text-primary'
                        : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {label}
                  </Link>
                ))
              : publicNav.map(({ label, href, icon: Icon }) => (
                  <Link
                    key={href}
                    href={href}
                    className={cn(
                      'flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                      isActive(href)
                        ? 'bg-primary/10 text-primary'
                        : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                    )}
                  >
                    {Icon && <Icon className="h-4 w-4" />}
                    {label}
                  </Link>
                ))}

            {!isAuthenticated && (
              <div className="flex gap-2 pt-3 border-t border-border mt-2">
                <Button variant="outline" className="flex-1" onClick={() => router.push(ROUTES.LOGIN)}>
                  Login
                </Button>
                <Button className="flex-1" onClick={() => router.push(ROUTES.REGISTER)}>
                  Sign Up
                </Button>
              </div>
            )}

            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-destructive hover:bg-destructive/10 mt-2 border-t border-border pt-3"
              >
                <LogOut className="h-4 w-4" /> Logout
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
