/* =========================================================
   JORDAN REGIONS — إحداثيات مناطق مياهنا في الأردن
   يربط كل منطقة في locations.json بإحداثيات lat/lng

   المصدر: إحداثيات جغرافية دقيقة لمناطق الأردن
   ========================================================= */

(function (global) {
  'use strict';

  /**
   * كل سجل يحتوي على:
   *   id      — نفس الـ id في locations.json
   *   name    — الاسم العربي
   *   lat     — خط العرض
   *   lng     — خط الطول
   *   type    — نوع المنطقة
   *   district— اسم اللواء / المحافظة
   *   zoom    — مستوى التكبير المقترح عند التركيز
   */
  const JORDAN_REGIONS = [

    /* ──────────────────────────────────────────
       المحافظات الرئيسية
    ────────────────────────────────────────── */
    { id: 'amman',    name: 'عمان',    lat: 31.9539, lng: 35.9106, type: 'governorate', district: 'عمان',    zoom: 11 },
    { id: 'zarqa',    name: 'الزرقاء', lat: 32.0728, lng: 36.0880, type: 'governorate', district: 'الزرقاء', zoom: 12 },
    { id: 'irbid',    name: 'إربد',    lat: 32.5556, lng: 35.8500, type: 'governorate', district: 'إربد',    zoom: 12 },
    { id: 'balqa',    name: 'البلقاء', lat: 32.0344, lng: 35.7267, type: 'governorate', district: 'البلقاء', zoom: 11 },
    { id: 'madaba',   name: 'مادبا',   lat: 31.7167, lng: 35.7944, type: 'governorate', district: 'مادبا',   zoom: 12 },
    { id: 'mafraq',   name: 'المفرق',  lat: 32.3417, lng: 36.2000, type: 'governorate', district: 'المفرق',  zoom: 11 },
    { id: 'ajloun',   name: 'عجلون',   lat: 32.3333, lng: 35.7500, type: 'governorate', district: 'عجلون',   zoom: 12 },
    { id: 'jerash',   name: 'جرش',     lat: 32.2833, lng: 35.9000, type: 'governorate', district: 'جرش',     zoom: 12 },
    { id: 'karak',    name: 'الكرك',   lat: 31.1833, lng: 35.7028, type: 'governorate', district: 'الكرك',   zoom: 11 },
    { id: 'tafilah',  name: 'الطفيلة', lat: 30.8333, lng: 35.6000, type: 'governorate', district: 'الطفيلة', zoom: 11 },
    { id: 'maan',     name: 'معان',    lat: 30.1972, lng: 35.7339, type: 'governorate', district: 'معان',    zoom: 11 },
    { id: 'aqaba',    name: 'العقبة',  lat: 29.5321, lng: 35.0063, type: 'governorate', district: 'العقبة',  zoom: 12 },

    /* ──────────────────────────────────────────
       أحياء عمان الغربية والشمالية
    ────────────────────────────────────────── */
    { id: 'abdoun',          name: 'عبدون',              lat: 31.9681, lng: 35.8753, type: 'neighborhood', district: 'عمان', zoom: 14 },
    { id: 'abdoun_south',    name: 'عبدون الجنوبي',      lat: 31.9640, lng: 35.8730, type: 'neighborhood', district: 'عمان', zoom: 15 },
    { id: 'abdoun_north',    name: 'عبدون الشمالي',      lat: 31.9720, lng: 35.8770, type: 'neighborhood', district: 'عمان', zoom: 15 },
    { id: 'deir_ghbar',      name: 'دير غبار',           lat: 31.9750, lng: 35.8810, type: 'neighborhood', district: 'عمان', zoom: 14 },
    { id: 'khalda',          name: 'خلدا',               lat: 31.9800, lng: 35.8610, type: 'neighborhood', district: 'عمان', zoom: 14 },
    { id: 'sweifieh',        name: 'الصويفية',           lat: 31.9700, lng: 35.8651, type: 'neighborhood', district: 'عمان', zoom: 14 },
    { id: 'rabieh',          name: 'الرابية',            lat: 31.9850, lng: 35.8850, type: 'neighborhood', district: 'عمان', zoom: 14 },
    { id: 'tla_ali',         name: 'تلاع العلي',         lat: 31.9920, lng: 35.8780, type: 'neighborhood', district: 'عمان', zoom: 14 },
    { id: 'umm_smaaq',       name: 'أم السماق',          lat: 31.9780, lng: 35.8720, type: 'neighborhood', district: 'عمان', zoom: 14 },
    { id: 'umm_uzaina',      name: 'أم أذينة',           lat: 31.9640, lng: 35.8820, type: 'neighborhood', district: 'عمان', zoom: 14 },
    { id: 'dabouq',          name: 'دابوق',              lat: 32.0100, lng: 35.8380, type: 'neighborhood', district: 'عمان', zoom: 14 },
    { id: 'shfabadran',      name: 'شفابدران',           lat: 32.0280, lng: 35.8620, type: 'neighborhood', district: 'عمان', zoom: 14 },
    { id: 'shfabadran_mraj', name: 'شفابدران مرج الفرس', lat: 32.0350, lng: 35.8580, type: 'neighborhood', district: 'عمان', zoom: 15 },
    { id: 'shfabadran_rkhsa',name: 'شفابدران حي الترخيص',lat: 32.0230, lng: 35.8650, type: 'neighborhood', district: 'عمان', zoom: 15 },
    { id: 'shfabadran_rafat',name: 'شفابدران شارع رفعت', lat: 32.0300, lng: 35.8700, type: 'neighborhood', district: 'عمان', zoom: 15 },
    { id: 'jubaiha',         name: 'الجبيهة',            lat: 32.0150, lng: 35.8750, type: 'neighborhood', district: 'عمان', zoom: 14 },
    { id: 'jubaiha_mansour', name: 'جبيهة حي المنصور',  lat: 32.0120, lng: 35.8780, type: 'neighborhood', district: 'عمان', zoom: 15 },
    { id: 'jubaiha_rayan',   name: 'جبيهة حي الريان',   lat: 32.0180, lng: 35.8720, type: 'neighborhood', district: 'عمان', zoom: 15 },
    { id: 'abu_nsair',       name: 'أبو نصير',           lat: 32.0350, lng: 35.8950, type: 'neighborhood', district: 'عمان', zoom: 14 },
    { id: 'abu_nsair_old_housing', name: 'إسكان أبو نصير القديم', lat: 32.0330, lng: 35.8980, type: 'neighborhood', district: 'عمان', zoom: 15 },
    { id: 'mraj_hamam',      name: 'مرج الحمام',         lat: 31.9400, lng: 35.8200, type: 'neighborhood', district: 'عمان', zoom: 14 },
    { id: 'mraj_fras',       name: 'مرج الفرس',          lat: 32.0450, lng: 35.8500, type: 'neighborhood', district: 'عمان', zoom: 14 },
    { id: 'wadi_sir',        name: 'وادي السير',         lat: 31.9550, lng: 35.8380, type: 'neighborhood', district: 'عمان', zoom: 13 },
    { id: 'prince_rashid',   name: 'ضاحية الأمير راشد',  lat: 32.0220, lng: 35.9100, type: 'neighborhood', district: 'عمان', zoom: 14 },
    { id: 'rashid_suburb',   name: 'ضاحية الرشيد',       lat: 32.0180, lng: 35.9080, type: 'neighborhood', district: 'عمان', zoom: 14 },
    { id: 'yasmin',          name: 'الياسمين',           lat: 32.0050, lng: 35.8850, type: 'neighborhood', district: 'عمان', zoom: 14 },
    { id: 'yasmin_suburb',   name: 'ضاحية الياسمين',     lat: 32.0080, lng: 35.8820, type: 'neighborhood', district: 'عمان', zoom: 14 },
    { id: 'nakheel_suburb',  name: 'ضاحية النخيل',       lat: 32.0100, lng: 35.8900, type: 'neighborhood', district: 'عمان', zoom: 14 },
    { id: 'mansour',         name: 'حي المنصور',         lat: 32.0130, lng: 35.8800, type: 'neighborhood', district: 'عمان', zoom: 14 },
    { id: 'rayan',           name: 'حي الريان',          lat: 32.0200, lng: 35.8770, type: 'neighborhood', district: 'عمان', zoom: 14 },
    { id: 'trkhees',         name: 'حي الترخيص',        lat: 32.0250, lng: 35.8640, type: 'neighborhood', district: 'عمان', zoom: 14 },
    { id: 'aqsa_suburb',     name: 'ضاحية الأقصى',       lat: 32.0400, lng: 35.9000, type: 'neighborhood', district: 'عمان', zoom: 14 },
    { id: 'buniyet',         name: 'البنيات',            lat: 31.9300, lng: 35.8000, type: 'neighborhood', district: 'عمان', zoom: 14 },
    { id: 'naour',           name: 'ناعور',              lat: 31.8833, lng: 35.7833, type: 'city',         district: 'عمان', zoom: 13 },

    /* ──────────────────────────────────────────
       أحياء عمان الوسط والشرق
    ────────────────────────────────────────── */
    { id: 'tabarbour',      name: 'طبربور',      lat: 32.0450, lng: 35.9300, type: 'neighborhood', district: 'عمان', zoom: 14 },
    { id: 'tariq',          name: 'طارق',        lat: 31.9780, lng: 35.9300, type: 'neighborhood', district: 'عمان', zoom: 14 },
    { id: 'marka',          name: 'ماركا',       lat: 31.9950, lng: 35.9650, type: 'neighborhood', district: 'عمان', zoom: 14 },
    { id: 'marka_north',    name: 'ماركا الشمالية',lat:32.0000, lng: 35.9700, type: 'neighborhood', district: 'عمان', zoom: 14 },
    { id: 'marka_south',    name: 'ماركا الجنوبية',lat:31.9900, lng: 35.9620, type: 'neighborhood', district: 'عمان', zoom: 14 },
    { id: 'qwismeh',        name: 'القويسمة',    lat: 31.9500, lng: 35.9750, type: 'neighborhood', district: 'عمان', zoom: 13 },
    { id: 'hai_nzal',       name: 'حي نزال',     lat: 31.9700, lng: 35.9200, type: 'neighborhood', district: 'عمان', zoom: 14 },
    { id: 'ashrafieh',      name: 'الأشرفية',    lat: 31.9650, lng: 35.9280, type: 'neighborhood', district: 'عمان', zoom: 14 },
    { id: 'hussein_mountain',name:'جبل الحسين',  lat: 31.9760, lng: 35.9200, type: 'neighborhood', district: 'عمان', zoom: 14 },
    { id: 'lweibdeh',       name: 'جبل اللويبدة',lat: 31.9710, lng: 35.9250, type: 'neighborhood', district: 'عمان', zoom: 14 },
    { id: 'jabal_amman',    name: 'جبل عمان',    lat: 31.9680, lng: 35.9310, type: 'neighborhood', district: 'عمان', zoom: 14 },
    { id: 'abdali',         name: 'العبدلي',     lat: 31.9770, lng: 35.9320, type: 'neighborhood', district: 'عمان', zoom: 14 },
    { id: 'shmeisani',      name: 'الشميساني',   lat: 31.9820, lng: 35.9130, type: 'neighborhood', district: 'عمان', zoom: 14 },
    { id: 'muqabaleen',     name: 'المقابلين',   lat: 32.0000, lng: 35.9500, type: 'neighborhood', district: 'عمان', zoom: 14 },
    { id: 'kursi',          name: 'الكرسي',      lat: 31.9620, lng: 35.9500, type: 'neighborhood', district: 'عمان', zoom: 14 },
    { id: 'kursi_high',     name: 'الكرسي المرتفع',lat:31.9580,lng: 35.9480, type: 'neighborhood', district: 'عمان', zoom: 15 },
    { id: 'kursi_low',      name: 'الكرسي المنخفض',lat:31.9650,lng: 35.9520, type: 'neighborhood', district: 'عمان', zoom: 15 },
    { id: 'abu_alanda',     name: 'أبو علندا',   lat: 31.9200, lng: 35.9700, type: 'neighborhood', district: 'عمان', zoom: 14 },
    { id: 'jawa',           name: 'جاوا',        lat: 31.8900, lng: 36.0300, type: 'city',         district: 'عمان', zoom: 13 },
    { id: 'jandaweel',      name: 'الجندويل',    lat: 31.9520, lng: 35.8950, type: 'neighborhood', district: 'عمان', zoom: 14 },
    { id: 'jandaweel_low',  name: 'الجندويل المنخفض', lat: 31.9490, lng: 35.8930, type: 'neighborhood', district: 'عمان', zoom: 15 },
    { id: 'jandaweel_high', name: 'الجندويل المرتفع',  lat: 31.9550, lng: 35.8970, type: 'neighborhood', district: 'عمان', zoom: 15 },
    { id: 'feiha',          name: 'الفيحاء',     lat: 31.9750, lng: 35.9350, type: 'neighborhood', district: 'عمان', zoom: 14 },
    { id: 'zuhor',          name: 'الزهور',      lat: 31.9840, lng: 35.9250, type: 'neighborhood', district: 'عمان', zoom: 14 },
    { id: 'akhdar',         name: 'الأخضر',      lat: 31.9900, lng: 35.9400, type: 'neighborhood', district: 'عمان', zoom: 14 },
    { id: 'manara',         name: 'المنارة',     lat: 31.9850, lng: 35.9300, type: 'neighborhood', district: 'عمان', zoom: 14 },
    { id: 'alkoom',         name: 'الكوم',       lat: 31.9700, lng: 35.9580, type: 'neighborhood', district: 'عمان', zoom: 14 },
    { id: 'alkoom_darak',   name: 'الكوم حول الدرك', lat: 31.9680, lng: 35.9560, type: 'neighborhood', district: 'عمان', zoom: 15 },
    { id: 'yajuz',          name: 'اليادودة',    lat: 32.0500, lng: 35.9800, type: 'neighborhood', district: 'عمان', zoom: 13 },
    { id: 'umm_nwara',      name: 'أم نوارة',    lat: 31.9100, lng: 35.9200, type: 'neighborhood', district: 'عمان', zoom: 14 },
    { id: 'alkumiya',       name: 'العلكومية',   lat: 31.9350, lng: 35.9550, type: 'neighborhood', district: 'عمان', zoom: 14 },
    { id: 'jweida',         name: 'الجويدة',     lat: 31.9100, lng: 36.0000, type: 'neighborhood', district: 'عمان', zoom: 13 },
    { id: 'khreibet_souq',  name: 'خريبة السوق', lat: 31.9400, lng: 36.0200, type: 'neighborhood', district: 'عمان', zoom: 14 },
    { id: 'hesban',         name: 'حسبان',       lat: 31.8500, lng: 35.8800, type: 'city',         district: 'عمان', zoom: 13 },
    { id: 'seventh_circle', name: 'الدوار السابع',lat:31.9830, lng: 35.8780, type: 'landmark',     district: 'عمان', zoom: 15 },
    { id: 'eighth_circle',  name: 'الدوار الثامن',lat:31.9880, lng: 35.8690, type: 'landmark',     district: 'عمان', zoom: 15 },

    /* ──────────────────────────────────────────
       لواء عين الباشا
    ────────────────────────────────────────── */
    { id: 'ain_basha',             name: 'عين الباشا',             lat: 32.0650, lng: 35.7550, type: 'district',      district: 'عين الباشا', zoom: 13 },
    { id: 'ain_basha_urban_dev',   name: 'التطوير الحضري',         lat: 32.0720, lng: 35.7480, type: 'neighborhood',  district: 'عين الباشا', zoom: 14 },
    { id: 'ain_basha_iskan_qaqish',name: 'اسكان قاقيش',            lat: 32.0680, lng: 35.7420, type: 'housing',       district: 'عين الباشا', zoom: 14 },
    { id: 'ain_basha_abu_rawwa',   name: 'ابو رواع',               lat: 32.0580, lng: 35.7600, type: 'neighborhood',  district: 'عين الباشا', zoom: 14 },
    { id: 'ain_basha_umm_safatin', name: 'ام صفاتين',              lat: 32.0620, lng: 35.7650, type: 'neighborhood',  district: 'عين الباشا', zoom: 14 },
    { id: 'ain_basha_prince_ali',  name: 'حي الامير علي',          lat: 32.0700, lng: 35.7550, type: 'neighborhood',  district: 'عين الباشا', zoom: 14 },
    { id: 'ain_basha_umm_aliqah',  name: 'ام عليقة',               lat: 32.0660, lng: 35.7510, type: 'neighborhood',  district: 'عين الباشا', zoom: 14 },
    { id: 'ain_basha_mobas',       name: 'موبص',                   lat: 32.0600, lng: 35.7490, type: 'neighborhood',  district: 'عين الباشا', zoom: 14 },

    /* ──────────────────────────────────────────
       مناطق الشمال (شمال عمان)
    ────────────────────────────────────────── */
    { id: 'sulayhi',   name: 'السليحي',   lat: 32.0450, lng: 35.9550, type: 'neighborhood', district: 'شمال عمان', zoom: 14 },
    { id: 'juaydidat', name: 'الجعيديدة', lat: 32.0600, lng: 35.9620, type: 'neighborhood', district: 'شمال عمان', zoom: 14 },
    { id: 'hanw',      name: 'الحنو',     lat: 32.0500, lng: 35.9700, type: 'neighborhood', district: 'شمال عمان', zoom: 14 },
    { id: 'rumman',    name: 'الرمان',    lat: 32.0750, lng: 35.9680, type: 'neighborhood', district: 'شمال عمان', zoom: 14 },

    /* ──────────────────────────────────────────
       البقعة
    ────────────────────────────────────────── */
    { id: 'baqa',       name: 'البقعة',       lat: 32.0250, lng: 35.7450, type: 'neighborhood', district: 'البلقاء', zoom: 13 },
    { id: 'baqa_nablus',name: 'نابلس البقعة', lat: 32.0280, lng: 35.7400, type: 'neighborhood', district: 'البلقاء', zoom: 14 },

    /* ──────────────────────────────────────────
       الزرقاء
    ────────────────────────────────────────── */
    { id: 'zarqa_city', name: 'مدينة الزرقاء', lat: 32.0728, lng: 36.0880, type: 'city',         district: 'الزرقاء', zoom: 13 },
    { id: 'rusaifa',    name: 'الرصيفة',       lat: 32.0333, lng: 36.0500, type: 'city',         district: 'الزرقاء', zoom: 13 },
    { id: 'zarqa_new',  name: 'الزرقاء الجديدة', lat: 32.0850, lng: 36.0780, type: 'neighborhood', district: 'الزرقاء', zoom: 14 },

    /* ──────────────────────────────────────────
       إربد والرمثا
    ────────────────────────────────────────── */
    { id: 'irbid_city', name: 'مدينة إربد', lat: 32.5556, lng: 35.8500, type: 'city', district: 'إربد', zoom: 13 },
    { id: 'ramtha',     name: 'الرمثا',     lat: 32.5667, lng: 36.0000, type: 'city', district: 'إربد', zoom: 13 },

    /* ──────────────────────────────────────────
       محافظات أخرى
    ────────────────────────────────────────── */
    { id: 'salt',        name: 'السلط',       lat: 32.0344, lng: 35.7267, type: 'city', district: 'البلقاء', zoom: 13 },
    { id: 'madaba_city', name: 'مدينة مادبا', lat: 31.7167, lng: 35.7944, type: 'city', district: 'مادبا',   zoom: 13 },
    { id: 'karak_city',  name: 'مدينة الكرك', lat: 31.1833, lng: 35.7028, type: 'city', district: 'الكرك',   zoom: 13 },
    { id: 'aqaba_city',  name: 'مدينة العقبة',lat: 29.5321, lng: 35.0063, type: 'city', district: 'العقبة',  zoom: 13 },
    { id: 'mafraq_city', name: 'مدينة المفرق',lat: 32.3417, lng: 36.2000, type: 'city', district: 'المفرق',  zoom: 13 },
    { id: 'ajloun_city', name: 'مدينة عجلون', lat: 32.3333, lng: 35.7500, type: 'city', district: 'عجلون',   zoom: 13 },
    { id: 'jerash_city', name: 'مدينة جرش',   lat: 32.2833, lng: 35.9000, type: 'city', district: 'جرش',     zoom: 13 },
    { id: 'maan_city',   name: 'مدينة معان',  lat: 30.1972, lng: 35.7339, type: 'city', district: 'معان',    zoom: 13 },
  ];

  /* سريع البحث بالـ id */
  const _byId = {};
  JORDAN_REGIONS.forEach((r) => { _byId[r.id] = r; });

  /**
   * البحث بالـ id
   */
  function getById(id) {
    return _byId[id] || null;
  }

  /**
   * البحث بالاسم العربي (جزئي)
   */
  function searchByName(query) {
    if (!query) return [];
    const q = query.trim();
    return JORDAN_REGIONS.filter((r) => r.name.includes(q));
  }

  /**
   * كل المناطق
   */
  function getAll() {
    return JORDAN_REGIONS;
  }

  /* =========================================================
     EXPORTS
     ========================================================= */
  global.JordanRegions = { getById, searchByName, getAll, data: JORDAN_REGIONS };

})(window);
