'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  ShoppingBag,
  ArrowLeft,
  ShieldCheck,
  Truck,
  CheckCircle,
  AlertTriangle,
  Minus,
  Plus,
  Share2,
} from 'lucide-react';
import { MOCK_PRODUCTS } from '../../../../lib/mock-data';
import { AvailabilityBadge } from '../../../../components/ui/AvailabilityBadge';
import { ProductCard } from '../../../../components/ui/ProductCard';

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params?.id as string;

  const product = MOCK_PRODUCTS.find((p) => p.id === productId || p.slug === productId) || MOCK_PRODUCTS[0];
  
  const [selectedImage, setSelectedImage] = useState<string>(product.images[0] || '');
  const [quantity, setQuantity] = useState<number>(product.minOrderQuantity || 1);
  const [addedToCartToast, setAddedToCartToast] = useState<boolean>(false);

  const formattedPrice = new Intl.NumberFormat('fr-BJ', {
    style: 'decimal',
    maximumFractionDigits: 0,
  }).format(product.price);

  const totalPrice = new Intl.NumberFormat('fr-BJ', {
    style: 'decimal',
    maximumFractionDigits: 0,
  }).format(product.price * quantity);

  const relatedProducts = MOCK_PRODUCTS.filter(
    (p) => p.categorySlug === product.categorySlug && p.id !== product.id
  ).slice(0, 3);

  const handleAddToCart = () => {
    setAddedToCartToast(true);
    setTimeout(() => setAddedToCartToast(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Fil d'ariane & retour */}
      <div className="flex items-center justify-between animate-fade-in-up">
        <Link
          href="/produits"
          className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-emerald-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Retour au catalogue</span>
        </Link>
        <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
          Réf : {product.id}
        </span>
      </div>

      {/* Grid Fiche Produit */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-sm animate-fade-in-up-delay-1">
        {/* Galerie Photos (US-03) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-xs">
            <img
              src={selectedImage || product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4">
              <AvailabilityBadge status={product.status} stockQuantity={product.stockQuantity} showQuantity />
            </div>
          </div>

          {/* Miniatures */}
          {product.images.length > 1 && (
            <div className="flex items-center gap-3">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedImage(img)}
                  className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                    (selectedImage || product.images[0]) === img
                      ? 'border-emerald-600 ring-2 ring-emerald-500/20'
                      : 'border-slate-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Informations & Achat (US-03, US-05) */}
        <div className="lg:col-span-6 flex flex-col space-y-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              {product.categoryName}
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2 leading-tight">
              {product.name}
            </h1>
          </div>

          {/* Prix & Unité */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-baseline justify-between">
            <div>
              <span className="text-xs text-slate-600 font-semibold block">Prix unitaire</span>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-black text-slate-900">{formattedPrice}</span>
                <span className="text-sm font-bold text-emerald-700">FCFA</span>
                <span className="text-xs text-slate-600 font-medium ml-1">/ {product.unit}</span>
              </div>
            </div>

            {product.minOrderQuantity && product.minOrderQuantity > 1 && (
              <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
                Min. {product.minOrderQuantity} unités
              </span>
            )}
          </div>

          <p className="text-slate-600 text-sm leading-relaxed">
            {product.shortDescription}
          </p>

          {/* Sélecteur de quantité & Total */}
          {product.status !== 'INDISPONIBLE' && (
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Quantité désirée
                </label>
                <span className="text-xs text-slate-600">
                  Total estimé : <strong className="text-slate-900 text-sm">{totalPrice} FCFA</strong>
                </span>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center border border-slate-300 rounded-xl bg-slate-50 p-1">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(product.minOrderQuantity || 1, quantity - 1))}
                    className="p-2 rounded-lg hover:bg-white text-slate-700 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center text-sm font-black text-slate-900">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 rounded-lg hover:bg-white text-slate-700 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="flex-grow py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm transition-all shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span>Ajouter au Panier ({totalPrice} FCFA)</span>
                </button>
              </div>

              {addedToCartToast && (
                <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-2 animate-fade-in-up">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  Produit ajouté au panier avec succès !
                </div>
              )}
            </div>
          )}

          {/* Garanties */}
          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-100 text-xs text-slate-600 font-medium">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Contrôle Vétérinaire Certifié</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-amber-600" />
              <span>Livraison à domicile Bénin</span>
            </div>
          </div>
        </div>
      </div>

      {/* Description complète et Spécifications */}
      <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 space-y-8 animate-fade-in-up-delay-2">
        <h3 className="text-xl font-extrabold text-slate-900 border-b border-slate-100 pb-4">
          Description & Caractéristiques Techniques
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 space-y-4">
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-emerald-700">
              Détails du produit
            </h4>
            <div className="text-slate-600 text-sm whitespace-pre-line leading-relaxed">
              {product.fullDescription}
            </div>
          </div>

          <div className="lg:col-span-5 bg-slate-50 p-6 rounded-2xl border border-slate-200/80 space-y-4">
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-slate-700">
              Fiche Technique
            </h4>
            <dl className="divide-y divide-slate-200/80 text-xs">
              {product.specifications.map((spec, i) => (
                <div key={i} className="py-2.5 flex items-center justify-between">
                  <dt className="text-slate-500 font-medium">{spec.label}</dt>
                  <dd className="text-slate-900 font-extrabold">{spec.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* Produits similaires */}
      {relatedProducts.length > 0 && (
        <div className="space-y-6 animate-fade-in-up-delay-3">
          <h3 className="text-xl font-extrabold text-slate-900">Produits Similaires</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
