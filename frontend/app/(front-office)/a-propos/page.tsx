import React from 'react';
import Link from 'next/link';
import {
  Target,
  Users,
  Sprout,
  Award,
  ShieldCheck,
  ArrowRight,
  MapPin,
  Phone,
} from 'lucide-react';

const VALEURS = [
  {
    icon: ShieldCheck,
    title: 'Qualité Certifiée',
    description: 'Nos poussins proviennent de reproducteurs rigoureusement sélectionnés et nos produits respectent les normes sanitaires en vigueur.',
    color: 'emerald',
  },
  {
    icon: Target,
    title: 'Résultats Mesurables',
    description: 'Nous accompagnons chaque éleveur avec des indicateurs de performance concrets : GMQ, taux de ponte, indice de consommation.',
    color: 'teal',
  },
  {
    icon: Users,
    title: 'Expertise Terrain',
    description: 'Ingénieurs agronomes et techniciens vétérinaires présents sur le terrain pour un accompagnement au plus proche de vos réalités.',
    color: 'amber',
  },
  {
    icon: Sprout,
    title: 'Impact Local',
    description: 'Engagés pour la souveraineté alimentaire du Bénin, nous contribuons à structurer une filière avicole moderne et rentable.',
    color: 'emerald',
  },
];

const CHIFFRES = [
  { value: '+50 000', label: 'Poussins livrés', sublabel: 'par cycle de production' },
  { value: '100%', label: 'Souches certifiées', sublabel: 'vaccinées à l\'éclosion' },
  { value: '4', label: 'Services d\'expertise', sublabel: 'personnalisés' },
  { value: '24/7', label: 'Support Technique', sublabel: 'disponible' },
];

export default function AProposPage() {
  return (
    <div className="space-y-20 pb-20">
      {/* HERO */}
      <section className="bg-slate-900 text-white pt-14 pb-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center animate-fade-in-up">
            <div className="space-y-6">
              <span className="inline-block text-xs font-bold tracking-widest text-amber-400 uppercase bg-amber-400/10 border border-amber-400/20 px-4 py-2 rounded-full">
                À Propos de Jeune Fort Agrobusiness
              </span>
              <h1 className="text-4xl sm:text-5xl font-black leading-tight text-white">
                Bâtir l'Avenir de l'Élevage Avicole au{' '}
                <span className="text-emerald-400">Bénin</span>.
              </h1>
              <p className="text-slate-300 text-base leading-relaxed">
                Fondée par une équipe de passionnés d'agronomie et d'aviculture,{' '}
                <strong className="text-white">Jeune Fort Agrobusiness</strong> s'impose comme une entreprise pionnière engagée pour la souveraineté alimentaire et la modernisation de l'élevage.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  href="/services"
                  className="px-6 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-sm transition-all flex items-center gap-2 shadow-lg shadow-emerald-500/20 hover:-translate-y-0.5"
                >
                  <span>Nos Services</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/contact"
                  className="px-6 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm border border-slate-700 transition-all hover:border-emerald-500/50"
                >
                  Nous Contacter
                </Link>
              </div>
            </div>

            <div className="relative rounded-3xl overflow-hidden border-2 border-emerald-500/30 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=800&q=80"
                alt="Élevage avicole Jeune Fort Bénin"
                className="w-full h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* CHIFFRES CLÉS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in-up-delay-1">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {CHIFFRES.map((c, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm text-center hover:shadow-md hover:border-emerald-200 transition-all duration-300"
            >
              <span className="block text-3xl font-black text-emerald-600">{c.value}</span>
              <span className="block text-sm font-bold text-slate-900 mt-1">{c.label}</span>
              <span className="block text-xs text-slate-500 mt-0.5">{c.sublabel}</span>
            </div>
          ))}
        </div>
      </section>

      {/* MISSION & ÉQUIPE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in-up-delay-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl p-8 border border-emerald-100 space-y-4">
            <div className="flex items-center gap-3 text-emerald-700">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white">
                <Target className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-black text-slate-900">Notre Mission</h2>
            </div>
            <p className="text-slate-700 text-sm leading-relaxed">
              Fournir aux éleveurs béninois les moyens de réussir : des poussins d'un jour sains issus de souches performantes, des équipements durables adaptés aux tropiques, des aliments de haute valeur nutritive et un encadrement technique de proximité.
            </p>
            <p className="text-slate-700 text-sm leading-relaxed">
              Notre ambition est de contribuer à la structuration d'une filière avicole moderne, rentable et souveraine au Bénin.
            </p>
          </div>

          <div className="bg-slate-900 rounded-3xl p-8 space-y-4 text-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-400">
                <Users className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-black">Notre Équipe</h2>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">
              Ingénieurs agronomes, techniciens d'élevage et conseillers vétérinaires unis par une même passion pour l'aviculture moderne et le développement agricole du Bénin.
            </p>
            <p className="text-slate-300 text-sm leading-relaxed">
              Présents sur le terrain à Cotonou, Abomey-Calavi et dans les départements, nous mettons notre expertise au service de vos projets, quelle que soit leur taille.
            </p>
          </div>
        </div>
      </section>

      {/* VALEURS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in-up-delay-3">
        <div className="text-center mb-10 space-y-2">
          <span className="text-xs font-bold tracking-widest text-emerald-700 uppercase bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Ce qui nous définit
          </span>
          <h2 className="text-3xl font-black text-slate-900">Nos Valeurs</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {VALEURS.map((v, i) => {
            const Icon = v.icon;
            return (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-lg hover:border-emerald-200 transition-all duration-300 space-y-3 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-extrabold text-slate-900 text-base">{v.title}</h3>
                <p className="text-slate-600 text-xs leading-relaxed">{v.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* LOCALISATION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in-up-delay-4">
        <div className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-3xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3">
            <h2 className="text-2xl font-black">Où nous trouver</h2>
            <div className="flex items-center gap-2 text-emerald-100 text-sm">
              <MapPin className="w-5 h-5 shrink-0" />
              <span>Siège & Ferme Avicole — Cotonou & Abomey-Calavi, Bénin</span>
            </div>
            <div className="flex items-center gap-2 text-emerald-100 text-sm">
              <Phone className="w-5 h-5 shrink-0" />
              <span>+229 97 00 00 00 / +229 95 00 00 00</span>
            </div>
          </div>
          <Link
            href="/contact"
            className="shrink-0 px-8 py-4 rounded-2xl bg-white text-emerald-800 font-extrabold text-sm hover:bg-emerald-50 transition-all flex items-center gap-2 shadow-lg"
          >
            <span>Nous Contacter</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
