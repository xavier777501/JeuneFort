'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  Search,
  Filter,
  SlidersHorizontal,
  X,
  Package,
  ArrowUpDown,
  CheckCircle2,
} from 'lucide-react';
import { MOCK_CATEGORIES, MOCK_PRODUCTS } from '../../../lib/mock-data';
import { ProductStatus } from '../../../types';
import { ProductCard } from '../../../components/ui/ProductCard';

function ProductCatalogContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('categorie') || 'all';

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'name'>('featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  useEffect(() => {
    const cat = searchParams.get('categorie');
    if (cat) {
      setSelectedCategory(cat);
    }
  }, [searchParams]);

  // Filtrage et tri des produits
  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter((product) => {
      // Filtre catégorie
      if (selectedCategory !== 'all' && product.categorySlug !== selectedCategory) {
        return false;
      }
      // Filtre statut
      if (selectedStatus !== 'all' && product.status !== selectedStatus) {
        return false;
      }
      // Recherche
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesDesc = product.shortDescription.toLowerCase().includes(query);
        const matchesCat = product.categoryName.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc && !matchesCat) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [selectedCategory, selectedStatus, searchQuery, sortBy]);

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedStatus('all');
    setSearchQuery('');
    setSortBy('featured');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header du catalogue */}
      <div className="space-y-2 border-b border-slate-200 pb-6 animate-fade-in-up">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          Agrobusiness & Aviculture Bénin
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900">
          Catalogue des Produits & Intrants
        </h1>
        <p className="text-slate-600 text-sm max-w-3xl">
          Découvrez notre sélection certifiée de poussins d'un jour, d'aliments équilibrés, d'équipements automatiques et de produits vétérinaires.
        </p>
      </div>

      {/* Barre de recherche et contrôles rapides */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-xs animate-fade-in-up-delay-1">
        {/* Recherche instantanée (US-04) */}
        <div className="relative w-full md:w-96">
          <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher (ex: Goliath, Provende, Mangeoire)..."
            className="w-full pl-11 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all text-slate-900 placeholder:text-slate-400"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
          {/* Bouton filtre mobile */}
          <button
            type="button"
            onClick={() => setMobileFilterOpen(true)}
            className="md:hidden flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 text-slate-800 text-sm font-semibold hover:bg-slate-200 transition-colors"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Filtres</span>
          </button>

          {/* Tri par prix / vedettes */}
          <div className="flex items-center gap-2">
            <ArrowUpDown className="w-4 h-4 text-slate-500 shrink-0" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-semibold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
            >
              <option value="featured">Tri : En vedette</option>
              <option value="price-asc">Prix : Croissant</option>
              <option value="price-desc">Prix : Décroissant</option>
              <option value="name">Nom : A à Z</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grille principale avec filtres latéraux */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 animate-fade-in-up-delay-2">
        {/* Sidebar des Filtres (Desktop) */}
        <aside className="hidden md:block space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
                <Filter className="w-4 h-4 text-emerald-600" />
                Filtres du catalogue
              </h3>
              {(selectedCategory !== 'all' || selectedStatus !== 'all' || searchQuery !== '') && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="text-xs text-rose-600 hover:underline font-semibold"
                >
                  Réinitialiser
                </button>
              )}
            </div>

            {/* Filtre par Catégorie (US-02) */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Catégories
              </label>
              <div className="space-y-1">
                <button
                  type="button"
                  onClick={() => setSelectedCategory('all')}
                  className={`w-full text-left px-3 py-2 rounded-xl text-sm font-medium transition-colors flex items-center justify-between ${
                    selectedCategory === 'all'
                      ? 'bg-emerald-50 text-emerald-800 font-bold border border-emerald-200'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>Toutes les catégories</span>
                  <span className="text-xs text-slate-600">({MOCK_PRODUCTS.length})</span>
                </button>

                {MOCK_CATEGORIES.map((cat) => {
                  const count = MOCK_PRODUCTS.filter((p) => p.categorySlug === cat.slug).length;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSelectedCategory(cat.slug)}
                      className={`w-full text-left px-3 py-2 rounded-xl text-sm font-medium transition-colors flex items-center justify-between ${
                        selectedCategory === cat.slug
                          ? 'bg-emerald-50 text-emerald-800 font-bold border border-emerald-200'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span>{cat.name}</span>
                      <span className="text-xs text-slate-600">({count})</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Filtre par Statut de Stock (US-05) */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Disponibilité
              </label>
              <div className="space-y-1 text-sm font-medium">
                {[
                  { value: 'all', label: 'Tous les statuts' },
                  { value: 'EN_STOCK', label: '🟢 En stock immédiatement' },
                  { value: 'SUR_COMMANDE', label: '🟡 Sur commande' },
                  { value: 'INDISPONIBLE', label: '🔴 Indisponible' },
                ].map((item) => (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => setSelectedStatus(item.value)}
                    className={`w-full text-left px-3 py-2 rounded-xl transition-colors flex items-center gap-2 ${
                      selectedStatus === item.value
                        ? 'bg-slate-900 text-white font-bold'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Liste des produits */}
        <main className="md:col-span-3 space-y-6">
          {/* Entête du nombre de résultats */}
          <div className="flex items-center justify-between text-sm text-slate-600">
            <span>
              Affichage de <strong className="text-slate-900">{filteredProducts.length}</strong> produit(s)
            </span>
            {selectedCategory !== 'all' && (
              <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full text-xs font-semibold">
                Filtre : {MOCK_CATEGORIES.find((c) => c.slug === selectedCategory)?.name}
                <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedCategory('all')} />
              </span>
            )}
          </div>

          {/* Grille de cartes */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-4">
              <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <Package className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Aucun produit ne correspond à votre recherche</h3>
              <p className="text-slate-500 text-sm max-w-md mx-auto">
                Essayez de modifier vos termes de recherche ou de réinitialiser les filtres par catégorie.
              </p>
              <button
                type="button"
                onClick={resetFilters}
                className="px-6 py-2.5 bg-emerald-600 text-white font-bold text-xs rounded-xl hover:bg-emerald-700 transition-colors"
              >
                Réinitialiser tous les filtres
              </button>
            </div>
          )}
        </main>
      </div>

      {/* Drawer mobile pour filtres */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex justify-end">
          <div className="w-full max-w-xs bg-white h-full p-6 space-y-6 overflow-y-auto animate-in slide-in-from-right">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="font-extrabold text-slate-900">Filtres</h3>
              <button type="button" onClick={() => setMobileFilterOpen(false)} className="p-2 text-slate-500">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Catégories</h4>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('all');
                  setMobileFilterOpen(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-xl text-sm ${
                  selectedCategory === 'all' ? 'bg-emerald-600 text-white font-bold' : 'text-slate-700'
                }`}
              >
                Toutes les catégories
              </button>
              {MOCK_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    setSelectedCategory(cat.slug);
                    setMobileFilterOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-xl text-sm ${
                    selectedCategory === cat.slug ? 'bg-emerald-600 text-white font-bold' : 'text-slate-700'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ProductCatalogPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-slate-500">Chargement du catalogue...</div>}>
      <ProductCatalogContent />
    </Suspense>
  );
}
