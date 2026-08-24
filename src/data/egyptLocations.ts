export interface City {
  id: string
  ar: string
  en: string
}

export interface Governorate {
  id: string
  ar: string
  en: string
  cities: City[]
}

const c = (ar: string, en: string): City => ({ id: ar, ar, en })

export const OTHER_CITY_ID = '__other__'

export const governorates: Governorate[] = [
  { id: 'cairo', ar: 'القاهرة', en: 'Cairo', cities: [
    c('مدينة نصر', 'Nasr City'), c('المعادي', 'Maadi'), c('مصر الجديدة', 'Heliopolis'), c('الزمالك', 'Zamalek'),
    c('وسط البلد', 'Downtown'), c('حلوان', 'Helwan'), c('المقطم', 'Mokattam'), c('عين شمس', 'Ain Shams'),
    c('شبرا', 'Shubra'), c('الزيتون', 'Zeitoun'), c('السيدة زينب', 'Sayeda Zeinab'), c('الدرب الأحمر', 'Darb El Ahmar'),
    c('بولاق', 'Boulaq'), c('روض الفرج', 'Roud El Farag'), c('الوايلي', 'El Waili'), c('المطرية', 'El Matareya'),
    c('النزهة', 'El Nozha'), c('دار السلام', 'Dar El Salam'), c('البساتين', 'El Basateen'), c('المرج', 'El Marg'),
    c('منشأة ناصر', 'Manshiyet Nasser'), c('التجمع الأول', '1st Settlement'), c('التجمع الثالث', '3rd Settlement'),
    c('التجمع الخامس', '5th Settlement'), c('الشروق', 'Shorouk City'), c('بدر', 'Badr City'), c('مدينتي', 'Madinaty'),
  ]},
  { id: 'giza', ar: 'الجيزة', en: 'Giza', cities: [
    c('الدقي', 'Dokki'), c('العجوزة', 'Agouza'), c('المهندسين', 'Mohandessin'), c('إمبابة', 'Imbaba'),
    c('بولاق الدكرور', 'Boulaq El Dakrour'), c('الهرم', 'Haram'), c('فيصل', 'Faisal'), c('العمرانية', 'Omraniya'),
    c('٦ أكتوبر', '6th of October'), c('الشيخ زايد', 'Sheikh Zayed'), c('البدرشين', 'El Badrashin'),
    c('الصف', 'El Saff'), c('أطفيح', 'Atfih'), c('العياط', 'El Ayyat'), c('الحوامدية', 'El Hawamdeya'),
    c('أوسيم', 'Awsim'), c('كرداسة', 'Kerdasa'), c('منشأة القناطر', 'Manshaat El Qanater'),
  ]},
  { id: 'qalyubia', ar: 'القليوبية', en: 'Qalyubia', cities: [
    c('بنها', 'Banha'), c('شبرا الخيمة', 'Shubra El Kheima'), c('قليوب', 'Qalyub'), c('الخانكة', 'El Khanka'),
    c('طوخ', 'Toukh'), c('كفر شكر', 'Kafr Shukr'), c('القناطر الخيرية', 'Qanater El Khayria'), c('قها', 'Qaha'),
    c('العبور', 'Obour City'), c('الخصوص', 'El Khosous'), c('شبين القناطر', 'Shibin El Qanater'),
  ]},
  { id: 'dakahlia', ar: 'الدقهلية', en: 'Dakahlia', cities: [
    c('المنصورة', 'Mansoura'), c('طلخا', 'Talkha'), c('ميت غمر', 'Mit Ghamr'), c('دكرنس', 'Dekernes'),
    c('أجا', 'Aga'), c('منية النصر', 'Meniet El Nasr'), c('السنبلاوين', 'El Senbellawein'), c('بلقاس', 'Belqas'),
    c('شربين', 'Sherbin'), c('المنزلة', 'El Manzala'), c('تمي الأمديد', 'Temay El Amdid'), c('جمصة', 'Gamasa'),
    c('نبروه', 'Nabaroh'), c('المطرية', 'El Matareya (Dakahlia)'),
  ]},
  { id: 'sharqia', ar: 'الشرقية', en: 'Sharqia', cities: [
    c('الزقازيق', 'Zagazig'), c('العاشر من رمضان', '10th of Ramadan City'), c('بلبيس', 'Belbeis'),
    c('منيا القمح', 'Minya El Qamh'), c('أبو حماد', 'Abu Hammad'), c('أبو كبير', 'Abu Kabir'), c('ههيا', 'Hehya'),
    c('فاقوس', 'Faqous'), c('الحسينية', 'El Husseiniya'), c('مشتول السوق', 'Mashtoul El Souk'),
    c('كفر صقر', 'Kafr Saqr'), c('ديرب نجم', 'Diarb Negm'), c('صان الحجر', 'San El Hagar'), c('القنايات', 'El Qanayat'),
  ]},
  { id: 'gharbia', ar: 'الغربية', en: 'Gharbia', cities: [
    c('طنطا', 'Tanta'), c('المحلة الكبرى', 'El Mahalla El Kubra'), c('كفر الزيات', 'Kafr El Zayat'),
    c('زفتى', 'Zefta'), c('السنطة', 'El Santa'), c('سمنود', 'Samannoud'), c('بسيون', 'Basyoun'), c('قطور', 'Qutur'),
  ]},
  { id: 'monufia', ar: 'المنوفية', en: 'Monufia', cities: [
    c('شبين الكوم', 'Shibin El Kom'), c('منوف', 'Menouf'), c('أشمون', 'Ashmoun'), c('الباجور', 'El Bagour'),
    c('قويسنا', 'Quesna'), c('بركة السبع', 'Berket El Sabaa'), c('تلا', 'Tala'), c('الشهداء', 'El Shohada'), c('مدينة السادات', 'Sadat City'),
  ]},
  { id: 'kafr-el-sheikh', ar: 'كفر الشيخ', en: 'Kafr El Sheikh', cities: [
    c('كفر الشيخ', 'Kafr El Sheikh'), c('دسوق', 'Desouk'), c('فوه', 'Fuwwah'), c('مطوبس', 'Metoubes'),
    c('بلطيم', 'Baltim'), c('سيدي سالم', 'Sidi Salem'), c('الحامول', 'El Hamoul'), c('بيلا', 'Biyala'),
    c('الرياض', 'El Riyad'), c('قلين', 'Qellin'), c('البرلس', 'El Burullus'),
  ]},
  { id: 'beheira', ar: 'البحيرة', en: 'Beheira', cities: [
    c('دمنهور', 'Damanhour'), c('كفر الدوار', 'Kafr El Dawwar'), c('رشيد', 'Rashid (Rosetta)'), c('إدكو', 'Edku'),
    c('أبو المطامير', 'Abu El Matamir'), c('أبو حمص', 'Abu Hummus'), c('الدلنجات', 'El Delengat'),
    c('المحمودية', 'El Mahmoudia'), c('إيتاي البارود', 'Itay El Baroud'), c('حوش عيسى', 'Hosh Isa'),
    c('وادي النطرون', 'Wadi El Natrun'), c('كوم حمادة', 'Kom Hamada'), c('بدر (البحيرة)', 'Badr (Beheira)'),
  ]},
  { id: 'damietta', ar: 'دمياط', en: 'Damietta', cities: [
    c('دمياط', 'Damietta'), c('دمياط الجديدة', 'New Damietta'), c('فارسكور', 'Faraskur'), c('الزرقا', 'El Zarqa'),
    c('كفر سعد', 'Kafr Saad'), c('كفر البطيخ', 'Kafr El Battikh'), c('الروضة', 'El Rawda'),
  ]},
  { id: 'port-said', ar: 'بورسعيد', en: 'Port Said', cities: [
    c('الشرق', 'El Sharq'), c('الغرب', 'El Gharb'), c('المناخ', 'El Manakh'), c('العرب', 'El Arab'),
    c('الضواحي', 'El Dawahy'), c('الزهور', 'El Zohour'), c('بورفؤاد', 'Port Fouad'),
  ]},
  { id: 'ismailia', ar: 'الإسماعيلية', en: 'Ismailia', cities: [
    c('الإسماعيلية', 'Ismailia'), c('فايد', 'Fayed'), c('القنطرة شرق', 'El Qantara Sharq'),
    c('القنطرة غرب', 'El Qantara Gharb'), c('التل الكبير', 'El Tal El Kabir'), c('القصاصين', 'El Qassasin'),
  ]},
  { id: 'suez', ar: 'السويس', en: 'Suez', cities: [
    c('عتاقة', 'Ataqa'), c('الأربعين', 'El Arbaeen'), c('الجناين', 'El Ganayen'), c('فيصل (السويس)', 'Faisal (Suez)'),
  ]},
  { id: 'north-sinai', ar: 'شمال سيناء', en: 'North Sinai', cities: [
    c('العريش', 'Arish'), c('الشيخ زويد', 'Sheikh Zuweid'), c('رفح', 'Rafah'), c('بئر العبد', 'Bir El Abd'),
    c('الحسنة', 'El Hasana'), c('نخل', 'Nakhl'),
  ]},
  { id: 'south-sinai', ar: 'جنوب سيناء', en: 'South Sinai', cities: [
    c('الطور', 'El Tor'), c('شرم الشيخ', 'Sharm El Sheikh'), c('دهب', 'Dahab'), c('نويبع', 'Nuweiba'),
    c('طابا', 'Taba'), c('سانت كاترين', 'Saint Catherine'), c('أبو رديس', 'Abu Rudeis'), c('رأس سدر', 'Ras Sedr'),
  ]},
  { id: 'beni-suef', ar: 'بني سويف', en: 'Beni Suef', cities: [
    c('بني سويف', 'Beni Suef'), c('الواسطى', 'El Wasta'), c('ناصر', 'Nasser'), c('إهناسيا', 'Ihnasya'),
    c('ببا', 'Beba'), c('الفشن', 'El Fashn'), c('سمسطا', 'Somasta'),
  ]},
  { id: 'faiyum', ar: 'الفيوم', en: 'Faiyum', cities: [
    c('الفيوم', 'Faiyum'), c('إطسا', 'Etsa'), c('سنورس', 'Sennoures'), c('طامية', 'Tamiya'),
    c('يوسف الصديق', 'Youssef El Seddik'), c('أبشواي', 'Ibshaway'),
  ]},
  { id: 'minya', ar: 'المنيا', en: 'Minya', cities: [
    c('المنيا', 'Minya'), c('ملوي', 'Mallawi'), c('سمالوط', 'Samalut'), c('مغاغة', 'Maghagha'),
    c('بني مزار', 'Beni Mazar'), c('مطاي', 'Matay'), c('أبو قرقاص', 'Abu Qurqas'), c('ديرمواس', 'Deir Mawas'),
  ]},
  { id: 'assiut', ar: 'أسيوط', en: 'Assiut', cities: [
    c('أسيوط', 'Assiut'), c('ديروط', 'Dairut'), c('منفلوط', 'Manfalut'), c('القوصية', 'El Qusiya'),
    c('أبنوب', 'Abnub'), c('أبو تيج', 'Abu Tig'), c('ساحل سليم', 'Sahel Selim'), c('البداري', 'El Badari'),
  ]},
  { id: 'sohag', ar: 'سوهاج', en: 'Sohag', cities: [
    c('سوهاج', 'Sohag'), c('أخميم', 'Akhmim'), c('جرجا', 'Girga'), c('طهطا', 'Tahta'), c('طما', 'Tama'),
    c('المراغة', 'El Maragha'), c('البلينا', 'El Balyana'), c('دار السلام (سوهاج)', 'Dar El Salam (Sohag)'),
  ]},
  { id: 'qena', ar: 'قنا', en: 'Qena', cities: [
    c('قنا', 'Qena'), c('نجع حمادي', 'Naga Hammadi'), c('دشنا', 'Deshna'), c('قوص', 'Qus'),
    c('نقادة', 'Naqada'), c('أبوتشت', 'Abu Tesht'), c('فرشوط', 'Farshut'),
  ]},
  { id: 'luxor', ar: 'الأقصر', en: 'Luxor', cities: [
    c('الأقصر', 'Luxor'), c('إسنا', 'Esna'), c('الطود', 'El Tod'), c('أرمنت', 'Armant'), c('القرنة', 'El Qurna'),
  ]},
  { id: 'aswan', ar: 'أسوان', en: 'Aswan', cities: [
    c('أسوان', 'Aswan'), c('كوم أمبو', 'Kom Ombo'), c('إدفو', 'Edfu'), c('دراو', 'Daraw'), c('نصر النوبة', 'Nasr El Nuba'),
  ]},
  { id: 'red-sea', ar: 'البحر الأحمر', en: 'Red Sea', cities: [
    c('الغردقة', 'Hurghada'), c('رأس غارب', 'Ras Gharib'), c('سفاجا', 'Safaga'), c('القصير', 'El Quseir'),
    c('مرسى علم', 'Marsa Alam'), c('الشلاتين', 'Shalateen'),
  ]},
  { id: 'new-valley', ar: 'الوادي الجديد', en: 'New Valley', cities: [
    c('الخارجة', 'El Kharga'), c('الداخلة', 'El Dakhla'), c('الفرافرة', 'El Farafra'), c('باريس', 'Paris'),
  ]},
  { id: 'matrouh', ar: 'مطروح', en: 'Matrouh', cities: [
    c('مرسى مطروح', 'Marsa Matrouh'), c('الحمام', 'El Hammam'), c('العلمين', 'El Alamein'),
    c('سيدي براني', 'Sidi Barrani'), c('السلوم', 'El Salloum'), c('سيوة', 'Siwa'),
  ]},
]

export function getCityOptions(governorateId: string | null, isArabic: boolean) {
  const gov = governorates.find(g => g.id === governorateId)
  const cities = gov ? gov.cities.map(city => ({ id: city.id, label: isArabic ? city.ar : city.en })) : []
  return [...cities, { id: OTHER_CITY_ID, label: isArabic ? 'مكان تاني (اكتبه بنفسك)' : 'Other (type it yourself)' }]
}







// export interface Governorate {
//   id: string
//   ar: string
//   en: string
// }

// export const governorates: Governorate[] = [
//   { id: 'cairo', ar: 'القاهرة', en: 'Cairo' },
//   { id: 'giza', ar: 'الجيزة', en: 'Giza' },
//   { id: 'qalyubia', ar: 'القليوبية', en: 'Qalyubia' },
//   { id: 'alexandria', ar: 'الإسكندرية', en: 'Alexandria' },
//   { id: 'dakahlia', ar: 'الدقهلية', en: 'Dakahlia' },
//   { id: 'sharqia', ar: 'الشرقية', en: 'Sharqia' },
//   { id: 'gharbia', ar: 'الغربية', en: 'Gharbia' },
//   { id: 'monufia', ar: 'المنوفية', en: 'Monufia' },
//   { id: 'kafr-el-sheikh', ar: 'كفر الشيخ', en: 'Kafr El Sheikh' },
//   { id: 'beheira', ar: 'البحيرة', en: 'Beheira' },
//   { id: 'damietta', ar: 'دمياط', en: 'Damietta' },
//   { id: 'port-said', ar: 'بورسعيد', en: 'Port Said' },
//   { id: 'ismailia', ar: 'الإسماعيلية', en: 'Ismailia' },
//   { id: 'suez', ar: 'السويس', en: 'Suez' },
//   { id: 'north-sinai', ar: 'شمال سيناء', en: 'North Sinai' },
//   { id: 'south-sinai', ar: 'جنوب سيناء', en: 'South Sinai' },
//   { id: 'beni-suef', ar: 'بني سويف', en: 'Beni Suef' },
//   { id: 'faiyum', ar: 'الفيوم', en: 'Faiyum' },
//   { id: 'minya', ar: 'المنيا', en: 'Minya' },
//   { id: 'assiut', ar: 'أسيوط', en: 'Assiut' },
//   { id: 'sohag', ar: 'سوهاج', en: 'Sohag' },
//   { id: 'qena', ar: 'قنا', en: 'Qena' },
//   { id: 'luxor', ar: 'الأقصر', en: 'Luxor' },
//   { id: 'aswan', ar: 'أسوان', en: 'Aswan' },
//   { id: 'red-sea', ar: 'البحر الأحمر', en: 'Red Sea' },
//   { id: 'new-valley', ar: 'الوادي الجديد', en: 'New Valley' },
//   { id: 'matrouh', ar: 'مطروح', en: 'Matrouh' },
// ]