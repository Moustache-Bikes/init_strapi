'use strict';

module.exports = {
  async costs(ctx) {
    const { from, to } = ctx.request.query;
    ctx.body = await strapi
      .plugin('translate-plugin')
      .service('openai')
      .costs(+from, +to);
  },

  async completions(ctx) {
    const { from, to } = ctx.request.query;
    ctx.body = await strapi
      .plugin('translate-plugin')
      .service('openai')
      .completions(+from, +to);
  },
};
