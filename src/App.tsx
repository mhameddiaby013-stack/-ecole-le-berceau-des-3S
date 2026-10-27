/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Application Principale — Site Officiel des Écoles Le Berceau des 3S (Conakry, Guinée)
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SchoolPresentation } from './components/SchoolPresentation';
import { AcademicPrograms } from './components/AcademicPrograms';
import { FacebookSection } from './components/FacebookSection';
import { SchoolGallery } from './components/SchoolGallery';
import { AdmissionSection } from './components/AdmissionSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('accueil');
  const [selectedAdmissionProgram, setSelectedAdmissionProgram] = useState<string>('primaire');

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSelectProgramForAdmission = (programId: string) => {
    setSelectedAdmissionProgram(programId);
    handleNavigate('inscription');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-amber-400 selection:text-slate-950">
      {/* Barre de navigation fixe */}
      <Navbar activeSection={activeSection} onNavigate={handleNavigate} />

      {/* Contenu principal */}
      <main className="flex-1">
        {/* 1. Accueil & Hero */}
        <div id="accueil">
          <Hero onNavigate={handleNavigate} />
        </div>

        {/* 2. Notre École & Piliers 3S */}
        <SchoolPresentation />

        {/* 3. Notre Programme Scolaire */}
        <AcademicPrograms onSelectProgramForAdmission={handleSelectProgramForAdmission} />

        {/* 4. Actualités & Synchronisation Page Facebook */}
        <FacebookSection />

        {/* 5. Galerie Photos & Démonstrations Pédagogiques */}
        <SchoolGallery />

        {/* 6. Inscriptions & Préinscriptions en ligne */}
        <AdmissionSection initialProgramId={selectedAdmissionProgram} />

        {/* 7. Contact & Localisations Conakry */}
        <ContactSection />
      </main>

      {/* Pied de page officiel */}
      <Footer onNavigate={handleNavigate} />

      {/* Bouton d'action flottant WhatsApp direct */}
      <FloatingWhatsApp />
    </div>
  );
}
