export interface JournalBlock {
  type: 'paragraph' | 'heading' | 'image'
  ar: string
  en: string
}

export const journalContent: Record<string, JournalBlock[]> = {
  'small-space': [
    { type: 'paragraph', ar: 'مساحة المكتب الصغيرة مش لازم تبقى مساحة مزحومة. المشكلة غالبًا مش في المساحة نفسها، لكن في إزاي بنستخدمها.', en: 'A small desk does not have to feel cramped. The problem is usually not the space itself, but how we use it.' },
    { type: 'heading', ar: 'ابدأ من السطح مش من الأدراج', en: 'Start with the surface, not the drawers' },
    { type: 'paragraph', ar: 'أول خطوة إنك تسأل نفسك: إيه اللي محتاج يكون قدامي فعليًا كل يوم؟ اللابتوب، دفتر واحد، قلم. الباقي - سيبه في مكان تاني قريب لكن مش على السطح.', en: 'Start by asking yourself: what actually needs to be in front of me every day? Laptop, one notebook, a pen. Everything else can live nearby but off the surface.' },
    { type: 'image', ar: 'مكتب مرتب بأدوات قليلة', en: 'A tidy desk with few tools' },
    { type: 'paragraph', ar: 'استخدم الارتفاع لصالحك - لوحة معلقة زي بتاعة رفيق بتاخد المساحة اللي كانت هتتاكل من الأدراج، وبتخليك تشوف كل حاجة بنظرة واحدة.', en: 'Use height to your advantage - a pegboard like Rafiq\u2019s takes the space that drawers would eat up, and lets you see everything at a glance.' },
    { type: 'heading', ar: 'قاعدة الشيء الواحد', en: 'The one-thing rule' },
    { type: 'paragraph', ar: 'لو دخلت حاجة جديدة للمكتب، طلّع حاجة تانية. القاعدة دي بسيطة بس بتمنع التراكم اللي بيحصل من غير ما تلاحظ على مدار شهور.', en: 'If something new comes onto the desk, something else leaves it. This simple rule prevents the slow buildup that happens without you noticing over months.' },
  ],
  focus: [
    { type: 'paragraph', ar: 'التركيز مش موهبة بتتولد بيها - هو نتيجة بيئة. ولو البيئة اللي حواليك فوضى، عقلك بيدفع تمن كل تفصيلة صغيرة فيها من غير ما تحس.', en: 'Focus is not a talent you are born with - it is the result of an environment. If the environment around you is chaotic, your mind pays for every small detail without you noticing.' },
    { type: 'heading', ar: 'الحمل الذهني الخفي', en: 'The hidden mental load' },
    { type: 'paragraph', ar: 'كل غرض على مكتبك من غير مكان ثابت بيسأل عقلك سؤال صغير: "إيه ده؟ محتاجه دلوقتي؟". الأسئلة الصغيرة دي بتتراكم وبتاخد من طاقتك الذهنية طول اليوم.', en: 'Every item on your desk without a fixed place asks your brain a small question: "what is this? do I need it now?" These small questions add up and drain your mental energy throughout the day.' },
    { type: 'image', ar: 'شخص بيركز في العمل على مكتب هادئ', en: 'A person focused at a calm desk' },
    { type: 'heading', ar: 'الترتيب كطقس، مش كمهمة', en: 'Tidying as a ritual, not a task' },
    { type: 'paragraph', ar: 'بدل ما تفكر في الترتيب كـ "مهمة تانية على القايمة"، جربه كطقس صغير بتعمله آخر اليوم - 5 دقايق بس تسيب فيها مكتبك جاهز ليوم بكرة.', en: 'Instead of thinking of tidying as another task on your list, try it as a small end-of-day ritual - just 5 minutes to leave your desk ready for tomorrow.' },
  ],
  'build-workspace': [
    { type: 'paragraph', ar: 'بناء مساحة عمل عملية مش معناه تشتري كل حاجة مرة واحدة. معناه إنك تبدأ بالأساسيات، وتضيف بس لما تحتاج فعلًا.', en: 'Building a practical workspace does not mean buying everything at once. It means starting with the essentials and adding only when you truly need to.' },
    { type: 'heading', ar: 'الخطوة الأولى: السطح', en: 'Step one: the surface' },
    { type: 'paragraph', ar: 'مفرش مكتب بسيط بيغيّر إحساس المساحة كلها - بيدي حد واضح لمساحة الشغل، وبيحميه من الخدوش والبقع اليومية.', en: 'A simple desk mat changes the feel of the whole space - it gives a clear boundary for your work area and protects it from everyday scratches and spills.' },
    { type: 'image', ar: 'مكتب رفيق مجهز بالكامل', en: 'A fully set up Rafiq desk' },
    { type: 'heading', ar: 'الخطوة الثانية: الارتفاع', en: 'Step two: height' },
    { type: 'paragraph', ar: 'لوحة تنظيم معلقة أو رف صغير بيدّيك مساحة تخزين إضافية من غير ما تاخد من سطح المكتب نفسه.', en: 'A hanging pegboard or small shelf gives you extra storage without taking from the desk surface itself.' },
    { type: 'heading', ar: 'الخطوة الثالثة: التفاصيل', en: 'Step three: the details' },
    { type: 'paragraph', ar: 'آخر حاجة تضيفها هي التفاصيل الصغيرة - طبق كوب، معلّق مفاتيح، تقويم أسبوعي. دول بيضيفوا شخصية للمساحة من غير ما يزحموها.', en: 'The last thing you add are the small details - a coaster, a key holder, a weekly calendar. These add personality to the space without crowding it.' },
  ],
}