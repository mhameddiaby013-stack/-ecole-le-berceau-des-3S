/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Pied de page officiel des Écoles Le Berceau des 3S
 */

import React from 'react';
import { SCHOOL_CONFIG } from '../config/schoolConfig';
import { 
  BookOpen, 
  MessageSquare, 
  Share2, 
  MapPin, 
  Phone, 
  Mail, 
  GraduationCap, 
  ExternalLink,
  ShieldAlert,
  ArrowUp
} from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800">
      
      {/* Contenu Principal du Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Colonne 1 : Identité & Valeurs 3S (5 colonnes) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-500 text-slate-950 flex items-center justify-center font-serif font-black text-sm shadow-md">
                3S
              </div>
              <span className="text-lg font-bold text-white font-serif tracking-tight">
                Les Écoles Le Berceau des 3S
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Établissement privé d'enseignement général à Conakry (Guinée). De la Maternelle au Lycée, 
              nous offrons un enseignement rigoureux ancré dans les valeurs de Savoir, Sagesse et Succès.
            </p>

            <div className="pt-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-amber-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Inscriptions Ouvertes pour la Nouvelle Année Scolaire</span>
              </div>
            </div>

            {/* Réseaux Sociaux */}
            <div className="pt-3 flex items-center gap-3">
              <a
                href={SCHOOL_CONFIG.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl transition-colors shadow-xs flex items-center gap-1.5 text-xs font-semibold"
                title="WhatsApp Officiel"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>

              <a
                href={SCHOOL_CONFIG.facebookPageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-[#1877F2] hover:bg-[#166fe5] text-white rounded-xl transition-colors shadow-xs flex items-center gap-1.5 text-xs font-semibold"
                title="Page Facebook Officielle"
              >
                <Share2 className="w-4 h-4" />
                <span>Facebook</span>
              </a>
            </div>
          </div>

          {/* Colonne 2 : Liens rapides de navigation (3 colonnes) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-serif">
              Plan du Portail Web
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button 
                  onClick={() => onNavigate('accueil')} 
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  Accueil & Présentation
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('notre-ecole')} 
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  Notre École & Valeurs 3S
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('notre-programme')} 
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  Cycles & Programmes Scolaires
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('actualites')} 
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  Actualités & Page Facebook
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('galerie')} 
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  Galerie Photos & Démonstrations
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('inscription')} 
                  className="text-amber-400 hover:underline font-semibold cursor-pointer"
                >
                  Préinscription en ligne
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('contact')} 
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  Contact & Localisations
                </button>
              </li>
            </ul>
          </div>

          {/* Colonne 3 : Implantation & Transparence (4 colonnes) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-serif">
              Zones de Présence à Conakry
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>Zone Taouyah (Ratoma, Conakry)</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>Zone Carrière (Dixinn / Matam, Conakry)</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>Zone Sonfonia (Conakry)</span>
              </li>
            </ul>

            <div className="pt-2">
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-[11px] text-slate-400 leading-relaxed">
                <strong className="text-slate-300">Avis d'intégrité :</strong> Les adresses précises, frais scolaires et agréments officiels sont communiqués directement par la direction des Écoles Le Berceau des 3S au <strong>+224 662 11 80 00</strong>.
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Barre Inférieure de Copyright */}
      <div className="border-t border-slate-900 bg-slate-950/80 py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} Les Écoles Le Berceau des 3S — Tous droits réservés. République de Guinée.
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[11px] text-slate-500">
              Site optimisé pour déploiement Netlify
            </span>
            <button
              onClick={scrollToTop}
              className="p-2 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
              aria-label="Retour en haut"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

    </footer>
  );
};
