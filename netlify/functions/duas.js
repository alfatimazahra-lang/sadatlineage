// netlify/functions/duas.js
const DUAS = {
  kumayl: {
    arabic: `اللَّهُمَّ إِنِّي أَسْأَلُكَ بِرَحْمَتِكَ الَّتِي وَسِعَتْ كُلَّ شَيْءٍ،
وَ بِقُوَّتِكَ الَّتِي قَهَرْتَ بِهَا كُلَّ شَيْءٍ،
وَ خَضَعَ لَهَا كُلُّ شَيْءٍ،
وَ ذَلَّ لَهَا كُلُّ شَيْءٍ،
اللَّهُمَّ إِنِّي أَسْأَلُكَ بِاسْمِكَ الْعَظِيمِ الْأَعْظَمِ،
الَّذِي إِذَا دُعِيتَ بِهِ أَجَبْتَ،
وَ إِذَا سُئِلْتَ بِهِ أَعْطَيْتَ،
اللَّهُمَّ إِنِّي أَتَوَجَّهُ إِلَيْكَ بِنَبِيِّكَ نَبِيِّ الرَّحْمَةِ،
مُحَمَّدٍ صَلَّى اللَّهُ عَلَيْهِ وَآلِهِ،
يَا رَبِّ اغْفِرْ لِي ذُنُوبِي، وَ ارْحَمْنِي، وَ تُبْ عَلَيَّ،
إِنَّكَ أَنْتَ التَّوَّابُ الرَّحِيمُ.`,
    translation: "Dua Kumayl - Taught by Imam Ali (as) to Kumayl ibn Ziyad. Recited on Thursday nights for forgiveness and mercy."
  },
  tawassul: {
    arabic: `اللَّهُمَّ إِنِّي أَتَوَجَّهُ إِلَيْكَ بِنَبِيِّكَ نَبِيِّ الرَّحْمَةِ،
مُحَمَّدٍ صَلَّى اللَّهُ عَلَيْهِ وَآلِهِ،
يَا رَسُولَ اللَّهِ، إِنِّي أَتَوَجَّهُ بِكَ إِلَى رَبِّكَ وَرَبِّي،
لِيَغْفِرَ لِي ذُنُوبِي،
اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَآلِ مُحَمَّدٍ،
وَ بِحَقِّهِمْ عِنْدَكَ، اشْفِ مَرِيضَنَا، وَ اغْفِرْ لِمَيِّتِنَا،
وَ فَرِّجْ هَمَّ مَكْرُوبِنَا، وَ اقْضِ دَيْنَ مَدْيُونِنَا.`,
    translation: "Dua Tawassul - Seeking intercession through Prophet Muhammad (saw) and his Ahlul Bayt. Recited for needs and difficulties."
  },
  faraj: {
    arabic: `اللَّهُمَّ كُنْ لِوَلِيِّكَ الْحُجَّةِ بْنِ الْحَسَنِ،
صَلَوَاتُكَ عَلَيْهِ وَعَلَى آبَائِهِ،
فِي هَذِهِ السَّاعَةِ وَفِي كُلِّ سَاعَةٍ،
وَلِيّاً وَ حَافِظاً وَ قَائِداً وَ نَاصِراً وَ دَلِيلاً،
حَتَّى تُسْكِنَهُ أَرْضَكَ طَوْعاً،
وَ تُمَتِّعَهُ فِيهَا طَوِيلاً.`,
    translation: "Dua Faraj (Dua al-Hujjat) - For Imam al-Mahdi (atfs). Recited for his reappearance and relief from oppression."
  },
  nudba: {
    arabic: `اللَّهُمَّ إِنِّي أَسْأَلُكَ بِاسْمِكَ الْعَظِيمِ الْأَعْظَمِ،
الَّذِي إِذَا دُعِيتَ بِهِ أَجَبْتَ،
وَ إِذَا سُئِلْتَ بِهِ أَعْطَيْتَ،
اللَّهُمَّ إِنِّي أَسْأَلُكَ بِحَقِّ مُحَمَّدٍ وَآلِ مُحَمَّدٍ،
أَنْ تُصَلِّيَ عَلَى مُحَمَّدٍ وَآلِ مُحَمَّدٍ،
وَ أَنْ تَنْصُرَ وَلِيَّكَ الْحُجَّةَ بْنَ الْحَسَنِ،
وَ تُعَجِّلَ فَرَجَهُ.`,
    translation: "Dua Nudba - Lamentation for Imam al-Mahdi (atfs). Recited on Eid days and Fridays."
  },
  makarim: {
    arabic: `اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَآلِ مُحَمَّدٍ،
وَ أَعِنِّي عَلَى ذِكْرِكَ وَ شُكْرِكَ وَ حُسْنِ عِبَادَتِكَ،
اللَّهُمَّ إِنِّي أَسْأَلُكَ مَكَارِمَ الْأَخْلَاقِ،
وَ مَحَاسِنَ الْأَعْمَالِ،
وَ أَنْ تَجْعَلَنِي مِنَ الْمُتَّقِينَ،
وَ تَرْزُقَنِي الْخُشُوعَ فِي الصَّلَاةِ،
وَ الْخُضُوعَ لِلْحَقِّ.`,
    translation: "Dua Makarim al-Akhlaq - From Sahifa al-Sajjadiyya (Imam Sajjad as). For noble character and beautiful deeds."
  },
  iftitah: {
    arabic: `اللَّهُمَّ إِنِّي أَرْغَبُ إِلَيْكَ وَأَتَوَجَّهُ إِلَيْكَ بِنَبِيِّكَ نَبِيِّ الرَّحْمَةِ،
مُحَمَّدٍ صَلَّى اللَّهُ عَلَيْهِ وَآلِهِ،
يَا رَبِّ إِنِّي أَسْأَلُكَ أَنْ تُصَلِّيَ عَلَى مُحَمَّدٍ وَآلِ مُحَمَّدٍ،
وَ أَنْ تَغْفِرَ لِي ذُنُوبِي،
وَ تَقْبَلْ تَوْبَتِي،
وَ تُعِينَنِي عَلَى صِيَامِ شَهْرِ رَمَضَانَ،
وَ قِيَامِ لَيَالِيهِ.`,
    translation: "Dua Iftitah - Recited every night in Ramadan. For acceptance of fasting, prayers, and forgiveness."
  },
  sabah: {
    arabic: `اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَآلِ مُحَمَّدٍ،
وَ أَصْبِحْنَا وَ أَمْسَيْنَا بِالْإِيمَانِ،
وَ بِالْإِسْلَامِ، وَ بِالْقُرْآنِ،
وَ بِسُنَّةِ نَبِيِّنَا مُحَمَّدٍ صَلَّى اللَّهُ عَلَيْهِ وَآلِهِ،
اللَّهُمَّ إِنِّي أَسْأَلُكَ خَيْرَ هَذَا الْيَوْمِ،
فَتْحَهُ، وَ نَصْرَهُ، وَ نُورَهُ، وَ بَرَكَتَهُ، وَ هُدَاهُ.`,
    translation: "Dua Sabah - Morning supplication. For blessings, guidance, and protection throughout the day."
  },
  masbah: {
    arabic: `اللَّهُمَّ إِنِّي أَسْأَلُكَ بِاسْمِكَ الْعَظِيمِ الْأَعْظَمِ،
الَّذِي إِذَا دُعِيتَ بِهِ أَجَبْتَ،
اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ شَرِّ مَا عَمِلْتُ،
وَمِنْ شَرِّ مَا لَمْ أَعْمَلْ،
اللَّهُمَّ اغْفِرْ لِي ذُنُوبِي كُلَّهَا،
دِقَّهَا وَجِلَّهَا، وَ أَوَّلَهَا وَ آخِرَهَا،
وَ أَعْفُ عَنِّي، وَ ارْحَمْنِي، إِنَّكَ أَنْتَ الْغَفُورُ الرَّحِيمُ.`,
    translation: "Dua Masbah (Evening) - For forgiveness, protection from evil, and peaceful night."
  }
};

export default async (request) => {
  if (request.method === 'OPTIONS') return corsResponse();
  try {
    const body = await request.json();
    const { name, list } = body;
    
    if (list) return jsonResponse({duas: Object.keys(DUAS)});
    if (name && DUAS[name]) return jsonResponse(DUAS[name]);
    return jsonResponse({error: 'Dua not found'}, 404);
  } catch(e) {
    return jsonResponse({error: e.message}, 500);
  }
};

function corsResponse() { return new Response(null, {headers: corsHeaders()}) }
function jsonResponse(data, status=200) { return new Response(JSON.stringify(data), {status, headers: {'Content-Type': 'application/json', ...corsHeaders()}}) }
function corsHeaders() { return {'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type'} }
