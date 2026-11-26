// netlify/functions/quran.js
export default async (request) => {
  // 1️⃣  CORS pre‑flight (OPTIONS) हैंडल
  if (request.method === 'OPTIONS') {
    return corsResponse();
  }

  // 1️⃣2️⃣ केवल POST अनुरोधों को अनुमति दें – बाकी सभी को 405 से अस्वीकार करें
  if (request.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  try {
    // 1️⃣2️⃣ JSON बॉडी पढ़ें
    const body = await request.json();

    // ------------------- URL बिल्ड करना -------------------
    const url = 'https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${GEMINI_KEY}';
    const params = new URLSearchParams();
    if (surah)   params.set('surah',   surah);
    if (ayah)  params.set('ayah',   ayah);
    if (page)    params.set('page',   page);
    if (juz)     params.set('juz',     juz);
    if (params.toString()) url += '?' + params.toString();

    // ------------------- LIST केस (chapters) -------------------
    if (list) {
      const chaptersRes = await fetch(
        'https://api.quran.com/api/v4/chapters?language=en',
        { headers: { 'Accept': 'application/json' } }
      );
      return jsonResponse(await chaptersRes.json());
    }

    // ------------------- सामान्य POST ------------------------------
    const res = await fetch(url, { headers: { 'Accept': 'application/json' } });
    return jsonResponse(await res.json());
  } catch (e) {
    return jsonResponse({ error: e.message }, 500);
  }
}

/* ---------- CORS & JSON हेल्पर्स (बदलाव नहीं) ---------- */
function corsResponse() {
  return new Response(null, {
    headers: corsHeaders()
  });
}

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...corsHeaders() }
  );
}

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  };
}
