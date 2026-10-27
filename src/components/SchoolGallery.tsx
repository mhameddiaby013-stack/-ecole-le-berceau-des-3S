/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Galerie photos et vidéos éducatives des Écoles Le Berceau des 3S
 */

import React, { useState } from 'react';
import { 
  ImageIcon, 
  Video, 
  AlertCircle, 
  Maximize2, 
  X, 
  Sparkles, 
  Camera, 
  Layers 
} from 'lucide-react';

interface GalleryItem {
  id: string;
  type: 'image' | 'video';
  title: string;
  category: 'classes' | 'activites' | 'sciences' | 'sport';
  src: string;
  caption: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: '1',
    type: 'image',
    title: 'Atmosphère studieuse en classe',
    category: 'classes',
    src: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1000&q=80',
    caption: 'Encadrement personnalisé et concentration des élèves lors des séances de cours fondamentaux.'
  },
  {
    id: '2',
    type: 'image',
    title: 'Éveil et créativité en maternelle',
    category: 'activites',
    src: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=1000&q=80',
    caption: 'Ateliers manuels, peinture et développement de la motricité fine pour les tout-petits.'
  },
  {
    id: '3',
    type: 'image',
    title: 'Initiation aux sciences et logique',
    category: 'sciences',
    src: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1000&q=80',
    caption: 'Découverte par l\'expérimentation scientifique pour éveiller la curiosité des futurs scientifiques.'
  },
  {
    id: '4',
    type: 'image',
    title: 'Lecture et bibliothèque scolaire',
    category: 'classes',
    src: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1000&q=80',
    caption: 'Amour du livre, enrichissement du vocabulaire et maîtrise de la langue française.'
  },
  {
    id: '5',
    type: 'image',
    title: 'Activités sportives et motricité',
    category: 'sport',
    src: 'https://images.unsplash.com/photo-1576678927484-cc907957088c?auto=format&fit=crop&w=1000&q=80',
    caption: 'L\'esprit d\'équipe, la santé physique et la discipline par la pratique sportive régulière.'
  },
  {
    id: '6',
    type: 'image',
    title: 'Émulation académique et travail en groupe',
    category: 'classes',
    src: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=1000&q=80',
    caption: 'Apprentissage collaboratif et préparation assidue aux examens scolaires nationaux.'
  }
];

export const SchoolGallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  const filteredItems = selectedCategory === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.category === selectedCategory);

  return (
    <section id="galerie" className="py-16 md:py-24 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* En-tête avec mention d'honnêteté */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/70 border border-amber-300 text-amber-900 text-xs font-semibold">
            <Camera className="w-3.5 h-3.5 text-amber-700" />
            <span>Vie Scolaire & Espaces d'Apprentissage</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0b1d3a] font-serif tracking-tight">
            Galerie Photos & Démonstrations Éducatives
          </h2>

          <p className="text-slate-600 text-sm md:text-base leading-relaxed">
            Aperçu des moments forts de la vie scolaire, de la pédagogie active et des activités d'éveil.
          </p>

          {/* Bandeau d'intégrité strict */}
          <div className="inline-flex items-center gap-2 p-2.5 rounded-xl bg-amber-50 border border-amber-300/80 text-amber-900 text-xs shadow-xs text-left">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              <strong>Note de transparence :</strong> Les photographies présentées ci-dessous sont des clichés de démonstration pédagogique. Elles seront remplacées par les photographies officielles des élèves et locaux des Écoles Le Berceau des 3S.
            </span>
          </div>
        </div>

        {/* Boutons de filtres */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-[#0b1d3a] text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
            }`}
          >
            Toutes les photos
          </button>
          <button
            onClick={() => setSelectedCategory('classes')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              selectedCategory === 'classes'
                ? 'bg-[#0b1d3a] text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
            }`}
          >
            Salles de classe & Études
          </button>
          <button
            onClick={() => setSelectedCategory('activites')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              selectedCategory === 'activites'
                ? 'bg-[#0b1d3a] text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
            }`}
          >
            Éveil & Maternelle
          </button>
          <button
            onClick={() => setSelectedCategory('sciences')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              selectedCategory === 'sciences'
                ? 'bg-[#0b1d3a] text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
            }`}
          >
            Sciences & Découverte
          </button>
          <button
            onClick={() => setSelectedCategory('sport')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              selectedCategory === 'sport'
                ? 'bg-[#0b1d3a] text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
            }`}
          >
            Sport & Motricité
          </button>
        </div>

        {/* Grille des photos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveItem(item)}
              className="group relative bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col"
            >
              <div className="relative h-60 overflow-hidden bg-slate-900">
                <img
                  src={item.src}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Overlay hover */}
                <div className="absolute inset-0 bg-[#0b1d3a]/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white">
                    <Maximize2 className="w-5 h-5" />
                  </span>
                </div>

                <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md px-2 py-1 rounded text-[10px] text-amber-300 font-semibold border border-amber-400/30">
                  Démonstration
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
                <div>
                  <h4 className="text-sm font-bold text-[#0b1d3a] group-hover:text-blue-700 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-500 line-clamp-2 mt-1">
                    {item.caption}
                  </p>
                </div>

                <div className="text-[10px] text-slate-400 italic pt-2 border-t border-slate-100">
                  * Cliché de démonstration éducative
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Modale d'agrandissement Lightbox */}
      {activeItem && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full bg-slate-900 rounded-2xl overflow-hidden border border-slate-700 text-white shadow-2xl animate-fadeIn">
            <button
              onClick={() => setActiveItem(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-slate-800 hover:bg-slate-700 rounded-full text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative max-h-[70vh] bg-black flex items-center justify-center">
              <img
                src={activeItem.src}
                alt={activeItem.title}
                className="max-h-[70vh] w-auto object-contain mx-auto"
              />
            </div>

            <div className="p-5 bg-slate-900 space-y-2 border-t border-slate-800">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white font-serif">
                  {activeItem.title}
                </h3>
                <span className="text-[11px] bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded border border-amber-400/30">
                  Photo de démonstration
                </span>
              </div>
              <p className="text-xs text-slate-300">
                {activeItem.caption}
              </p>
              <p className="text-[10px] text-slate-400 italic">
                Ce visuel sera actualisé avec les photographies prises au sein des campus des Écoles Le Berceau des 3S (Taouyah, Carrière, Sonfonia).
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
