// netlify/functions/quran.js
// Proxy for Quran.com API v4 to avoid CORS & hide logic

exports.handler = async function (event) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*', // Production mein apna domain daalein: 'https://sadatlineage.in'
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  };

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
      translations = "20,21", // Default translations
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

    // 2. Verses Request - Build URL using Official Path-Based Endpoints
    let url = "";
    const queryParams = new URLSearchParams();
    
    // Add optional query params
    if (translations) queryParams.set('translations', translations);
    if (fields) queryParams.set('fields', fields);
    if (language) queryParams.set('language', language); // For chapter names in meta
    // Note: 'ayah' parameter is NOT standard on by_chapter/by_page/by_juz endpoints in v4.
    // We ignore 'ayah' here; frontend filters client-side.

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

    // Append Query Params
    const qs = queryParams.toString();
    if (qs) url += `?${qs}`;

    console.log("[Quran Proxy] Fetching:", url); // Visible in Netlify Function Logs

    const apiRes = await fetch(url, { 
      headers: { 'Accept': 'application/json' },
      // timeout handle karne ke liye AbortController use kar sakte hain agar chahiye
    });

    const data = await apiRes.json();

    // Forward Response (Status + Body)
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
};
