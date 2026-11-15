export type ResourceRow = [string, string, string, string, string, string, string]

// These fictional records keep routes inspectable without implying a live database.
export const resourceRows: Record<string, ResourceRow[]> = {
  'academic-years': [
    ['SMP-YR-25', 'العام الأكاديمي 2025–2026', 'Academic year 2025–2026', '01 سبتمبر 2025 — 30 يونيو 2026', 'Sep 01, 2025 — Jun 30, 2026', 'نشط', 'Active'],
    ['SMP-YR-24', 'العام الأكاديمي 2024–2025', 'Academic year 2024–2025', '01 سبتمبر 2024 — 30 يونيو 2025', 'Sep 01, 2024 — Jun 30, 2025', 'مؤرشف', 'Archived'],
  ],
  terms: [
    ['SMP-TRM-1', 'الفصل الدراسي الأول', 'First term', '01 سبتمبر — 15 يناير', 'Sep 01 — Jan 15', 'نشط', 'Active'],
    ['SMP-TRM-2', 'الفصل الدراسي الثاني', 'Second term', '01 فبراير — 30 يونيو', 'Feb 01 — Jun 30', 'مسودة', 'Draft'],
  ],
  structure: [
    ['SMP-STR-01', 'كلية الهندسة وتقنية المعلومات', 'Faculty of Engineering & IT', '4 أقسام · 12 برنامجًا', '4 departments · 12 programs', 'نشط', 'Active'],
    ['SMP-STR-02', 'كلية العلوم التطبيقية', 'Faculty of Applied Sciences', '3 أقسام · 8 برامج', '3 departments · 8 programs', 'نشط', 'Active'],
  ],
  departments: [
    ['SMP-DPT-01', 'علوم الحاسوب', 'Computer Science', 'كلية الهندسة · 14 معلمًا', 'Engineering · 14 teachers', 'نشط', 'Active'],
    ['SMP-DPT-02', 'الرياضيات', 'Mathematics', 'كلية العلوم · 9 معلمين', 'Sciences · 9 teachers', 'نشط', 'Active'],
  ],
  faculties: [
    ['SMP-FAC-01', 'كلية الهندسة', 'Faculty of Engineering', '5 أقسام · 22 مقررًا', '5 departments · 22 courses', 'نشط', 'Active'],
    ['SMP-FAC-02', 'كلية العلوم', 'Faculty of Sciences', '4 أقسام · 18 مقررًا', '4 departments · 18 courses', 'نشط', 'Active'],
  ],
  programs: [
    ['SMP-PRG-CS', 'علوم الحاسوب', 'Computer Science', 'بكالوريوس · 4 سنوات', 'Bachelor · 4 years', 'نشط', 'Active'],
    ['SMP-PRG-SE', 'هندسة البرمجيات', 'Software Engineering', 'بكالوريوس · 4 سنوات', 'Bachelor · 4 years', 'نشط', 'Active'],
  ],
  grades: [
    ['SMP-GR-10', 'الصف العاشر', 'Grade 10', 'مدرسة المستقبل · 6 شعب', 'Al-Mustaqbal School · 6 sections', 'نشط', 'Active'],
    ['SMP-GR-11', 'الصف الحادي عشر', 'Grade 11', 'مدرسة المستقبل · 5 شعب', 'Al-Mustaqbal School · 5 sections', 'نشط', 'Active'],
  ],
  subjects: [
    ['SMP-SUB-CS201', 'هندسة البرمجيات', 'Software Engineering', 'CS201 · 3 ساعات', 'CS201 · 3 credits', 'نشط', 'Active'],
    ['SMP-SUB-MA110', 'الرياضيات التطبيقية', 'Applied Mathematics', 'MA110 · 3 ساعات', 'MA110 · 3 credits', 'نشط', 'Active'],
  ],
  sections: [
    ['SMP-SEC-3A', 'شعبة CS201-A', 'Section CS201-A', '32 طالبًا · أ. أحمد', '32 learners · A. Ahmed', 'نشط', 'Active'],
    ['SMP-SEC-3B', 'شعبة CS201-B', 'Section CS201-B', '29 طالبًا · أ. ريم', '29 learners · A. Reem', 'نشط', 'Active'],
  ],
  rooms: [
    ['SMP-RM-204', 'قاعة 204', 'Room 204', 'السعة 40 · مبنى الهندسة', 'Capacity 40 · Engineering', 'نشط', 'Active'],
    ['SMP-RM-L3', 'مختبر 3', 'Lab 3', 'السعة 28 · مبنى العلوم', 'Capacity 28 · Sciences', 'نشط', 'Active'],
  ],
  staff: [
    ['SMP-STF-01', 'ريم الحداد', 'Reem Al-Haddad', 'شؤون الطلاب · دوام كامل', 'Student affairs · Full time', 'نشط', 'Active'],
    ['SMP-STF-02', 'سامي القيسي', 'Sami Al-Qaisi', 'التسجيل الأكاديمي · دوام كامل', 'Academic registrar · Full time', 'نشط', 'Active'],
  ],
  guardians: [
    ['SMP-GDN-01', 'نوال علي', 'Nawal Ali', 'ولي أمر · طالبان مرتبطان', 'Guardian · 2 linked learners', 'نشط', 'Active'],
    ['SMP-GDN-02', 'خالد حسن', 'Khaled Hassan', 'ولي أمر · طالب مرتبط', 'Guardian · 1 linked learner', 'نشط', 'Active'],
  ],
  roles: [
    ['SMP-ROLE-01', 'مالك المنصة', 'Platform owner', 'نطاق المنصة · 12 صلاحية', 'Platform scope · 12 permissions', 'نشط', 'Active'],
    ['SMP-ROLE-02', 'مدير المؤسسة', 'Institution admin', 'نطاق المؤسسة · 18 صلاحية', 'Institution scope · 18 permissions', 'نشط', 'Active'],
    ['SMP-ROLE-03', 'منسق أكاديمي', 'Academic coordinator', 'نطاق أكاديمي · 9 صلاحيات', 'Academic scope · 9 permissions', 'نشط', 'Active'],
  ],
  permissions: [
    ['SMP-PER-VIEW', 'عرض السجلات', 'View records', 'قراءة · الأدوار المخولة فقط', 'Read · assigned roles only', 'نشط', 'Active'],
    ['SMP-PER-EXPORT', 'تصدير التقارير', 'Export reports', 'يتطلب صلاحية صريحة', 'Requires explicit permission', 'نشط', 'Active'],
    ['SMP-PER-APPROVE', 'اعتماد النتائج', 'Approve results', 'المنسق الأكاديمي', 'Academic coordinator', 'نشط', 'Active'],
  ],
  plans: [
    ['SMP-PLAN-ENT', 'المؤسسات', 'Enterprise', 'حدود موسعة · توضيحي', 'Expanded limits · illustrative', 'نشط', 'Active'],
    ['SMP-PLAN-GRW', 'النمو', 'Growth', 'حدود متوسطة · توضيحي', 'Standard limits · illustrative', 'نشط', 'Active'],
    ['SMP-PLAN-STR', 'الأساسي', 'Starter', 'مزايا أولية · توضيحي', 'Core features · illustrative', 'مسودة', 'Draft'],
  ],
  billing: [
    ['SMP-INV-09', 'فاتورة توضيحية · سبتمبر', 'Illustrative invoice · September', 'جامعة تعز · لا توجد دفعة حقيقية', 'Taiz University · no real payment', 'مسودة', 'Draft'],
    ['SMP-INV-08', 'فاتورة توضيحية · أغسطس', 'Illustrative invoice · August', 'مدرسة المستقبل · لا توجد دفعة حقيقية', 'Al-Mustaqbal School · no real payment', 'مغلقة', 'Closed'],
  ],
  usage: [
    ['SMP-USE-STU', 'حسابات الطلاب', 'Student accounts', '2,840 من حد توضيحي 4,000', '2,840 of illustrative 4,000', 'نشط', 'Active'],
    ['SMP-USE-STO', 'مساحة الملفات', 'File storage', '64 من حد توضيحي 100 GB', '64 of illustrative 100 GB', 'نشط', 'Active'],
  ],
  integrations: [
    ['SMP-INT-VIDEO', 'مزود الفصول الافتراضية', 'Virtual class provider', 'واجهة توضيحية فقط · غير متصل', 'Demo surface only · not connected', 'غير متصل', 'Not connected'],
    ['SMP-INT-MAIL', 'البريد الإلكتروني', 'Email delivery', 'محاكاة واجهة · غير متصل', 'UI simulation · not connected', 'غير متصل', 'Not connected'],
  ],
  notifications: [
    ['SMP-NTF-01', 'إعلان أكاديمي جديد', 'New academic announcement', 'قبل ساعة · غير مقروء', '1 hour ago · unread', 'جديد', 'New'],
    ['SMP-NTF-02', 'موعد واجب CS201 غدًا', 'CS201 assignment due tomorrow', 'قبل ساعتين · مقروء', '2 hours ago · read', 'مقروء', 'Read'],
    ['SMP-NTF-03', 'تحديث حالة الحضور', 'Attendance status updated', 'أمس · مقروء', 'Yesterday · read', 'مقروء', 'Read'],
  ],
  tickets: [
    ['SMP-TKT-2041', 'تعذر الدخول إلى بوابة الطالب', 'Student portal access issue', 'أولوية عالية · جامعة تعز · أُسندت إلى ريم', 'High · Taiz University · assigned to Reem', 'قيد المراجعة', 'Pending'],
    ['SMP-TKT-2038', 'استفسار حول استيراد الطلاب', 'Question about student import', 'أولوية عادية · بانتظار الرد', 'Normal priority · awaiting reply', 'قيد المراجعة', 'Pending'],
    ['SMP-TKT-2032', 'توضيح حدود الاستخدام', 'Usage limits question', 'أولوية منخفضة · توضيحي', 'Low priority · illustrative', 'مغلقة', 'Closed'],
  ],
  support: [
    ['SMP-TKT-2041', 'تعذر الدخول إلى بوابة الطالب', 'Student portal access issue', 'أولوية عالية · جامعة تعز · أُسندت إلى ريم', 'High · Taiz University · assigned to Reem', 'قيد المراجعة', 'Pending'],
    ['SMP-TKT-2038', 'استفسار حول استيراد الطلاب', 'Question about student import', 'أولوية عادية · بانتظار الرد', 'Normal priority · awaiting reply', 'قيد المراجعة', 'Pending'],
  ],
  customers: [
    ['SMP-ORG-01', 'جامعة تعز', 'Taiz University', 'جامعة · 2,840 متعلمًا · عينة', 'University · 2,840 learners · sample', 'نشط', 'Active'],
    ['SMP-ORG-02', 'مدرسة المستقبل', 'Al-Mustaqbal School', 'مدرسة · 1,260 متعلمًا · عينة', 'School · 1,260 learners · sample', 'نشط', 'Active'],
  ],
  'student-records': [
    ['SMP-STU-1048', 'ليان محمد', 'Layan Mohammed', 'هندسة البرمجيات · المستوى الثالث', 'Software Engineering · Level 3', 'نشط', 'Active'],
    ['SMP-STU-1052', 'خالد حسن', 'Khaled Hassan', 'علوم الحاسوب · المستوى الثاني', 'Computer Science · Level 2', 'نشط', 'Active'],
  ],
  roster: [
    ['SMP-STU-1048', 'ليان محمد', 'Layan Mohammed', 'CS201 · شعبة A · جامعة تعز', 'CS201 · Section A · Taiz University', 'نشط', 'Active'],
    ['SMP-STU-1052', 'خالد حسن', 'Khaled Hassan', 'CS201 · شعبة A · جامعة تعز', 'CS201 · Section A · Taiz University', 'نشط', 'Active'],
  ],
  'learning-content': [
    ['SMP-MAT-01', 'الفصل الأول · مقدمة', 'Chapter 1 · Introduction', 'وثيقة PDF · تحديث توضيحي', 'PDF document · illustrative revision', 'نشط', 'Active'],
    ['SMP-MAT-02', 'محاضرة الأسبوع الثالث', 'Week 3 lecture', 'عرض توضيحي · مقرر CS201', 'Illustrative slides · CS201', 'مسودة', 'Draft'],
  ],
  'learning-materials': [
    ['SMP-MAT-01', 'مقدمة هندسة البرمجيات', 'Software engineering introduction', 'PDF · CS201', 'PDF · CS201', 'نشط', 'Active'],
    ['SMP-MAT-02', 'محاضرة الأسبوع الثالث', 'Week 3 lecture', 'عرض · CS201', 'Slides · CS201', 'نشط', 'Active'],
  ],
  assignments: [
    ['SMP-ASN-301', 'تطبيقات قواعد البيانات', 'Database exercises', 'CS201 · التسليم 20 أكتوبر', 'CS201 · due Oct 20', 'نشط', 'Active'],
    ['SMP-ASN-302', 'تمارين الأسبوع الخامس', 'Week 5 exercises', 'CS101 · التسليم 24 أكتوبر', 'CS101 · due Oct 24', 'مسودة', 'Draft'],
  ],
  announcements: [
    ['SMP-ANN-01', 'مواعيد الاختبارات النصفية', 'Midterm exam schedule', 'جميع طلاب المؤسسة · اليوم', 'All institution learners · today', 'نشط', 'Active'],
    ['SMP-ANN-02', 'تحديث ساعات المكتبة', 'Library hours update', 'مجتمع الجامعة · أمس', 'University community · yesterday', 'نشط', 'Active'],
  ],
  communications: [
    ['SMP-COM-01', 'إعلان إلى المستوى الثالث', 'Announcement to Level 3', '120 مستلمًا · توضيحي', '120 recipients · illustrative', 'مسودة', 'Draft'],
    ['SMP-COM-02', 'رسالة شعبة CS201-A', 'CS201-A section message', '32 مستلمًا · عينة', '32 recipients · sample', 'نشط', 'Active'],
  ],
  workflows: [
    ['SMP-WF-01', 'اعتماد تسجيل الطالب', 'Student enrollment approval', 'خطوتان · المسجل ثم المنسق', '2 steps · registrar then coordinator', 'نشط', 'Active'],
    ['SMP-WF-02', 'نشر نتائج الاختبارات', 'Exam result publication', 'المعلم ثم اعتماد أكاديمي', 'Teacher then academic approval', 'مسودة', 'Draft'],
  ],
  'grades-management': [
    ['SMP-GB-201', 'دفتر درجات CS201', 'CS201 gradebook', '32 طالبًا · 3 تقييمات', '32 learners · 3 assessments', 'نشط', 'Active'],
    ['SMP-GB-101', 'دفتر درجات CS101', 'CS101 gradebook', '28 طالبًا · 2 تقييمين', '28 learners · 2 assessments', 'قيد المراجعة', 'Pending'],
  ],
  children: [
    ['SMP-CH-01', 'ليان محمد', 'Layan Mohammed', 'الصف الحادي عشر · مدرسة المستقبل', 'Grade 11 · Al-Mustaqbal School', 'نشط', 'Active'],
    ['SMP-CH-02', 'سامي محمد', 'Sami Mohammed', 'الصف السابع · مدرسة المستقبل', 'Grade 7 · Al-Mustaqbal School', 'نشط', 'Active'],
  ],
  messages: [
    ['SMP-MSG-01', 'رسالة من المنسق الأكاديمي', 'Message from academic coordinator', 'حول جدول الأسبوع القادم', 'About next week’s timetable', 'جديد', 'New'],
    ['SMP-MSG-02', 'مجتمع مقرر CS201', 'CS201 course community', 'تحديث نقاش · اليوم', 'Discussion update · today', 'مقروء', 'Read'],
  ],
}
