'use strict';

/**
 * blog-formation service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::blog-formation.blog-formation');
