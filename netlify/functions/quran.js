function renderQuran(data) {
  // DEBUG: Log the full API response for debugging
  console.log("API Response:", data);

  // Handle API errors
  if (data.error) {
    showError(data.error);
    return;
  }

  // quran.com API returns either { verses: [...] } or { chapters: [...] }
  const verses = data.verses || data.chapters || [];

  // Guard: ensure we have verses to render
  if (!verses.length) {
    showError("No verses found");
    return;
  }

  // Extract metadata from the first verse (most reliable source)
  const first = verses[0];
  const surahName = first.chapter_name_arabic || first.chapter_name_complex || "—";
  const surahNum = first.chapter_id || first.surah || "—";
  const ayahCount = verses.length;
  const surahType = first.chapter_type || "—";
  const juzNum = first.juz_number || "—";

  // Update UI metadata
  document.getElementById("surahName").textContent = `${surahNum}: ${surahName}`;
  document.getElementById("ayahCount").textContent = ayahCount;
  document.getElementById("surahType").textContent = surahType;
  document.getElementById("juzNum").textContent = juzNum;

  // Render verses (Arabic text + verse number)
  const html = verses.map(v => {
    const text = v.text_uthmani || v.text || "";
    const num = v.verse_number || v.verse_key?.split(":")[1] || "";
    return `<span class="ayah">${text} <sup class="ayah-num">${num}</sup></span>`;
  }).join(' ');

  // Inject HTML into the page
  document.getElementById("quranContent").innerHTML = html;
}
