// netlify/functions/gemini.js
export default async (request, context) => {
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    });
  }
  if (request.method !== 'POST') return new Response('Method not allowed', { status: 405 });

  try {
    const { prompt } = await request.json();
    const GEMINI_KEY = process.env.GEMINI_KEY;
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `You are Sadat Lineage AI assistant. Help with Sadat genealogy, Shia toolkit, Namaz, Duas. Be concise. User: ${prompt}` }] }]
        })
      }
    );
    const data = await res.json();
    return new Response(JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
};
