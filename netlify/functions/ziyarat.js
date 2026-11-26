// netlify/functions/ziyarat.js
const ZIYARAT = {
  ashura: {
    arabic: `السَّلَامُ عَلَيْكَ يَا أَبَا عَبْدِ اللَّهِ،
السَّلَامُ عَلَيْكَ يَا بْنَ رَسُولِ اللَّهِ،
السَّلَامُ عَلَيْكَ يَا بْنَ أَمِيرِ الْمُؤْمِنِينَ،
السَّلَامُ عَلَيْكَ يَا بْنَ فَاطِمَةَ الزَّهْرَاءِ،
السَّلَامُ عَلَيْكَ يَا ثَارَ اللَّهِ وَابْنَ ثَارِهِ،
وَ الْوَارِثِ الْمُوتُورِ،
أَشْهَدُ أَنَّكَ قَدْ أَقَمْتَ الصَّلَاةَ،
وَ آتَيْتَ الزَّكَاةَ،
وَ أَمَرْتَ بِالْمَعْرُوفِ،
وَ نَهَيْتَ عَنِ الْمُنْكَرِ،
وَ أَطَعْتَ اللَّهَ وَ رَسُولَهُ حَتَّى أَتَاكَ الْيَقِينُ،
فَلَعَنَ اللَّهُ أُمَّةً قَتَلَتْكَ،
وَلَعَنَ اللَّهُ أُمَّةً ظَلَمَتْكَ،
وَلَعَنَ اللَّهُ أُمَّةً سَمِعَتْ بِذَلِكَ فَرَضِيَتْ بِهِ.`,
    translation: "Ziyarat Ashura - Most famous ziyarat of Imam Husayn (as). Recited on Ashura day and for seeking needs. Contains salutations, testimony of his martyrdom, and curses upon his killers."
  },
  waritha: {
    arabic: `السَّلَامُ عَلَى الْوَارِثِ بْنِ الْوَارِثِ،
السَّلَامُ عَلَى الْحُسَيْنِ بْنِ عَلِيٍّ،
السَّلَامُ عَلَى ابْنِ رَسُولِ اللَّهِ،
السَّلَامُ عَلَيْكَ يَا أَبَا عَبْدِ اللَّهِ،
أَشْهَدُ أَنَّكَ قَدْ أَبْلَغْتَ رِسَالَاتِ رَبِّكَ،
وَ نَصَحْتَ لِعِبَادِهِ،
وَ جَاهَدْتَ فِي سَبِيلِ اللَّهِ حَتَّى أَتَاكَ الْيَقِينُ،
اللَّهُمَّ اجْعَلْنِي مَعَهُ فِي الدُّنْيَا وَ الْآخِرَةِ.`,
    translation: "Ziyarat Waritha - Short ziyarat emphasizing Imam Husayn as heir of prophets. For daily recitation and connection with Imam."
  },
  jamiat: {
    arabic: `السَّلَامُ عَلَى جَامِعَةِ الْأَنْبِيَاءِ،
السَّلَامُ عَلَى مَعْدِنِ النُّبُوَّةِ،
السَّلَامُ عَلَى مَحَلِ الرِّسَالَةِ،
السَّلَامُ عَلَى الْحُسَيْنِ بْنِ عَلِيٍّ،
السَّلَامُ عَلَى ابْنِ رَسُولِ رَبِّ الْعَالَمِينَ،
أَشْهَدُ أَنَّكَ قَدْ قُمْتَ بِالْقِسْطِ،
وَ دَعَوْتَ إِلَى سَبِيلِ رَبِّكَ بِالْحِكْمَةِ وَ الْمَوْعِظَةِ الْحَسَنَةِ.`,
    translation: "Ziyarat Jamiat al-Kabira - Comprehensive ziyarat covering all Imams. Recited on special occasions and Fridays."
  },
  nahiya: {
    arabic: `السَّلَامُ عَلَيْكَ يَا وَارِثَ آدَمَ صَفْوَةِ اللَّهِ،
السَّلَامُ عَلَيْكَ يَا وَارِثَ نُوحٍ نَبِيِّ اللَّهِ،
السَّلَامُ عَلَيْكَ يَا وَارِثَ إِبْرَاهِيمَ خَلِيلِ اللَّهِ،
السَّلَامُ عَلَيْكَ يَا وَارِثَ مُوسَى كَلِيمِ اللَّهِ،
السَّلَامُ عَلَيْكَ يَا وَارِثَ عِيسَى رُوحِ اللَّهِ،
السَّلَامُ عَلَيْكَ يَا وَارِثَ مُحَمَّدٍ حَبِيبِ اللَّهِ،
السَّلَامُ عَلَيْكَ يَا وَارِثَ عَلِيٍّ وَلِيِّ اللَّهِ،
السَّلَامُ عَلَيْكَ يَا أَبَا عَبْدِ اللَّهِ.`,
    translation: "Ziyarat Nahiya al-Muqaddasa - Imam Husayn as heir of all prophets. Deep spiritual connection, recited for high spiritual stations."
  },
  aminullah: {
    arabic: `السَّلَامُ عَلَيْكَ يَا أَمِينَ اللَّهِ فِي أَرْضِهِ،
السَّلَامُ عَلَيْكَ يَا حُجَّةَ اللَّهِ فِي بِلَادِهِ،
السَّلَامُ عَلَيْكَ يَا نَاصِرَ دِينِ اللَّهِ،
السَّلَامُ عَلَيْكَ يَا قَاتِلَ أَعْدَاءِ اللَّهِ،
السَّلَامُ عَلَيْكَ يَا أَبَا عَبْدِ اللَّهِ،
أَشْهَدُ أَنَّكَ كُنْتَ نُورًا فِي الْأَصْلَابِ الشَّامِخَةِ،
وَ الْأَرْحَامِ الْمُطَهَّرَةِ.`,
    translation: "Ziyarat Aminullah - Imam Husayn as trustee of Allah on earth. For protection, victory over enemies, and spiritual strength."
  }
};

export default async (request) => {
  if (request.method === 'OPTIONS') return corsResponse();
  try {
    const body = await request.json();
    const { name, list } = body;
    
    if (list) return jsonResponse({ziyarat: Object.keys(ZIYARAT)});
    if (name && ZIYARAT[name]) return jsonResponse(ZIYARAT[name]);
    return jsonResponse({error: 'Ziyarat not found'}, 404);
  } catch(e) {
    return jsonResponse({error: e.message}, 500);
  }
};

function corsResponse() { return new Response(null, {headers: corsHeaders()}) }
function jsonResponse(data, status=200) { return new Response(JSON.stringify(data), {status, headers: {'Content-Type': 'application/json', ...corsHeaders()}}) }
function corsHeaders() { return {'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type'} }
