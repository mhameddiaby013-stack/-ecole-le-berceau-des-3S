/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Section Contact & Localisations des Écoles Le Berceau des 3S
 */

import React, { useState } from 'react';
import { SCHOOL_CONFIG } from '../config/schoolConfig';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageSquare, 
  Send, 
  CheckCircle, 
  AlertCircle,
  Building,
  ExternalLink,
  Sparkles
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [contactForm, setContactForm] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'Renseignement général',
    message: ''
  });

  const [messageSent, setMessageSent] = useState(false);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    setMessageSent(true);
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* En-tête */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#0b1d3a] text-xs font-semibold">
            <Building className="w-3.5 h-3.5 text-amber-600" />
            <span>Écoute & Disponibilité pour les Familles</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0b1d3a] font-serif tracking-tight">
            Coordonnées & Prise de Contact
          </h2>

          <p className="text-slate-600 text-sm md:text-base leading-relaxed">
            Notre équipe administrative et pédagogique est à votre entière disposition pour répondre 
            à toutes vos interrogations sur la scolarité de vos enfants.
          </p>
        </div>

        {/* Bloc Principal WhatsApp & Numéro Officiel */}
        <div className="bg-gradient-to-br from-[#0b1d3a] to-[#122e5a] rounded-3xl p-6 sm:p-10 text-white shadow-xl border border-amber-400/20 relative overflow-hidden">
          <div className="absolute -right-20 -top-20 w-80 h-80 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-xs font-bold border border-emerald-500/30 inline-flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Canal Officiel Instantané</span>
              </span>

              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold font-serif">
                Contactez la Direction via WhatsApp
              </h3>

              <p className="text-slate-200 text-sm sm:text-base leading-relaxed max-w-2xl">
                Pour toute question urgente concernant les admissions, les programmes ou pour 
                convenir d'un rendez-vous sur place, échangez directement avec nous.
              </p>

              <div className="text-xl sm:text-2xl font-black text-amber-300 font-mono tracking-wide">
                {SCHOOL_CONFIG.whatsappNumber}
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-3">
              <a
                href={SCHOOL_CONFIG.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 px-6 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold rounded-2xl shadow-lg transition-all text-center flex items-center justify-center gap-2.5 text-sm cursor-pointer"
              >
                <MessageSquare className="w-5 h-5 fill-slate-950" />
                <span>Ouvrir WhatsApp (+224 662 11 80 00)</span>
              </a>
              <span className="text-[11px] text-slate-300 text-center">
                Réponse rapide pendant les heures de permanence scolaire
              </span>
            </div>
          </div>
        </div>

        {/* Fiches des Zones de Localisation à Conakry */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
            <div>
              <h3 className="text-xl font-bold text-[#0b1d3a] font-serif">
                Nos Zones d'Implantation à Conakry
              </h3>
              <p className="text-xs text-slate-500">
                Zones géographiques de présence scolaire à confirmer
              </p>
            </div>

            <div className="inline-flex items-center gap-1.5 text-xs text-amber-900 bg-amber-50 px-3 py-1 rounded-md border border-amber-200">
              <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span>Adresses exactes en cours de validation par la direction</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SCHOOL_CONFIG.zones.map((zone) => (
              <div 
                key={zone.id}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 bg-blue-50 text-blue-900 font-bold text-xs rounded-md">
                      {zone.commune}
                    </span>
                    <MapPin className="w-4 h-4 text-amber-600" />
                  </div>

                  <h4 className="text-lg font-bold text-[#0b1d3a] font-serif">
                    {zone.name}
                  </h4>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {zone.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-1">
                  <span className="inline-block text-[11px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    {zone.statusBadge}
                  </span>
                  <p className="text-[11px] text-slate-500">
                    Renseignements de visite : <strong>+224 662 11 80 00</strong>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Grille : Formulaire de contact par e-mail / message direct */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
            <div className="border-b border-slate-200 pb-3">
              <h3 className="text-lg font-bold text-[#0b1d3a] font-serif">
                Envoyer un Message Écrit
              </h3>
              <p className="text-xs text-slate-500">
                Laissez-nous vos coordonnées, notre secrétariat vous recontactera dans les meilleurs délais.
              </p>
            </div>

            {!messageSent ? (
              <form onSubmit={handleSendMessage} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-700 font-medium mb-1">
                      Votre Nom & Prénom *
                    </label>
                    <input
                      type="text"
                      required
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      placeholder="Ex : M. Bah Mamadou"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-medium mb-1">
                      Votre Téléphone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      value={contactForm.phone}
                      onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                      placeholder="Ex : +224 6XX XX XX XX"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-medium mb-1">
                    Objet de votre demande
                  </label>
                  <select
                    value={contactForm.subject}
                    onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="Renseignement général">Renseignement général</option>
                    <option value="Préinscription & Tarifs">Préinscription & Frais scolaires</option>
                    <option value="Visite de l'établissement">Visite de l'un de nos campus</option>
                    <option value="Candidature Enseignant">Recrutement / Candidature Enseignant</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-medium mb-1">
                    Votre message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    placeholder="Écrivez votre message..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#0b1d3a] hover:bg-[#122e5a] text-white font-bold rounded-xl shadow-xs transition-colors flex items-center gap-2 cursor-pointer text-xs"
                >
                  <Send className="w-4 h-4" />
                  <span>Transmettre le message</span>
                </button>
              </form>
            ) : (
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 text-emerald-900 space-y-2 animate-fadeIn text-xs">
                <div className="flex items-center gap-2 font-bold text-sm">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                  <span>Message bien enregistré !</span>
                </div>
                <p>
                  Merci {contactForm.name}. Pour une prise en charge immédiate, vous pouvez également 
                  rejoindre notre WhatsApp au <strong>+224 662 11 80 00</strong>.
                </p>
                <button
                  onClick={() => setMessageSent(false)}
                  className="mt-2 text-blue-700 underline text-xs font-semibold cursor-pointer"
                >
                  Envoyer un autre message
                </button>
              </div>
            )}
          </div>

          {/* Colonne Droite : Horaires & Coordonnées */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-[#0b1d3a] uppercase tracking-wider">
                <Clock className="w-4 h-4 text-amber-600" />
                <span>Horaires de Permanence du Secrétariat</span>
              </div>

              <div className="space-y-2 text-xs text-slate-700">
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="font-medium">Lundi au Vendredi</span>
                  <span className="font-semibold text-[#0b1d3a]">07h30 — 16h30</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="font-medium">Samedi matin</span>
                  <span className="font-semibold text-[#0b1d3a]">08h30 — 13h00</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="font-medium">Dimanche & Jours fériés</span>
                  <span className="text-slate-400">Fermé (Accueil WhatsApp actif)</span>
                </div>
              </div>

              <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-[11px] text-amber-900">
                * Horaires indicatifs en période d'inscriptions et d'activités scolaires.
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-3 text-xs">
              <span className="font-bold text-[#0b1d3a] uppercase tracking-wider block text-[11px]">
                Coordonnées Générales
              </span>
              <div className="flex items-start gap-2.5 text-slate-700">
                <Phone className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold">Téléphone / WhatsApp :</span>
                  <div>{SCHOOL_CONFIG.whatsappNumber}</div>
                </div>
              </div>
              <div className="flex items-start gap-2.5 text-slate-700">
                <Mail className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold">Courrier Électronique :</span>
                  <div>{SCHOOL_CONFIG.emailDisplay}</div>
                  <div className="text-[10px] text-slate-400 italic">*{SCHOOL_CONFIG.emailNotice}</div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
