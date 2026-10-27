/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Section Inscription & Formulaire de Préinscription des Écoles Le Berceau des 3S
 */

import React, { useState } from 'react';
import { SCHOOL_CONFIG } from '../config/schoolConfig';
import { 
  GraduationCap, 
  FileText, 
  CheckCircle, 
  Send, 
  MessageSquare, 
  AlertCircle, 
  Printer, 
  Sparkles,
  User,
  Phone,
  Calendar,
  Building
} from 'lucide-react';

interface AdmissionProps {
  initialProgramId?: string;
}

export const AdmissionSection: React.FC<AdmissionProps> = ({ initialProgramId }) => {
  // Formulaire de préinscription
  const [formData, setFormData] = useState({
    studentFullName: '',
    birthDate: '',
    gender: 'M',
    cycle: initialProgramId || 'primaire',
    targetGrade: '',
    preferredZone: 'taouyah',
    parentFullName: '',
    parentPhone: '',
    parentWhatsapp: '',
    notes: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  // Génération du lien WhatsApp avec données préremplies pour la direction (+224 662 11 80 00)
  const getDirectWhatsappMessage = () => {
    const text = `*Nouvelle Demande de Préinscription - Le Berceau des 3S*
-----------------------------
*Élève :* ${formData.studentFullName || 'Non renseigné'}
*Date de naissance :* ${formData.birthDate || 'Non renseignée'}
*Cycle :* ${formData.cycle}
*Classe souhaitée :* ${formData.targetGrade || 'À définir'}
*Zone privilégiée :* ${formData.preferredZone} (Taouyah / Carrière / Sonfonia)
*Parent / Responsable :* ${formData.parentFullName}
*Téléphone :* ${formData.parentPhone}
*WhatsApp Parent :* ${formData.parentWhatsapp || formData.parentPhone}
*Précisions :* ${formData.notes || 'Aucune'}
-----------------------------
_Message transmis depuis le portail web officiel des Écoles Le Berceau des 3S._`;

    return `https://wa.me/${SCHOOL_CONFIG.whatsappRaw}?text=${encodeURIComponent(text)}`;
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <section id="inscription" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Titre et note d'intégrité */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/70 border border-amber-300 text-amber-900 text-xs font-semibold">
            <GraduationCap className="w-3.5 h-3.5 text-amber-700" />
            <span>Admissions & Année Scolaire 2024-2025 / 2025-2026</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0b1d3a] font-serif tracking-tight">
            Inscriptions & Modalités Administratives
          </h2>

          <p className="text-slate-600 text-sm md:text-base leading-relaxed">
            Rejoignez la communauté éducative des <strong>Écoles Le Berceau des 3S</strong>. 
            Découvrez ci-dessous la démarche d'admission et soumettez votre préinscription en ligne.
          </p>

          <div className="inline-flex items-center gap-1.5 text-xs text-amber-900 bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-200 text-left">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              <strong>Transparence :</strong> Les montants des frais de scolarité et droits d'inscription sont communiqués sur place ou par WhatsApp afin de vous fournir les barèmes exacts validés par la direction.
            </span>
          </div>
        </div>

        {/* 4 Étapes de l'admission */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SCHOOL_CONFIG.admission.steps.map((step) => (
            <div 
              key={step.step}
              className="bg-slate-50 rounded-2xl p-6 border border-slate-200 relative flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#0b1d3a] text-amber-300 font-bold text-base flex items-center justify-center font-serif shadow-xs">
                  0{step.step}
                </div>
                <h4 className="text-sm font-bold text-[#0b1d3a]">{step.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Grille : Formulaire de préinscription + Pièces requises */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Colonne Gauche (7 colonnes) : Formulaire */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-md p-6 sm:p-8 space-y-6">
            
            <div className="border-b border-slate-200 pb-4">
              <h3 className="text-xl font-bold text-[#0b1d3a] font-serif">
                Formulaire de Demande de Préinscription
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Remplissez les informations ci-dessous pour réserver une place et faciliter votre accueil.
              </p>
            </div>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                
                {/* Informations Élève */}
                <div className="space-y-3">
                  <span className="font-bold text-slate-700 uppercase tracking-wider block text-[11px]">
                    1. Identité de l'élève
                  </span>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-700 font-medium mb-1">
                        Nom et Prénom de l'enfant *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.studentFullName}
                        onChange={(e) => setFormData({ ...formData, studentFullName: e.target.value })}
                        placeholder="Ex : Diallo Fatoumata Binta"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 font-medium mb-1">
                        Date de naissance *
                      </label>
                      <input
                        type="date"
                        required
                        value={formData.birthDate}
                        onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-slate-700 font-medium mb-1">
                        Cycle demandé *
                      </label>
                      <select
                        value={formData.cycle}
                        onChange={(e) => setFormData({ ...formData, cycle: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                      >
                        <option value="maternelle">Maternelle / Préscolaire</option>
                        <option value="primaire">École Primaire / Élémentaire</option>
                        <option value="college">Collège (7è - 10è)</option>
                        <option value="lycee">Lycée (11è - Terminale)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-slate-700 font-medium mb-1">
                        Classe souhaitée
                      </label>
                      <input
                        type="text"
                        value={formData.targetGrade}
                        onChange={(e) => setFormData({ ...formData, targetGrade: e.target.value })}
                        placeholder="Ex : CP1, 7ème, 11ème SM..."
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 font-medium mb-1">
                        Zone de préférence
                      </label>
                      <select
                        value={formData.preferredZone}
                        onChange={(e) => setFormData({ ...formData, preferredZone: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                      >
                        <option value="taouyah">Campus Taouyah</option>
                        <option value="carriere">Campus Carrière</option>
                        <option value="sonfonia">Campus Sonfonia</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Informations Parents */}
                <div className="space-y-3 pt-3 border-t border-slate-200">
                  <span className="font-bold text-slate-700 uppercase tracking-wider block text-[11px]">
                    2. Coordonnées du Parent / Tuteur
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-700 font-medium mb-1">
                        Nom complet du parent / tuteur *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.parentFullName}
                        onChange={(e) => setFormData({ ...formData, parentFullName: e.target.value })}
                        placeholder="Ex : M. Ibrahima Sory Camara"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 font-medium mb-1">
                        Numéro de téléphone d'appel *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.parentPhone}
                        onChange={(e) => setFormData({ ...formData, parentPhone: e.target.value })}
                        placeholder="Ex : +224 620 XX XX XX"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-medium mb-1">
                      Numéro WhatsApp (pour le suivi et confirmation)
                    </label>
                    <input
                      type="tel"
                      value={formData.parentWhatsapp}
                      onChange={(e) => setFormData({ ...formData, parentWhatsapp: e.target.value })}
                      placeholder="Ex : +224 662 XX XX XX"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-medium mb-1">
                      Observations particulières (optionnel)
                    </label>
                    <textarea
                      rows={2}
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="Précisez un ancien établissement, régime spécial, etc."
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div className="pt-3">
                  <button
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer text-sm"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Générer le récapitulatif de préinscription</span>
                  </button>
                </div>
              </form>
            ) : (
              /* Récapitulatif généré avec transmission WhatsApp */
              <div className="space-y-6 animate-fadeIn">
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-emerald-900 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-sm">
                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                    <span>Demande de préinscription générée avec succès !</span>
                  </div>
                  <p className="text-xs text-emerald-800">
                    Votre dossier préparatoire est prêt. Vous pouvez l'envoyer directement à la direction 
                    sur le numéro WhatsApp officiel (+224 662 11 80 00) pour une prise en charge prioritaire.
                  </p>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2 text-xs text-slate-700">
                  <div className="font-bold text-[#0b1d3a] border-b border-slate-200 pb-2">
                    Fiche Récapitulative — Les Écoles Le Berceau des 3S
                  </div>
                  <div><strong>Élève :</strong> {formData.studentFullName} ({formData.birthDate})</div>
                  <div><strong>Cycle demandé :</strong> {formData.cycle} — Classe : {formData.targetGrade || 'À valider'}</div>
                  <div><strong>Zone privilégiée :</strong> {formData.preferredZone} (Taouyah / Carrière / Sonfonia)</div>
                  <div><strong>Responsable légal :</strong> {formData.parentFullName} ({formData.parentPhone})</div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href={getDirectWhatsappMessage()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-center text-xs shadow-md flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Transmettre directement sur WhatsApp</span>
                  </a>

                  <button
                    onClick={handlePrint}
                    className="px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-xl text-xs border border-slate-300 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Imprimer</span>
                  </button>

                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-4 py-3 text-slate-500 hover:text-slate-800 text-xs font-semibold cursor-pointer"
                  >
                    Modifier
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* Colonne Droite (5 colonnes) : Pièces à fournir & Informations */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Boîte des Pièces Administratives */}
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 space-y-4">
              <div className="flex items-center gap-2 text-[#0b1d3a] font-bold text-sm">
                <FileText className="w-5 h-5 text-amber-600" />
                <span>Dossier d'Inscription : Pièces à Fournir</span>
              </div>
              
              <p className="text-xs text-slate-600 leading-relaxed">
                Pour finaliser l'inscription définitive au secrétariat, veuillez constituer les pièces suivantes :
              </p>

              <ul className="space-y-2 text-xs text-slate-700">
                {SCHOOL_CONFIG.admission.documentsRequired.map((doc, idx) => (
                  <li key={idx} className="flex items-start gap-2 bg-white p-2.5 rounded-lg border border-slate-200">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>

              <div className="p-3 bg-blue-50/70 rounded-lg border border-blue-200 text-[11px] text-blue-900">
                <strong>Conseil aux parents :</strong> Préparez les originaux ainsi que 2 photocopies simples de chaque document lors du dépôt physique.
              </div>
            </div>

            {/* Assistance directe */}
            <div className="bg-[#0b1d3a] text-white rounded-2xl p-6 space-y-3">
              <span className="text-amber-300 text-xs font-bold uppercase tracking-wider">
                Besoin d'un renseignement immédiat ?
              </span>
              <h4 className="text-base font-bold font-serif">
                Notre secrétariat est joignable sur WhatsApp
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Posez vos questions sur les places disponibles, les tenues scolaires ou le calendrier des rentrées.
              </p>
              <a
                href={SCHOOL_CONFIG.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold rounded-lg shadow-xs transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Écrire au +224 662 11 80 00</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
