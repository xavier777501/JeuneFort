'use client';

import React from 'react';
import Link from 'next/link';
import { User, ArrowRight } from 'lucide-react';

export default function AccountPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-6">
      <div className="w-20 h-20 bg-slate-100 text-slate-700 rounded-full flex items-center justify-center mx-auto shadow-xs">
        <User className="w-10 h-10" />
      </div>
      <h1 className="text-3xl font-black text-slate-900">Espace Client</h1>
      <p className="text-slate-600 max-w-md mx-auto text-sm">
        Connectez-vous pour suivre l'état de vos commandes de poussins et de provendes.
      </p>
      <Link
        href="/produits"
        className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm rounded-xl transition-all shadow-md"
      >
        <span>Retourner au Catalogue</span>
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}
