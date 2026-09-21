'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sprout,
  ArrowRight,
  ShieldCheck,
  Award,
  Truck,
  Building,
  FileText,
  Settings,
  BarChart,
  Sparkles,
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  Users,
  Target,
  Check,
} from 'lucide-react';
import { MOCK_CATEGORIES, MOCK_PRODUCTS, MOCK_SERVICES } from '../../lib/mock-data';
import { COMPANY } from '../../lib/config';
import { ProductCard } from '../../components/ui/ProductCard';

export default function HomePage() {
  const featuredProducts = MOCK_PRODUCTS.filter((p) => p.isFeatured).slice(0, 4);

  // Form State pour le contact rapide
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactForm, setContactForm] = useState({
    nom: '',
    email: '',
    telephone: '',
    sujet: 'Devis Avicole',
    message: '',
  });

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSubmitted(true);
    setTimeout(() => {
      setContactSubmitted(false);
      setContactForm({ nom: '', email: '', telephone: '', sujet: 'Devis Avicole', message: '' });
    }, 4000);
  };

  return (
    <div className="space-y-20 pb-20 overflow-hidden">
      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-b from-slate-950 via-emerald-950 to-slate-950 text-white pt-12 pb-20 lg:pt-20 lg:pb-32">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 animate-fade-in-up">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Colonne gauche : Texte & CTA */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-semibold backdrop-blur-xs">
                <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
                <span>Le Partenaire N°1 des Éleveurs & Aviculteurs au Bénin</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
                L'Aviculture & l'Agrobusiness de <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">Performance</span>.
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
                Poussins d'un jour vigoureux (Goliath, ISA Brown), provendes équilibrées, équipements d'élevage modernes et suivi sanitaire sur-mesure pour votre réussite agricole.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link
                  href="/produits"
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-base transition-all duration-300 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:-translate-y-0.5 flex items-center justify-center gap-2 group"
                >
                  <span>Explorer le Catalogue</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>

                <a
                  href="#services"
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-800/80 hover:bg-slate-800 text-white font-bold text-base border border-slate-700 transition-all duration-300 hover:border-emerald-500/50 flex items-center justify-center gap-2"
                >
                  <span>Nos Services & Devis</span>
                </a>
              </div>

              {/* Badges de confiance */}
              <div className="pt-8 border-t border-slate-800/80 grid grid-cols-3 gap-4 text-center lg:text-left">
                <div className="transition-transform hover:scale-105 duration-200">
                  <span className="block text-2xl font-black text-amber-400">100%</span>
                  <span className="text-xs text-slate-400">Souches certifiées</span>
                </div>
                <div className="transition-transform hover:scale-105 duration-200">
                  <span className="block text-2xl font-black text-emerald-400">+50.000</span>
                  <span className="text-xs text-slate-400">Poussins livrés</span>
                </div>
                <div className="transition-transform hover:scale-105 duration-200">
                  <span className="block text-2xl font-black text-teal-400">24/7</span>
                  <span className="text-xs text-slate-400">Support Technique</span>
                </div>
              </div>
            </div>

            {/* Colonne droite : Visuel Héro avec badges flottants */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="aspect-4/3 rounded-3xl overflow-hidden border-2 border-emerald-500/30 shadow-2xl relative shadow-emerald-950/50 group">
                  <img
                    src="https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=1000&q=80"
                    alt="Élevage de poussins et aviculture Jeune Fort"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                </div>

                {/* Badge flottant 1 */}
                <div className="absolute -bottom-6 -left-6 bg-slate-900/90 backdrop-blur-md border border-emerald-500/30 p-4 rounded-2xl shadow-xl flex items-center gap-3 hidden sm:flex animate-float">
                  <div className="p-3 bg-emerald-500/20 text-emerald-400 rounded-xl">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="block text-sm font-bold text-white">Vaccination Gare</span>
                    <span className="text-xs text-slate-400">Marek + Newcastle à l'éclosion</span>
                  </div>
                </div>

                {/* Badge flottant 2 */}
                <div className="absolute -top-6 -right-6 bg-slate-900/90 backdrop-blur-md border border-amber-500/30 p-4 rounded-2xl shadow-xl flex items-center gap-3 hidden sm:flex animate-float" style={{ animationDelay: '2s' }}>
                  <div className="p-3 bg-amber-500/20 text-amber-400 rounded-xl">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="block text-sm font-bold text-white">Rendement Garanti</span>
                    <span className="text-xs text-slate-400">Croissance rapide & ponte élevée</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION CATÉGORIES EN VEDETTE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold tracking-widest text-emerald-700 uppercase bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Parcourir par besoin
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
              Nos Catégories de Produits
            </h2>
          </div>
          <Link
            href="/produits"
            className="text-sm font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 transition-all hover:translate-x-1"
          >
            Toutes les catégories <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {MOCK_CATEGORIES.map((category) => (
            <Link
              key={category.id}
              href={`/produits?categorie=${category.slug}`}
              className="group relative rounded-2xl overflow-hidden aspect-square border border-slate-200 shadow-xs hover:shadow-xl hover:border-emerald-500/50 transition-all duration-300 hover:-translate-y-1"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent p-3 flex flex-col justify-end">
                <span className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors line-clamp-1">
                  {category.name}
                </span>
                <span className="text-[10px] text-slate-300 font-medium">
                  {category.itemCount} articles
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* SECTION PRODUITS PHARES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-emerald-50/80 via-white to-teal-50/50 rounded-3xl p-6 sm:p-10 border border-emerald-100/80 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-bold tracking-widest text-emerald-700 uppercase bg-white px-3 py-1 rounded-full border border-emerald-200">
                Sélection du mois
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
                Nos Produits Phares
              </h2>
            </div>
            <Link
              href="/produits"
              className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 transition-all shadow-xs hover:shadow-md hover:scale-105 inline-flex items-center gap-2"
            >
              <span>Voir tout le catalogue</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION NOS SERVICES (ANCRE #services) */}
      <section id="services" className="scroll-mt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-bold tracking-widest text-emerald-700 uppercase bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200">
            Accompagnement Sur-Mesure
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
            Nos Services & Expertises Avicoles
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            De la conception de votre poulailler à la formulation d'aliments et au suivi sanitaire, nous vous guidons vers une rentabilité optimale.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {MOCK_SERVICES.map((service, index) => (
            <div
              key={service.id}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm hover:shadow-xl hover:border-emerald-500/40 transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 text-white flex items-center justify-center font-bold shadow-md group-hover:scale-110 transition-transform duration-300">
                    {index === 0 && <FileText className="w-7 h-7" />}
                    {index === 1 && <Building className="w-7 h-7" />}
                    {index === 2 && <Settings className="w-7 h-7" />}
                    {index === 3 && <BarChart className="w-7 h-7" />}
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-900 group-hover:text-emerald-700 transition-colors">
                      {service.title}
                    </h3>
                    <span className="text-xs text-emerald-600 font-semibold">Service Personnalisé</span>
                  </div>
                </div>

                <p className="text-slate-600 text-sm leading-relaxed">
                  {service.fullDescription}
                </p>

                <div className="pt-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                    Inclus dans ce service :
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-semibold text-slate-700">
                    {service.features.map((feat, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500">Devis gratuit sous 24h</span>
                <a
                  href="#contact"
                  className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-emerald-600 text-white text-xs font-bold transition-all duration-200 flex items-center gap-1.5"
                >
                  <span>Solliciter un Devis</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION À PROPOS (ANCRE #a-propos) */}
      <section id="a-propos" className="scroll-mt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-bold tracking-widest text-amber-400 uppercase bg-amber-400/10 px-3.5 py-1.5 rounded-full border border-amber-400/20">
                À Propos de Jeune Fort Agrobusiness
              </span>

              <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight text-white">
                Bâtir l'Avenir de l'Élevage Avicole au <span className="text-emerald-400">Bénin</span>.
              </h2>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Fondée par une équipe de passionnés d'agronomie et d'aviculture, <strong>Jeune Fort Agrobusiness</strong> s'impose comme une entreprise pionnière engagée pour la souveraineté alimentaire et la modernisation de l'élevage.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-1">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-base">
                    <Target className="w-5 h-5" />
                    <span>Notre Mission</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    Fournir aux éleveurs des poussins sains, des équipements durables et des aliments de haute valeur nutritive.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-1">
                  <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
                    <Users className="w-5 h-5" />
                    <span>Notre Équipe</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    Ingénieurs agronomes, techniciens vétérinaires et conseillers à votre service sur le terrain.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden border-2 border-emerald-500/30 shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=800&q=80"
                  alt="Élevage avicole Jeune Fort Bénin"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION CONTACT (ANCRE #contact) */}
      <section id="contact" className="scroll-mt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold tracking-widest text-emerald-700 uppercase bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Restons en Contact
            </span>
            <h2 className="text-3xl font-black text-slate-900">
              Contactez-nous & Demandez un Devis
            </h2>
            <p className="text-slate-600 text-sm">
              Une question sur nos poussins, vos commandes de provende ou un besoin d'accompagnement ? Écrivez-nous !
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Formulaire de Contact */}
            <div className="lg:col-span-7">
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Nom complet *</label>
                    <input
                      type="text"
                      required
                      value={contactForm.nom}
                      onChange={(e) => setContactForm({ ...contactForm, nom: e.target.value })}
                      placeholder="Ex: Jean KPADONOU"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:bg-white text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Téléphone / WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      value={contactForm.telephone}
                      onChange={(e) => setContactForm({ ...contactForm, telephone: e.target.value })}
                      placeholder="Ex: +229 97 00 00 00"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:bg-white text-slate-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Email</label>
                    <input
                      type="email"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      placeholder="votre.email@exemple.com"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:bg-white text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Sujet de la demande</label>
                    <select
                      value={contactForm.sujet}
                      onChange={(e) => setContactForm({ ...contactForm, sujet: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500 text-slate-900"
                    >
                      <option value="Devis Avicole">Demande de Devis</option>
                      <option value="Commande Poussins">Commande de Poussins</option>
                      <option value="Achat Provende">Achat de Provende / Matériel</option>
                      <option value="Conseil Vétérinaire">Conseil & Suivi Technique</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Votre message / Détails du projet *</label>
                  <textarea
                    rows={4}
                    required
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    placeholder="Précisez la quantité de poussins souhaitée, votre localisation ou vos questions..."
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:bg-white text-slate-900"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Envoyer ma demande</span>
                </button>

                {contactSubmitted && (
                  <div className="p-4 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-2 animate-fade-in-up">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span>Votre message a été transmis avec succès ! Notre équipe vous recontactera sous 24h.</span>
                  </div>
                )}
              </form>
            </div>

            {/* Infos de contact direct */}
            <div className="lg:col-span-5 bg-slate-900 text-white p-6 sm:p-8 rounded-2xl space-y-6 flex flex-col justify-between">
              <div className="space-y-6">
                <h3 className="text-lg font-extrabold border-b border-slate-800 pb-3">
                  Coordonnées Directes
                </h3>

                <ul className="space-y-4 text-sm">
                  <li className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block font-bold">Siège & Ferme Avicole</strong>
                      <span className="text-slate-300 text-xs">{COMPANY.address}</span>
                    </div>
                  </li>

                  <li className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block font-bold">Téléphone / WhatsApp</strong>
                      <span className="text-slate-300 text-xs">{COMPANY.phone1} / {COMPANY.phone2}</span>
                    </div>
                  </li>

                  <li className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block font-bold">Adresse Email</strong>
                      <span className="text-slate-300 text-xs">{COMPANY.email}</span>
                    </div>
                  </li>

                  <li className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block font-bold">Horaires d'Ouverture</strong>
                      <span className="text-slate-300 text-xs">{COMPANY.hours}</span>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="pt-6 border-t border-slate-800">
                <a
                  href={COMPANY.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Discuter directement sur WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
