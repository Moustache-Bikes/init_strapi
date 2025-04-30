// plugins/translate-plugin/server/services/openai-usage.js
'use strict';
const axios = require('axios');

const BASE = 'https://api.openai.com/v1/organization';

const HEADERS = {
  'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
  'Content-Type' : 'application/json',
};

/**
 * Simple cache en RAM (clé => {ts,data})
 */
const cache = new Map();
const TTL   = 5 * 60 * 1000;   // 5 minutes

const fetchJSON = async (url) => {
  const now = Date.now();
  if (cache.has(url) && (now - cache.get(url).ts) < TTL) {
    return cache.get(url).data;
  }
  const { data } = await axios.get(url, { headers: HEADERS });
  cache.set(url, { ts: now, data });
  return data;
};

module.exports = () => ({
  /**
   * GET /organization/costs
   * @param {Object} q   { start_time, end_time, limit, group_by, ... }
   */
  async costs(q){
    const qs = new URLSearchParams(q).toString();
    return fetchJSON(`${BASE}/costs?${qs}`);
  },

  /**
   * GET /organization/usage/completions
   */
  async completions(q){
    const qs = new URLSearchParams(q).toString();
    return fetchJSON(`${BASE}/usage/completions?${qs}`);
  }
});
