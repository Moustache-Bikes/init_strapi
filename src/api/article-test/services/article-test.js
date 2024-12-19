'use strict';

/**
 * article-test service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::article-test.article-test');
