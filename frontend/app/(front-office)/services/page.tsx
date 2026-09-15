'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  FileText,
  Building,
  Settings,
  BarChart,
  ArrowRight,
  Check,
  Send,
  CheckCircle2,
} from 'lucide-react';
import { MOCK_SERVICES } from '../../../lib/mock-data';

const SERVICE_ICONS = [FileText, Building, Settings, BarChart];

export default function ServicesPage() {
  const [devisForm, setDevisForm] = useState({ nom: '', telephone: '', service: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setDevisForm({ nom: '', telephone: '', service: '', message: '' });
    }, 4000);
  };

  return (
    <div className="space-y-20 pb-20">
      {/* HERO */}
      <section className="bg-gradient-to-b from-slate-950 via-emerald-950 to-slate-950 text-white pt-14 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5 animate-fade-in-up">
          <span className="inline-block text-xs font-bold tracking-widest text-emerald-300 uppercase bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-full">
            Accompagnement Sur-Mesure
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight">
            Nos Services &{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
              Expertises Avicoles
            </span>
          </h1>
          <p className="text-slate-300 text-base max-w-2xl mx-auto leading-relaxed">
            De la conception de votre poulailler à la formulation d'aliments et au suivi sanitaire, nous vous guidons vers une rentabilité optimale.
          </p>
          <a
            href="#devis"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-sm transition-all shadow-lg shadow-emerald-500/25 hover:-translate-y-0.5"
          >
            <span>Demander un Devis Gratuit</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* LISTE DES SERVICES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in-up-delay-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {MOCK_SERVICES.map((service, index) => {
            const Icon = SERVICE_ICONS[index];
            return (
              <div
                key={service.id}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm hover:shadow-xl hover:border-emerald-500/40 transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-7 h-7" />
                    </div>
                    <div>
                      <h2 className="text-xl font-black text-slate-900 group-hover:text-emerald-700 transition-colors">
                        {service.title}
                      </h2>
                      <span className="text-xs text-emerald-600 font-semibold">Service Personnalisé</span>
                    </div>
                  </div>

                  <p className="text-slate-600 text-sm leading-relaxed">{service.fullDescription}</p>

                  <div className="pt-2">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                      Inclus dans ce service :
                    </h3>
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
                    href="#devis"
                    className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-emerald-600 text-white text-xs font-bold transition-all duration-200 flex items-center gap-1.5"
                  >
                    <span>Solliciter un Devis</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* FORMULAIRE DEVIS */}
      <section id="devis" className="scroll-mt-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in-up-delay-3">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold tracking-widest text-emerald-700 uppercase bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Devis Gratuit
            </span>
            <h2 className="text-3xl font-black text-slate-900">Demandez votre devis en ligne</h2>
            <p className="text-slate-600 text-sm">Notre équipe vous recontacte sous 24h.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Nom complet *</label>
                <input
                  type="text"
                  required
                  value={devisForm.nom}
                  onChange={(e) => setDevisForm({ ...devisForm, nom: e.target.value })}
                  placeholder="Ex: Jean KPADONOU"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white text-slate-900"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Téléphone / WhatsApp *</label>
                <input
                  type="tel"
                  required
                  value={devisForm.telephone}
                  onChange={(e) => setDevisForm({ ...devisForm, telephone: e.target.value })}
                  placeholder="+229 97 00 00 00"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white text-slate-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Service concerné</label>
              <select
                value={devisForm.service}
                onChange={(e) => setDevisForm({ ...devisForm, service: e.target.value })}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900"
              >
                <option value="">Sélectionnez un service...</option>
                {MOCK_SERVICES.map((s) => (
                  <option key={s.id} value={s.title}>{s.title}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Décrivez votre projet *</label>
              <textarea
                rows={4}
                required
                value={devisForm.message}
                onChange={(e) => setDevisForm({ ...devisForm, message: e.target.value })}
                placeholder="Taille de l'élevage, localisation, objectifs..."
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white text-slate-900"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Envoyer ma demande de devis</span>
            </button>

            {submitted && (
              <div className="p-4 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>Demande envoyée ! Notre équipe vous recontacte sous 24h.</span>
              </div>
            )}
          </form>
        </div>
      </section>
    </div>
  );
}
