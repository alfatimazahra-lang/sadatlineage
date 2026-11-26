// netlify/functions/quran.js
export default async (request) => {
  if (request.method === 'OPTIONS') return corsResponse();
  try {
    const body = await request.json();
    const { surah, ayah, page, juz, list } = body;
    
    let url = 'https://api.quran.com/api/v4/quran/verses/uthmani';
    const params = new URLSearchParams();
    if (surah) params.set('surah', surah);
    if (ayah) params.set('ayah', ayah);
    if (page) params.set('page', page);
    if (juz) params.set('juz', juz);
    if (params.toString()) url += '?' + params.toString();
    
    if (list) {
      const chaptersRes = await fetch('https://api.quran.com/api/v4/chapters?language=en', {headers:{'Accept':'application/json'}});
      return jsonResponse({chapters: await chaptersRes.json()});
    }
    
    const res = await fetch(url, {headers:{'Accept':'application/json'}});
    return jsonResponse(await res.json());
  } catch(e) {
    return jsonResponse({error:e.message}, 500);
  }
};

function corsResponse() {
  return new Response(null, {headers:corsHeaders()});
}
function jsonResponse(data, status=200) {
  return new Response(JSON.stringify(data), {status, headers:{'Content-Type':'application/json',...corsHeaders()}});
}
function corsHeaders() {
  return {'Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'POST, OPTIONS','Access-Control-Allow-Headers':'Content-Type'};
}
