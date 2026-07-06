/* =========================================================
   جدول أدوار المياه — منطق التطبيق
   (مُحسَّن بمحرك التعرف الذكي على المناطق الأردنية)
   ========================================================= */

(function () {
  'use strict';

  /* ---------- State ---------- */
  let announcements = [];   // full parsed dataset
  let currentFilter = 'all';
  let currentSort = 'time';
  let searchQuery = '';

  /* ---------- Location Engine ---------- */
  const locationEngine = new LocationEngine();
  let engineReady = false;

  /* ---------- DOM references ---------- */
  const el = {
    dateLabel: document.getElementById('currentDate'),
    rawInput: document.getElementById('rawInput'),
    btnParse: document.getElementById('btnParse'),
    btnClear: document.getElementById('btnClear'),
    btnCopyAll: document.getElementById('btnCopyAll'),
    btnExportJson: document.getElementById('btnExportJson'),
    btnExportTxt: document.getElementById('btnExportTxt'),
    searchInput: document.getElementById('searchInput'),
    btnClearSearch: document.getElementById('btnClearSearch'),
    chipGroup: document.getElementById('chipGroup'),
    sortSelect: document.getElementById('sortSelect'),
    cardsContainer: document.getElementById('cardsContainer'),
    emptyState: document.getElementById('emptyState'),
    noMatchState: document.getElementById('noMatchState'),
    resultsCount: document.getElementById('resultsCount'),
    statAreas: document.getElementById('statAreas'),
    statTotal: document.getElementById('statTotal'),
    statTimed: document.getElementById('statTimed'),
    statUntimed: document.getElementById('statUntimed'),
    toast: document.getElementById('toast'),
  };

  /* =========================================================
     INITIALISATION
     ========================================================= */
  async function init() {
    renderCurrentDate();
    bindEvents();
    updateStatistics();
    renderCards([]);

    // Load the location engine
    try {
      await locationEngine.load('locations.json');
      engineReady = true;

      // Attach autocomplete to the search input
      new LocationAutocomplete(el.searchInput, locationEngine, {
        limit: 8,
        onSelect: (loc) => {
          searchQuery = loc.displayName;
          el.btnClearSearch.hidden = false;
          refresh();
        },
      });
    } catch (err) {
      console.warn('Location engine failed to load, falling back to basic mode.', err);
    }
  }

  function renderCurrentDate() {
    const now = new Date();
    const formatted = now.toLocaleDateString('ar-JO', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    el.dateLabel.textContent = formatted;
  }

  function bindEvents() {
    el.btnParse.addEventListener('click', handleParseClick);
    el.btnClear.addEventListener('click', handleClearClick);
    el.btnCopyAll.addEventListener('click', handleCopyAllClick);
    el.btnExportJson.addEventListener('click', exportJSON);
    el.btnExportTxt.addEventListener('click', exportTXT);

    el.searchInput.addEventListener('input', debounce(handleSearchInput, 200));
    el.btnClearSearch.addEventListener('click', () => {
      el.searchInput.value = '';
      handleSearchInput();
      el.searchInput.focus();
    });

    el.chipGroup.addEventListener('click', handleChipClick);
    el.sortSelect.addEventListener('change', handleSortChange);

    // Event delegation for card actions (copy / expand)
    el.cardsContainer.addEventListener('click', handleCardContainerClick);
  }

  /* =========================================================
     TEXT PARSER
     ========================================================= */

  /**
   * Parses the raw textarea content into structured announcement objects.
   * Uses the Location Engine when available for smart area detection.
   * Also handles non-bulleted lines that contain a recognized Jordanian location.
   */
  function parseText(rawText) {
    if (!rawText || !rawText.trim()) return [];

    const lines = rawText.split('\n');
    const items = [];
    let idCounter = 0;

    lines.forEach((line) => {
      const trimmed = line.trim();
      if (!trimmed) return;

      let cleaned;

      // Primary: bullet-marked lines
      const bulletMatch = trimmed.match(/^[*\-•●▪️]\s*(.+)$/);
      if (bulletMatch) {
        cleaned = bulletMatch[1].trim();
        if (!cleaned) return;
      } else {
        // Secondary: non-bulleted lines — only accept if the Location Engine
        // recognises a known Jordanian location inside the line.
        if (!engineReady) return;
        const detected = locationEngine.detectInText(trimmed);
        if (detected.length === 0) return;
        cleaned = trimmed;
      }

      const timeInfo = extractTime(cleaned);
      const { area, locations } = extractAreaAndLocations(cleaned, timeInfo);
      const description = extractDescription(cleaned, area);
      const priority = detectPriority(cleaned);

      items.push({
        id: `item-${idCounter++}`,
        area: area || cleaned,
        locations: locations,          // ← array of detected location names
        time: timeInfo.label,
        period: timeInfo.period,       // 'morning' | 'afternoon' | 'evening' | 'none'
        sortMinutes: timeInfo.minutes,
        description: description,
        priority: priority,
        raw: cleaned,
      });
    });

    return items;
  }

  /**
   * Converts Arabic-Indic digits (٠-٩) to Western digits (0-9) inside a string.
   */
  function convertArabicDigits(str) {
    const map = { '٠': '0', '١': '1', '٢': '2', '٣': '3', '٤': '4', '٥': '5', '٦': '6', '٧': '7', '٨': '8', '٩': '9' };
    return str.replace(/[٠-٩]/g, (d) => map[d]);
  }

  /**
   * Extracts a time expression + normalized period + sortable minute value from a line.
   */
  function extractTime(line) {
    const normalized = convertArabicDigits(line);

    // 1) Digit + ص/م/صباحا/مساء  e.g. "10 ص", "٨ص", "١١م", "5 مساء"
    const digitTimeRegex = /(\d{1,2})\s*(صباحا|مساء|ص|م)(?!\p{L})/u;
    const digitMatch = normalized.match(digitTimeRegex);

    if (digitMatch) {
      const hour = parseInt(digitMatch[1], 10);
      const suffix = digitMatch[2];
      const isMorning = suffix === 'ص' || suffix === 'صباحا';

      if (isMorning) {
        return {
          label: `${hour} ص`,
          period: 'morning',
          minutes: (hour % 12) * 60,
        };
      }
      // مساء / م → evening
      const hour24 = hour === 12 ? 12 : hour + 12;
      return {
        label: `${hour} م`,
        period: 'evening',
        minutes: hour24 * 60,
      };
    }

    // 2) Keyword-only patterns (no explicit digit)
    if (/ظهرا|ظهر/.test(normalized)) {
      return { label: 'ظهرا', period: 'afternoon', minutes: 12 * 60 };
    }
    if (/صباحا/.test(normalized)) {
      return { label: 'صباحا', period: 'morning', minutes: 8 * 60 };
    }
    if (/مساء/.test(normalized)) {
      return { label: 'مساء', period: 'evening', minutes: 18 * 60 };
    }
    if (/ليلا|ليل/.test(normalized)) {
      return { label: 'ليلا', period: 'evening', minutes: 21 * 60 };
    }

    // 3) No time found
    return { label: 'غير محدد', period: 'none', minutes: Infinity };
  }

  /**
   * Extracts area name and all detected locations from a line.
   * Uses Location Engine when ready, falls back to basic heuristics.
   */
  function extractAreaAndLocations(line, timeInfo) {
    // Always detect locations using the engine if available
    let detectedLocations = [];
    if (engineReady) {
      detectedLocations = locationEngine.extractAllLocationsFromLine(line);
    }

    // Extract the area label (text before "يبدأ" or time token)
    let area = extractArea(line, timeInfo);

    // If engine found locations and area is empty/poor, use best location name
    if (engineReady && detectedLocations.length > 0) {
      const bestLoc = locationEngine.extractBestLocationFromLine(line);
      if (bestLoc) {
        // Only override area if the current area is empty or equals the full line
        if (!area || area === line.trim()) {
          area = bestLoc.name;
        }
      }
    }

    return { area, locations: detectedLocations };
  }

  /**
   * Extracts the area/location name from a cleaned announcement line.
   */
  function extractArea(line, timeInfo) {
    // Prefer splitting at the "يبدأ" (starts) keyword, common in these announcements
    const startIdx = line.indexOf('يبدأ');
    if (startIdx > -1) {
      const area = line.slice(0, startIdx).trim();
      if (area) return area;
    }

    // Otherwise, split at the first time-related token found in the line
    const normalized = convertArabicDigits(line);
    const timeTokenRegex = /(\d{1,2}\s*(صباحا|مساء|ص|م)|ظهرا|ظهر|صباحا|مساء|ليلا|ليل)/u;
    const tokenMatch = normalized.match(timeTokenRegex);
    if (tokenMatch && tokenMatch.index > 0) {
      const area = line.slice(0, tokenMatch.index).trim();
      if (area) return area;
    }

    // No time-related content → the whole line is the area name
    return line.trim();
  }

  /**
   * Builds a human-readable description (the remainder of the line after the area name).
   */
  function extractDescription(line, area) {
    if (!area) return line;
    if (line === area) return line; // whole line is just the area name
    let rest = line.slice(area.length).trim();
    rest = rest.replace(/^[،,:\-\s]+/, '').trim();
    return rest || line;
  }

  /**
   * Very small heuristic priority detector.
   */
  function detectPriority(line) {
    if (/عاجل|طارئ|فوري/.test(line)) return 'عالية';
    return 'عادية';
  }

  /* =========================================================
     RENDERING
     ========================================================= */

  const periodIcon = {
    morning: 'fa-sun',
    afternoon: 'fa-cloud-sun',
    evening: 'fa-moon',
    none: 'fa-question',
  };

  /**
   * Renders a list of announcement objects into cards using a DocumentFragment
   * to minimise reflows.
   */
  function renderCards(list) {
    const fragment = document.createDocumentFragment();
    el.cardsContainer.innerHTML = '';

    if (announcements.length === 0) {
      toggleState('empty');
      updateResultsCount(0);
      return;
    }

    if (list.length === 0) {
      toggleState('noMatch');
      updateResultsCount(0);
      return;
    }

    toggleState('results');

    list.forEach((item) => {
      fragment.appendChild(buildCardElement(item));
    });

    el.cardsContainer.appendChild(fragment);
    updateResultsCount(list.length);
  }

  function toggleState(state) {
    el.emptyState.hidden = state !== 'empty';
    el.noMatchState.hidden = state !== 'noMatch';
    el.cardsContainer.hidden = state !== 'results';
  }

  function updateResultsCount(n) {
    if (announcements.length === 0) {
      el.resultsCount.textContent = '';
      return;
    }
    el.resultsCount.textContent = `${toArabicDigits(n)} من ${toArabicDigits(announcements.length)}`;
  }

  function buildCardElement(item) {
    const card = document.createElement('article');
    card.className = `ann-card period-${item.period}`;
    card.dataset.id = item.id;

    const isLong = item.description.length > 90;

    // Build locations chips if multiple locations detected
    const locationsHtml = (item.locations && item.locations.length > 1)
      ? `<div class="card-locations">${item.locations.map(l =>
          `<span class="loc-chip"><i class="fa-solid fa-location-dot"></i>${escapeHtml(l)}</span>`
        ).join('')}</div>`
      : '';

    card.innerHTML = `
      <div class="card-top">
        <h3 class="card-area">
          <i class="fa-solid fa-location-dot" aria-hidden="true"></i>
          <span class="card-area-text">${highlightSearch(escapeHtml(item.area), searchQuery)}</span>
        </h3>
        <button class="card-copy-btn" data-action="copy" aria-label="نسخ هذا الإعلان" title="نسخ">
          <i class="fa-regular fa-copy"></i>
        </button>
      </div>

      ${locationsHtml}

      <span class="card-time">
        <i class="fa-solid ${periodIcon[item.period]}" aria-hidden="true"></i>
        ${highlightSearch(escapeHtml(item.time), searchQuery)}
      </span>

      <p class="card-desc${isLong ? '' : ''}">
        <i class="fa-regular fa-note-sticky" aria-hidden="true" style="opacity:.55;margin-left:6px;"></i>
        ${highlightSearch(escapeHtml(item.description), searchQuery)}
      </p>

      ${isLong ? `<button class="card-expand-btn visible" data-action="expand">
        <span data-label>عرض المزيد</span> <i class="fa-solid fa-chevron-down" data-icon></i>
      </button>` : ''}
    `;

    return card;
  }

  /* =========================================================
     SEARCH  (enhanced with Location Engine)
     ========================================================= */

  function handleSearchInput() {
    searchQuery = el.searchInput.value.trim();
    el.btnClearSearch.hidden = searchQuery.length === 0;
    refresh();
  }

  /**
   * Filters announcements against the search query.
   * Uses Arabic normalization via the Location Engine when available.
   */
  function searchCards(list, query) {
    if (!query) return list;

    const normQuery = engineReady
      ? normalizeArabic(convertArabicDigits(query)).toLowerCase()
      : convertArabicDigits(query).toLowerCase();

    return list.filter((item) => {
      // Search across area, time, description, and all detected location names
      const locationStr = (item.locations || []).join(' ');
      const rawStr = `${item.area} ${item.time} ${item.description} ${item.raw} ${locationStr}`;

      const normHaystack = engineReady
        ? normalizeArabic(convertArabicDigits(rawStr)).toLowerCase()
        : convertArabicDigits(rawStr).toLowerCase();

      if (normHaystack.includes(normQuery)) return true;

      // If engine is ready, also try fuzzy match against detected location names
      if (engineReady && item.locations && item.locations.length > 0) {
        const results = locationEngine.search(query, 5);
        if (results.length > 0) {
          const matchedNames = results.map(r => normalizeArabic(r.name));
          return item.locations.some(l => matchedNames.includes(normalizeArabic(l)));
        }
      }

      return false;
    });
  }

  /**
   * Wraps matches of `query` inside `text` with <mark> tags for visual highlighting.
   * Assumes `text` has already been HTML-escaped.
   */
  function highlightSearch(text, query) {
    if (!query) return text;
    const normalizedQuery = convertArabicDigits(query);
    const escapedQuery = normalizedQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    if (!escapedQuery) return text;

    try {
      const regex = new RegExp(`(${escapedQuery})`, 'gi');
      return text.replace(regex, '<mark>$1</mark>');
    } catch (e) {
      return text;
    }
  }

  /* =========================================================
     FILTERS (chips)
     ========================================================= */

  function handleChipClick(e) {
    const chip = e.target.closest('.chip');
    if (!chip) return;

    [...el.chipGroup.children].forEach((c) => c.classList.remove('active'));
    chip.classList.add('active');
    currentFilter = chip.dataset.filter;
    refresh();
  }

  function filterCards(list, filter) {
    if (filter === 'all') return list;
    return list.filter((item) => item.period === filter);
  }

  /* =========================================================
     SORTING
     ========================================================= */

  function handleSortChange() {
    currentSort = el.sortSelect.value;
    refresh();
  }

  function sortCards(list, sortBy) {
    const copy = [...list];
    if (sortBy === 'time') {
      copy.sort((a, b) => a.sortMinutes - b.sortMinutes);
    } else if (sortBy === 'area') {
      copy.sort((a, b) => a.area.localeCompare(b.area, 'ar'));
    } else if (sortBy === 'latest') {
      copy.sort((a, b) => {
        const aIdx = parseInt(a.id.split('-')[1], 10);
        const bIdx = parseInt(b.id.split('-')[1], 10);
        return bIdx - aIdx;
      });
    }
    return copy;
  }

  /* =========================================================
     PIPELINE — recompute filtered + searched + sorted view
     ========================================================= */
  function refresh() {
    let list = filterCards(announcements, currentFilter);
    list = searchCards(list, searchQuery);
    list = sortCards(list, currentSort);
    renderCards(list);
  }

  /* =========================================================
     STATISTICS
     ========================================================= */
  function updateStatistics() {
    // Count unique *canonical* location names if engine is available
    let uniqueCount;
    if (engineReady) {
      const allLocs = new Set();
      announcements.forEach((a) => {
        (a.locations || []).forEach((l) => allLocs.add(l));
        if (a.locations.length === 0) allLocs.add(a.area.trim());
      });
      uniqueCount = allLocs.size;
    } else {
      uniqueCount = new Set(announcements.map((a) => a.area.trim())).size;
    }

    const timed = announcements.filter((a) => a.period !== 'none').length;
    const untimed = announcements.length - timed;

    animateCount(el.statAreas, uniqueCount);
    animateCount(el.statTotal, announcements.length);
    animateCount(el.statTimed, timed);
    animateCount(el.statUntimed, untimed);
  }

  function animateCount(node, target) {
    node.textContent = toArabicDigits(target);
  }

  /* =========================================================
     CARD ACTIONS (copy / expand) — event delegation
     ========================================================= */
  function handleCardContainerClick(e) {
    const copyBtn = e.target.closest('[data-action="copy"]');
    if (copyBtn) {
      const card = copyBtn.closest('.ann-card');
      copyCard(card.dataset.id, copyBtn);
      return;
    }

    const expandBtn = e.target.closest('[data-action="expand"]');
    if (expandBtn) {
      toggleExpand(expandBtn);
    }
  }

  function copyCard(id, btnEl) {
    const item = announcements.find((a) => a.id === id);
    if (!item) return;

    const locsStr = item.locations && item.locations.length > 0
      ? `\n📌 المناطق: ${item.locations.join('، ')}`
      : '';

    const text = `📍 ${item.area}${locsStr}\n🕒 ${item.time}\n📝 ${item.description}`;
    copyToClipboard(text).then(() => {
      if (btnEl) {
        btnEl.classList.add('copied');
        btnEl.innerHTML = '<i class="fa-solid fa-check"></i>';
        setTimeout(() => {
          btnEl.classList.remove('copied');
          btnEl.innerHTML = '<i class="fa-regular fa-copy"></i>';
        }, 1500);
      }
      showToast('تم نسخ الإعلان');
    });
  }

  function toggleExpand(btnEl) {
    const card = btnEl.closest('.ann-card');
    const desc = card.querySelector('.card-desc');
    const label = btnEl.querySelector('[data-label]');
    const icon = btnEl.querySelector('[data-icon]');

    const isExpanded = desc.classList.toggle('expanded');
    label.textContent = isExpanded ? 'عرض أقل' : 'عرض المزيد';
    icon.classList.toggle('fa-chevron-down', !isExpanded);
    icon.classList.toggle('fa-chevron-up', isExpanded);
  }

  /* =========================================================
     TOP-LEVEL BUTTON HANDLERS
     ========================================================= */
  function handleParseClick() {
    const rawText = el.rawInput.value;
    announcements = parseText(rawText);
    updateStatistics();
    refresh();

    if (announcements.length === 0) {
      showToast('لم يتم العثور على أي إعلانات. تأكد من استخدام (*) قبل كل سطر');
    } else {
      const totalLocs = new Set(announcements.flatMap(a => a.locations)).size;
      const locMsg = totalLocs > 0 ? ` — تم التعرف على ${toArabicDigits(totalLocs)} منطقة` : '';
      showToast(`تم تحليل ${toArabicDigits(announcements.length)} إعلان بنجاح${locMsg}`);
    }
  }

  function handleClearClick() {
    el.rawInput.value = '';
    el.searchInput.value = '';
    searchQuery = '';
    currentFilter = 'all';
    currentSort = 'time';
    el.sortSelect.value = 'time';
    [...el.chipGroup.children].forEach((c) => c.classList.remove('active'));
    el.chipGroup.querySelector('[data-filter="all"]').classList.add('active');
    el.btnClearSearch.hidden = true;

    announcements = [];
    updateStatistics();
    renderCards([]);
    showToast('تم تنظيف البيانات');
  }

  function handleCopyAllClick() {
    if (announcements.length === 0) {
      showToast('لا توجد نتائج لنسخها');
      return;
    }
    const visibleList = getCurrentVisibleList();
    const text = visibleList
      .map((item) => {
        const locsStr = item.locations && item.locations.length > 0
          ? `\n📌 المناطق: ${item.locations.join('، ')}`
          : '';
        return `📍 ${item.area}${locsStr}\n🕒 ${item.time}\n📝 ${item.description}`;
      })
      .join('\n\n');

    copyToClipboard(text).then(() => showToast('تم نسخ جميع النتائج'));
  }

  function getCurrentVisibleList() {
    let list = filterCards(announcements, currentFilter);
    list = searchCards(list, searchQuery);
    list = sortCards(list, currentSort);
    return list;
  }

  /* =========================================================
     EXPORT
     ========================================================= */
  function exportJSON() {
    if (announcements.length === 0) {
      showToast('لا توجد بيانات للتصدير');
      return;
    }
    const dataModel = announcements.map((a) => ({
      area: a.area,
      locations: a.locations,
      time: a.time,
      period: a.period,
      description: a.description,
      raw: a.raw,
    }));

    const blob = new Blob([JSON.stringify(dataModel, null, 2)], { type: 'application/json;charset=utf-8' });
    downloadBlob(blob, 'water-schedule.json');
    showToast('تم تحميل ملف JSON');
  }

  function exportTXT() {
    if (announcements.length === 0) {
      showToast('لا توجد بيانات للتصدير');
      return;
    }
    const text = announcements
      .map((a) => {
        const locsStr = a.locations && a.locations.length > 0
          ? `\n📌 المناطق: ${a.locations.join('، ')}`
          : '';
        return `📍 ${a.area}${locsStr}\n🕒 ${a.time}\n📝 ${a.description}`;
      })
      .join('\n\n');

    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    downloadBlob(blob, 'water-schedule.txt');
    showToast('تم تحميل ملف TXT');
  }

  function downloadBlob(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  /* =========================================================
     UTILITIES
     ========================================================= */
  function debounce(fn, delay) {
    let timer = null;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), delay);
    };
  }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function toArabicDigits(num) {
    const map = { 0: '٠', 1: '١', 2: '٢', 3: '٣', 4: '٤', 5: '٥', 6: '٦', 7: '٧', 8: '٨', 9: '٩' };
    return String(num).replace(/[0-9]/g, (d) => map[d]);
  }

  function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text).catch(() => fallbackCopy(text));
    }
    return fallbackCopy(text);
  }

  function fallbackCopy(text) {
    return new Promise((resolve) => {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      try { document.execCommand('copy'); } catch (e) { /* noop */ }
      document.body.removeChild(textarea);
      resolve();
    });
  }

  let toastTimer = null;
  function showToast(message) {
    el.toast.textContent = message;
    el.toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      el.toast.classList.remove('show');
    }, 2200);
  }

  /* ---------- Boot ---------- */
  document.addEventListener('DOMContentLoaded', init);
})();
