/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Section des Programmes Scolaires des Écoles Le Berceau des 3S
 */

import React, { useState } from 'react';
import { SCHOOL_CONFIG, SchoolProgram } from '../config/schoolConfig';
import { 
  GraduationCap, 
  BookOpen, 
  Baby, 
  Sparkles, 
  Clock, 
  Languages, 
  CheckCircle2, 
  AlertCircle,
  ArrowRight
} from 'lucide-react';

interface AcademicProgramsProps {
  onSelectProgramForAdmission?: (programId: string) => void;
}

export const AcademicPrograms: React.FC<AcademicProgramsProps> = ({ onSelectProgramForAdmission }) => {
  const [selectedProgramId, setSelectedProgramId] = useState<string>(SCHOOL_CONFIG.programs[0].id);

  const currentProgram = SCHOOL_CONFIG.programs.find(p => p.id === selectedProgramId) || SCHOOL_CONFIG.programs[0];

  const getProgramIcon = (id: string) => {
    switch (id) {
      case 'maternelle':
        return <Baby className="w-5 h-5" />;
      case 'primaire':
        return <BookOpen className="w-5 h-5" />;
      case 'college':
        return <GraduationCap className="w-5 h-5" />;
      case 'lycee':
      default:
        return <Sparkles className="w-5 h-5" />;
    }
  };

  return (
    <section id="notre-programme" className="py-16 md:py-24 bg-slate-50 border-t border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Titre & Avertissement de validation */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/70 border border-amber-300 text-amber-900 text-xs font-semibold">
            <GraduationCap className="w-3.5 h-3.5 text-amber-700" />
            <span>Cursus Scolaire du Préscolaire au Second Cycle</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0b1d3a] font-serif tracking-tight">
            Nos Programmes & Langues Enseignées
          </h2>

          <p className="text-slate-600 text-sm md:text-base leading-relaxed">
            Un cheminement progressif et cohérent qui accompagne l'enfant depuis ses premiers pas à la maternelle 
            jusqu'à l'obtention du Baccalauréat Unique.
          </p>

          <div className="inline-flex items-center gap-1.5 text-xs text-amber-800 bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-200">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>Détail des matières, coefficients et langues vivantes à confirmer avec la direction des études</span>
          </div>
        </div>

        {/* Onglets de sélection des 4 cycles */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
          {SCHOOL_CONFIG.programs.map((prog) => {
            const isSelected = prog.id === selectedProgramId;
            return (
              <button
                key={prog.id}
                onClick={() => setSelectedProgramId(prog.id)}
                className={`flex items-center gap-2.5 px-5 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#0b1d3a] text-white shadow-md shadow-blue-950/20 scale-102 border-b-2 border-amber-400'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <span className={isSelected ? 'text-amber-300' : 'text-slate-500'}>
                  {getProgramIcon(prog.id)}
                </span>
                <span>{prog.level}</span>
              </button>
            );
          })}
        </div>

        {/* Fiche détaillée du cycle sélectionné */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-6 sm:p-8 lg:p-10 transition-all">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Colonne gauche : Synthèse du cycle */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-200">
                    {currentProgram.badge}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">
                    Tranche d'âge indicative : {currentProgram.ageRange}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-[#0b1d3a] font-serif">
                  {currentProgram.level}
                </h3>
              </div>

              {/* Classes incluses */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Classes concernées :
                </h4>
                <div className="flex flex-wrap gap-2">
                  {currentProgram.classes.map((cls, i) => (
                    <span 
                      key={i}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200/80 rounded-lg text-xs font-semibold text-slate-800 border border-slate-200 transition-colors"
                    >
                      {cls}
                    </span>
                  ))}
                </div>
              </div>

              {/* Objectifs pédagogiques fondamentaux */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Objectifs d'apprentissage prioritaires :
                </h4>
                <ul className="space-y-2">
                  {currentProgram.objectives.map((obj, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{obj}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bouton de préinscription orienté */}
              {onSelectProgramForAdmission && (
                <div className="pt-2">
                  <button
                    onClick={() => onSelectProgramForAdmission(currentProgram.id)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-400 hover:bg-amber-500 text-slate-950 text-xs font-bold rounded-lg shadow-xs transition-colors cursor-pointer"
                  >
                    <span>Préinscrire pour le cycle {currentProgram.level}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Colonne droite : Langues & Horaires & Notes */}
            <div className="lg:col-span-5 bg-slate-50 rounded-xl p-6 border border-slate-200 space-y-6">
              {/* Langues enseignées */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[#0b1d3a] font-bold text-sm">
                  <Languages className="w-4 h-4 text-amber-600" />
                  <span>Langues enseignées :</span>
                </div>
                <div className="space-y-1.5 pl-6">
                  {currentProgram.languages.map((lang, i) => (
                    <div key={i} className="text-xs font-medium text-slate-700 bg-white px-3 py-1.5 rounded-md border border-slate-200">
                      • {lang}
                    </div>
                  ))}
                </div>
                <p className="text-[10px] text-slate-500 italic pl-6">
                  * Deuxième langue vivante ou options linguistiques à valider par l'établissement.
                </p>
              </div>

              {/* Horaires indicatifs */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[#0b1d3a] font-bold text-sm">
                  <Clock className="w-4 h-4 text-amber-600" />
                  <span>Organisation du temps scolaire :</span>
                </div>
                <div className="pl-6 text-xs text-slate-700 bg-white p-3 rounded-md border border-slate-200">
                  {currentProgram.schedule}
                </div>
              </div>

              {/* Note d'intégrité officielle */}
              <div className="p-3.5 bg-amber-50/80 rounded-lg border border-amber-200 text-xs text-amber-900 space-y-1">
                <div className="font-semibold flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                  <span>Notice officielle :</span>
                </div>
                <p className="text-[11px] leading-relaxed">
                  {currentProgram.validationNotice}. Les grilles horaires définitives et la liste complète des manuels scolaires agréés par le Ministère de l'Enseignement Pré-Universitaire sont communiquées lors de l'inscription.
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
