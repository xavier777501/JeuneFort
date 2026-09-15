'use client';

import React from 'react';
import Link from 'next/link';

export default function CheckoutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-6">
      <h1 className="text-3xl font-black text-slate-900">Validation de la Commande</h1>
      <p className="text-slate-600 text-sm">
        Ajoutez des articles au panier pour passer votre commande.
      </p>
      <Link href="/produits" className="px-6 py-3 bg-emerald-600 text-white font-bold text-sm rounded-xl inline-block">
        Voir le Catalogue
      </Link>
    </div>
  );
}
