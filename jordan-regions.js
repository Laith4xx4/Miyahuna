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
  {
    "id": "amman",
    "name": "عمان",
    "lat": 31.9539,
    "lng": 35.9106,
    "type": "governorate",
    "district": "العاصمة",
    "zoom": 11
  },
  {
    "id": "zarqa",
    "name": "الزرقاء",
    "lat": 32.0728,
    "lng": 36.088,
    "type": "governorate",
    "district": "الزرقاء",
    "zoom": 11
  },
  {
    "id": "irbid",
    "name": "إربد",
    "lat": 32.5556,
    "lng": 35.85,
    "type": "governorate",
    "district": "إربد",
    "zoom": 11
  },
  {
    "id": "balqa",
    "name": "البلقاء",
    "lat": 32.0344,
    "lng": 35.7267,
    "type": "governorate",
    "district": "البلقاء",
    "zoom": 11
  },
  {
    "id": "madaba",
    "name": "مادبا",
    "lat": 31.7167,
    "lng": 35.7944,
    "type": "governorate",
    "district": "مادبا",
    "zoom": 11
  },
  {
    "id": "mafraq",
    "name": "المفرق",
    "lat": 32.3417,
    "lng": 36.2,
    "type": "governorate",
    "district": "المفرق",
    "zoom": 11
  },
  {
    "id": "ajloun",
    "name": "عجلون",
    "lat": 32.3333,
    "lng": 35.75,
    "type": "governorate",
    "district": "عجلون",
    "zoom": 11
  },
  {
    "id": "jerash",
    "name": "جرش",
    "lat": 32.2833,
    "lng": 35.9,
    "type": "governorate",
    "district": "جرش",
    "zoom": 11
  },
  {
    "id": "karak",
    "name": "الكرك",
    "lat": 31.1833,
    "lng": 35.7028,
    "type": "governorate",
    "district": "الكرك",
    "zoom": 11
  },
  {
    "id": "tafilah",
    "name": "الطفيلة",
    "lat": 30.8333,
    "lng": 35.6,
    "type": "governorate",
    "district": "الطفيلة",
    "zoom": 11
  },
  {
    "id": "maan",
    "name": "معان",
    "lat": 30.1972,
    "lng": 35.7339,
    "type": "governorate",
    "district": "معان",
    "zoom": 11
  },
  {
    "id": "aqaba",
    "name": "العقبة",
    "lat": 29.5321,
    "lng": 35.0063,
    "type": "governorate",
    "district": "العقبة",
    "zoom": 11
  },
  {
    "id": "center_country",
    "name": "وسط البلد",
    "lat": 31.9522,
    "lng": 35.9322,
    "type": "neighborhood",
    "district": "وسط عمان",
    "zoom": 14
  },
  {
    "id": "jabal_al_qalaa",
    "name": "جبل القلعة",
    "lat": 31.9548,
    "lng": 35.9348,
    "type": "landmark",
    "district": "وسط عمان",
    "zoom": 15
  },
  {
    "id": "roman_theater",
    "name": "المدرج الروماني",
    "lat": 31.9515,
    "lng": 35.9392,
    "type": "landmark",
    "district": "وسط عمان",
    "zoom": 15
  },
  {
    "id": "ras_al_ein",
    "name": "رأس العين",
    "lat": 31.9472,
    "lng": 35.9264,
    "type": "neighborhood",
    "district": "وسط عمان",
    "zoom": 14
  },
  {
    "id": "jabal_amman",
    "name": "جبل عمان",
    "lat": 31.968,
    "lng": 35.931,
    "type": "neighborhood",
    "district": "وسط عمان",
    "zoom": 14
  },
  {
    "id": "first_circle",
    "name": "الدوار الأول",
    "lat": 31.9514,
    "lng": 35.9272,
    "type": "landmark",
    "district": "وسط عمان",
    "zoom": 15
  },
  {
    "id": "second_circle",
    "name": "الدوار الثاني",
    "lat": 31.9517,
    "lng": 35.9189,
    "type": "landmark",
    "district": "وسط عمان",
    "zoom": 15
  },
  {
    "id": "third_circle",
    "name": "الدوار الثالث",
    "lat": 31.9519,
    "lng": 35.9117,
    "type": "landmark",
    "district": "وسط عمان",
    "zoom": 15
  },
  {
    "id": "lweibdeh",
    "name": "جبل اللويبدة",
    "lat": 31.971,
    "lng": 35.925,
    "type": "neighborhood",
    "district": "وسط عمان",
    "zoom": 14
  },
  {
    "id": "jabal_al_nazif",
    "name": "جبل النظيف",
    "lat": 31.938,
    "lng": 35.929,
    "type": "neighborhood",
    "district": "وسط عمان",
    "zoom": 14
  },
  {
    "id": "ashrafieh",
    "name": "الأشرفية",
    "lat": 31.965,
    "lng": 35.928,
    "type": "neighborhood",
    "district": "وسط عمان",
    "zoom": 14
  },
  {
    "id": "al_muhajireen",
    "name": "المهاجرين",
    "lat": 31.9422,
    "lng": 35.9222,
    "type": "neighborhood",
    "district": "وسط عمان",
    "zoom": 14
  },
  {
    "id": "jabal_al_joufeh",
    "name": "جبل الجوفة",
    "lat": 31.949,
    "lng": 35.945,
    "type": "neighborhood",
    "district": "وسط عمان",
    "zoom": 14
  },
  {
    "id": "jabal_al_taj",
    "name": "جبل التاج",
    "lat": 31.951,
    "lng": 35.952,
    "type": "neighborhood",
    "district": "وسط عمان",
    "zoom": 14
  },
  {
    "id": "tafayleh",
    "name": "حي الطفايلة",
    "lat": 31.948,
    "lng": 35.948,
    "type": "neighborhood",
    "district": "وسط عمان",
    "zoom": 14
  },
  {
    "id": "hussein_mountain",
    "name": "جبل الحسين",
    "lat": 31.976,
    "lng": 35.92,
    "type": "neighborhood",
    "district": "وسط عمان",
    "zoom": 14
  },
  {
    "id": "abdali",
    "name": "العبدلي",
    "lat": 31.977,
    "lng": 35.932,
    "type": "neighborhood",
    "district": "وسط عمان",
    "zoom": 14
  },
  {
    "id": "abdoun",
    "name": "عبدون",
    "lat": 31.9681,
    "lng": 35.8753,
    "type": "neighborhood",
    "district": "غرب عمان",
    "zoom": 14
  },
  {
    "id": "abdoun_south",
    "name": "عبدون الجنوبي",
    "lat": 31.964,
    "lng": 35.873,
    "type": "neighborhood",
    "district": "غرب عمان",
    "zoom": 15
  },
  {
    "id": "abdoun_north",
    "name": "عبدون الشمالي",
    "lat": 31.972,
    "lng": 35.877,
    "type": "neighborhood",
    "district": "غرب عمان",
    "zoom": 15
  },
  {
    "id": "deir_ghbar",
    "name": "دير غبار",
    "lat": 31.975,
    "lng": 35.881,
    "type": "neighborhood",
    "district": "غرب عمان",
    "zoom": 14
  },
  {
    "id": "umm_uzaina",
    "name": "أم أذينة",
    "lat": 31.964,
    "lng": 35.882,
    "type": "neighborhood",
    "district": "غرب عمان",
    "zoom": 14
  },
  {
    "id": "rabieh",
    "name": "الرابية",
    "lat": 31.985,
    "lng": 35.885,
    "type": "neighborhood",
    "district": "غرب عمان",
    "zoom": 14
  },
  {
    "id": "sweifieh",
    "name": "الصويفية",
    "lat": 31.97,
    "lng": 35.8651,
    "type": "neighborhood",
    "district": "غرب عمان",
    "zoom": 14
  },
  {
    "id": "wadi_saqra",
    "name": "وادي صقرة",
    "lat": 31.961,
    "lng": 35.901,
    "type": "neighborhood",
    "district": "غرب عمان",
    "zoom": 14
  },
  {
    "id": "shmeisani",
    "name": "الشميساني",
    "lat": 31.982,
    "lng": 35.913,
    "type": "neighborhood",
    "district": "غرب عمان",
    "zoom": 14
  },
  {
    "id": "gardens",
    "name": "الجاردنز",
    "lat": 31.986,
    "lng": 35.901,
    "type": "neighborhood",
    "district": "غرب عمان",
    "zoom": 14
  },
  {
    "id": "khalda",
    "name": "خلدا",
    "lat": 31.98,
    "lng": 35.861,
    "type": "neighborhood",
    "district": "غرب عمان",
    "zoom": 14
  },
  {
    "id": "tla_ali",
    "name": "تلاع العلي",
    "lat": 31.992,
    "lng": 35.878,
    "type": "neighborhood",
    "district": "غرب عمان",
    "zoom": 14
  },
  {
    "id": "umm_smaaq",
    "name": "أم السماق",
    "lat": 31.978,
    "lng": 35.872,
    "type": "neighborhood",
    "district": "غرب عمان",
    "zoom": 14
  },
  {
    "id": "medical_city",
    "name": "المدينة الطبية",
    "lat": 31.979,
    "lng": 35.834,
    "type": "landmark",
    "district": "غرب عمان",
    "zoom": 14
  },
  {
    "id": "fourth_circle",
    "name": "الدوار الرابع",
    "lat": 31.952,
    "lng": 35.901,
    "type": "landmark",
    "district": "غرب عمان",
    "zoom": 15
  },
  {
    "id": "fifth_circle",
    "name": "الدوار الخامس",
    "lat": 31.9522,
    "lng": 35.889,
    "type": "landmark",
    "district": "غرب عمان",
    "zoom": 15
  },
  {
    "id": "sixth_circle",
    "name": "الدوار السادس",
    "lat": 31.954,
    "lng": 35.869,
    "type": "landmark",
    "district": "غرب عمان",
    "zoom": 15
  },
  {
    "id": "seventh_circle",
    "name": "الدوار السابع",
    "lat": 31.983,
    "lng": 35.878,
    "type": "landmark",
    "district": "غرب عمان",
    "zoom": 15
  },
  {
    "id": "eighth_circle",
    "name": "الدوار الثامن",
    "lat": 31.988,
    "lng": 35.869,
    "type": "landmark",
    "district": "غرب عمان",
    "zoom": 15
  },
  {
    "id": "mouj_makkah",
    "name": "شارع مكة",
    "lat": 31.978,
    "lng": 35.85,
    "type": "neighborhood",
    "district": "غرب عمان",
    "zoom": 14
  },
  {
    "id": "madinah_monawarah",
    "name": "شارع المدينة المنورة",
    "lat": 31.985,
    "lng": 35.875,
    "type": "neighborhood",
    "district": "غرب عمان",
    "zoom": 14
  },
  {
    "id": "dabouq",
    "name": "دابوق",
    "lat": 32.01,
    "lng": 35.838,
    "type": "neighborhood",
    "district": "غرب عمان",
    "zoom": 14
  },
  {
    "id": "wadi_sir",
    "name": "وادي السير",
    "lat": 31.955,
    "lng": 35.838,
    "type": "neighborhood",
    "district": "غرب عمان",
    "zoom": 13
  },
  {
    "id": "sweileh",
    "name": "صويلح",
    "lat": 32.0222,
    "lng": 35.8444,
    "type": "city",
    "district": "شمال عمان",
    "zoom": 13
  },
  {
    "id": "jubaiha",
    "name": "الجبيهة",
    "lat": 32.015,
    "lng": 35.875,
    "type": "neighborhood",
    "district": "شمال عمان",
    "zoom": 14
  },
  {
    "id": "jubaiha_mansour",
    "name": "جبيهة حي المنصور",
    "lat": 32.012,
    "lng": 35.878,
    "type": "neighborhood",
    "district": "شمال عمان",
    "zoom": 15
  },
  {
    "id": "jubaiha_rayan",
    "name": "جبيهة حي الريان",
    "lat": 32.018,
    "lng": 35.872,
    "type": "neighborhood",
    "district": "شمال عمان",
    "zoom": 15
  },
  {
    "id": "rashid_suburb",
    "name": "ضاحية الرشيد",
    "lat": 32.018,
    "lng": 35.908,
    "type": "neighborhood",
    "district": "شمال عمان",
    "zoom": 14
  },
  {
    "id": "prince_rashid",
    "name": "ضاحية الأمير راشد",
    "lat": 32.022,
    "lng": 35.91,
    "type": "neighborhood",
    "district": "شمال عمان",
    "zoom": 14
  },
  {
    "id": "shfabadran",
    "name": "شفابدران",
    "lat": 32.028,
    "lng": 35.862,
    "type": "neighborhood",
    "district": "شمال عمان",
    "zoom": 14
  },
  {
    "id": "shfabadran_mraj",
    "name": "شفابدران مرج الفرس",
    "lat": 32.035,
    "lng": 35.858,
    "type": "neighborhood",
    "district": "شمال عمان",
    "zoom": 15
  },
  {
    "id": "shfabadran_rkhsa",
    "name": "شفابدران حي الترخيص",
    "lat": 32.023,
    "lng": 35.865,
    "type": "neighborhood",
    "district": "شمال عمان",
    "zoom": 15
  },
  {
    "id": "shfabadran_rafat",
    "name": "شفابدران شارع رفعت",
    "lat": 32.03,
    "lng": 35.87,
    "type": "neighborhood",
    "district": "شمال عمان",
    "zoom": 15
  },
  {
    "id": "abu_nsair",
    "name": "أبو نصير",
    "lat": 32.035,
    "lng": 35.895,
    "type": "neighborhood",
    "district": "شمال عمان",
    "zoom": 14
  },
  {
    "id": "abu_nsair_old_housing",
    "name": "إسكان أبو نصير القديم",
    "lat": 32.033,
    "lng": 35.898,
    "type": "neighborhood",
    "district": "شمال عمان",
    "zoom": 15
  },
  {
    "id": "tabarbour",
    "name": "طبربور",
    "lat": 32.045,
    "lng": 35.93,
    "type": "neighborhood",
    "district": "شمال عمان",
    "zoom": 14
  },
  {
    "id": "tariq",
    "name": "طارق",
    "lat": 31.978,
    "lng": 35.93,
    "type": "neighborhood",
    "district": "شمال عمان",
    "zoom": 14
  },
  {
    "id": "jandaweel",
    "name": "الجندويل",
    "lat": 31.952,
    "lng": 35.895,
    "type": "neighborhood",
    "district": "شمال عمان",
    "zoom": 14
  },
  {
    "id": "jandaweel_low",
    "name": "الجندويل المنخفض",
    "lat": 31.949,
    "lng": 35.893,
    "type": "neighborhood",
    "district": "شمال عمان",
    "zoom": 15
  },
  {
    "id": "jandaweel_high",
    "name": "الجندويل المرتفع",
    "lat": 31.955,
    "lng": 35.897,
    "type": "neighborhood",
    "district": "شمال عمان",
    "zoom": 15
  },
  {
    "id": "kamaliyah",
    "name": "الكمالية",
    "lat": 32.015,
    "lng": 35.815,
    "type": "neighborhood",
    "district": "شمال عمان",
    "zoom": 14
  },
  {
    "id": "yajouz_area",
    "name": "ياجوز",
    "lat": 32.025,
    "lng": 35.96,
    "type": "neighborhood",
    "district": "شمال عمان",
    "zoom": 13
  },
  {
    "id": "umm_rummanah",
    "name": "أم رمانة",
    "lat": 32.14,
    "lng": 35.85,
    "type": "neighborhood",
    "district": "شمال عمان",
    "zoom": 14
  },
  {
    "id": "mraj_fras",
    "name": "مرج الفرس",
    "lat": 32.045,
    "lng": 35.85,
    "type": "neighborhood",
    "district": "شمال عمان",
    "zoom": 14
  },
  {
    "id": "nozha",
    "name": "النزهة",
    "lat": 31.978,
    "lng": 35.945,
    "type": "neighborhood",
    "district": "شرق عمان",
    "zoom": 14
  },
  {
    "id": "jabal_nozha",
    "name": "جبل النزهة",
    "lat": 31.978,
    "lng": 35.945,
    "type": "neighborhood",
    "district": "شرق عمان",
    "zoom": 14
  },
  {
    "id": "marka",
    "name": "ماركا",
    "lat": 31.995,
    "lng": 35.965,
    "type": "neighborhood",
    "district": "شرق عمان",
    "zoom": 14
  },
  {
    "id": "marka_north",
    "name": "ماركا الشمالية",
    "lat": 32,
    "lng": 35.97,
    "type": "neighborhood",
    "district": "شرق عمان",
    "zoom": 14
  },
  {
    "id": "marka_south",
    "name": "ماركا الجنوبية",
    "lat": 31.99,
    "lng": 35.962,
    "type": "neighborhood",
    "district": "شرق عمان",
    "zoom": 14
  },
  {
    "id": "hashemi_north",
    "name": "الهاشمي الشمالي",
    "lat": 31.97,
    "lng": 35.955,
    "type": "neighborhood",
    "district": "شرق عمان",
    "zoom": 14
  },
  {
    "id": "hashemi_south",
    "name": "الهاشمي الجنوبي",
    "lat": 31.96,
    "lng": 35.955,
    "type": "neighborhood",
    "district": "شرق عمان",
    "zoom": 14
  },
  {
    "id": "wahadat",
    "name": "الوحدات",
    "lat": 31.93,
    "lng": 35.938,
    "type": "neighborhood",
    "district": "شرق عمان",
    "zoom": 14
  },
  {
    "id": "nasr",
    "name": "النصر",
    "lat": 31.958,
    "lng": 35.98,
    "type": "neighborhood",
    "district": "شرق عمان",
    "zoom": 14
  },
  {
    "id": "qwismeh",
    "name": "القويسمة",
    "lat": 31.95,
    "lng": 35.975,
    "type": "neighborhood",
    "district": "شرق عمان",
    "zoom": 13
  },
  {
    "id": "manara",
    "name": "المنارة",
    "lat": 31.985,
    "lng": 35.93,
    "type": "neighborhood",
    "district": "شرق عمان",
    "zoom": 14
  },
  {
    "id": "ruwaq",
    "name": "حي الرواق",
    "lat": 31.99,
    "lng": 35.99,
    "type": "neighborhood",
    "district": "شرق عمان",
    "zoom": 14
  },
  {
    "id": "mahattan",
    "name": "المحطة",
    "lat": 31.96,
    "lng": 35.94,
    "type": "neighborhood",
    "district": "شرق عمان",
    "zoom": 14
  },
  {
    "id": "mohammadiyah",
    "name": "المحمدية",
    "lat": 31.995,
    "lng": 35.815,
    "type": "neighborhood",
    "district": "شرق عمان",
    "zoom": 14
  },
  {
    "id": "alkoom",
    "name": "الكوم",
    "lat": 31.97,
    "lng": 35.958,
    "type": "neighborhood",
    "district": "شرق عمان",
    "zoom": 14
  },
  {
    "id": "alkoom_darak",
    "name": "الكوم حول الدرك",
    "lat": 31.968,
    "lng": 35.956,
    "type": "neighborhood",
    "district": "شرق عمان",
    "zoom": 15
  },
  {
    "id": "aqsa_suburb",
    "name": "ضاحية الأقصى",
    "lat": 32.04,
    "lng": 35.9,
    "type": "neighborhood",
    "district": "شرق عمان",
    "zoom": 14
  },
  {
    "id": "feiha",
    "name": "الفيحاء",
    "lat": 31.975,
    "lng": 35.935,
    "type": "neighborhood",
    "district": "شرق عمان",
    "zoom": 14
  },
  {
    "id": "zuhor",
    "name": "الزهور",
    "lat": 31.984,
    "lng": 35.925,
    "type": "neighborhood",
    "district": "شرق عمان",
    "zoom": 14
  },
  {
    "id": "akhdar",
    "name": "الأخضر",
    "lat": 31.99,
    "lng": 35.94,
    "type": "neighborhood",
    "district": "شرق عمان",
    "zoom": 14
  },
  {
    "id": "umm_nwara",
    "name": "أم نوارة",
    "lat": 31.91,
    "lng": 35.92,
    "type": "neighborhood",
    "district": "شرق عمان",
    "zoom": 14
  },
  {
    "id": "alkumiya",
    "name": "العلكومية",
    "lat": 31.935,
    "lng": 35.955,
    "type": "neighborhood",
    "district": "شرق عمان",
    "zoom": 14
  },
  {
    "id": "yadoudeh",
    "name": "اليادودة",
    "lat": 31.89,
    "lng": 35.92,
    "type": "neighborhood",
    "district": "جنوب عمان",
    "zoom": 13
  },
  {
    "id": "naour",
    "name": "ناعور",
    "lat": 31.8833,
    "lng": 35.7833,
    "type": "city",
    "district": "جنوب عمان",
    "zoom": 13
  },
  {
    "id": "umm_basateen",
    "name": "أم البساتين",
    "lat": 31.86,
    "lng": 35.81,
    "type": "neighborhood",
    "district": "جنوب عمان",
    "zoom": 14
  },
  {
    "id": "wadi_sir_south",
    "name": "وادي السير الجنوبي",
    "lat": 31.94,
    "lng": 35.81,
    "type": "neighborhood",
    "district": "جنوب عمان",
    "zoom": 14
  },
  {
    "id": "mootah",
    "name": "مؤتة",
    "lat": 31.93,
    "lng": 35.91,
    "type": "neighborhood",
    "district": "جنوب عمان",
    "zoom": 14
  },
  {
    "id": "qastal",
    "name": "القسطل",
    "lat": 31.745,
    "lng": 35.945,
    "type": "neighborhood",
    "district": "جنوب عمان",
    "zoom": 13
  },
  {
    "id": "airport",
    "name": "مطار الملكة علياء",
    "lat": 31.7225,
    "lng": 35.9933,
    "type": "landmark",
    "district": "جنوب عمان",
    "zoom": 12
  },
  {
    "id": "hesban",
    "name": "حسبان",
    "lat": 31.85,
    "lng": 35.88,
    "type": "city",
    "district": "جنوب عمان",
    "zoom": 13
  },
  {
    "id": "buniyet",
    "name": "البنيات",
    "lat": 31.93,
    "lng": 35.8,
    "type": "neighborhood",
    "district": "جنوب عمان",
    "zoom": 14
  },
  {
    "id": "mraj_hamam",
    "name": "مرج الحمام",
    "lat": 31.94,
    "lng": 35.82,
    "type": "neighborhood",
    "district": "جنوب عمان",
    "zoom": 14
  },
  {
    "id": "mouj_hamam",
    "name": "موج الحمام",
    "lat": 31.94,
    "lng": 35.82,
    "type": "neighborhood",
    "district": "جنوب عمان",
    "zoom": 14
  },
  {
    "id": "maeen_road",
    "name": "طريق ماعين",
    "lat": 31.68,
    "lng": 35.75,
    "type": "neighborhood",
    "district": "جنوب عمان",
    "zoom": 14
  },
  {
    "id": "hanayna",
    "name": "حنينا الانسيابي",
    "lat": 31.72,
    "lng": 35.8,
    "type": "neighborhood",
    "district": "جنوب عمان",
    "zoom": 14
  },
  {
    "id": "jaloul",
    "name": "جلول",
    "lat": 31.7,
    "lng": 35.86,
    "type": "neighborhood",
    "district": "جنوب عمان",
    "zoom": 14
  },
  {
    "id": "abu_alanda",
    "name": "أبو علندا",
    "lat": 31.92,
    "lng": 35.97,
    "type": "neighborhood",
    "district": "جنوب شرق عمان",
    "zoom": 14
  },
  {
    "id": "khreibet_souq",
    "name": "خريبة السوق",
    "lat": 31.94,
    "lng": 36.02,
    "type": "neighborhood",
    "district": "جنوب شرق عمان",
    "zoom": 14
  },
  {
    "id": "sahab",
    "name": "سحاب",
    "lat": 31.87,
    "lng": 36.05,
    "type": "city",
    "district": "جنوب شرق عمان",
    "zoom": 13
  },
  {
    "id": "muwaqar",
    "name": "الموقر",
    "lat": 31.815,
    "lng": 36.105,
    "type": "city",
    "district": "جنوب شرق عمان",
    "zoom": 13
  },
  {
    "id": "jiza",
    "name": "الجيزة",
    "lat": 31.7,
    "lng": 35.95,
    "type": "city",
    "district": "جنوب شرق عمان",
    "zoom": 13
  },
  {
    "id": "rajeeb",
    "name": "الرجيب",
    "lat": 31.915,
    "lng": 36.002,
    "type": "neighborhood",
    "district": "جنوب شرق عمان",
    "zoom": 14
  },
  {
    "id": "umm_rasas",
    "name": "أم الرصاص",
    "lat": 31.5,
    "lng": 35.91,
    "type": "city",
    "district": "جنوب شرق عمان",
    "zoom": 13
  },
  {
    "id": "jawa",
    "name": "جاوا",
    "lat": 31.89,
    "lng": 36.03,
    "type": "city",
    "district": "جنوب شرق عمان",
    "zoom": 13
  },
  {
    "id": "jweida",
    "name": "الجويدة",
    "lat": 31.91,
    "lng": 36,
    "type": "neighborhood",
    "district": "جنوب شرق عمان",
    "zoom": 13
  },
  {
    "id": "ain_basha",
    "name": "عين الباشا",
    "lat": 32.065,
    "lng": 35.755,
    "type": "district",
    "district": "عين الباشا",
    "zoom": 13
  },
  {
    "id": "ain_basha_urban_dev",
    "name": "التطوير الحضري",
    "lat": 32.072,
    "lng": 35.748,
    "type": "neighborhood",
    "district": "عين الباشا",
    "zoom": 14
  },
  {
    "id": "ain_basha_iskan_qaqish",
    "name": "اسكان قاقيش",
    "lat": 32.068,
    "lng": 35.742,
    "type": "housing",
    "district": "عين الباشا",
    "zoom": 14
  },
  {
    "id": "ain_basha_abu_rawwa",
    "name": "ابو رواع",
    "lat": 32.058,
    "lng": 35.76,
    "type": "neighborhood",
    "district": "عين الباشا",
    "zoom": 14
  },
  {
    "id": "ain_basha_umm_safatin",
    "name": "ام صفاتين",
    "lat": 32.062,
    "lng": 35.765,
    "type": "neighborhood",
    "district": "عين الباشا",
    "zoom": 14
  },
  {
    "id": "ain_basha_prince_ali",
    "name": "حي الامير علي",
    "lat": 32.07,
    "lng": 35.755,
    "type": "neighborhood",
    "district": "عين الباشا",
    "zoom": 14
  },
  {
    "id": "ain_basha_umm_aliqah",
    "name": "ام عليقة",
    "lat": 32.066,
    "lng": 35.751,
    "type": "neighborhood",
    "district": "عين الباشا",
    "zoom": 14
  },
  {
    "id": "ain_basha_mobas",
    "name": "موبص",
    "lat": 32.06,
    "lng": 35.749,
    "type": "neighborhood",
    "district": "عين الباشا",
    "zoom": 14
  },
  {
    "id": "sulayhi",
    "name": "السليحي",
    "lat": 32.045,
    "lng": 35.955,
    "type": "neighborhood",
    "district": "شمال عمان",
    "zoom": 14
  },
  {
    "id": "juaydidat",
    "name": "الجعيديدة",
    "lat": 32.06,
    "lng": 35.962,
    "type": "neighborhood",
    "district": "شمال عمان",
    "zoom": 14
  },
  {
    "id": "hanw",
    "name": "الحنو",
    "lat": 32.05,
    "lng": 35.97,
    "type": "neighborhood",
    "district": "شمال عمان",
    "zoom": 14
  },
  {
    "id": "rumman",
    "name": "الرمان",
    "lat": 32.075,
    "lng": 35.968,
    "type": "neighborhood",
    "district": "شمال عمان",
    "zoom": 14
  },
  {
    "id": "baqa",
    "name": "البقعة",
    "lat": 32.025,
    "lng": 35.745,
    "type": "neighborhood",
    "district": "البلقاء",
    "zoom": 13
  },
  {
    "id": "baqa_nablus",
    "name": "نابلس البقعة",
    "lat": 32.028,
    "lng": 35.74,
    "type": "neighborhood",
    "district": "البلقاء",
    "zoom": 14
  },
  {
    "id": "zarqa_city",
    "name": "مدينة الزرقاء",
    "lat": 32.0728,
    "lng": 36.088,
    "type": "city",
    "district": "الزرقاء",
    "zoom": 13
  },
  {
    "id": "rusaifa",
    "name": "الرصيفة",
    "lat": 32.0333,
    "lng": 36.05,
    "type": "city",
    "district": "الزرقاء",
    "zoom": 13
  },
  {
    "id": "zarqa_new",
    "name": "الزرقاء الجديدة",
    "lat": 32.085,
    "lng": 36.078,
    "type": "neighborhood",
    "district": "الزرقاء",
    "zoom": 14
  },
  {
    "id": "zarqa_balad",
    "name": "الزرقاء البلد",
    "lat": 32.071,
    "lng": 36.085,
    "type": "neighborhood",
    "district": "الزرقاء",
    "zoom": 14
  },
  {
    "id": "prince_hasan_zarqa",
    "name": "حي الأمير حسن",
    "lat": 32.062,
    "lng": 36.095,
    "type": "neighborhood",
    "district": "الزرقاء",
    "zoom": 14
  },
  {
    "id": "masoom",
    "name": "حي معصوم",
    "lat": 32.078,
    "lng": 36.095,
    "type": "neighborhood",
    "district": "الزرقاء",
    "zoom": 14
  },
  {
    "id": "prince_mohammad",
    "name": "حي الأمير محمد",
    "lat": 32.085,
    "lng": 36.092,
    "type": "neighborhood",
    "district": "الزرقاء",
    "zoom": 14
  },
  {
    "id": "jabal_abyad",
    "name": "حي الجبل الأبيض",
    "lat": 32.068,
    "lng": 36.068,
    "type": "neighborhood",
    "district": "الزرقاء",
    "zoom": 14
  },
  {
    "id": "ramzi",
    "name": "حي رمزي",
    "lat": 32.078,
    "lng": 36.082,
    "type": "neighborhood",
    "district": "الزرقاء",
    "zoom": 14
  },
  {
    "id": "zawahreh",
    "name": "حي الزواهرة",
    "lat": 32.065,
    "lng": 36.042,
    "type": "neighborhood",
    "district": "الزرقاء",
    "zoom": 14
  },
  {
    "id": "ghweiriyah",
    "name": "حي الغويرية",
    "lat": 32.072,
    "lng": 36.102,
    "type": "neighborhood",
    "district": "الزرقاء",
    "zoom": 14
  },
  {
    "id": "hussein_zarqa",
    "name": "حي الحسين",
    "lat": 32.081,
    "lng": 36.065,
    "type": "neighborhood",
    "district": "الزرقاء",
    "zoom": 14
  },
  {
    "id": "iskan_zarqa",
    "name": "حي الإسكان",
    "lat": 32.058,
    "lng": 36.082,
    "type": "neighborhood",
    "district": "الزرقاء",
    "zoom": 14
  },
  {
    "id": "prince_ali_zarqa",
    "name": "حي الأمير علي",
    "lat": 32.052,
    "lng": 36.062,
    "type": "neighborhood",
    "district": "الزرقاء",
    "zoom": 14
  },
  {
    "id": "rasheed_zarqa",
    "name": "حي الرشيد",
    "lat": 32.045,
    "lng": 36.058,
    "type": "neighborhood",
    "district": "الزرقاء",
    "zoom": 14
  },
  {
    "id": "tariq_zarqa",
    "name": "حي طارق",
    "lat": 32.052,
    "lng": 36.072,
    "type": "neighborhood",
    "district": "الزرقاء",
    "zoom": 14
  },
  {
    "id": "nozha_zarqa",
    "name": "حي النزهة",
    "lat": 32.082,
    "lng": 36.088,
    "type": "neighborhood",
    "district": "الزرقاء",
    "zoom": 14
  },
  {
    "id": "hashemiyeh",
    "name": "الهاشمية",
    "lat": 32.131,
    "lng": 36.108,
    "type": "city",
    "district": "الزرقاء",
    "zoom": 13
  },
  {
    "id": "prince_hamzah",
    "name": "حي الأمير حمزة",
    "lat": 32.128,
    "lng": 36.115,
    "type": "neighborhood",
    "district": "الزرقاء",
    "zoom": 14
  },
  {
    "id": "sukhneh",
    "name": "قرية السخنة",
    "lat": 32.152,
    "lng": 36.095,
    "type": "village",
    "district": "الزرقاء",
    "zoom": 13
  },
  {
    "id": "azraq_north",
    "name": "الأزرق الشمالي",
    "lat": 31.882,
    "lng": 36.822,
    "type": "neighborhood",
    "district": "الزرقاء",
    "zoom": 13
  },
  {
    "id": "azraq_south",
    "name": "الأزرق الجنوبي",
    "lat": 31.831,
    "lng": 36.818,
    "type": "neighborhood",
    "district": "الزرقاء",
    "zoom": 13
  },
  {
    "id": "azraq_reserve",
    "name": "محمية الأزرق",
    "lat": 31.836,
    "lng": 36.824,
    "type": "landmark",
    "district": "الزرقاء",
    "zoom": 14
  },
  {
    "id": "prince_hasan_rusaifa",
    "name": "حي الأمير حسن الرصيفة",
    "lat": 32.031,
    "lng": 36.042,
    "type": "neighborhood",
    "district": "الزرقاء",
    "zoom": 14
  },
  {
    "id": "ameriyah",
    "name": "حي العامرية",
    "lat": 32.022,
    "lng": 36.028,
    "type": "neighborhood",
    "district": "الزرقاء",
    "zoom": 14
  },
  {
    "id": "mushairfeh",
    "name": "حي المشيرفة",
    "lat": 32.028,
    "lng": 36.035,
    "type": "neighborhood",
    "district": "الزرقاء",
    "zoom": 14
  },
  {
    "id": "qadisiyah_rusaifa",
    "name": "حي القادسية",
    "lat": 32.012,
    "lng": 36.012,
    "type": "neighborhood",
    "district": "الزرقاء",
    "zoom": 14
  },
  {
    "id": "salt",
    "name": "السلط",
    "lat": 32.0344,
    "lng": 35.7267,
    "type": "city",
    "district": "البلقاء",
    "zoom": 13
  },
  {
    "id": "salt_old",
    "name": "السلط القديمة",
    "lat": 32.038,
    "lng": 35.728,
    "type": "neighborhood",
    "district": "البلقاء",
    "zoom": 14
  },
  {
    "id": "wadi_akrad",
    "name": "وادي الأكراد",
    "lat": 32.035,
    "lng": 35.722,
    "type": "neighborhood",
    "district": "البلقاء",
    "zoom": 14
  },
  {
    "id": "jadaa",
    "name": "الجدعة",
    "lat": 32.041,
    "lng": 35.731,
    "type": "neighborhood",
    "district": "البلقاء",
    "zoom": 14
  },
  {
    "id": "salalem",
    "name": "السلالم",
    "lat": 32.028,
    "lng": 35.718,
    "type": "neighborhood",
    "district": "البلقاء",
    "zoom": 14
  },
  {
    "id": "sawaniyeh",
    "name": "الصوانية",
    "lat": 32.046,
    "lng": 35.719,
    "type": "neighborhood",
    "district": "البلقاء",
    "zoom": 14
  },
  {
    "id": "batna",
    "name": "بطنا",
    "lat": 32.008,
    "lng": 35.735,
    "type": "village",
    "district": "البلقاء",
    "zoom": 13
  },
  {
    "id": "sarou",
    "name": "السرو",
    "lat": 32.058,
    "lng": 35.768,
    "type": "neighborhood",
    "district": "البلقاء",
    "zoom": 13
  },
  {
    "id": "zei",
    "name": "زي",
    "lat": 32.091,
    "lng": 35.712,
    "type": "village",
    "district": "البلقاء",
    "zoom": 13
  },
  {
    "id": "fuheis",
    "name": "الفحيص",
    "lat": 32.015,
    "lng": 35.782,
    "type": "city",
    "district": "البلقاء",
    "zoom": 13
  },
  {
    "id": "baqa_fuheis",
    "name": "حي البقعة الفحيص",
    "lat": 32.008,
    "lng": 35.785,
    "type": "neighborhood",
    "district": "البلقاء",
    "zoom": 14
  },
  {
    "id": "mahass",
    "name": "ماحص",
    "lat": 31.988,
    "lng": 35.772,
    "type": "city",
    "district": "البلقاء",
    "zoom": 13
  },
  {
    "id": "shouneh_south",
    "name": "الشونة الجنوبية",
    "lat": 31.892,
    "lng": 35.615,
    "type": "city",
    "district": "البلقاء",
    "zoom": 13
  },
  {
    "id": "karameh",
    "name": "الكرامة",
    "lat": 31.952,
    "lng": 35.592,
    "type": "village",
    "district": "البلقاء",
    "zoom": 13
  },
  {
    "id": "kafrein",
    "name": "الكفرين",
    "lat": 31.862,
    "lng": 35.631,
    "type": "village",
    "district": "البلقاء",
    "zoom": 13
  },
  {
    "id": "deir_alla",
    "name": "دير علا",
    "lat": 32.198,
    "lng": 35.624,
    "type": "city",
    "district": "البلقاء",
    "zoom": 13
  },
  {
    "id": "twal_south",
    "name": "الطوال الجنوبي",
    "lat": 32.158,
    "lng": 35.612,
    "type": "village",
    "district": "البلقاء",
    "zoom": 14
  },
  {
    "id": "twal_north",
    "name": "الطوال الشمالي",
    "lat": 32.222,
    "lng": 35.628,
    "type": "village",
    "district": "البلقاء",
    "zoom": 14
  },
  {
    "id": "madaba_city",
    "name": "مدينة مادبا",
    "lat": 31.7167,
    "lng": 35.7944,
    "type": "city",
    "district": "مادبا",
    "zoom": 13
  },
  {
    "id": "madaba_balad",
    "name": "مادبا البلد",
    "lat": 31.716,
    "lng": 35.792,
    "type": "neighborhood",
    "district": "مادبا",
    "zoom": 14
  },
  {
    "id": "faysaliyah",
    "name": "حي الفيصلية",
    "lat": 31.758,
    "lng": 35.762,
    "type": "neighborhood",
    "district": "مادبا",
    "zoom": 13
  },
  {
    "id": "mamouniyah",
    "name": "حي المأمونية",
    "lat": 31.728,
    "lng": 35.812,
    "type": "neighborhood",
    "district": "مادبا",
    "zoom": 13
  },
  {
    "id": "salaam_madaba",
    "name": "حي السلام",
    "lat": 31.711,
    "lng": 35.778,
    "type": "neighborhood",
    "district": "مادبا",
    "zoom": 14
  },
  {
    "id": "khattabiyah",
    "name": "حي الخطابية",
    "lat": 31.692,
    "lng": 35.818,
    "type": "neighborhood",
    "district": "مادبا",
    "zoom": 13
  },
  {
    "id": "buniyet_madaba",
    "name": "حي البنيات مادبا",
    "lat": 31.705,
    "lng": 35.795,
    "type": "neighborhood",
    "district": "مادبا",
    "zoom": 14
  },
  {
    "id": "dhiban",
    "name": "ذيبان",
    "lat": 31.522,
    "lng": 35.788,
    "type": "city",
    "district": "مادبا",
    "zoom": 13
  },
  {
    "id": "mleeh",
    "name": "مليح",
    "lat": 31.572,
    "lng": 35.795,
    "type": "village",
    "district": "مادبا",
    "zoom": 13
  },
  {
    "id": "libb",
    "name": "لب",
    "lat": 31.618,
    "lng": 35.791,
    "type": "village",
    "district": "مادبا",
    "zoom": 13
  },
  {
    "id": "maeen",
    "name": "ماعين",
    "lat": 31.682,
    "lng": 35.731,
    "type": "city",
    "district": "مادبا",
    "zoom": 13
  },
  {
    "id": "hamamat_maeen",
    "name": "حمامات ماعين",
    "lat": 31.583,
    "lng": 35.612,
    "type": "landmark",
    "district": "مادبا",
    "zoom": 13
  },
  {
    "id": "irbid_city",
    "name": "مدينة إربد",
    "lat": 32.5556,
    "lng": 35.85,
    "type": "city",
    "district": "إربد",
    "zoom": 13
  },
  {
    "id": "ramtha",
    "name": "الرمثا",
    "lat": 32.5667,
    "lng": 36,
    "type": "city",
    "district": "إربد",
    "zoom": 13
  },
  {
    "id": "irbid_balad",
    "name": "إربد البلد",
    "lat": 32.553,
    "lng": 35.848,
    "type": "neighborhood",
    "district": "إربد",
    "zoom": 14
  },
  {
    "id": "east_irbid",
    "name": "الحي الشرقي إربد",
    "lat": 32.551,
    "lng": 35.862,
    "type": "neighborhood",
    "district": "إربد",
    "zoom": 14
  },
  {
    "id": "north_irbid",
    "name": "الحي الشمالي إربد",
    "lat": 32.565,
    "lng": 35.852,
    "type": "neighborhood",
    "district": "إربد",
    "zoom": 14
  },
  {
    "id": "south_irbid",
    "name": "الحي الجنوبي إربد",
    "lat": 32.541,
    "lng": 35.842,
    "type": "neighborhood",
    "district": "إربد",
    "zoom": 14
  },
  {
    "id": "west_irbid",
    "name": "الحي الغربي إربد",
    "lat": 32.552,
    "lng": 35.832,
    "type": "neighborhood",
    "district": "إربد",
    "zoom": 14
  },
  {
    "id": "university_street",
    "name": "شارع الجامعة إربد",
    "lat": 32.545,
    "lng": 35.851,
    "type": "neighborhood",
    "district": "إربد",
    "zoom": 14
  },
  {
    "id": "yarmouk_univ",
    "name": "منطقة جامعة اليرموك",
    "lat": 32.542,
    "lng": 35.852,
    "type": "landmark",
    "district": "إربد",
    "zoom": 14
  },
  {
    "id": "husn",
    "name": "الحصن",
    "lat": 32.482,
    "lng": 35.885,
    "type": "city",
    "district": "إربد",
    "zoom": 13
  },
  {
    "id": "nuaimah",
    "name": "النعيمة",
    "lat": 32.435,
    "lng": 35.918,
    "type": "city",
    "district": "إربد",
    "zoom": 13
  },
  {
    "id": "bushra",
    "name": "بشرى",
    "lat": 32.562,
    "lng": 35.901,
    "type": "city",
    "district": "إربد",
    "zoom": 13
  },
  {
    "id": "huwarah",
    "name": "حوارة",
    "lat": 32.535,
    "lng": 35.912,
    "type": "city",
    "district": "إربد",
    "zoom": 13
  },
  {
    "id": "kafr_yuba",
    "name": "كفر يوبا",
    "lat": 32.542,
    "lng": 35.795,
    "type": "city",
    "district": "إربد",
    "zoom": 13
  },
  {
    "id": "beit_ras",
    "name": "بيت راس",
    "lat": 32.595,
    "lng": 35.852,
    "type": "city",
    "district": "إربد",
    "zoom": 13
  },
  {
    "id": "saal",
    "name": "سال",
    "lat": 32.578,
    "lng": 35.918,
    "type": "city",
    "district": "إربد",
    "zoom": 13
  },
  {
    "id": "torrah",
    "name": "الطرة",
    "lat": 32.628,
    "lng": 35.998,
    "type": "city",
    "district": "إربد",
    "zoom": 13
  },
  {
    "id": "shajarah",
    "name": "الشجرة",
    "lat": 32.615,
    "lng": 35.952,
    "type": "city",
    "district": "إربد",
    "zoom": 13
  },
  {
    "id": "amrawah",
    "name": "عمراوة",
    "lat": 32.625,
    "lng": 35.922,
    "type": "village",
    "district": "إربد",
    "zoom": 13
  },
  {
    "id": "bweidah",
    "name": "البويضة",
    "lat": 32.518,
    "lng": 35.992,
    "type": "village",
    "district": "إربد",
    "zoom": 13
  },
  {
    "id": "aydoun",
    "name": "إيدون",
    "lat": 32.515,
    "lng": 35.855,
    "type": "city",
    "district": "إربد",
    "zoom": 13
  },
  {
    "id": "sareeh",
    "name": "الصريح",
    "lat": 32.512,
    "lng": 35.892,
    "type": "city",
    "district": "إربد",
    "zoom": 13
  },
  {
    "id": "shouneh_north",
    "name": "الشونة الشمالية",
    "lat": 32.605,
    "lng": 35.612,
    "type": "city",
    "district": "إربد",
    "zoom": 13
  },
  {
    "id": "mashari",
    "name": "المشارع",
    "lat": 32.445,
    "lng": 35.598,
    "type": "city",
    "district": "إربد",
    "zoom": 13
  },
  {
    "id": "wadi_rayan",
    "name": "وادي الريان",
    "lat": 32.408,
    "lng": 35.602,
    "type": "landmark",
    "district": "إربد",
    "zoom": 13
  },
  {
    "id": "waqas",
    "name": "وقاص",
    "lat": 32.531,
    "lng": 35.605,
    "type": "village",
    "district": "إربد",
    "zoom": 13
  },
  {
    "id": "kureimeh",
    "name": "كريمة",
    "lat": 32.285,
    "lng": 35.615,
    "type": "village",
    "district": "إربد",
    "zoom": 13
  },
  {
    "id": "deir_abi_said",
    "name": "دير أبي سعيد",
    "lat": 32.502,
    "lng": 35.688,
    "type": "city",
    "district": "إربد",
    "zoom": 13
  },
  {
    "id": "judeita",
    "name": "جديتا",
    "lat": 32.428,
    "lng": 35.672,
    "type": "city",
    "district": "إربد",
    "zoom": 13
  },
  {
    "id": "kafr_el_ma",
    "name": "كفر الماء",
    "lat": 32.485,
    "lng": 35.682,
    "type": "city",
    "district": "إربد",
    "zoom": 13
  },
  {
    "id": "tibneh",
    "name": "تبنة",
    "lat": 32.468,
    "lng": 35.702,
    "type": "city",
    "district": "إربد",
    "zoom": 13
  },
  {
    "id": "samou",
    "name": "سموع",
    "lat": 32.515,
    "lng": 35.718,
    "type": "city",
    "district": "إربد",
    "zoom": 13
  },
  {
    "id": "mafraq_city",
    "name": "مدينة المفرق",
    "lat": 32.3417,
    "lng": 36.2,
    "type": "city",
    "district": "المفرق",
    "zoom": 13
  },
  {
    "id": "mafraq_balad",
    "name": "المفرق البلد",
    "lat": 32.342,
    "lng": 36.205,
    "type": "neighborhood",
    "district": "المفرق",
    "zoom": 14
  },
  {
    "id": "hussein_mafraq",
    "name": "حي الحسين المفرق",
    "lat": 32.351,
    "lng": 36.195,
    "type": "neighborhood",
    "district": "المفرق",
    "zoom": 14
  },
  {
    "id": "prince_hasan_mafraq",
    "name": "حي الأمير حسن المفرق",
    "lat": 32.332,
    "lng": 36.218,
    "type": "neighborhood",
    "district": "المفرق",
    "zoom": 14
  },
  {
    "id": "univ_mafraq",
    "name": "حي الجامعة المفرق",
    "lat": 32.338,
    "lng": 36.232,
    "type": "neighborhood",
    "district": "المفرق",
    "zoom": 14
  },
  {
    "id": "rehab",
    "name": "رحاب",
    "lat": 32.312,
    "lng": 36.082,
    "type": "city",
    "district": "المفرق",
    "zoom": 13
  },
  {
    "id": "blama",
    "name": "بلعما",
    "lat": 32.185,
    "lng": 36.128,
    "type": "city",
    "district": "المفرق",
    "zoom": 13
  },
  {
    "id": "manshieh_bani_hasan",
    "name": "منشية بني حسن",
    "lat": 32.345,
    "lng": 36.125,
    "type": "city",
    "district": "المفرق",
    "zoom": 13
  },
  {
    "id": "umm_jimal",
    "name": "أم الجمال",
    "lat": 32.328,
    "lng": 36.368,
    "type": "city",
    "district": "المفرق",
    "zoom": 13
  },
  {
    "id": "subha",
    "name": "صبحا",
    "lat": 32.325,
    "lng": 36.502,
    "type": "city",
    "district": "المفرق",
    "zoom": 13
  },
  {
    "id": "ruwayshid",
    "name": "الرويشد",
    "lat": 32.502,
    "lng": 38.202,
    "type": "city",
    "district": "المفرق",
    "zoom": 11
  },
  {
    "id": "khaldiyeh",
    "name": "الخالدية",
    "lat": 32.185,
    "lng": 36.295,
    "type": "city",
    "district": "المفرق",
    "zoom": 13
  },
  {
    "id": "sama_sarhan",
    "name": "سما السرحان",
    "lat": 32.482,
    "lng": 36.255,
    "type": "city",
    "district": "المفرق",
    "zoom": 13
  },
  {
    "id": "jerash_city",
    "name": "مدينة جرش",
    "lat": 32.2833,
    "lng": 35.9,
    "type": "city",
    "district": "جرش",
    "zoom": 13
  },
  {
    "id": "jerash_balad",
    "name": "جرش البلد",
    "lat": 32.278,
    "lng": 35.898,
    "type": "neighborhood",
    "district": "جرش",
    "zoom": 14
  },
  {
    "id": "souf",
    "name": "سوف",
    "lat": 32.312,
    "lng": 35.838,
    "type": "city",
    "district": "جرش",
    "zoom": 13
  },
  {
    "id": "sakib",
    "name": "ساكب",
    "lat": 32.282,
    "lng": 35.808,
    "type": "city",
    "district": "جرش",
    "zoom": 13
  },
  {
    "id": "kitteh",
    "name": "الكتة",
    "lat": 32.262,
    "lng": 35.828,
    "type": "city",
    "district": "جرش",
    "zoom": 13
  },
  {
    "id": "reimoun",
    "name": "ريمون",
    "lat": 32.285,
    "lng": 35.852,
    "type": "city",
    "district": "جرش",
    "zoom": 13
  },
  {
    "id": "qafqafa",
    "name": "قفقفا",
    "lat": 32.378,
    "lng": 35.918,
    "type": "city",
    "district": "جرش",
    "zoom": 13
  },
  {
    "id": "burma",
    "name": "برما",
    "lat": 32.215,
    "lng": 35.792,
    "type": "city",
    "district": "جرش",
    "zoom": 13
  },
  {
    "id": "ajloun_city",
    "name": "مدينة عجلون",
    "lat": 32.3333,
    "lng": 35.75,
    "type": "city",
    "district": "عجلون",
    "zoom": 13
  },
  {
    "id": "ajloun_balad",
    "name": "عجلون البلد",
    "lat": 32.333,
    "lng": 35.752,
    "type": "neighborhood",
    "district": "عجلون",
    "zoom": 14
  },
  {
    "id": "anjara",
    "name": "عنجرة",
    "lat": 32.312,
    "lng": 35.765,
    "type": "city",
    "district": "عجلون",
    "zoom": 13
  },
  {
    "id": "ain_janna",
    "name": "عين جنا",
    "lat": 32.348,
    "lng": 35.762,
    "type": "city",
    "district": "عجلون",
    "zoom": 13
  },
  {
    "id": "kufranjeh",
    "name": "كفرنجة",
    "lat": 32.302,
    "lng": 35.702,
    "type": "city",
    "district": "عجلون",
    "zoom": 13
  },
  {
    "id": "sakhrah",
    "name": "صخرة",
    "lat": 32.372,
    "lng": 35.808,
    "type": "city",
    "district": "عجلون",
    "zoom": 13
  },
  {
    "id": "abeen",
    "name": "عبين",
    "lat": 32.365,
    "lng": 35.798,
    "type": "city",
    "district": "عجلون",
    "zoom": 13
  },
  {
    "id": "ableen",
    "name": "عبلين",
    "lat": 32.355,
    "lng": 35.792,
    "type": "city",
    "district": "عجلون",
    "zoom": 13
  },
  {
    "id": "rajib",
    "name": "راجب",
    "lat": 32.268,
    "lng": 35.688,
    "type": "village",
    "district": "عجلون",
    "zoom": 13
  },
  {
    "id": "hashemiyeh_ajloun",
    "name": "الهاشمية عجلون",
    "lat": 32.362,
    "lng": 35.688,
    "type": "village",
    "district": "عجلون",
    "zoom": 13
  },
  {
    "id": "karak_city",
    "name": "مدينة الكرك",
    "lat": 31.1833,
    "lng": 35.7028,
    "type": "city",
    "district": "الكرك",
    "zoom": 13
  },
  {
    "id": "karak_balad",
    "name": "الكرك البلد",
    "lat": 31.182,
    "lng": 35.701,
    "type": "neighborhood",
    "district": "الكرك",
    "zoom": 14
  },
  {
    "id": "marj",
    "name": "المرج",
    "lat": 31.192,
    "lng": 35.718,
    "type": "neighborhood",
    "district": "الكرك",
    "zoom": 14
  },
  {
    "id": "thanieh",
    "name": "الثنية",
    "lat": 31.171,
    "lng": 35.735,
    "type": "neighborhood",
    "district": "الكرك",
    "zoom": 14
  },
  {
    "id": "zahoum",
    "name": "زحوم",
    "lat": 31.172,
    "lng": 35.755,
    "type": "neighborhood",
    "district": "الكرك",
    "zoom": 14
  },
  {
    "id": "adar",
    "name": "أدر",
    "lat": 31.218,
    "lng": 35.762,
    "type": "village",
    "district": "الكرك",
    "zoom": 13
  },
  {
    "id": "mootah_karak",
    "name": "مؤتة الكرك",
    "lat": 31.082,
    "lng": 35.702,
    "type": "city",
    "district": "الكرك",
    "zoom": 13
  },
  {
    "id": "mazar_south",
    "name": "المزار الجنوبي",
    "lat": 31.062,
    "lng": 35.692,
    "type": "city",
    "district": "الكرك",
    "zoom": 13
  },
  {
    "id": "moab",
    "name": "مؤاب",
    "lat": 31.018,
    "lng": 35.702,
    "type": "city",
    "district": "الكرك",
    "zoom": 13
  },
  {
    "id": "qasr",
    "name": "القصر",
    "lat": 31.312,
    "lng": 35.748,
    "type": "city",
    "district": "الكرك",
    "zoom": 13
  },
  {
    "id": "rabbah",
    "name": "الربة",
    "lat": 31.272,
    "lng": 35.742,
    "type": "city",
    "district": "الكرك",
    "zoom": 13
  },
  {
    "id": "smakieh",
    "name": "السماكية",
    "lat": 31.365,
    "lng": 35.772,
    "type": "city",
    "district": "الكرك",
    "zoom": 13
  },
  {
    "id": "ghor_safi",
    "name": "غور الصافي",
    "lat": 31.035,
    "lng": 35.485,
    "type": "city",
    "district": "الكرك",
    "zoom": 13
  },
  {
    "id": "aghouar_south",
    "name": "الأغوار الجنوبية",
    "lat": 31.042,
    "lng": 35.492,
    "type": "city",
    "district": "الكرك",
    "zoom": 13
  },
  {
    "id": "safi",
    "name": "الصافي",
    "lat": 31.038,
    "lng": 35.482,
    "type": "city",
    "district": "الكرك",
    "zoom": 13
  },
  {
    "id": "tafilah_city",
    "name": "مدينة الطفيلة",
    "lat": 30.8333,
    "lng": 35.6,
    "type": "city",
    "district": "الطفيلة",
    "zoom": 13
  },
  {
    "id": "tafilah_balad",
    "name": "الطفيلة البلد",
    "lat": 30.835,
    "lng": 35.602,
    "type": "neighborhood",
    "district": "الطفيلة",
    "zoom": 14
  },
  {
    "id": "ain_baida",
    "name": "عين البيضاء",
    "lat": 30.798,
    "lng": 35.588,
    "type": "city",
    "district": "الطفيلة",
    "zoom": 13
  },
  {
    "id": "hassa",
    "name": "الحسا",
    "lat": 30.822,
    "lng": 35.978,
    "type": "city",
    "district": "الطفيلة",
    "zoom": 12
  },
  {
    "id": "buseira",
    "name": "بصيرا",
    "lat": 30.672,
    "lng": 35.608,
    "type": "city",
    "district": "الطفيلة",
    "zoom": 13
  },
  {
    "id": "qadisiyah",
    "name": "القادسية",
    "lat": 30.628,
    "lng": 35.602,
    "type": "city",
    "district": "الطفيلة",
    "zoom": 13
  },
  {
    "id": "gharandal",
    "name": "غرندل",
    "lat": 30.688,
    "lng": 35.585,
    "type": "village",
    "district": "الطفيلة",
    "zoom": 13
  },
  {
    "id": "dhana",
    "name": "ضانا",
    "lat": 30.655,
    "lng": 35.612,
    "type": "village",
    "district": "الطفيلة",
    "zoom": 14
  },
  {
    "id": "maan_city",
    "name": "مدينة معان",
    "lat": 30.1972,
    "lng": 35.7339,
    "type": "city",
    "district": "معان",
    "zoom": 13
  },
  {
    "id": "maan_balad",
    "name": "معان البلد",
    "lat": 30.198,
    "lng": 35.731,
    "type": "neighborhood",
    "district": "معان",
    "zoom": 14
  },
  {
    "id": "ashraf",
    "name": "حي الأشراف",
    "lat": 30.205,
    "lng": 35.742,
    "type": "neighborhood",
    "district": "معان",
    "zoom": 14
  },
  {
    "id": "toor",
    "name": "حي الطور",
    "lat": 30.191,
    "lng": 35.722,
    "type": "neighborhood",
    "district": "معان",
    "zoom": 14
  },
  {
    "id": "industrial_maan",
    "name": "المنطقة الصناعية معان",
    "lat": 30.158,
    "lng": 35.758,
    "type": "industrial",
    "district": "معان",
    "zoom": 13
  },
  {
    "id": "wadi_musa",
    "name": "وادي موسى",
    "lat": 30.322,
    "lng": 35.478,
    "type": "city",
    "district": "معان",
    "zoom": 13
  },
  {
    "id": "petra",
    "name": "البتراء",
    "lat": 30.328,
    "lng": 35.442,
    "type": "landmark",
    "district": "معان",
    "zoom": 13
  },
  {
    "id": "taybeh",
    "name": "الطيبة",
    "lat": 30.258,
    "lng": 35.465,
    "type": "city",
    "district": "معان",
    "zoom": 13
  },
  {
    "id": "umm_sayhoun",
    "name": "أم صيحون",
    "lat": 30.355,
    "lng": 35.468,
    "type": "city",
    "district": "معان",
    "zoom": 13
  },
  {
    "id": "beida",
    "name": "البيضا",
    "lat": 30.378,
    "lng": 35.465,
    "type": "city",
    "district": "معان",
    "zoom": 13
  },
  {
    "id": "shobak",
    "name": "الشوبك",
    "lat": 30.528,
    "lng": 35.568,
    "type": "city",
    "district": "معان",
    "zoom": 13
  },
  {
    "id": "heisheh",
    "name": "الهيشة",
    "lat": 30.518,
    "lng": 35.512,
    "type": "village",
    "district": "معان",
    "zoom": 13
  },
  {
    "id": "mansourah",
    "name": "المنصورة",
    "lat": 30.548,
    "lng": 35.572,
    "type": "village",
    "district": "معان",
    "zoom": 13
  },
  {
    "id": "huseiniyeh",
    "name": "الحسينية",
    "lat": 30.602,
    "lng": 35.802,
    "type": "city",
    "district": "معان",
    "zoom": 13
  },
  {
    "id": "jafr",
    "name": "الجفر",
    "lat": 30.318,
    "lng": 36.182,
    "type": "city",
    "district": "معان",
    "zoom": 11
  },
  {
    "id": "athruh",
    "name": "أذرح",
    "lat": 30.328,
    "lng": 35.602,
    "type": "city",
    "district": "معان",
    "zoom": 13
  },
  {
    "id": "aqaba_city",
    "name": "مدينة العقبة",
    "lat": 29.5321,
    "lng": 35.0063,
    "type": "city",
    "district": "العقبة",
    "zoom": 13
  },
  {
    "id": "aqaba_balad",
    "name": "العقبة البلد",
    "lat": 29.531,
    "lng": 35.008,
    "type": "neighborhood",
    "district": "العقبة",
    "zoom": 14
  },
  {
    "id": "south_beach",
    "name": "الشاطئ الجنوبي",
    "lat": 29.428,
    "lng": 34.978,
    "type": "neighborhood",
    "district": "العقبة",
    "zoom": 13
  },
  {
    "id": "north_beach",
    "name": "الشاطئ الشمالي",
    "lat": 29.542,
    "lng": 34.982,
    "type": "neighborhood",
    "district": "العقبة",
    "zoom": 14
  },
  {
    "id": "industrial_aqaba",
    "name": "المنطقة الصناعية العقبة",
    "lat": 29.622,
    "lng": 35.015,
    "type": "industrial",
    "district": "العقبة",
    "zoom": 13
  },
  {
    "id": "eighth_district",
    "name": "الحي الثامن العقبة",
    "lat": 29.548,
    "lng": 35.022,
    "type": "neighborhood",
    "district": "العقبة",
    "zoom": 14
  },
  {
    "id": "mahdoud",
    "name": "المحدود",
    "lat": 29.532,
    "lng": 35.015,
    "type": "neighborhood",
    "district": "العقبة",
    "zoom": 14
  },
  {
    "id": "sakaniyeh",
    "name": "السكنية",
    "lat": 29.525,
    "lng": 35.005,
    "type": "neighborhood",
    "district": "العقبة",
    "zoom": 14
  },
  {
    "id": "wadi_araba",
    "name": "وادي عربة",
    "lat": 30.082,
    "lng": 35.158,
    "type": "city",
    "district": "العقبة",
    "zoom": 11
  },
  {
    "id": "quweirah",
    "name": "القويرة",
    "lat": 29.805,
    "lng": 35.312,
    "type": "city",
    "district": "العقبة",
    "zoom": 13
  },
  {
    "id": "deisah",
    "name": "الديسة",
    "lat": 29.628,
    "lng": 35.508,
    "type": "city",
    "district": "العقبة",
    "zoom": 12
  },
  {
    "id": "rum",
    "name": "رم",
    "lat": 29.578,
    "lng": 35.422,
    "type": "village",
    "district": "العقبة",
    "zoom": 13
  },
  {
    "id": "wadi_rum",
    "name": "وادي رم",
    "lat": 29.578,
    "lng": 35.422,
    "type": "landmark",
    "district": "العقبة",
    "zoom": 13
  }
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
