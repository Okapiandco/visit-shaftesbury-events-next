"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Plus, Menu, X } from 'lucide-react';
import { useState } from 'react';

const Header = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { path: '/', label: 'HOME' },
    { path: '/events', label: "WHAT'S ON" },
    { path: '/directory', label: 'DIRECTORY' },
    { path: '/venues', label: 'VENUES' },
    { path: '/travel', label: 'TRAVEL' },
    { path: '/about', label: 'ABOUT' },
  ];

  const isActive = (path: string) => pathname === path || (path !== '/' && pathname.startsWith(path));

  return (
    <header className="sticky top-0 z-50 w-full bg-background border-b-2 border-gold/30">
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <img
              src="/logo.png"
              alt="Visit Shaftesbury"
              className="h-14 w-14 object-contain"
            />
            <div className="flex flex-col">
              <span className="text-xs tracking-[0.3em] text-racing-green font-semibold uppercase">
                Visit
              </span>
              <span className="text-2xl font-display font-bold tracking-tight text-navy -mt-1">
                SHAFTESBURY
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map(({ path, label }) => (
              <Link
                key={path}
                href={path}
                className={`text-sm font-medium tracking-wide transition-colors hover:text-navy ${
                  isActive(path)
                    ? 'text-navy border-b-2 border-gold pb-1'
                    : 'text-muted-foreground'
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-4">
            <Link href="/submit">
              <Button variant="outline" size="default" className="gap-2 uppercase tracking-wide text-xs border-navy text-navy hover:bg-navy hover:text-white">
                <Plus className="h-4 w-4" />
                Submit Event
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-border py-6 animate-fade-in">
            <nav className="flex flex-col gap-4">
              {navLinks.map(({ path, label }) => (
                <Link
                  key={path}
                  href={path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-sm font-medium tracking-wide py-2 ${
                    isActive(path) ? 'text-navy' : 'text-muted-foreground'
                  }`}
                >
                  {label}
                </Link>
              ))}
              <Link
                href="/submit"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium tracking-wide py-2 text-muted-foreground"
              >
                ADD EVENT
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
