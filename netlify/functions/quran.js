// netlify/functions/quran.js
exports.handler = async function (event) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers: corsHeaders, body: '' };
  }
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers: corsHeaders, body: 'Method Not Allowed' };
  }

  try {
    const { surah, ayah, page, juz, list } = JSON.parse(event.body || '{}');

    // Chapters list
    if (list) {
      const res = await fetch('https://api.quran.com/api/v4/chapters?language=en');
      return { statusCode: 200, headers: corsHeaders, body: JSON.stringify(await res.json()) };
    }

    // Ayahs / Page / Juz from Quran.com API
    const params = new URLSearchParams();
    if (surah) params.set('surah', surah);
    if (ayah) params.set('ayah', ayah);
    if (page) params.set('page', page);
    if (juz) params.set('juz', juz);

    const apiUrl = `https://api.quran.com/api/v4/verses/uthmani?${params.toString()}`;
    const res = await fetch(apiUrl, { headers: { 'Accept': 'application/json' } });

    return {
      statusCode: res.status,
      headers: corsHeaders,
      body: JSON.stringify(await res.json())
    };
  } catch (e) {
    return { statusCode: 500, headers: corsHeaders, body: JSON.stringify({ error: e.message }) };
  }
};
