'use strict';

/**
 * blog-b2b service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::blog-b2b.blog-b2b');
