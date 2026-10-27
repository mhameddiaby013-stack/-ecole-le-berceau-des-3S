/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Fonction Serveur Netlify : Récupération sécurisée des publications publiques Facebook via Meta Graph API
 * Architecture serveur sécurisée : aucun jeton d'accès n'est exposé au navigateur client.
 */

// Cache en mémoire pour respecter les quotas Meta et réduire la latence
let cachedResponse: any = null;
let lastFetchTime = 0;
const CACHE_TTL_MS = 15 * 60 * 1000; // 15 minutes

export const handler = async (event: any) => {
  // En-têtes CORS et Content-Type
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Cache-Control': 'public, max-age=600, s-maxage=900'
  };

  // Traitement préliminaire OPTIONS pour les requêtes CORS
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers, body: '' };
  }

  const pageId = process.env.META_PAGE_ID;
  const accessToken = process.env.META_ACCESS_TOKEN;
  const pageUrl = process.env.VITE_FACEBOOK_PAGE_URL || "https://www.facebook.com/LeBerceauDes3S";

  // 1. Vérification si les identifiants sont configurés
  if (!pageId || !accessToken) {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        status: 'unconfigured',
        isConfigured: false,
        message: "L'intégration Meta Graph API n'est pas encore configurée (META_PAGE_ID ou META_ACCESS_TOKEN manquant dans les variables d'environnement Netlify).",
        pageUrl,
        posts: [],
        instruction: "Consultez le guide meta_setup.md à la racine du projet pour obtenir les clés nécessaires dans Meta for Developers."
      })
    };
  }

  // 2. Vérification du cache mémoire
  const now = Date.now();
  const forceRefresh = event.queryStringParameters && event.queryStringParameters.refresh === 'true';

  if (!forceRefresh && cachedResponse && (now - lastFetchTime) < CACHE_TTL_MS) {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        ...cachedResponse,
        cached: true,
        cacheAgeSeconds: Math.round((now - lastFetchTime) / 1000)
      })
    };
  }

  // 3. Appel de l'API Graph officielle de Meta
  // Endpoint officiel documenté : /{page-id}/posts avec permissions pages_read_engagement / pages_read_user_content
  try {
    const fields = 'id,message,created_time,permalink_url,full_picture,attachments{media_type,type,url,title,description,media{image{src},source},target{url}},shares';
    const apiUrl = `https://graph.facebook.com/v20.0/${encodeURIComponent(pageId)}/posts?fields=${encodeURIComponent(fields)}&limit=12&access_token=${encodeURIComponent(accessToken)}`;

    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: { 'Accept': 'application/json' }
    });

    const data = await response.json();

    if (!response.ok || data.error) {
      console.error('[Meta Graph API Error]:', data.error);
      return {
        statusCode: 200, // On retourne 200 avec status 'error' pour que le frontend gère élégamment l'état sans planter
        headers,
        body: JSON.stringify({
          status: 'error',
          isConfigured: true,
          error: data.error?.message || "Erreur de communication avec Meta Graph API",
          code: data.error?.code || 'META_API_ERROR',
          errorType: data.error?.type,
          pageUrl,
          posts: [],
          hint: data.error?.code === 190 
            ? "Le jeton d'accès Meta a expiré ou a été révoqué. Renouvelez votre Page Access Token."
            : "Vérifiez les permissions de votre application Meta for Developers."
        })
      };
    }

    // 4. Normalisation des données pour l'affichage uniforme
    const normalizedPosts = (data.data || []).map((item: any) => {
      const attachment = item.attachments?.data?.[0];
      let mediaType: 'image' | 'video' | 'album' | 'link' | 'status' = 'status';
      let videoUrl: string | undefined = undefined;

      if (attachment) {
        if (attachment.media_type === 'video' || attachment.type === 'video_inline') {
          mediaType = 'video';
          videoUrl = attachment.media?.source || attachment.url || attachment.target?.url;
        } else if (attachment.media_type === 'album') {
          mediaType = 'album';
        } else if (attachment.media_type === 'photo' || item.full_picture) {
          mediaType = 'image';
        } else if (attachment.target?.url) {
          mediaType = 'link';
        }
      } else if (item.full_picture) {
        mediaType = 'image';
      }

      return {
        id: item.id,
        message: item.message || '',
        created_time: item.created_time,
        permalink_url: item.permalink_url || `https://www.facebook.com/${item.id}`,
        full_picture: item.full_picture || attachment?.media?.image?.src,
        media_type: mediaType,
        video_url: videoUrl,
        attachment_title: attachment?.title,
        attachment_description: attachment?.description,
        shares_count: item.shares?.count || 0
      };
    });

    const payload = {
      status: 'ok',
      isConfigured: true,
      pageUrl,
      posts: normalizedPosts,
      lastUpdated: new Date().toISOString(),
      cached: false
    };

    // Mise à jour du cache mémoire
    cachedResponse = payload;
    lastFetchTime = now;

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(payload)
    };

  } catch (error: any) {
    console.error('[Facebook API Server Error]:', error);
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        status: 'error',
        isConfigured: true,
        error: error?.message || "Erreur réseau lors de la requête vers Meta",
        pageUrl,
        posts: []
      })
    };
  }
};
