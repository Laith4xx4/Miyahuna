/* =========================================================
   MAP ENGINE — محرك الخريطة التفاعلية لمياهنا
   يعتمد على Leaflet.js + OpenStreetMap (لا يحتاج API Key)
   ========================================================= */

(function (global) {
  'use strict';

  /* ── ثوابت الألوان حسب وقت الدور ──────────────────── */
  const PERIOD_STYLE = {
    morning: {
      color: '#d69a1f',
      fillColor: '#fff8e1',
      borderColor: '#f6dfa1',
      icon: '☀️',
      label: 'صباح',
      markerColor: '#f59e0b',
    },
    afternoon: {
      color: '#e2792f',
      fillColor: '#fff1e6',
      borderColor: '#f8d3b6',
      icon: '⛅',
      label: 'ظهر',
      markerColor: '#f97316',
    },
    evening: {
      color: '#3b82f6',
      fillColor: '#eaf2ff',
      borderColor: '#c9dcfb',
      icon: '🌙',
      label: 'مساء',
      markerColor: '#6366f1',
    },
    none: {
      color: '#9aa3b0',
      fillColor: '#f4f5f7',
      borderColor: '#e3e6ea',
      icon: '❓',
      label: 'غير محدد',
      markerColor: '#94a3b8',
    },
    service: {
      color: '#0ea5e9',
      fillColor: '#e0f7ff',
      borderColor: '#7dd3fc',
      icon: '💧',
      label: 'منطقة مخدومة',
      markerColor: '#0ea5e9',
    },
  };

  /* ── إنشاء أيقونة SVG مخصصة لكل وقت ──────────────── */
  function createMarkerIcon(period, label) {
    const style = PERIOD_STYLE[period] || PERIOD_STYLE.service;
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 48" width="36" height="48">
        <defs>
          <filter id="shadow-${period}" x="-30%" y="-20%" width="160%" height="160%">
            <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="rgba(0,0,0,0.25)"/>
          </filter>
        </defs>
        <!-- Pin shape -->
        <path d="M18 2 C9.16 2 2 9.16 2 18 C2 30 18 46 18 46 C18 46 34 30 34 18 C34 9.16 26.84 2 18 2 Z"
          fill="${style.markerColor}" filter="url(#shadow-${period})"/>
        <!-- Inner circle -->
        <circle cx="18" cy="18" r="10" fill="white" opacity="0.92"/>
        <!-- Droplet icon -->
        <path d="M18 11 C18 11 13 16.5 13 20 A5 5 0 0 0 23 20 C23 16.5 18 11 18 11 Z"
          fill="${style.markerColor}"/>
      </svg>
    `;
    return L.divIcon({
      html: `<div class="map-marker-wrap" title="${label}">
        <div class="map-marker" style="--mk-color:${style.markerColor}">
          ${svg}
        </div>
      </div>`,
      className: '',
      iconSize: [36, 48],
      iconAnchor: [18, 46],
      popupAnchor: [0, -46],
    });
  }

  /* ── بناء محتوى الـ Popup ──────────────────────────── */
  function buildPopupContent(item, regionData) {
    const style = PERIOD_STYLE[item.period] || PERIOD_STYLE.none;
    const district = regionData ? regionData.district : '';

    const locsHtml = (item.locations && item.locations.length > 1)
      ? `<div class="mpop-locs">${item.locations.map(l =>
          `<span class="mpop-loc-chip">📍 ${l}</span>`
        ).join('')}</div>`
      : '';

    return `
      <div class="map-popup" dir="rtl">
        <div class="mpop-header" style="--hdr-color:${style.markerColor}">
          <span class="mpop-period-icon">${style.icon}</span>
          <h3 class="mpop-title">${item.area}</h3>
        </div>
        ${district ? `<div class="mpop-district">📍 ${district}</div>` : ''}
        ${locsHtml}
        <div class="mpop-time-row">
          <span class="mpop-time-badge" style="background:${style.markerColor}15;color:${style.markerColor};border:1px solid ${style.markerColor}40">
            ${style.icon} ${style.label}: ${item.time}
          </span>
        </div>
        ${item.description && item.description !== item.area && item.description !== item.raw
          ? `<p class="mpop-desc">${item.description}</p>`
          : ''}
      </div>
    `;
  }

  /* =========================================================
     MIYAHUNA MAP CLASS
     ========================================================= */
  class MiyahunaMap {
    constructor(containerId) {
      this.containerId = containerId;
      this._map = null;
      this._markers = L.layerGroup();
      this._serviceMarkers = L.layerGroup();
      this._initialized = false;
      this._currentAnnouncements = [];
      this._legend = null;
      this._controls = null;
    }

    /**
     * تهيئة الخريطة وتحميلها
     */
    init() {
      if (this._initialized) return;

      // إنشاء الخريطة مركزها الأردن
      this._map = L.map(this.containerId, {
        center: [31.9539, 35.9106],
        zoom: 9,
        zoomControl: false,
        attributionControl: false,
      });

      // طبقة OpenStreetMap
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '© <a href="https://openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(this._map);

      // Attribution صغيرة في الركن
      L.control.attribution({ position: 'bottomleft', prefix: false })
        .addAttribution('© OpenStreetMap | مياهنا')
        .addTo(this._map);

      // زر التكبير في الجهة اليسرى
      L.control.zoom({ position: 'topleft' }).addTo(this._map);

      // إضافة طبقات الـ Markers
      this._markers.addTo(this._map);
      this._serviceMarkers.addTo(this._map);

      // وضع نقاط جميع مناطق مياهنا (خفية خضراء)
      this._renderServiceAreas();

      // وسيلة الإيضاح
      this._buildLegend();

      // زر إعادة الضبط
      this._buildResetControl();

      this._initialized = true;
    }

    /**
     * رسم جميع مناطق الخدمة كنقاط زرقاء صغيرة في الخلفية
     */
    _renderServiceAreas() {
      this._serviceMarkers.clearLayers();
      const allRegions = JordanRegions.getAll();

      allRegions.forEach((region) => {
        // فقط الأحياء والمدن (ليس المحافظات الكبيرة)
        if (region.type === 'governorate') return;

        const circle = L.circleMarker([region.lat, region.lng], {
          radius: 5,
          color: '#0ea5e9',
          fillColor: '#0ea5e9',
          fillOpacity: 0.2,
          weight: 1.5,
          opacity: 0.45,
          className: 'service-dot',
        });

        circle.bindTooltip(`
          <div dir="rtl" class="map-tooltip">
            <strong>${region.name}</strong>
            <br><span style="color:#64748b;font-size:11px">${region.district}</span>
          </div>
        `, {
          direction: 'top',
          className: 'map-tooltip-wrap',
          offset: [0, -4],
        });

        this._serviceMarkers.addLayer(circle);
      });
    }

    /**
     * تحديث الـ Markers بعد تحليل النص
     * announcements: مصفوفة كائنات الإعلانات من script.js
     */
    updateFromAnnouncements(announcements) {
      this._currentAnnouncements = announcements;
      this._markers.clearLayers();

      if (!announcements || announcements.length === 0) return;

      const bounds = [];

      announcements.forEach((item) => {
        // ابحث عن الإحداثيات لكل منطقة محددة في الإعلان
        const regionIds = this._resolveRegionIds(item);

        regionIds.forEach((regionId) => {
          const region = JordanRegions.getById(regionId);
          if (!region) return;

          const icon = createMarkerIcon(item.period, item.area);
          const marker = L.marker([region.lat, region.lng], { icon });

          marker.bindPopup(buildPopupContent(item, region), {
            maxWidth: 280,
            className: 'map-popup-wrap',
            closeButton: true,
            autoPan: true,
          });

          // تأثير نبض عند الفتح
          marker.on('popupopen', () => {
            marker.getElement()?.classList.add('marker-active');
          });
          marker.on('popupclose', () => {
            marker.getElement()?.classList.remove('marker-active');
          });

          this._markers.addLayer(marker);
          bounds.push([region.lat, region.lng]);
        });
      });

      // التحريك لإظهار جميع النقاط المضافة
      if (bounds.length > 0) {
        try {
          this._map.fitBounds(bounds, { padding: [40, 40], maxZoom: 13, animate: true });
        } catch (e) { /* bounds edge case */ }
      }
    }

    /**
     * تحديد معرفات المناطق من الإعلان
     * يحاول مطابقة اسم المنطقة مع قاعدة بيانات الإحداثيات
     */
    _resolveRegionIds(item) {
      const ids = new Set();

      // 1) ابحث مباشرة عن المنطقة الرئيسية
      const direct = this._findRegionByName(item.area);
      if (direct) ids.add(direct);

      // 2) ابحث في جميع المناطق المكتشفة
      if (item.locations && item.locations.length > 0) {
        item.locations.forEach((locName) => {
          const found = this._findRegionByName(locName);
          if (found) ids.add(found);
        });
      }

      return [...ids];
    }

    /**
     * البحث عن id المنطقة بالاسم (بعد تطبيع عربي)
     */
    _findRegionByName(name) {
      if (!name) return null;
      const normName = _normalizeForMatch(name);

      // بحث مطابق أولاً
      for (const region of JordanRegions.data) {
        if (_normalizeForMatch(region.name) === normName) return region.id;
      }

      // بحث جزئي
      for (const region of JordanRegions.data) {
        const normRegion = _normalizeForMatch(region.name);
        if (normRegion.includes(normName) || normName.includes(normRegion)) {
          return region.id;
        }
      }

      return null;
    }

    /**
     * التحريك إلى منطقة بالاسم أو الـ id
     */
    flyToRegion(idOrName) {
      let region = JordanRegions.getById(idOrName);
      if (!region) {
        const results = JordanRegions.searchByName(idOrName);
        if (results.length > 0) region = results[0];
      }
      if (!region) return;
      this._map.flyTo([region.lat, region.lng], region.zoom || 14, { animate: true, duration: 1.2 });
    }

    /**
     * إعادة الخريطة لموضعها الأصلي (الأردن كاملاً)
     */
    resetView() {
      this._map.flyTo([31.9539, 35.9106], 9, { animate: true, duration: 1.0 });
    }

    /**
     * مسح جميع نقاط الإعلانات
     */
    clearAnnouncements() {
      this._markers.clearLayers();
      this._currentAnnouncements = [];
    }

    /**
     * تبديل إظهار/إخفاء نقاط الخدمة الخلفية
     */
    toggleServiceDots(show) {
      if (show) {
        this._serviceMarkers.addTo(this._map);
      } else {
        this._map.removeLayer(this._serviceMarkers);
      }
    }

    /**
     * بناء وسيلة الإيضاح
     */
    _buildLegend() {
      const legend = L.control({ position: 'bottomright' });
      legend.onAdd = () => {
        const div = L.DomUtil.create('div', 'map-legend');
        div.innerHTML = `
          <div class="legend-title">وسيلة الإيضاح</div>
          <div class="legend-items">
            <div class="legend-item"><span class="legend-dot" style="background:#f59e0b"></span> صباح</div>
            <div class="legend-item"><span class="legend-dot" style="background:#f97316"></span> ظهر</div>
            <div class="legend-item"><span class="legend-dot" style="background:#6366f1"></span> مساء</div>
            <div class="legend-item"><span class="legend-dot" style="background:#94a3b8"></span> غير محدد</div>
            <div class="legend-item"><span class="legend-dot" style="background:#0ea5e9;opacity:0.5;border:1.5px solid #0ea5e9"></span> مناطق الخدمة</div>
          </div>
        `;
        L.DomEvent.disableClickPropagation(div);
        return div;
      };
      legend.addTo(this._map);
      this._legend = legend;
    }

    /**
     * زر إعادة الضبط
     */
    _buildResetControl() {
      const ctrl = L.control({ position: 'topleft' });
      ctrl.onAdd = () => {
        const div = L.DomUtil.create('div', 'map-reset-btn leaflet-bar');
        div.innerHTML = `<a href="#" title="إعادة الضبط" aria-label="إعادة الضبط">🇯🇴</a>`;
        L.DomEvent.on(div, 'click', (e) => {
          L.DomEvent.preventDefault(e);
          this.resetView();
        });
        L.DomEvent.disableClickPropagation(div);
        return div;
      };
      ctrl.addTo(this._map);
      this._controls = ctrl;
    }

    /**
     * إجبار الخريطة على إعادة الحساب بعد تغيير الحجم
     */
    invalidateSize() {
      if (this._map) this._map.invalidateSize();
    }
  }

  /* ── دالة تطبيع عربي داخلية ──────────────────────── */
  function _normalizeForMatch(str) {
    if (!str) return '';
    return str
      .replace(/[أإآ]/g, 'ا')
      .replace(/[ةه]/g, 'ه')
      .replace(/[ىي]/g, 'ي')
      .replace(/ـ/g, '')
      .replace(/[\u064B-\u065F\u0670]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  /* =========================================================
     EXPORTS
     ========================================================= */
  global.MiyahunaMap = MiyahunaMap;

})(window);
