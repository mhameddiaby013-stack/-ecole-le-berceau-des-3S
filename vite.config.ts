import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, type Plugin} from 'vite';

// Plugin Vite pour servir les routes d'API Facebook en environnement de développement local
function localApiPlugin(): Plugin {
  return {
    name: 'local-facebook-api',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url) return next();
        const url = new URL(req.url, 'http://localhost:3000');

        if (url.pathname === '/api/facebook/posts') {
          res.setHeader('Content-Type', 'application/json');
          res.setHeader('Access-Control-Allow-Origin', '*');

          const pageId = process.env.META_PAGE_ID;
          const accessToken = process.env.META_ACCESS_TOKEN;
          const pageUrl = process.env.VITE_FACEBOOK_PAGE_URL || "https://www.facebook.com/LeBerceauDes3S";

          if (!pageId || !accessToken) {
            res.statusCode = 200;
            res.end(JSON.stringify({
              status: 'unconfigured',
              isConfigured: false,
              message: "L'intégration Meta Graph API n'est pas encore configurée (META_PAGE_ID ou META_ACCESS_TOKEN manquant dans l'environnement).",
              pageUrl,
              posts: [],
              instruction: "Renseignez vos clés dans le fichier .env ou sur Netlify. Consultez meta_setup.md."
            }));
            return;
          }

          try {
            const fields = 'id,message,created_time,permalink_url,full_picture,attachments{media_type,type,url,title,description,media{image{src},source},target{url}},shares';
            const apiUrl = `https://graph.facebook.com/v20.0/${encodeURIComponent(pageId)}/posts?fields=${encodeURIComponent(fields)}&limit=12&access_token=${encodeURIComponent(accessToken)}`;
            const response = await fetch(apiUrl);
            const data = await response.json();

            if (!response.ok || data.error) {
              res.statusCode = 200;
              res.end(JSON.stringify({
                status: 'error',
                isConfigured: true,
                error: data.error?.message || "Erreur de communication avec Meta Graph API",
                code: data.error?.code,
                pageUrl,
                posts: []
              }));
              return;
            }

            const posts = (data.data || []).map((item: any) => {
              const attachment = item.attachments?.data?.[0];
              let mediaType = 'status';
              let videoUrl = undefined;
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

            res.statusCode = 200;
            res.end(JSON.stringify({
              status: 'ok',
              isConfigured: true,
              pageUrl,
              posts,
              lastUpdated: new Date().toISOString()
            }));
          } catch (err: any) {
            res.statusCode = 200;
            res.end(JSON.stringify({
              status: 'error',
              isConfigured: true,
              error: err?.message || "Erreur réseau locale",
              pageUrl,
              posts: []
            }));
          }
          return;
        }

        if (url.pathname === '/api/facebook/webhook') {
          res.setHeader('Content-Type', 'text/plain');
          const mode = url.searchParams.get('hub.mode');
          const token = url.searchParams.get('hub.verify_token');
          const challenge = url.searchParams.get('hub.challenge');
          const expectedToken = process.env.META_VERIFY_TOKEN || 'leberceaudes3s_secret_webhook_token';
          if (mode === 'subscribe' && token === expectedToken) {
            res.statusCode = 200;
            res.end(challenge || '');
            return;
          }
          res.statusCode = 200;
          res.end('Webhook endpoint ready');
          return;
        }

        next();
      });
    }
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), localApiPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
