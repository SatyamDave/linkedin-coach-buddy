import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { Home, Waypoints, LayoutDashboard, Group, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

const navLinks = [
  { href: "/", label: "Home", icon: Home },
  { href: "/map", label: "Map", icon: Waypoints },
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/clusters", label: "Clusters", icon: Group },
];

export function Header() {
  const { pathname } = useLocation();
  const { theme, setTheme } = useTheme();

  return (
    <header className="bg-background border-b p-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold flex items-center gap-2">
        <img src="/logo.svg" alt="LinkedIn Coach Buddy Logo" className="w-8 h-8" />
        <span className="hidden sm:inline">LinkedIn Coach Buddy</span>
      </Link>
      <nav className="flex items-center gap-2">
        {navLinks.map((link) => (
          <Button
            key={link.href}
            variant={pathname === link.href ? "secondary" : "ghost"}
            asChild
            className="transition-all hover:scale-105"
          >
            <Link to={link.href} className="flex items-center gap-2">
              <link.icon className="w-5 h-5" />
              <span className="hidden md:inline">{link.label}</span>
            </Link>
          </Button>
        ))}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className="transition-all hover:scale-105"
        >
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </nav>
    </header>
  );
}
