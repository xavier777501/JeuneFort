'use client';

import React from 'react';
import Link from 'next/link';
import { ShoppingBag, ArrowLeft, ArrowRight } from 'lucide-react';

export default function CartPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-6">
      <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-xs">
        <ShoppingBag className="w-10 h-10" />
      </div>
      <h1 className="text-3xl font-black text-slate-900">Votre Panier d'Achat</h1>
      <p className="text-slate-600 max-w-md mx-auto text-sm">
        Votre panier est actuellement vide. Parcourez notre catalogue pour ajouter des poussins, de la provende ou des équipements.
      </p>
      <Link
        href="/produits"
        className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm rounded-xl transition-all shadow-md"
      >
        <span>Découvrir le Catalogue</span>
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}
