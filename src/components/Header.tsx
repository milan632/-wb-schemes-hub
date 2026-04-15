import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search } from 'lucide-react';
import { cn } from '../lib/utils';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function Header({ searchQuery, setSearchQuery }: HeaderProps) {
  const location = useLocation();

  const navItems = [
    { name: 'Govt Schemes', path: '/' },
    { name: 'Scholarships', path: '/scholarships' },
    { name: 'Favourites', path: '/favourites' },
  ];

  return (
    <header className="w-full bg-white border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 space-y-4">
        {/* Logo and Search Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">WB</span>
            </div>
            <h1 className="font-bold text-text-dark text-lg leading-tight">
              WB Schemes Hub
            </h1>
          </Link>

          <div className="relative w-full md:w-96 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted opacity-40 group-focus-within:opacity-100 transition-opacity" />
            <input
              type="text"
              placeholder="Search schemes by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-2.5 bg-gray-50 border border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-text-dark placeholder:text-text-muted/60 font-medium"
            />
          </div>
        </div>

        {/* Tabs Navigation */}
        <nav className="flex border-b border-border -mb-4">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex-1 md:flex-none text-center md:px-8 py-3 text-sm font-bold transition-all relative",
                  isActive
                    ? "text-primary"
                    : "text-text-muted hover:text-text-dark"
                )}
              >
                {item.name}
                {isActive && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-t-full" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
