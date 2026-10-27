/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Bouton Flottant WhatsApp Officiel pour Les Écoles Le Berceau des 3S
 */

import React, { useState } from 'react';
import { SCHOOL_CONFIG } from '../config/schoolConfig';
import { MessageSquare, X } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2">
      {/* Infobulle discrète */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 bg-white text-slate-800 text-xs py-2 px-3.5 rounded-2xl shadow-xl border border-slate-200 animate-bounce duration-1000">
          <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
          <span className="font-semibold text-slate-900">Une question ?</span>
          <span className="text-slate-600">Discutez sur WhatsApp (+224 662 11 80 00)</span>
          <button 
            onClick={() => setShowTooltip(false)}
            className="text-slate-400 hover:text-slate-600 ml-1"
            aria-label="Fermer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Bouton principal WhatsApp */}
      <a
        href={SCHOOL_CONFIG.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-14 h-14 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full shadow-2xl hover:shadow-emerald-500/40 hover:scale-105 active:scale-95 transition-all duration-300"
        title="Contacter la direction sur WhatsApp"
        aria-label="Contacter la direction sur WhatsApp"
      >
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75" />
          <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-400 border-2 border-white" />
        </span>
        <MessageSquare className="w-7 h-7 fill-white/20" />
      </a>
    </div>
  );
};
