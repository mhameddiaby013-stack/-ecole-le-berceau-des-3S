/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Section Officielle Actualités & Intégration Page Facebook
 * Conforme aux règles Meta for Developers et architecture Netlify
 */

import React, { useState, useEffect } from 'react';
import { SCHOOL_CONFIG } from '../config/schoolConfig';
import { FacebookApiResponse, FacebookPost } from '../types/facebook';
import { 
  Share2, 
  ExternalLink, 
  Video, 
  Image as ImageIcon, 
  Calendar, 
  RefreshCw, 
  CheckCircle, 
  AlertCircle, 
  Info, 
  Sliders, 
  ChevronRight, 
  Play, 
  Sparkles,
  ShieldCheck,
  X,
  FileText
} from 'lucide-react';

export const FacebookSection: React.FC = () => {
  // État de l'URL Facebook paramétrable
  const [pageUrl, setPageUrl] = useState<string>(SCHOOL_CONFIG.facebookPageUrl);
  const [isEditingUrl, setIsEditingUrl] = useState(false);
  const [tempUrl, setTempUrl] = useState(pageUrl);

  // État de l'API Graph Meta
  const [apiData, setApiData] = useState<FacebookApiResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Filtre d'affichage des posts
  const [activeFilter, setActiveFilter] = useState<'all' | 'video' | 'image'>('all');

  // Modale pour vidéo réelle
  const [selectedVideoUrl, setSelectedVideoUrl] = useState<string | null>(null);

  // Chargement des publications depuis le backend sécurisé
  const fetchPosts = async (forceRefresh = false) => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const url = `/api/facebook/posts${forceRefresh ? '?refresh=true' : ''}`;
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`Erreur réseau HTTP : ${res.status}`);
      }
      const data: FacebookApiResponse = await res.json();
      setApiData(data);
    } catch (err: any) {
      console.warn('[Facebook Feed Notice]', err);
      setErrorMsg(err.message || 'Impossible de joindre le service de synchronisation');
      // État de repli propre
      setApiData({
        status: 'unconfigured',
        isConfigured: false,
        pageUrl,
        posts: []
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSaveCustomUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tempUrl.trim()) return;
    setPageUrl(tempUrl.trim());
    setIsEditingUrl(false);
  };

  // Filtrage des publications
  const filteredPosts = (apiData?.posts || []).filter(post => {
    if (activeFilter === 'video') return post.media_type === 'video' || post.video_url;
    if (activeFilter === 'image') return post.media_type === 'image' || post.full_picture;
    return true;
  });

  // URL encodée pour le Facebook Page Plugin officiel (iframe respectant les règles Meta)
  const officialPagePluginUrl = `https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(
    pageUrl
  )}&tabs=timeline&width=500&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true`;

  return (
    <section id="actualites" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* En-tête de la section Actualités */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 border-b border-slate-200 pb-8">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#0b1d3a] text-xs font-semibold">
              <Share2 className="w-3.5 h-3.5 text-blue-600" />
              <span>Actualités Officielles & Réseaux Sociaux</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0b1d3a] font-serif tracking-tight">
              Suivez Notre Actualité sur Facebook
            </h2>

            <p className="text-slate-600 text-sm md:text-base leading-relaxed">
              Consultez les dernières annonces, activités scolaires et vidéos publiques 
              diffusées sur la page officielle des <strong>Écoles Le Berceau des 3S</strong>.
            </p>
          </div>

          {/* Boutons d'action rapides vers la page Facebook */}
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={pageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 bg-[#1877F2] hover:bg-[#166fe5] text-white text-xs font-bold rounded-xl shadow-xs hover:shadow transition-all flex items-center gap-2"
            >
              <Share2 className="w-4 h-4" />
              <span>Visiter la page Facebook</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-80" />
            </a>

            <button
              onClick={() => setIsEditingUrl(!isEditingUrl)}
              className="px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl border border-slate-300 transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Configurer l'URL de la page"
            >
              <Sliders className="w-3.5 h-3.5 text-slate-500" />
              <span>Configurer l'URL</span>
            </button>

            <button
              onClick={() => fetchPosts(true)}
              disabled={loading}
              className="p-2.5 text-slate-600 hover:text-[#0b1d3a] hover:bg-slate-100 rounded-xl border border-slate-200 transition-colors cursor-pointer"
              title="Actualiser les publications"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* Panneau de configuration rapide de l'URL Facebook (si déplié) */}
        {isEditingUrl && (
          <form 
            onSubmit={handleSaveCustomUrl}
            className="p-5 bg-blue-50/70 border border-blue-200 rounded-xl space-y-3 transition-all animate-fadeIn"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#0b1d3a] flex items-center gap-1.5">
                <Sliders className="w-4 h-4 text-blue-600" />
                Configuration de l'adresse de la Page Facebook Officielle
              </span>
              <button 
                type="button" 
                onClick={() => setIsEditingUrl(false)} 
                className="text-slate-400 hover:text-slate-600 text-xs"
              >
                Fermer
              </button>
            </div>
            
            <p className="text-xs text-slate-600">
              Renseignez l'URL exacte de la page Facebook officielle (ex : <code>https://www.facebook.com/LeBerceauDes3S</code>). 
              Cette valeur peut également être configurée de façon permanente via la variable d'environnement <code>VITE_FACEBOOK_PAGE_URL</code> sur Netlify.
            </p>

            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="url"
                value={tempUrl}
                onChange={(e) => setTempUrl(e.target.value)}
                placeholder="https://www.facebook.com/LeBerceauDes3S"
                className="flex-1 px-3.5 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                required
              />
              <button
                type="submit"
                className="px-4 py-2 bg-[#0b1d3a] text-white text-xs font-bold rounded-lg hover:bg-[#122e5a] cursor-pointer"
              >
                Appliquer pour la session
              </button>
            </div>
          </form>
        )}

        {/* Information sur l'état de la connexion Graph API Meta */}
        {apiData?.status === 'unconfigured' && (
          <div className="bg-amber-50/90 border border-amber-200 rounded-2xl p-5 text-amber-900 space-y-3">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-2.5">
                <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-amber-950">
                    Statut de la synchronisation automatique Meta Graph API : En attente de configuration des clés
                  </h4>
                  <p className="text-xs text-amber-900/90 leading-relaxed">
                    Pour afficher automatiquement les nouvelles publications via l'API sans intervention manuelle, 
                    les identifiants <code>META_PAGE_ID</code> et <code>META_ACCESS_TOKEN</code> doivent être renseignés dans les variables d'environnement Netlify.
                    En attendant, le site utilise l'intégration officielle par le <strong>Facebook Page Plugin</strong> ci-dessous.
                  </p>
                </div>
              </div>

              <div className="hidden sm:block shrink-0">
                <span className="px-2.5 py-1 text-[11px] font-semibold bg-amber-200/80 text-amber-900 rounded-md border border-amber-300">
                  Mode Autonome Actif
                </span>
              </div>
            </div>

            <div className="pt-2 border-t border-amber-200/70 flex flex-wrap items-center justify-between gap-3 text-xs">
              <span className="text-[11px] text-amber-800">
                Guide pas à pas disponible dans le fichier <strong>meta_setup.md</strong> à la racine du projet.
              </span>
              <a
                href={pageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-bold text-amber-950 hover:underline"
              >
                <span>Accéder directement à la page Facebook</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        )}

        {/* En cas d'erreur de token ou permission Meta */}
        {apiData?.status === 'error' && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-900 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <div className="space-y-1 text-xs">
              <span className="font-bold">Notification API Meta : {apiData.error}</span>
              <p className="text-slate-600">
                Code d'erreur : {String(apiData.code || 'NON_SPECIFIE')}. Vérifiez que votre Page Access Token n'a pas expiré et possède les permissions <code>pages_read_engagement</code>.
              </p>
            </div>
          </div>
        )}

        {/* Grille principale : Publications synchronisées + Plugin officiel Facebook */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Colonne Gauche (7 colonnes) : Flux de publications ou état d'information */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Barre de filtres pour les posts */}
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveFilter('all')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                    activeFilter === 'all'
                      ? 'bg-[#0b1d3a] text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  Tous les contenus
                </button>
                <button
                  onClick={() => setActiveFilter('video')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors ${
                    activeFilter === 'video'
                      ? 'bg-[#0b1d3a] text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <Video className="w-3 h-3 text-red-500" />
                  <span>Vidéos</span>
                </button>
                <button
                  onClick={() => setActiveFilter('image')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors ${
                    activeFilter === 'image'
                      ? 'bg-[#0b1d3a] text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <ImageIcon className="w-3 h-3 text-blue-500" />
                  <span>Photos</span>
                </button>
              </div>

              {apiData?.lastUpdated && (
                <span className="text-[11px] text-slate-400">
                  Actualisé le {new Date(apiData.lastUpdated).toLocaleDateString('fr-FR')}
                </span>
              )}
            </div>

            {/* Chargement */}
            {loading && (
              <div className="space-y-4">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="bg-slate-50 border border-slate-200 rounded-xl p-5 animate-pulse space-y-3">
                    <div className="h-4 bg-slate-200 rounded w-1/3" />
                    <div className="h-3 bg-slate-200 rounded w-full" />
                    <div className="h-3 bg-slate-200 rounded w-4/5" />
                    <div className="h-32 bg-slate-200 rounded-lg w-full" />
                  </div>
                ))}
              </div>
            )}

            {/* Liste des publications si API connectée et avec posts */}
            {!loading && filteredPosts.length > 0 && (
              <div className="space-y-6">
                {filteredPosts.map((post) => (
                  <article 
                    key={post.id}
                    className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-shadow overflow-hidden p-5 space-y-4"
                  >
                    {/* En-tête du post */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#1877F2] text-white flex items-center justify-center font-bold text-xs">
                          3S
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-[#0b1d3a]">
                            Les Écoles Le Berceau des 3S
                          </h4>
                          <span className="text-[11px] text-slate-400 flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(post.created_time).toLocaleDateString('fr-FR', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric'
                            })}
                          </span>
                        </div>
                      </div>

                      <a
                        href={post.permalink_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1"
                        title="Ouvrir sur Facebook"
                      >
                        <span>Voir sur Facebook</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>

                    {/* Texte du post */}
                    {post.message && (
                      <p className="text-slate-700 text-xs sm:text-sm leading-relaxed whitespace-pre-line">
                        {post.message}
                      </p>
                    )}

                    {/* Médias attachés (Vidéo réelle ou Image) */}
                    {post.media_type === 'video' && post.video_url && (
                      <div className="relative rounded-xl overflow-hidden bg-black aspect-video flex items-center justify-center">
                        <video 
                          controls 
                          src={post.video_url} 
                          poster={post.full_picture}
                          className="w-full h-full object-contain"
                        >
                          Votre navigateur ne supporte pas la lecture de vidéo.
                        </video>
                      </div>
                    )}

                    {post.media_type === 'image' && post.full_picture && (
                      <div className="rounded-xl overflow-hidden bg-slate-100 max-h-96">
                        <img 
                          src={post.full_picture} 
                          alt="Illustration de la publication Facebook" 
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    )}

                    {/* Pied de carte : Partager / Suivre */}
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                      <div className="flex items-center gap-2">
                        {post.shares_count ? (
                          <span>{post.shares_count} partages</span>
                        ) : null}
                      </div>

                      <a
                        href={pageUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-slate-700 hover:text-blue-600 flex items-center gap-1"
                      >
                        <span>Suivre notre page Facebook</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {/* État vide si aucune publication récupérée par l'API */}
            {!loading && filteredPosts.length === 0 && (
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mx-auto">
                  <Share2 className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-base font-bold text-[#0b1d3a]">
                    Publications Facebook accessibles en un clic
                  </h4>
                  <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                    Toutes les annonces officielles, photos des cérémonies scolaires et vidéos 
                    sont publiées en temps réel sur la page Facebook officielle de l'établissement.
                  </p>
                </div>

                <div className="pt-2">
                  <a
                    href={pageUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1877F2] hover:bg-[#166fe5] text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>Consulter le flux directement sur Facebook</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            )}

          </div>

          {/* Colonne Droite (5 colonnes) : Plugin Facebook Officiel & Aide Développeur */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Widget Facebook Page Plugin Officiel (Iframe responsive et officielle) */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-[#1877F2] text-white flex items-center justify-center font-bold text-xs">
                    f
                  </div>
                  <span className="text-xs font-bold text-[#0b1d3a]">
                    Plugin Officiel Meta Page
                  </span>
                </div>
                <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded border border-emerald-200 font-semibold">
                  Intégration Directe
                </span>
              </div>

              {/* Conteneur Iframe officiel */}
              <div className="w-full overflow-hidden rounded-xl bg-slate-50 border border-slate-200 flex justify-center">
                <iframe
                  title="Facebook Page Plugin Le Berceau des 3S"
                  src={officialPagePluginUrl}
                  width="100%"
                  height="500"
                  style={{ border: 'none', overflow: 'hidden' }}
                  scrolling="no"
                  frameBorder="0"
                  allowFullScreen={true}
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  className="w-full max-w-full"
                />
              </div>

              <div className="text-[11px] text-slate-500 text-center leading-relaxed">
                Ce composant utilise le composant officiel de Meta pour afficher l'en-tête de la page, 
                le bouton d'abonnement et le fil d'actualités si rendu public par Facebook.
              </div>
            </div>

            {/* Fiche d'assistance pour le gestionnaire de l'école */}
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[#0b1d3a]">
                <FileText className="w-4 h-4 text-amber-600" />
                <span>Guide de Déploiement & Meta Graph API</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Pour lier la page Facebook de façon automatisée avec récupération programmée :
              </p>
              <ul className="text-[11px] text-slate-600 space-y-1 list-disc pl-4">
                <li>Créer l'application sur Meta for Developers.</li>
                <li>Générer un Page Access Token longue durée.</li>
                <li>Renseigner <code>META_PAGE_ID</code> et <code>META_ACCESS_TOKEN</code> sur Netlify.</li>
              </ul>
              <div className="pt-2 border-t border-slate-200 text-[10px] text-slate-500">
                Consultez le fichier <strong>meta_setup.md</strong> à la racine du dépôt pour le tutoriel pas à pas complet.
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
