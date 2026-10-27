/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Grande section d'accueil (Hero) des Écoles Le Berceau des 3S
 */

import React from 'react';
import { SCHOOL_CONFIG } from '../config/schoolConfig';
import { 
  ArrowRight, 
  GraduationCap, 
  ShieldCheck, 
  BookOpen, 
  MapPin, 
  MessageSquare, 
  CheckCircle2, 
  AlertCircle,
  Sparkles,
  Users
} from 'lucide-react';

interface HeroProps {
  onNavigate: (sectionId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-[#0b1d3a] to-[#08152a] text-white py-16 md:py-24">
      {/* Motifs géométriques subtils en arrière-plan */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#c59b27_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Colonne Gauche : Titres, Slogan & Boutons d'action */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Badge de statut officiel */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-semibold backdrop-blur-xs">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Portail Web Officiel • Conakry, République de Guinée</span>
            </div>

            {/* Titre Majeur */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight font-serif leading-tight">
              Les Écoles <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-300">
                Le Berceau des 3S
              </span>
            </h1>

            {/* Slogan avec balise d'intégrité */}
            <div className="space-y-1">
              <p className="text-lg md:text-xl text-slate-200 font-medium italic">
                « {SCHOOL_CONFIG.motto} »
              </p>
              <div className="inline-flex items-center gap-1.5 text-[11px] text-amber-400/80 bg-amber-950/40 px-2 py-0.5 rounded border border-amber-400/20">
                <AlertCircle className="w-3 h-3 shrink-0" />
                <span>{SCHOOL_CONFIG.mottoNotice}</span>
              </div>
            </div>

            {/* Présentation concise */}
            <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Un établissement d'enseignement général engagé pour l'épanouissement intellectuel, 
              moral et civique des élèves guinéens. De la Maternelle au Lycée, nous offrons un cadre structuré, 
              sécurisé et ambitieux pour former les futurs cadres et leaders de demain.
            </p>

            {/* Boutons d'Action Principaux */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
              <button
                onClick={() => onNavigate('inscription')}
                className="px-6 py-3.5 bg-gradient-to-r from-amber-400 via-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold rounded-xl shadow-lg hover:shadow-amber-500/20 transition-all flex items-center gap-2 cursor-pointer text-sm"
              >
                <GraduationCap className="w-5 h-5" />
                <span>Demander une préinscription</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('notre-ecole')}
                className="px-5 py-3.5 bg-white/10 hover:bg-white/15 text-white font-semibold rounded-xl border border-white/20 hover:border-white/30 backdrop-blur-xs transition-all flex items-center gap-2 cursor-pointer text-sm"
              >
                <BookOpen className="w-4 h-4 text-amber-300" />
                <span>Découvrir notre école</span>
              </button>

              <a
                href={SCHOOL_CONFIG.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-3.5 bg-emerald-600/90 hover:bg-emerald-600 text-white font-semibold rounded-xl transition-all flex items-center gap-2 text-sm shadow-md"
                title="Poser vos questions sur WhatsApp"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp : +224 662 11 80 00</span>
              </a>
            </div>

            {/* Repères des 3 campus à Conakry */}
            <div className="pt-4 border-t border-slate-700/60 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-slate-300">
              <span className="font-semibold text-amber-300 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" /> Implantation Conakry :
              </span>
              <span className="bg-slate-800/80 px-2.5 py-1 rounded-md border border-slate-700">Taouyah</span>
              <span className="bg-slate-800/80 px-2.5 py-1 rounded-md border border-slate-700">Carrière</span>
              <span className="bg-slate-800/80 px-2.5 py-1 rounded-md border border-slate-700">Sonfonia</span>
              <span className="text-[10px] text-slate-400 italic">(Adresses à confirmer avec la direction)</span>
            </div>
          </div>

          {/* Colonne Droite : Image Scolaire de Démonstration & Carte d'Intégrité */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Cadre de l'image avec bordure dorée noble */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-amber-400/30 bg-slate-800">
                <img
                  src="https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1000&q=80"
                  alt="Démonstration classe d'élèves studieux"
                  className="w-full h-80 sm:h-96 object-cover transform hover:scale-102 transition-transform duration-500"
                />

                {/* Bandeau d'intégrité transparent et non trompeur */}
                <div className="absolute top-3 left-3 right-3 bg-slate-900/90 backdrop-blur-md px-3 py-2 rounded-lg border border-amber-400/40 text-left shadow-lg">
                  <div className="flex items-center gap-1.5 text-amber-300 text-xs font-bold">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>Photo de démonstration éducative</span>
                  </div>
                  <p className="text-[10px] text-slate-300 leading-tight mt-0.5">
                    Cliché d'illustration provisoire — sera remplacé par les photographies réelles des élèves et locaux des Écoles Le Berceau des 3S.
                  </p>
                </div>

                {/* Badge superposé en bas : Les 3S */}
                <div className="absolute bottom-3 left-3 right-3 bg-[#0b1d3a]/95 backdrop-blur-md p-3 rounded-xl border border-slate-700 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-amber-400 text-slate-950 font-serif font-black flex items-center justify-center text-sm shadow-xs">
                      3S
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">Savoir • Sagesse • Succès</div>
                      <div className="text-[10px] text-amber-300">Piliers d'excellence guinéenne</div>
                    </div>
                  </div>
                  <button
                    onClick={() => onNavigate('actualites')}
                    className="text-[11px] font-semibold text-amber-300 hover:text-amber-200 underline decoration-amber-400/60"
                  >
                    Actualités & Facebook
                  </button>
                </div>
              </div>

              {/* Petite carte d'assurance sous l'image */}
              <div className="mt-4 grid grid-cols-2 gap-3 text-center">
                <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-2.5">
                  <div className="text-amber-300 font-bold text-sm">4 Cycles</div>
                  <div className="text-slate-400 text-[11px]">Maternelle au Lycée</div>
                </div>
                <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-2.5">
                  <div className="text-emerald-400 font-bold text-sm">WhatsApp Direct</div>
                  <div className="text-slate-400 text-[11px]">+224 662 11 80 00</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
