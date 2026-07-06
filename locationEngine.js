/* =========================================================
   SMART JORDAN LOCATION ENGINE
   محرك التعرف الذكي على المناطق الأردنية
   ========================================================= */

(function (global) {
  'use strict';

  /* =========================================================
     ARABIC NORMALIZER
     توحيد الكتابة العربية
     ========================================================= */
  function normalizeArabic(str) {
    if (!str) return '';
    return str
      // تحويل الأرقام العربية
      .replace(/[٠-٩]/g, (d) => String.fromCharCode(d.charCodeAt(0) - 0x0660 + 48))
      // توحيد الألف (أ، إ، آ → ا)
      .replace(/[أإآ]/g, 'ا')
      // توحيد التاء المربوطة (ة → ه)
      .replace(/[ةه]/g, 'ه')
      // توحيد الياء (ى → ي)
      .replace(/[ىي]/g, 'ي')
      // حذف التطويل (ـ)
      .replace(/ـ/g, '')
      // حذف التشكيل
      .replace(/[\u064B-\u065F\u0670]/g, '')
      // حذف علامات الترقيم
      .replace(/[،؛؟!.,;?!()[\]{}"'`]/g, ' ')
      // حذف المسافات الزائدة
      .replace(/\s+/g, ' ')
      .trim()
      .toLowerCase();
  }

  /* =========================================================
     SCORE CONSTANTS
     ========================================================= */
  const SCORE = {
    EXACT: 100,
    ALIAS: 95,
    STARTS_WITH: 90,
    CONTAINS: 85,
    FUZZY: 75,
    NO_MATCH: 0,
  };

  /* =========================================================
     LEVENSHTEIN DISTANCE (Fuzzy matching core)
     ========================================================= */
  function levenshtein(a, b) {
    const la = a.length, lb = b.length;
    if (la === 0) return lb;
    if (lb === 0) return la;
    const matrix = [];
    for (let i = 0; i <= lb; i++) matrix[i] = [i];
    for (let j = 0; j <= la; j++) matrix[0][j] = j;
    for (let i = 1; i <= lb; i++) {
      for (let j = 1; j <= la; j++) {
        matrix[i][j] = b[i - 1] === a[j - 1]
          ? matrix[i - 1][j - 1]
          : Math.min(
              matrix[i - 1][j - 1] + 1,
              matrix[i][j - 1] + 1,
              matrix[i - 1][j] + 1
            );
      }
    }
    return matrix[lb][la];
  }

  /* =========================================================
     LOCATION ENGINE CLASS
     ========================================================= */
  class LocationEngine {
    constructor() {
      this.locations = [];
      this.loaded = false;
      this._loadPromise = null;
    }

    /**
     * Load the locations database from JSON file
     */
    async load(jsonPath = 'locations.json') {
      if (this.loaded) return;
      if (this._loadPromise) return this._loadPromise;

      this._loadPromise = fetch(jsonPath)
        .then((r) => r.json())
        .then((data) => {
          this.locations = data.locations || [];
          this.loaded = true;
          this._buildIndex();
        });

      return this._loadPromise;
    }

    /**
     * Build a normalized lookup index for fast matching
     */
    _buildIndex() {
      this._index = this.locations.map((loc) => {
        const terms = [loc.name, ...(loc.aliases || [])];
        return {
          loc,
          terms,
          normalizedTerms: terms.map(normalizeArabic),
        };
      });
    }

    /**
     * Score a single location against a query
     */
    _scoreOne(entry, normQuery) {
      let best = SCORE.NO_MATCH;
      let matchTerm = '';

      for (let i = 0; i < entry.normalizedTerms.length; i++) {
        const normTerm = entry.normalizedTerms[i];
        const origTerm = entry.terms[i];
        let s = SCORE.NO_MATCH;

        if (normTerm === normQuery) {
          s = i === 0 ? SCORE.EXACT : SCORE.ALIAS;
        } else if (normTerm.startsWith(normQuery) || normQuery.startsWith(normTerm)) {
          s = SCORE.STARTS_WITH;
        } else if (normTerm.includes(normQuery) || normQuery.includes(normTerm)) {
          s = SCORE.CONTAINS;
        } else {
          // Fuzzy: allow up to 2 edits per 5 characters
          const maxDist = Math.max(1, Math.floor(Math.min(normQuery.length, normTerm.length) / 4));
          const dist = levenshtein(normQuery, normTerm);
          if (dist <= maxDist) {
            s = SCORE.FUZZY;
          }
        }

        if (s > best) {
          best = s;
          matchTerm = origTerm;
        }
      }

      return { score: best, matchTerm };
    }

    /**
     * Search for locations matching a query string
     * Returns sorted results with scores
     */
    search(query, limit = 10) {
      if (!this.loaded || !query || !query.trim()) return [];

      const normQuery = normalizeArabic(query);
      if (!normQuery) return [];

      const results = [];

      for (const entry of this._index) {
        const { score, matchTerm } = this._scoreOne(entry, normQuery);
        if (score > SCORE.NO_MATCH) {
          results.push({
            ...entry.loc,
            score,
            matchTerm,
            displayName: entry.loc.name,
          });
        }
      }

      // Sort by score descending, then by name length (shorter first)
      results.sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score;
        return a.displayName.length - b.displayName.length;
      });

      return results.slice(0, limit);
    }

    /**
     * Detect ALL locations mentioned inside a block of text
     * Returns array of matched location objects (deduplicated)
     */
    detectInText(text) {
      if (!this.loaded || !text) return [];

      const normText = normalizeArabic(text);
      const found = new Map(); // id → { loc, score }

      for (const entry of this._index) {
        for (const normTerm of entry.normalizedTerms) {
          if (normTerm.length < 3) continue; // skip very short terms

          if (normText.includes(normTerm)) {
            const existing = found.get(entry.loc.id);
            if (!existing || existing.score < SCORE.CONTAINS) {
              found.set(entry.loc.id, { loc: entry.loc, score: SCORE.CONTAINS });
            }
          }
        }
      }

      // Also try fuzzy on known location names split from text
      const words = normText.split(/\s+/);
      for (let w = 0; w < words.length; w++) {
        // Try 1, 2 and 3-word chunks
        for (let len = 1; len <= 3 && w + len <= words.length; len++) {
          const chunk = words.slice(w, w + len).join(' ');
          if (chunk.length < 3) continue;
          for (const entry of this._index) {
            if (found.has(entry.loc.id)) continue;
            const { score } = this._scoreOne(entry, chunk);
            if (score >= SCORE.STARTS_WITH) {
              found.set(entry.loc.id, { loc: entry.loc, score });
            }
          }
        }
      }

      const results = [...found.values()]
        .sort((a, b) => b.score - a.score)
        .map((f) => f.loc);

      return results;
    }

    /**
     * Extract best matching single location name from a line
     * Used for extracting the area field in the parser
     */
    extractBestLocationFromLine(line) {
      if (!this.loaded) return null;
      const detected = this.detectInText(line);
      if (detected.length === 0) return null;

      // If multiple detected, prefer the one whose name appears earliest in line
      const normLine = normalizeArabic(line);
      let best = null;
      let bestIdx = Infinity;

      for (const loc of detected) {
        const normName = normalizeArabic(loc.name);
        const idx = normLine.indexOf(normName);
        if (idx !== -1 && idx < bestIdx) {
          bestIdx = idx;
          best = loc;
        }
      }

      return best || detected[0];
    }

    /**
     * Get all unique location names detected in a line
     * Used to build the locations[] array on each announcement
     */
    extractAllLocationsFromLine(line) {
      if (!this.loaded) return [];
      return this.detectInText(line).map((loc) => loc.name);
    }

    /**
     * Highlight occurrences of query inside text (HTML)
     * Returns HTML string with <mark> tags
     */
    highlightInText(escapedText, query) {
      if (!query || !escapedText) return escapedText;
      const normQuery = normalizeArabic(query);
      if (!normQuery) return escapedText;

      // Simple approach: highlight literal match + normalized variants
      const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      try {
        const re = new RegExp(`(${escaped})`, 'gi');
        return escapedText.replace(re, '<mark>$1</mark>');
      } catch {
        return escapedText;
      }
    }
  }

  /* =========================================================
     AUTOCOMPLETE WIDGET
     ========================================================= */
  class LocationAutocomplete {
    constructor(inputEl, engine, options = {}) {
      this.input = inputEl;
      this.engine = engine;
      this.options = {
        limit: options.limit || 8,
        onSelect: options.onSelect || null,
        minChars: options.minChars || 1,
      };
      this._selectedIdx = -1;
      this._results = [];
      this._open = false;

      this._build();
      this._bindEvents();
    }

    _build() {
      this.wrapper = document.createElement('div');
      this.wrapper.className = 'ac-wrapper';
      this.input.parentNode.insertBefore(this.wrapper, this.input);
      this.wrapper.appendChild(this.input);

      this.dropdown = document.createElement('ul');
      this.dropdown.className = 'ac-dropdown';
      this.dropdown.setAttribute('role', 'listbox');
      this.wrapper.appendChild(this.dropdown);
    }

    _bindEvents() {
      this.input.addEventListener('input', () => this._onInput());
      this.input.addEventListener('keydown', (e) => this._onKeydown(e));
      this.input.addEventListener('blur', () => setTimeout(() => this._close(), 180));
      document.addEventListener('click', (e) => {
        if (!this.wrapper.contains(e.target)) this._close();
      });
    }

    _onInput() {
      const val = this.input.value.trim();
      if (val.length < this.options.minChars) {
        this._close();
        return;
      }
      this._results = this.engine.search(val, this.options.limit);
      this._render(val);
    }

    _onKeydown(e) {
      if (!this._open) return;
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          this._selectedIdx = Math.min(this._selectedIdx + 1, this._results.length - 1);
          this._highlight();
          break;
        case 'ArrowUp':
          e.preventDefault();
          this._selectedIdx = Math.max(this._selectedIdx - 1, -1);
          this._highlight();
          break;
        case 'Enter':
          e.preventDefault();
          if (this._selectedIdx >= 0) this._select(this._results[this._selectedIdx]);
          break;
        case 'Escape':
          this._close();
          break;
      }
    }

    _render(query) {
      this.dropdown.innerHTML = '';
      this._selectedIdx = -1;

      if (this._results.length === 0) {
        this._close();
        return;
      }

      this._results.forEach((loc, idx) => {
        const li = document.createElement('li');
        li.className = 'ac-item';
        li.setAttribute('role', 'option');
        li.dataset.idx = idx;

        const scoreClass =
          loc.score >= SCORE.EXACT ? 'ac-score-exact' :
          loc.score >= SCORE.ALIAS ? 'ac-score-alias' :
          loc.score >= SCORE.STARTS_WITH ? 'ac-score-starts' :
          loc.score >= SCORE.CONTAINS ? 'ac-score-contains' : 'ac-score-fuzzy';

        const highlighted = this._highlightMatch(loc.displayName, query);

        li.innerHTML = `
          <span class="ac-name">${highlighted}</span>
          <span class="ac-meta">
            <span class="ac-type">${this._typeLabel(loc.type)}</span>
            <span class="ac-badge ${scoreClass}">${loc.score}%</span>
          </span>
        `;

        li.addEventListener('mousedown', () => this._select(loc));
        this.dropdown.appendChild(li);
      });

      this._open = true;
      this.dropdown.hidden = false;
    }

    _highlight() {
      const items = this.dropdown.querySelectorAll('.ac-item');
      items.forEach((el, i) => {
        el.classList.toggle('ac-item--active', i === this._selectedIdx);
        if (i === this._selectedIdx) {
          el.scrollIntoView({ block: 'nearest' });
        }
      });
    }

    _select(loc) {
      this.input.value = loc.displayName;
      this._close();
      if (this.options.onSelect) this.options.onSelect(loc);
      this.input.dispatchEvent(new Event('input', { bubbles: true }));
    }

    _close() {
      this._open = false;
      this.dropdown.hidden = true;
      this.dropdown.innerHTML = '';
      this._selectedIdx = -1;
    }

    _highlightMatch(text, query) {
      const normText = normalizeArabic(text);
      const normQuery = normalizeArabic(query);
      if (!normQuery) return text;

      // Find where the query appears in the normalized text
      const idx = normText.indexOf(normQuery);
      if (idx === -1) return text;

      const before = text.slice(0, idx);
      const match = text.slice(idx, idx + query.length);
      const after = text.slice(idx + query.length);
      return `${before}<mark>${match}</mark>${after}`;
    }

    _typeLabel(type) {
      const labels = {
        governorate: 'محافظة',
        district: 'لواء',
        city: 'مدينة',
        neighborhood: 'حي',
        landmark: 'معلم',
        village: 'قرية',
        housing: 'إسكان',
        commercial: 'تجاري',
        industrial: 'صناعي',
      };
      return labels[type] || type || '';
    }
  }

  /* =========================================================
     EXPORTS
     ========================================================= */
  global.LocationEngine = LocationEngine;
  global.LocationAutocomplete = LocationAutocomplete;
  global.normalizeArabic = normalizeArabic;

})(window);
