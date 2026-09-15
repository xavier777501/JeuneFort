import React from 'react';
import Link from 'next/link';
import { Sprout, Phone, Mail, MapPin, ArrowUpRight, ShieldCheck, Truck, Headphones } from 'lucide-react';
import { COMPANY } from '../../lib/config';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      {/* Advantages Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 mb-12 border-b border-slate-800/80">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-900/50 border border-slate-800">
            <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white mb-1">Qualité & Prophylaxie</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Poussins et volailles vaccinés selon les normes vétérinaires béninoises.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-900/50 border border-slate-800">
            <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white mb-1">Livraison Sécurisée</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Livraison à Cotonou, Calavi, Porto-Novo et expédition vers les départements.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-900/50 border border-slate-800">
            <div className="p-3 rounded-xl bg-teal-500/10 text-teal-400">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white mb-1">Accompagnement Technique</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Support et conseils d'ingénieurs avicoles pour maximiser vos rendements.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-white shadow-md">
                <Sprout className="w-5 h-5 text-amber-300" />
              </div>
              <span className="text-xl font-black text-white tracking-tight">JEUNE FORT</span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed pr-4">
              Jeune Fort Agrobusiness est le partenaire de référence au Bénin pour la production avicole,
              la fourniture d'équipements de pointe, la provenderie et le conseil agricole.
            </p>
            <div className="pt-2 flex items-center gap-3 text-xs text-slate-400">
              <span className="inline-flex items-center gap-1 bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full font-medium border border-emerald-500/20">
                🌱 Agrobusiness Bénin
              </span>
              <span className="inline-flex items-center gap-1 bg-amber-500/10 text-amber-400 px-3 py-1 rounded-full font-medium border border-amber-500/20">
                🐔 Aviculture Moderne
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">Navigation</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="text-slate-400 hover:text-emerald-400 transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/produits" className="text-slate-400 hover:text-emerald-400 transition-colors">
                  Catalogue Produits
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-slate-400 hover:text-emerald-400 transition-colors">
                  Services & Devis
                </Link>
              </li>
              <li>
                <Link href="/a-propos" className="text-slate-400 hover:text-emerald-400 transition-colors">
                  Qui sommes-nous ?
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-400 hover:text-emerald-400 transition-colors">
                  Nous contacter
                </Link>
              </li>
            </ul>
          </div>

          {/* Catégories */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">Catégories</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/produits?categorie=poussins" className="text-slate-400 hover:text-emerald-400 transition-colors">
                  Poussins d'un jour
                </Link>
              </li>
              <li>
                <Link href="/produits?categorie=provende" className="text-slate-400 hover:text-emerald-400 transition-colors">
                  Provendes & Aliments
                </Link>
              </li>
              <li>
                <Link href="/produits?categorie=equipements" className="text-slate-400 hover:text-emerald-400 transition-colors">
                  Équipements d'élevage
                </Link>
              </li>
              <li>
                <Link href="/produits?categorie=intrants-sante" className="text-slate-400 hover:text-emerald-400 transition-colors">
                  Intrants & Vaccins
                </Link>
              </li>
              <li>
                <Link href="/produits?categorie=oeufs" className="text-slate-400 hover:text-emerald-400 transition-colors">
                  Œufs de table
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">Contact Bénin</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3 text-slate-400">
                <MapPin className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span>Siège social & Ferme : {COMPANY.address}</span>
              </li>
              <li className="flex items-center gap-3 text-slate-400">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{COMPANY.phone1}</span>
              </li>
              <li className="flex items-center gap-3 text-slate-400">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{COMPANY.email}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Jeune Fort Agrobusiness. Tous droits réservés.</p>
          <div className="flex items-center gap-6">
            <Link href="/admin/login" className="hover:text-amber-400 transition-colors flex items-center gap-1">
              Espace Administration <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
