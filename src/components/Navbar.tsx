/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Barre de navigation principale et bandeau officiel des Écoles Le Berceau des 3S
 */

import React, { useState } from 'react';
import { SCHOOL_CONFIG } from '../config/schoolConfig';
import { 
  Phone, 
  MapPin, 
  MessageSquare, 
  Menu, 
  X, 
  BookOpen, 
  GraduationCap, 
  Share2, 
  ChevronRight, 
  Sparkles,
  Info
} from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'accueil', label: 'Accueil' },
    { id: 'notre-ecole', label: 'Notre école' },
    { id: 'notre-programme', label: 'Notre programme' },
    { id: 'actualites', label: 'Actualités & Facebook' },
    { id: 'galerie', label: 'Galerie' },
    { id: 'inscription', label: 'Inscription' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      {/* Bandeau d'information et contact rapide */}
      <div className="bg-[#0b1d3a] text-slate-100 text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="flex items-center gap-1.5 text-amber-300 font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Inscriptions ouvertes 2024-2025 / 2025-2026</span>
            </span>
            <span className="hidden md:inline-block text-slate-400">|</span>
            <span className="hidden md:flex items-center gap-1.5 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>Conakry : Taouyah • Carrière • Sonfonia (Zones à confirmer)</span>
            </span>
          </div>

          <div className="flex items-center gap-4 ml-auto">
            <a
              href={SCHOOL_CONFIG.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-semibold transition-colors"
              title="Discuter directement sur WhatsApp"
            >
              <MessageSquare className="w-3.5 h-3.5 fill-emerald-500/20" />
              <span>WhatsApp : {SCHOOL_CONFIG.whatsappNumber}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Barre de navigation principale */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Nom de l'établissement */}
          <button 
            onClick={() => handleNavClick('accueil')} 
            className="flex items-center gap-3 text-left focus:outline-none group cursor-pointer"
          >
            {/* Blason symbolique Le Berceau des 3S */}
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0b1d3a] via-[#122e5a] to-[#1e427b] text-white flex items-center justify-center shadow-md border border-amber-400/30 group-hover:scale-105 transition-transform duration-200">
              <div className="relative flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-amber-300" />
                <span className="absolute -bottom-1 -right-1 text-[9px] font-black bg-amber-400 text-slate-900 px-1 rounded-sm shadow-xs font-serif">
                  3S
                </span>
              </div>
            </div>

            <div className="flex flex-col">
              <span className="text-lg md:text-xl font-bold tracking-tight text-[#0b1d3a] font-serif leading-tight">
                Les Écoles Le Berceau des 3S
              </span>
              <span className="text-[11px] font-medium text-slate-500 uppercase tracking-widest">
                Enseignement Général • Conakry, Guinée
              </span>
            </div>
          </button>

          {/* Liens Desktop */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
                  activeSection === link.id
                    ? 'text-[#0b1d3a] font-semibold bg-amber-50 border-b-2 border-amber-500'
                    : 'text-slate-600 hover:text-[#0b1d3a] hover:bg-slate-100/70'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Boutons d'action rapides Desktop */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => handleNavClick('contact')}
              className="px-4 py-2 text-xs font-semibold text-slate-700 hover:text-[#0b1d3a] hover:bg-slate-100 rounded-lg border border-slate-300 transition-colors cursor-pointer"
            >
              Contacter l'école
            </button>

            <button
              onClick={() => handleNavClick('inscription')}
              className="px-4 py-2 text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-lg shadow-sm hover:shadow transition-all cursor-pointer flex items-center gap-1.5"
            >
              <GraduationCap className="w-4 h-4" />
              <span>Préinscription</span>
            </button>
          </div>

          {/* Bouton Hamburger Mobile */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={() => handleNavClick('inscription')}
              className="px-2.5 py-1.5 text-xs font-bold text-slate-900 bg-amber-400 rounded-lg shadow-xs flex items-center gap-1"
            >
              <span>Préinscription</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:text-[#0b1d3a] hover:bg-slate-100 focus:outline-none"
              aria-label="Menu principal"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Menu Déroulant Mobile */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 shadow-xl px-4 pt-2 pb-6 space-y-2 animate-fadeIn">
          <div className="bg-amber-50/70 border border-amber-200 rounded-lg p-2.5 text-xs text-amber-900 flex items-start gap-2 mb-3">
            <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <span>Site officiel en préparation de publication. Coordonnées WhatsApp officielles : <strong>{SCHOOL_CONFIG.whatsappNumber}</strong>.</span>
          </div>

          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`w-full text-left px-3.5 py-2.5 rounded-lg text-sm font-medium flex items-center justify-between cursor-pointer ${
                activeSection === link.id
                  ? 'bg-[#0b1d3a] text-white font-semibold'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <span>{link.label}</span>
              <ChevronRight className="w-4 h-4 opacity-60" />
            </button>
          ))}

          <div className="pt-3 border-t border-slate-200 flex flex-col gap-2">
            <a
              href={SCHOOL_CONFIG.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Contacter la direction sur WhatsApp</span>
            </a>
            <button
              onClick={() => handleNavClick('inscription')}
              className="w-full py-2.5 px-3 bg-amber-400 hover:bg-amber-500 text-slate-950 rounded-lg text-xs font-bold flex items-center justify-center gap-2"
            >
              <GraduationCap className="w-4 h-4" />
              <span>Faire une demande de préinscription</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
