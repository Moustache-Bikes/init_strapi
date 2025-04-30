'use strict';

module.exports = ({ strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('translate-plugin')
      .service('myService')
      .getWelcomeMessage();
  },
});
