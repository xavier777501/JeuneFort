'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { Product } from '../../types';
import { AvailabilityBadge } from './AvailabilityBadge';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const formattedPrice = new Intl.NumberFormat('fr-BJ', {
    style: 'decimal',
    maximumFractionDigits: 0,
  }).format(product.price);

  return (
    <div className="group flex flex-col bg-white rounded-2xl border border-emerald-950/10 shadow-xs hover:shadow-xl hover:border-emerald-500/30 transition-all duration-300 overflow-hidden h-full">
      {/* Image container */}
      <div className="relative aspect-4/3 w-full bg-slate-100 overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute top-3 left-3">
          <AvailabilityBadge status={product.status} stockQuantity={product.stockQuantity} />
        </div>
        {product.isFeatured && (
          <div className="absolute top-3 right-3 bg-amber-500 text-white text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md shadow-xs">
            Vedette
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700 mb-1">
          {product.categoryName}
        </span>

        <Link href={`/produits/${product.id}`} className="group-hover:text-emerald-700 transition-colors">
          <h3 className="text-base font-bold text-slate-900 line-clamp-2 leading-snug mb-2">
            {product.name}
          </h3>
        </Link>

        <p className="text-slate-600 text-xs line-clamp-2 mb-4 leading-relaxed">
          {product.shortDescription}
        </p>

        {/* Footer info & action */}
        <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          <div>
            <span className="text-xs text-slate-600 font-medium">Prix</span>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-extrabold text-slate-900">{formattedPrice}</span>
              <span className="text-xs font-bold text-emerald-700">FCFA</span>
            </div>
            <span className="text-[11px] text-slate-600">/ {product.unit}</span>
          </div>

          <div className="flex items-center gap-2">
            {onAddToCart && product.status !== 'INDISPONIBLE' && (
              <button
                type="button"
                onClick={() => onAddToCart(product)}
                className="p-2.5 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white transition-colors focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                title="Ajouter au panier"
              >
                <ShoppingBag className="w-5 h-5" />
              </button>
            )}

            <Link
              href={`/produits/${product.id}`}
              className="p-2.5 rounded-xl bg-slate-900 text-white hover:bg-emerald-700 transition-colors inline-flex items-center justify-center"
              title="Voir les détails"
            >
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
