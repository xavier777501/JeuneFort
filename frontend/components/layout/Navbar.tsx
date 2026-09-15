'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Sprout,
  ShoppingBag,
  Menu,
  X,
  Search,
  User,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';

interface NavbarProps {
  cartItemCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({ cartItemCount = 0 }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: 'Accueil', href: '/' },
    { name: 'Catalogue Produits', href: '/produits' },
    { name: 'Nos Services', href: '/services' },
    { name: 'À propos', href: '/a-propos' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-emerald-950/10 shadow-xs transition-all">
      {/* Navigation Principale (Logo JEUNE FORT direct) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo JEUNE FORT */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-800 flex items-center justify-center text-white shadow-md shadow-emerald-900/20 group-hover:scale-105 transition-transform duration-300">
              <Sprout className="w-6 h-6 text-amber-300 animate-float" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tight text-slate-900 leading-none group-hover:text-emerald-700 transition-colors">
                JEUNE FORT
              </span>
              <span className="text-[10px] font-bold tracking-widest text-emerald-700 uppercase mt-0.5">
                Agrobusiness Bénin
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  isActive(link.href)
                    ? 'bg-emerald-50 text-emerald-800 font-bold shadow-xs'
                    : 'text-slate-700 hover:text-emerald-700 hover:bg-slate-50'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* User actions */}
          <div className="flex items-center gap-3">
            <Link
              href="/produits"
              className="hidden sm:flex p-2.5 text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-xl transition-all duration-200 hover:scale-105"
              title="Rechercher dans le catalogue"
            >
              <Search className="w-5 h-5" />
            </Link>

            <Link
              href="/panier"
              className="relative p-2.5 bg-emerald-600 text-white hover:bg-emerald-700 rounded-xl transition-all duration-200 hover:scale-105 flex items-center gap-2 shadow-sm shadow-emerald-900/20 font-semibold text-sm px-4"
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="hidden sm:inline">Panier</span>
              {cartItemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-amber-500 text-slate-950 font-black text-xs w-5 h-5 rounded-full flex items-center justify-center shadow-xs animate-bounce">
                  {cartItemCount}
                </span>
              )}
            </Link>

            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-2 animate-fade-in-up">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold text-slate-800 hover:bg-emerald-50 hover:text-emerald-800 transition-colors"
            >
              <span>{link.name}</span>
              <ChevronRight className="w-4 h-4 opacity-60" />
            </Link>
          ))}
          <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
            <Link
              href="/admin/login"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-4 py-3 text-sm font-semibold text-slate-700 bg-slate-50 rounded-xl hover:bg-amber-50 hover:text-amber-800 transition-colors"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Espace Administration
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
