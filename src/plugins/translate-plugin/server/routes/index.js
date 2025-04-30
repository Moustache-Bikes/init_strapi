'use strict';
// /opt/init_strapi/src/plugins/translate-plugin/server/routes/index.js
module.exports = [
  {
    method: 'POST',
    path: '/translate',
    handler: 'translate.translate',
    config: {
      policies: [],
      auth: false,
    },
  },
  {
    method: 'GET',
    path: '/openai/costs',
    handler: 'openai.costs',
    config: {
      policies: [],   // ajoute une policy Strapi si nécessaire
      auth: false     // ou true si tu veux sécuriser l’endpoint
    },
  },
  {
    method: 'GET',
    path: '/openai/completions',
    handler: 'openai.completions',
    config: { policies: [], auth: false },
  },
];
