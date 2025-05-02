'use strict';
const axios = require('axios');

const BASE = 'https://api.openai.com/v1/organization';

/* ---------- Auth ---------------------------------------------------- */
const HEADERS = {
  Authorization: `Bearer ${process.env.OPENAI_ADMIN_API_KEY}`,
  'Content-Type': 'application/json',
};

/* ---------- micro‑cache en RAM -------------------------------------- */
const cache = new Map();               // url -> { ts, data }
const TTL   = 5 * 60 * 1000;           // 5 min

const fetchJSON = async (url) => {
  const now = Date.now();
  const hit = cache.get(url);
  if (hit && now - hit.ts < TTL) return hit.data;

  const { data } = await axios.get(url, { headers: HEADERS });
  cache.set(url, { ts: now, data });
  return data;
};

/* -------------------------------------------------------------------- */
module.exports = () => ({
  /** organisation/costs */
  async costs(query) {
    const qs = new URLSearchParams(query).toString();
    return fetchJSON(`${BASE}/costs?${qs}`);
  },

  /** organisation/usage/completions */
  async completions(query) {
    const qs = new URLSearchParams(query).toString();
    return fetchJSON(`${BASE}/usage/completions?${qs}`);
  },
});