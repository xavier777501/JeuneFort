'use client';

import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  MessageSquare,
} from 'lucide-react';
import { COMPANY } from '../../../lib/config';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    nom: '',
    email: '',
    telephone: '',
    sujet: 'Devis Avicole',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm({ nom: '', email: '', telephone: '', sujet: 'Devis Avicole', message: '' });
    }, 4000);
  };

  return (
    <div className="space-y-16 pb-20">
      {/* HERO */}
      <section className="bg-gradient-to-b from-slate-950 via-emerald-950 to-slate-950 text-white pt-14 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 animate-fade-in-up">
          <span className="inline-block text-xs font-bold tracking-widest text-emerald-300 uppercase bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-full">
            Restons en Contact
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight">
            Contactez-nous &{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
              Demandez un Devis
            </span>
          </h1>
          <p className="text-slate-300 text-base max-w-xl mx-auto leading-relaxed">
            Une question sur nos poussins, vos commandes de provende ou un besoin d'accompagnement ? Écrivez-nous !
          </p>
        </div>
      </section>

      {/* FORMULAIRE + INFOS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in-up-delay-2">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Formulaire */}
            <div className="lg:col-span-7">
              <h2 className="text-2xl font-black text-slate-900 mb-6">Envoyez-nous un message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Nom complet *</label>
                    <input
                      type="text"
                      required
                      value={form.nom}
                      onChange={(e) => setForm({ ...form, nom: e.target.value })}
                      placeholder="Ex: Jean KPADONOU"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Téléphone / WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      value={form.telephone}
                      onChange={(e) => setForm({ ...form, telephone: e.target.value })}
                      placeholder="Ex: +229 97 00 00 00"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white text-slate-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Email</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="votre.email@exemple.com"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Sujet</label>
                    <select
                      value={form.sujet}
                      onChange={(e) => setForm({ ...form, sujet: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900"
                    >
                      <option value="Devis Avicole">Demande de Devis</option>
                      <option value="Commande Poussins">Commande de Poussins</option>
                      <option value="Achat Provende">Achat de Provende / Matériel</option>
                      <option value="Conseil Vétérinaire">Conseil & Suivi Technique</option>
                      <option value="Autre">Autre demande</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Votre message *</label>
                  <textarea
                    rows={5}
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Précisez la quantité souhaitée, votre localisation ou vos questions..."
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white text-slate-900"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Envoyer ma demande</span>
                </button>

                {submitted && (
                  <div className="p-4 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span>Message envoyé ! Notre équipe vous recontacte sous 24h.</span>
                  </div>
                )}
              </form>
            </div>

            {/* Coordonnées */}
            <div className="lg:col-span-5 bg-slate-900 text-white p-6 sm:p-8 rounded-2xl flex flex-col justify-between space-y-6">
              <div className="space-y-6">
                <h3 className="text-lg font-extrabold border-b border-slate-800 pb-3">
                  Coordonnées Directes
                </h3>
                <ul className="space-y-5 text-sm">
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
      </section>
    </div>
  );
}
