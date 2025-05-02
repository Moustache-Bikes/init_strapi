'use strict';

module.exports = {
  /* ------------------------------------------------------------------ *\
   *  /openai/costs?from=...&to=...&limit=...&group_by=...
  \* ------------------------------------------------------------------ */
  async costs(ctx) {
    const { from, to, ...rest } = ctx.request.query;

    const params = {
      start_time: Number(from),            // ← nom attendu par l’API
      end_time  : Number(to),              // facultatif
      ...rest,                             // limit, group_by, …
    };

    ctx.body = await strapi
      .plugin('translate-plugin')
      .service('openai')
      .costs(params);
  },

  /* ------------------------------------------------------------------ *\
   *  /openai/completions?from=...&to=...&limit=...&group_by=...
  \* ------------------------------------------------------------------ */
  async completions(ctx) {
    const { from, to, ...rest } = ctx.request.query;

    const params = {
      start_time: Number(from),
      end_time  : Number(to),
      ...rest,
    };

    ctx.body = await strapi
      .plugin('translate-plugin')
      .service('openai')
      .completions(params);
  },
};
