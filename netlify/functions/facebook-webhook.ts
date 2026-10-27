/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Endpoint Webhook Meta : Vérification du Challenge & Réception des notifications de nouveaux posts
 */

import crypto from 'node:crypto';

export const handler = async (event: any) => {
  const method = event.httpMethod;

  // 1. Vérification initiale Meta Webhooks (GET)
  // Lorsque vous ajoutez le webhook dans Meta for Developers, Meta envoie une requête GET avec :
  // hub.mode, hub.verify_token, hub.challenge
  if (method === 'GET') {
    const params = event.queryStringParameters || {};
    const mode = params['hub.mode'];
    const token = params['hub.verify_token'];
    const challenge = params['hub.challenge'];

    const expectedToken = process.env.META_VERIFY_TOKEN || 'leberceaudes3s_secret_webhook_token';

    if (mode === 'subscribe' && token === expectedToken) {
      console.log('[Meta Webhook] Verification successful');
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'text/plain' },
        body: challenge || ''
      };
    } else {
      console.warn('[Meta Webhook] Verification failed: token mismatch');
      return {
        statusCode: 403,
        body: 'Verification token mismatch'
      };
    }
  }

  // 2. Réception des événements de mise à jour (POST)
  if (method === 'POST') {
    const signature = event.headers['x-hub-signature-256'] || event.headers['X-Hub-Signature-256'];
    const appSecret = process.env.META_APP_SECRET;

    // Validation cryptographique de la signature si le secret d'application est configuré
    if (appSecret && signature) {
      const hmac = crypto.createHmac('sha256', appSecret);
      const digest = 'sha256=' + hmac.update(event.body || '').digest('hex');
      if (signature !== digest) {
        console.error('[Meta Webhook] Invalid signature');
        return {
          statusCode: 401,
          body: 'Invalid signature'
        };
      }
    }

    try {
      const body = JSON.parse(event.body || '{}');
      console.log('[Meta Webhook] Event received:', body.object);

      // Traitement des modifications de flux (page feed)
      if (body.object === 'page') {
        body.entry?.forEach((entry: any) => {
          entry.changes?.forEach((change: any) => {
            console.log(`[Meta Webhook Change] Field: ${change.field}, Item: ${change.value?.item}, Verb: ${change.value?.verb}`);
          });
        });
      }

      return {
        statusCode: 200,
        headers: { 'Content-Type': 'text/plain' },
        body: 'EVENT_RECEIVED'
      };
    } catch (e: any) {
      console.error('[Meta Webhook] Error parsing webhook payload:', e);
      return {
        statusCode: 400,
        body: 'Bad Request'
      };
    }
  }

  return {
    statusCode: 405,
    body: 'Method Not Allowed'
  };
};
