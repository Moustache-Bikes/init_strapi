'use strict';
// / /opt/init_strapi/src/plugins/translate-plugin/server/services/index.js
const myService = require('./my-service');
const translate = require('./translate');
const openai = require('./openai');


module.exports = {
  myService,
  translate,
  openai,
};
