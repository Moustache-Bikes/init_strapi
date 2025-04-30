'use strict';

module.exports = {
  async translate(ctx) {
    const entries = ctx.request.body.entries || [];
    const srcLang = ctx.request.body.srcLang || 'fr';
    const dstLang = ctx.request.body.dstLang || 'en';


    console.log('translate', entries, srcLang, dstLang);

    try {
      const translations = await strapi
        .plugin('translate-plugin')
        .service('translate')
        .translateText(entries, dstLang, srcLang);

      ctx.send({ translations });
    } catch (e) {
      strapi.log.error('Translation error:', e);
      ctx.internalServerError('Translation failed');
    }
  },
};
 