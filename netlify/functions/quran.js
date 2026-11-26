// netlify/functions/quran.js
// Proxy for Quran.com API v4 to avoid CORS & hide logic

const corsHeaders = {
  'Access-Control-Allow-Origin': '*', // Production: 'https://sadatlineage.in'
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type'
};

export async function handler(event) {
  // Handle Preflight
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers: corsHeaders, body: '' };
  }
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers: corsHeaders, body: 'Method Not Allowed' };
  }

  try {
    const body = JSON.parse(event.body || '{}');
    const { 
      surah, ayah, page, juz, list, 
      translations = "20,21",
      fields = "text_uthmani,verse_key,chapter_id,chapter_name_arabic,chapter_name_complex,chapter_type,juz_number",
      language = "en"
    } = body;

    const QURAN_API = "https://api.quran.com/api/v4";

    // 1. Chapters List Request
    if (list) {
      const url = `${QURAN_API}/chapters?language=${language}`;
      const res = await fetch(url, { headers: { 'Accept': 'application/json' } });
      const data = await res.json();
      return { statusCode: res.status, headers: corsHeaders, body: JSON.stringify(data) };
    }

    // 2. Verses Request
    let url = "";
    const queryParams = new URLSearchParams();
    
    if (translations) queryParams.set('translations', translations);
    if (fields) queryParams.set('fields', fields);
    if (language) queryParams.set('language', language);

    if (surah) {
      url = `${QURAN_API}/verses/by_chapter/${surah}`;
    } else if (page) {
      url = `${QURAN_API}/verses/by_page/${page}`;
    } else if (juz) {
      url = `${QURAN_API}/verses/by_juz/${juz}`;
    } else {
      return { 
        statusCode: 400, 
        headers: corsHeaders, 
        body: JSON.stringify({ error: "Missing required parameter: provide 'surah', 'page', or 'juz'." }) 
      };
    }

    const qs = queryParams.toString();
    if (qs) url += `?${qs}`;

    console.log("[Quran Proxy] Fetching:", url);

    const apiRes = await fetch(url, { 
      headers: { 'Accept': 'application/json' }
    });

    const data = await apiRes.json();

    return {
      statusCode: apiRes.status,
      headers: corsHeaders,
      body: JSON.stringify(data)
    };

  } catch (e) {
    console.error("[Quran Proxy] Crash:", e);
    return { 
      statusCode: 500, 
      headers: corsHeaders, 
      body: JSON.stringify({ error: e.message || "Internal Server Error" }) 
    };
  }
}
