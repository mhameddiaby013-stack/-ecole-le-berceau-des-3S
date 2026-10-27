/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Présentation officielle de l'établissement « Le Berceau des 3S »
 */

import React from 'react';
import { SCHOOL_CONFIG } from '../config/schoolConfig';
import { 
  BookOpen, 
  HeartHandshake, 
  Trophy, 
  ShieldCheck, 
  MapPin, 
  AlertCircle, 
  Building, 
  Sparkles,
  CheckCircle,
  GraduationCap
} from 'lucide-react';

export const SchoolPresentation: React.FC = () => {
  return (
    <section id="notre-ecole" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* En-tête de Section */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#0b1d3a] text-xs font-semibold">
            <Building className="w-3.5 h-3.5 text-amber-600" />
            <span>Établissement Privé d'Enseignement Général</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0b1d3a] font-serif tracking-tight">
            Notre Vision Éducative & Nos Fondements
          </h2>
          <p className="text-slate-600 text-sm md:text-base leading-relaxed">
            Fondées sur la conviction que chaque enfant porte en lui un potentiel illimité, 
            les écoles <strong>Le Berceau des 3S</strong> s'engagent à offrir un environnement 
            d'apprentissage exigeant, bienveillant et résolument tourné vers l'avenir de la Guinée.
          </p>
        </div>

        {/* Les Piliers Symboliques 3S */}
        <div className="space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-200 pb-3">
            <div>
              <h3 className="text-xl font-bold text-[#0b1d3a] font-serif">
                Le Sens des « 3S » : Savoir • Sagesse • Succès
              </h3>
              <p className="text-xs text-slate-500">
                La trilogie pédagogique au cœur du projet éducatif
              </p>
            </div>
            <div className="inline-flex items-center gap-1.5 text-xs text-amber-800 bg-amber-50 px-3 py-1 rounded-md border border-amber-200">
              <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
              <span>Interprétation proposée — à valider officiellement par la direction</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SCHOOL_CONFIG.pillars3S.map((pillar, idx) => (
              <div 
                key={idx}
                className="relative bg-gradient-to-br from-slate-50 to-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:shadow-md transition-shadow group"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#0b1d3a] text-amber-300 font-serif font-black text-xl flex items-center justify-center shadow-xs group-hover:bg-amber-400 group-hover:text-slate-900 transition-colors">
                    {pillar.letter}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-[#0b1d3a]">{pillar.title}</h4>
                    <span className="text-xs text-slate-500">{pillar.subtitle}</span>
                  </div>
                </div>

                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                  {pillar.description}
                </p>

                <div className="text-[11px] text-slate-400 italic pt-3 border-t border-slate-100 flex items-center gap-1">
                  <span>* {pillar.notice}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Zones d'Implantation à Conakry (Taouyah, Carrière, Sonfonia) */}
        <div className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
                Réseau Scolaire & Proximité
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-[#0b1d3a] font-serif">
                Zones d'Implantation à Conakry
              </h3>
            </div>
            
            <div className="inline-flex items-center gap-1.5 text-xs text-amber-900 bg-amber-100/70 px-3 py-1.5 rounded-lg border border-amber-300">
              <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
              <span>Adresses précises et bureaux d'accueil à confirmer avec la direction</span>
            </div>
          </div>

          <p className="text-slate-600 text-sm leading-relaxed max-w-3xl">
            Pour répondre aux besoins des familles et garantir un accès aisé aux élèves, l'établissement 
            développe sa présence dans trois zones stratégiques de la capitale guinéenne. Les coordonnées 
            exactes de chaque site seront officialisées dès confirmation par la direction.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            {SCHOOL_CONFIG.zones.map((zone) => (
              <div 
                key={zone.id}
                className="bg-white rounded-xl p-5 border border-slate-200/90 shadow-xs flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-[#0b1d3a]">
                      {zone.commune}
                    </span>
                    <MapPin className="w-4 h-4 text-amber-600" />
                  </div>
                  <h4 className="text-base font-bold text-[#0b1d3a]">{zone.name}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {zone.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5">
                  <span className="inline-block text-[11px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    {zone.statusBadge}
                  </span>
                  <p className="text-[10px] text-slate-500">
                    {zone.contactPersonNotice}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Charte Pédagogique & Environnement */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-[#0b1d3a] font-serif">
              Un Cadre Propice à l'Émulation et à la Sécurité
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Nous mettons un point d'honneur à offrir un environnement où chaque élève évolue 
              dans la confiance et le respect mutuel. La discipline constructive et le dialogue permanent 
              avec les parents constituent le socle de notre approche éducative.
            </p>

            <ul className="space-y-2.5 text-sm text-slate-700">
              <li className="flex items-start gap-2.5">
                <CheckCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <span><strong>Enseignants qualifiés</strong> engagés et formés aux méthodes pédagogiques actives.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <span><strong>Suivi rigoureux des élèves</strong> : carnets de correspondance, relevés réguliers et soutien ciblé.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <span><strong>Sécurité & hygiène</strong> : espaces clôturés, surveillance permanente et respect des normes sanitaires.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <span><strong>Ouverture moderne</strong> : apprentissage précoce de l'anglais et initiation aux outils numériques.</span>
              </li>
            </ul>
          </div>

          {/* Démonstration visuelle encadrée */}
          <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-md">
            <img 
              src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=900&q=80" 
              alt="Espace d'apprentissage moderne" 
              className="w-full h-72 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-4">
              <div className="text-white text-xs space-y-1">
                <div className="font-semibold text-amber-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Cadre pédagogique stimulant</span>
                </div>
                <div className="text-[10px] text-slate-300 italic">
                  * Image d'illustration de démonstration — en attente de la prise de vue des locaux réels.
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
