export type Lang = 'ar' | 'en'
export type Role = 'institution' | 'platform' | 'academic' | 'teacher' | 'student' | 'guardian' | 'support'

export type NavItem = { label: string; en: string; path: string; icon: string; badge?: string }
export type NavGroup = { label: string; en: string; items: NavItem[] }

export const roleInfo: Record<Role, { label: string; en: string; description: string; home: string }> = {
  platform: { label: 'مالك المنصة', en: 'Platform Owner', description: 'إدارة المؤسسات والاشتراكات والصلاحيات', home: '/platform/dashboard' },
  institution: { label: 'مدير المؤسسة', en: 'Institution Admin', description: 'تشغيل المؤسسة والطلاب والهيكل الأكاديمي', home: '/institution/dashboard' },
  academic: { label: 'منسق أكاديمي', en: 'Academic Coordinator', description: 'التسجيل والجداول والنتائج والطلبات', home: '/academic/dashboard' },
  teacher: { label: 'معلم', en: 'Teacher', description: 'الحصص والحضور والواجبات والتقييم', home: '/teacher/dashboard' },
  student: { label: 'طالب', en: 'Student', description: 'المقررات والمواد والواجبات والنتائج', home: '/student/dashboard' },
  guardian: { label: 'ولي أمر', en: 'Guardian', description: 'متابعة الأبناء والحضور والدرجات', home: '/guardian/dashboard' },
  support: { label: 'موظف دعم', en: 'Support Agent', description: 'إدارة التذاكر وقاعدة المعرفة', home: '/support/dashboard' },
}

export const navByRole: Record<Role, NavGroup[]> = {
  platform: [
    { label: 'خدمات المنصة', en: 'Platform services', items: [
      { label: 'الخطط', en: 'Plans', path: '/platform/plans', icon: 'credit-card' },
      { label: 'الفوترة', en: 'Billing', path: '/platform/billing', icon: 'credit-card' },
      { label: 'الاستخدام', en: 'Usage', path: '/platform/usage', icon: 'bar-chart' },
      { label: 'التكاملات', en: 'Integrations', path: '/platform/integrations', icon: 'activity' },
      { label: 'الإشعارات', en: 'Notifications', path: '/platform/notifications', icon: 'activity' },
      { label: 'الدعم', en: 'Support', path: '/platform/support', icon: 'inbox' },
      { label: 'الصلاحيات', en: 'Permissions', path: '/platform/permissions', icon: 'shield' },
    ] },
    { label: 'نظرة عامة', en: 'Overview', items: [{ label: 'لوحة المنصة', en: 'Platform dashboard', path: '/platform/dashboard', icon: 'layout' }] },
    { label: 'الإدارة', en: 'Management', items: [
      { label: 'المؤسسات', en: 'Institutions', path: '/platform/institutions', icon: 'building' },
      { label: 'المستخدمون', en: 'Users', path: '/platform/users', icon: 'users' },
      { label: 'الأدوار والصلاحيات', en: 'Roles & permissions', path: '/platform/roles', icon: 'shield' },
      { label: 'الاشتراكات والخطط', en: 'Plans & subscriptions', path: '/platform/subscriptions', icon: 'credit-card' },
    ] },
    { label: 'الحوكمة', en: 'Governance', items: [
      { label: 'سجل التدقيق', en: 'Audit log', path: '/platform/audit-log', icon: 'activity' },
      { label: 'الإعدادات', en: 'Settings', path: '/platform/settings', icon: 'settings' },
    ] },
  ],
  institution: [
    { label: 'الهيكل الأكاديمي', en: 'Academic structure', items: [
      { label: 'السنوات الأكاديمية', en: 'Academic years', path: '/institution/academic-years', icon: 'calendar' },
      { label: 'الفصول الدراسية', en: 'Terms', path: '/institution/terms', icon: 'calendar' },
      { label: 'الهيكل', en: 'Structure', path: '/institution/structure', icon: 'building' },
      { label: 'الأقسام', en: 'Departments', path: '/institution/departments', icon: 'building' },
      { label: 'الكليات', en: 'Faculties', path: '/institution/faculties', icon: 'building' },
      { label: 'البرامج', en: 'Programs', path: '/institution/programs', icon: 'book' },
      { label: 'المراحل والصفوف', en: 'Grades', path: '/institution/grades', icon: 'layers' },
      { label: 'المواد', en: 'Subjects', path: '/institution/subjects', icon: 'book' },
      { label: 'الشُعب', en: 'Sections', path: '/institution/sections', icon: 'layers' },
      { label: 'القاعات', en: 'Rooms', path: '/institution/rooms', icon: 'home' },
    ] },
    { label: 'الموارد والحوكمة', en: 'People & governance', items: [
      { label: 'المستخدمون', en: 'Users', path: '/institution/users', icon: 'users' },
      { label: 'الموظفون', en: 'Staff', path: '/institution/staff', icon: 'users' },
      { label: 'أولياء الأمور', en: 'Guardians', path: '/institution/guardians', icon: 'users' },
      { label: 'طلبات التسجيل', en: 'Enrollment', path: '/institution/enrollment', icon: 'inbox' },
      { label: 'الصلاحيات', en: 'Permissions', path: '/institution/permissions', icon: 'shield' },
      { label: 'الأدوار', en: 'Roles', path: '/institution/roles', icon: 'shield' },
      { label: 'سجل التدقيق', en: 'Audit log', path: '/institution/audit-log', icon: 'activity' },
      { label: 'التكاملات', en: 'Integrations', path: '/institution/integrations', icon: 'activity' },
    ] },
    { label: 'التعليم والتواصل', en: 'Learning & communication', items: [
      { label: 'إدارة الدرجات', en: 'Grade management', path: '/institution/grades-management', icon: 'award' },
      { label: 'الواجبات', en: 'Assignments', path: '/institution/assignments', icon: 'file' },
      { label: 'المحتوى التعليمي', en: 'Learning content', path: '/institution/learning-content', icon: 'book' },
      { label: 'الفصول الافتراضية', en: 'Virtual classes', path: '/institution/virtual-classes', icon: 'video' },
      { label: 'التواصل', en: 'Communications', path: '/institution/communications', icon: 'message' },
      { label: 'الإعلانات', en: 'Announcements', path: '/institution/announcements', icon: 'message' },
      { label: 'سير العمل', en: 'Workflows', path: '/institution/workflows', icon: 'activity' },
      { label: 'الإعداد الأكاديمي', en: 'Academic settings', path: '/institution/academic-settings', icon: 'settings' },
    ] },
    { label: 'الرئيسية', en: 'Home', items: [{ label: 'لوحة المؤسسة', en: 'Institution dashboard', path: '/institution/dashboard', icon: 'layout' }] },
    { label: 'البيانات الأكاديمية', en: 'Academic data', items: [
      { label: 'الطلاب', en: 'Students', path: '/institution/students', icon: 'graduation' },
      { label: 'المعلمون', en: 'Teachers', path: '/institution/teachers', icon: 'users' },
      { label: 'المقررات والمواد', en: 'Courses & subjects', path: '/institution/courses', icon: 'book' },
      { label: 'الفصول والشُعب', en: 'Classes & sections', path: '/institution/classes', icon: 'layers' },
    ] },
    { label: 'التشغيل اليومي', en: 'Daily operations', items: [
      { label: 'الحضور', en: 'Attendance', path: '/institution/attendance', icon: 'check-circle' },
      { label: 'الجدول الدراسي', en: 'Timetable', path: '/institution/timetable', icon: 'calendar' },
      { label: 'الاختبارات', en: 'Exams', path: '/institution/exams', icon: 'file' },
      { label: 'التقارير', en: 'Reports', path: '/institution/reports', icon: 'bar-chart' },
    ] },
    { label: 'الإعداد', en: 'Setup', items: [
      { label: 'ملف المؤسسة', en: 'Institution profile', path: '/institution/profile', icon: 'building' },
      { label: 'الإعدادات', en: 'Settings', path: '/institution/settings', icon: 'settings' },
    ] },
  ],
  academic: [
    { label: 'السجلات والمقررات', en: 'Records & courses', items: [
      { label: 'السجلات الأكاديمية', en: 'Student records', path: '/academic/student-records', icon: 'graduation' },
      { label: 'الفصول والشُعب', en: 'Classes & sections', path: '/academic/classes', icon: 'layers' },
      { label: 'المقررات', en: 'Courses', path: '/academic/courses', icon: 'book' },
      { label: 'المواد', en: 'Subjects', path: '/academic/subjects', icon: 'book' },
      { label: 'المعلمون', en: 'Teachers', path: '/academic/teachers', icon: 'users' },
      { label: 'الجدول الدراسي', en: 'Timetable', path: '/academic/timetable', icon: 'calendar' },
      { label: 'الحضور', en: 'Attendance', path: '/academic/attendance', icon: 'check-circle' },
      { label: 'الاختبارات', en: 'Exams', path: '/academic/exams', icon: 'clipboard' },
      { label: 'كشوف الدرجات', en: 'Transcripts', path: '/academic/transcripts', icon: 'file' },
    ] },
    { label: 'الرئيسية', en: 'Home', items: [{ label: 'لوحة التنسيق', en: 'Academic dashboard', path: '/academic/dashboard', icon: 'layout' }] },
    { label: 'العمليات الأكاديمية', en: 'Academic operations', items: [
      { label: 'طلبات التسجيل', en: 'Enrollment', path: '/academic/enrollment', icon: 'inbox', badge: '12' },
      { label: 'الطلاب والسجلات', en: 'Student records', path: '/academic/students', icon: 'graduation' },
      { label: 'الجدول وبناء الحصص', en: 'Timetable builder', path: '/academic/timetable/builder', icon: 'calendar' },
      { label: 'النتائج والسجلات', en: 'Results & transcripts', path: '/academic/results', icon: 'award' },
      { label: 'طلبات أكاديمية', en: 'Requests', path: '/academic/requests', icon: 'inbox', badge: '4' },
    ] },
    { label: 'التقارير', en: 'Reports', items: [{ label: 'التقارير الأكاديمية', en: 'Academic reports', path: '/academic/reports', icon: 'bar-chart' }] },
  ],
  teacher: [
    { label: 'الأدوات', en: 'Tools', items: [
      { label: 'مقرراتي', en: 'My courses', path: '/teacher/my-courses', icon: 'book' },
      { label: 'الاختبارات', en: 'Exams', path: '/teacher/exams', icon: 'clipboard' },
      { label: 'المواد التعليمية', en: 'Learning materials', path: '/teacher/learning-materials', icon: 'file' },
      { label: 'الإعلانات', en: 'Announcements', path: '/teacher/announcements', icon: 'message' },
      { label: 'التقارير', en: 'Reports', path: '/teacher/reports', icon: 'bar-chart' },
      { label: 'ملفي الشخصي', en: 'My profile', path: '/teacher/profile', icon: 'users' },
    ] },
    { label: 'مساحتي', en: 'My space', items: [
      { label: 'لوحتي', en: 'My dashboard', path: '/teacher/dashboard', icon: 'layout' },
      { label: 'حصصي ومقرراتي', en: 'My classes', path: '/teacher/my-classes', icon: 'book' },
      { label: 'جدولي', en: 'My timetable', path: '/teacher/timetable', icon: 'calendar' },
    ] },
    { label: 'التدريس', en: 'Teaching', items: [
      { label: 'الحضور', en: 'Attendance', path: '/teacher/attendance', icon: 'check-circle' },
      { label: 'الواجبات', en: 'Assignments', path: '/teacher/assignments', icon: 'file' },
      { label: 'دفتر الدرجات', en: 'Gradebook', path: '/teacher/gradebook', icon: 'award' },
      { label: 'الفصول الافتراضية', en: 'Virtual classes', path: '/teacher/virtual-classes', icon: 'video' },
    ] },
    { label: 'التواصل', en: 'Communication', items: [{ label: 'الإعلانات والرسائل', en: 'Messages', path: '/teacher/messages', icon: 'message' }] },
  ],
  student: [
    { label: 'المتابعة والتواصل', en: 'Progress & communication', items: [
      { label: 'الحضور', en: 'Attendance', path: '/student/attendance', icon: 'check-circle' },
      { label: 'الإشعارات', en: 'Notifications', path: '/student/notifications', icon: 'activity' },
      { label: 'الرسائل', en: 'Messages', path: '/student/messages', icon: 'message' },
      { label: 'الفصول الافتراضية', en: 'Virtual classes', path: '/student/virtual-classes', icon: 'video' },
      { label: 'مركز المساعدة', en: 'Help center', path: '/student/help', icon: 'help' },
      { label: 'الملف الشخصي', en: 'Profile', path: '/student/profile', icon: 'users' },
    ] },
    { label: 'مساحتي التعليمية', en: 'Learning space', items: [
      { label: 'لوحتي', en: 'My dashboard', path: '/student/dashboard', icon: 'layout' },
      { label: 'مقرراتي', en: 'My courses', path: '/student/my-courses', icon: 'book' },
      { label: 'جدولي الدراسي', en: 'My timetable', path: '/student/timetable', icon: 'calendar' },
    ] },
    { label: 'التقييم', en: 'Assessment', items: [
      { label: 'واجباتي', en: 'Assignments', path: '/student/assignments', icon: 'file', badge: '3' },
      { label: 'اختباراتي', en: 'Exams', path: '/student/exams', icon: 'clipboard' },
      { label: 'درجاتي', en: 'Grades', path: '/student/grades', icon: 'award' },
      { label: 'السجل الأكاديمي', en: 'Transcript', path: '/student/transcript', icon: 'file' },
    ] },
    { label: 'الدعم', en: 'Support', items: [
      { label: 'الفصول الافتراضية', en: 'Virtual classes', path: '/student/virtual-classes', icon: 'video' },
      { label: 'المساعدة', en: 'Help', path: '/student/help', icon: 'help' },
    ] },
  ],
  guardian: [
    { label: 'التواصل', en: 'Communication', items: [
      { label: 'الإعلانات', en: 'Announcements', path: '/guardian/announcements', icon: 'message' },
      { label: 'الرسائل', en: 'Messages', path: '/guardian/messages', icon: 'message' },
    ] },
    { label: 'المتابعة', en: 'Follow-up', items: [
      { label: 'لوحة ولي الأمر', en: 'Guardian dashboard', path: '/guardian/dashboard', icon: 'layout' },
      { label: 'الأبناء', en: 'Children', path: '/guardian/children', icon: 'users' },
      { label: 'الحضور', en: 'Attendance', path: '/guardian/attendance', icon: 'check-circle' },
      { label: 'الدرجات', en: 'Grades', path: '/guardian/grades', icon: 'award' },
      { label: 'الجدول', en: 'Timetable', path: '/guardian/timetable', icon: 'calendar' },
    ] },
  ],
  support: [
    { label: 'أدوات الفريق', en: 'Team tools', items: [
      { label: 'العملاء', en: 'Customers', path: '/support/customers', icon: 'building' },
      { label: 'قاعدة المعرفة', en: 'Knowledge base', path: '/support/knowledge-base', icon: 'book' },
    ] },
    { label: 'الدعم', en: 'Support', items: [
      { label: 'لوحة الدعم', en: 'Support dashboard', path: '/support/dashboard', icon: 'layout' },
      { label: 'تذاكر الدعم', en: 'Tickets', path: '/support/tickets', icon: 'inbox', badge: '8' },
      { label: 'قاعدة المعرفة', en: 'Knowledge base', path: '/support/knowledge-base', icon: 'book' },
      { label: 'العملاء', en: 'Customers', path: '/support/customers', icon: 'building' },
    ] },
  ],
}

export const institutions = [
  { id: 'uni-taiz', name: 'جامعة تعز', type: 'جامعة', code: 'TAIZ-UNI', admin: 'د. سامي القيسي', learners: '18,420', plan: 'Enterprise', status: 'نشطة', activity: 'منذ 4 دقائق' },
  { id: 'future-school', name: 'مدرسة المستقبل', type: 'مدرسة', code: 'FUT-SCH', admin: 'أ. ريم الحداد', learners: '2,840', plan: 'Growth', status: 'نشطة', activity: 'منذ 18 دقيقة' },
  { id: 'alnour-college', name: 'كلية النور الأهلية', type: 'كلية', code: 'NOOR-COL', admin: 'د. مازن عبده', learners: '6,120', plan: 'Standard', status: 'قيد المراجعة', activity: 'أمس' },
  { id: 'alhikma-school', name: 'مدارس الحكمة', type: 'مدرسة', code: 'HIK-SCH', admin: 'أ. لينا صالح', learners: '1,960', plan: 'Growth', status: 'معلقة', activity: 'قبل 3 أيام' },
]

export const students = [
  { id: 'ST-24031', name: 'ليان محمد أحمد', track: 'هندسة البرمجيات', section: 'CS-3A', email: 'layan.demo@example.com', phone: '+967 7•• ••• 214', status: 'نشط', date: '2025/09/14' },
  { id: 'ST-24032', name: 'عمر خالد علي', track: 'علوم الحاسوب', section: 'CS-3A', email: 'omar.demo@example.com', phone: '+967 7•• ••• 803', status: 'نشط', date: '2025/09/14' },
  { id: 'ST-24033', name: 'سارة عبدالرحمن', track: 'نظم المعلومات', section: 'IS-2B', email: 'sara.demo@example.com', phone: '+967 7•• ••• 119', status: 'بانتظار التفعيل', date: '2025/09/18' },
  { id: 'ST-24034', name: 'يحيى ناصر', track: 'هندسة البرمجيات', section: 'SE-4A', email: 'yahya.demo@example.com', phone: '+967 7•• ••• 691', status: 'نشط', date: '2025/09/12' },
  { id: 'ST-24035', name: 'نور جمال', track: 'الرياضيات', section: 'MATH-1C', email: 'noor.demo@example.com', phone: '+967 7•• ••• 472', status: 'غير نشط', date: '2025/09/10' },
]

export const teachers = [
  { id: 'T-104', name: 'أ. أحمد السامعي', department: 'علوم الحاسوب', courses: '3 مقررات', classes: '4 شعب', status: 'متاح', last: 'اليوم 08:42' },
  { id: 'T-105', name: 'د. هناء العريقي', department: 'الرياضيات', courses: '2 مقررات', classes: '3 شعب', status: 'في إجازة', last: 'أمس 14:20' },
  { id: 'T-106', name: 'أ. مروان القاسمي', department: 'اللغة العربية', courses: '4 مقررات', classes: '6 شعب', status: 'متاح', last: 'اليوم 09:10' },
]

export const courses = [
  { code: 'CS201', name: 'هندسة البرمجيات', teacher: 'أ. أحمد السامعي', students: '86', progress: '68%', term: 'الفصل الأول', status: 'جاري' },
  { code: 'CS101', name: 'قواعد البيانات', teacher: 'د. هناء العريقي', students: '112', progress: '52%', term: 'الفصل الأول', status: 'جاري' },
  { code: 'AR110', name: 'اللغة العربية', teacher: 'أ. مروان القاسمي', students: '148', progress: '81%', term: 'الفصل الأول', status: 'جاري' },
  { code: 'MATH204', name: 'الرياضيات المتقدمة', teacher: 'د. هناء العريقي', students: '74', progress: '41%', term: 'الفصل الأول', status: 'جاري' },
]

export const activities = [
  { title: 'تم تسجيل مؤسسة جديدة', detail: 'كلية النور الأهلية · منذ 4 دقائق', icon: 'building', tone: 'teal' },
  { title: 'تم نشر نتائج اختبار', detail: 'قواعد البيانات · منذ 24 دقيقة', icon: 'award', tone: 'purple' },
  { title: 'تم رفع ملف طلاب', detail: 'جامعة تعز · 128 سجلًا · منذ ساعة', icon: 'upload', tone: 'orange' },
  { title: 'تحديث صلاحية مستخدم', detail: 'ريم الحداد · منذ ساعتين', icon: 'shield', tone: 'blue' },
]

export const schedule = [
  { time: '08:00', end: '09:30', name: 'هندسة البرمجيات', code: 'CS201', room: 'قاعة 204', tone: 'green' },
  { time: '10:00', end: '11:30', name: 'قواعد البيانات', code: 'CS101', room: 'مختبر 3', tone: 'teal' },
  { time: '12:00', end: '13:00', name: 'اللغة العربية', code: 'AR110', room: 'قاعة 112', tone: 'purple' },
]

export const chartData = [72, 54, 82, 67, 91, 76, 88, 95, 84, 100, 92, 108]

export const allRouteLabels: Record<string, { ar: string; en: string; description: string }> = {
  '/platform/institutions': { ar: 'المؤسسات', en: 'Institutions', description: 'إدارة المؤسسات المسجلة في منصة T-Onlin ومتابعة حالتها.' },
  '/platform/users': { ar: 'مستخدمو المنصة', en: 'Platform users', description: 'إدارة المستخدمين والأدوار والوصول عبر المؤسسات.' },
  '/platform/roles': { ar: 'الأدوار والصلاحيات', en: 'Roles & permissions', description: 'مصفوفة صلاحيات واضحة وقابلة للمراجعة قبل الحفظ.' },
  '/platform/subscriptions': { ar: 'الاشتراكات والخطط', en: 'Plans & subscriptions', description: 'نظرة تجريبية على الخطط وحدود الاستخدام.' },
  '/platform/audit-log': { ar: 'سجل التدقيق', en: 'Audit log', description: 'أحداث تشغيلية للعرض فقط ضمن هذا النموذج الأولي.' },
  '/institution/students': { ar: 'الطلاب', en: 'Students', description: 'سجل الطلاب التجريبي مع البحث والفلاتر والإجراءات.' },
  '/institution/teachers': { ar: 'المعلمون', en: 'Teachers', description: 'دليل المعلمين وتوزيع الحصص والمقررات.' },
  '/institution/courses': { ar: 'المقررات والمواد', en: 'Courses & subjects', description: 'إدارة المقررات والمواد وحالة التقدم.' },
  '/institution/classes': { ar: 'الفصول والشُعب', en: 'Classes & sections', description: 'الفصول والشعب والقاعات المرتبطة بها.' },
  '/institution/exams': { ar: 'الاختبارات', en: 'Exams', description: 'جدول الاختبارات وحالات النشر والمراجعة.' },
  '/institution/reports': { ar: 'التقارير', en: 'Reports', description: 'تقارير تشغيلية قابلة للتصفية والتصدير التجريبي.' },
  '/academic/enrollment': { ar: 'طلبات التسجيل', en: 'Enrollment requests', description: 'مراجعة الطلبات واتخاذ قرار مع سبب واضح.' },
  '/academic/students': { ar: 'السجلات الأكاديمية', en: 'Student records', description: 'بحث سريع في السجل الأكاديمي للطلاب.' },
  '/academic/results': { ar: 'النتائج والسجلات', en: 'Results & transcripts', description: 'مراجعة النتائج وإعدادها للنشر.' },
  '/academic/requests': { ar: 'طلبات أكاديمية', en: 'Academic requests', description: 'طلبات النقل وتغيير الشعبة وتصحيح السجل.' },
  '/teacher/my-classes': { ar: 'حصصي ومقرراتي', en: 'My classes', description: 'مقرراتك وشعبك ومؤشرات تقدم الطلاب.' },
  '/teacher/assignments': { ar: 'الواجبات', en: 'Assignments', description: 'إنشاء الواجبات ومتابعة التسليم والتقييم.' },
  '/teacher/gradebook': { ar: 'دفتر الدرجات', en: 'Gradebook', description: 'جدول درجات تفاعلي مع حالة الحفظ والنشر.' },
  '/teacher/virtual-classes': { ar: 'الفصول الافتراضية', en: 'Virtual classes', description: 'حالات الجدولة والانضمام دون ادعاء تكامل فيديو حقيقي.' },
  '/student/my-courses': { ar: 'مقرراتي', en: 'My courses', description: 'مقرراتك الحالية ونشاطك القادم.' },
  '/student/assignments': { ar: 'واجباتي', en: 'My assignments', description: 'المهام القادمة وحالات التسليم والتغذية الراجعة.' },
  '/student/exams': { ar: 'اختباراتي', en: 'My exams', description: 'مواعيد الاختبارات وقائمة الجاهزية.' },
  '/student/grades': { ar: 'درجاتي', en: 'My grades', description: 'نتائجك المنشورة وتفصيل التقييم.' },
  '/student/transcript': { ar: 'السجل الأكاديمي', en: 'Transcript', description: 'نسخة أولية من السجل الأكاديمي قابلة للطباعة.' },
  '/guardian/children': { ar: 'الأبناء', en: 'Children', description: 'الأبناء المرتبطون بهذا الحساب فقط.' },
  '/support/tickets': { ar: 'تذاكر الدعم', en: 'Support tickets', description: 'قائمة التذاكر التجريبية وحالات المعالجة.' },
}

export function roleLabel(role: Role, lang: Lang) {
  return lang === 'ar' ? roleInfo[role].label : roleInfo[role].en
}

export function routeTitle(path: string, lang: Lang) {
  const exact = allRouteLabels[path]
  if (exact) return lang === 'ar' ? exact.ar : exact.en
  const labels: Record<string, { ar: string; en: string }> = {
    platform: { ar: 'مساحة مالك المنصة', en: 'Platform owner' }, academic: { ar: 'التنسيق الأكاديمي', en: 'Academic coordination' }, teacher: { ar: 'مساحة المعلم', en: 'Teacher workspace' }, student: { ar: 'مساحة الطالب', en: 'Student workspace' }, guardian: { ar: 'مساحة ولي الأمر', en: 'Guardian workspace' },
    dashboard: { ar: 'لوحة التحكم', en: 'Dashboard' }, institutions: { ar: 'المؤسسات', en: 'Institutions' }, institution: { ar: 'المؤسسة', en: 'Institution' }, users: { ar: 'المستخدمون', en: 'Users' }, roles: { ar: 'الأدوار', en: 'Roles' }, permissions: { ar: 'الصلاحيات', en: 'Permissions' }, subscriptions: { ar: 'الاشتراكات', en: 'Subscriptions' }, plans: { ar: 'الخطط', en: 'Plans' }, billing: { ar: 'الفوترة', en: 'Billing' }, usage: { ar: 'الاستخدام', en: 'Usage' }, integrations: { ar: 'التكاملات', en: 'Integrations' }, notifications: { ar: 'الإشعارات', en: 'Notifications' }, 'audit-log': { ar: 'سجل التدقيق', en: 'Audit log' }, support: { ar: 'الدعم', en: 'Support' }, settings: { ar: 'الإعدادات', en: 'Settings' }, profile: { ar: 'الملف الشخصي', en: 'Profile' },
    'academic-years': { ar: 'السنوات الأكاديمية', en: 'Academic years' }, terms: { ar: 'الفصول الدراسية', en: 'Terms' }, structure: { ar: 'الهيكل الأكاديمي', en: 'Academic structure' }, departments: { ar: 'الأقسام', en: 'Departments' }, faculties: { ar: 'الكليات', en: 'Faculties' }, programs: { ar: 'البرامج', en: 'Programs' }, grades: { ar: 'الصفوف والمراحل', en: 'Grades' }, subjects: { ar: 'المواد', en: 'Subjects' }, courses: { ar: 'المقررات', en: 'Courses' }, classes: { ar: 'الفصول', en: 'Classes' }, sections: { ar: 'الشُعب', en: 'Sections' }, rooms: { ar: 'القاعات', en: 'Rooms' }, students: { ar: 'الطلاب', en: 'Students' }, teachers: { ar: 'المعلمون', en: 'Teachers' }, staff: { ar: 'الموظفون', en: 'Staff' }, guardians: { ar: 'أولياء الأمور', en: 'Guardians' }, enrollment: { ar: 'التسجيل', en: 'Enrollment' }, attendance: { ar: 'الحضور', en: 'Attendance' }, timetable: { ar: 'الجدول الدراسي', en: 'Timetable' }, builder: { ar: 'بناء الجدول', en: 'Timetable builder' }, exams: { ar: 'الاختبارات', en: 'Exams' }, results: { ar: 'النتائج', en: 'Results' }, transcripts: { ar: 'كشوف الدرجات', en: 'Transcripts' }, requests: { ar: 'الطلبات الأكاديمية', en: 'Academic requests' }, reports: { ar: 'التقارير', en: 'Reports' },
    'student-records': { ar: 'السجلات الأكاديمية', en: 'Student records' }, 'my-classes': { ar: 'حصصي وشعبي', en: 'My classes' }, 'my-courses': { ar: 'مقرراتي', en: 'My courses' }, course: { ar: 'المقرر', en: 'Course' }, roster: { ar: 'قائمة الطلاب', en: 'Class roster' }, session: { ar: 'جلسة الحضور', en: 'Attendance session' }, assignments: { ar: 'الواجبات', en: 'Assignments' }, submissions: { ar: 'التسليمات', en: 'Submissions' }, gradebook: { ar: 'دفتر الدرجات', en: 'Gradebook' }, 'learning-materials': { ar: 'المواد التعليمية', en: 'Learning materials' }, materials: { ar: 'مواد المقرر', en: 'Course materials' }, community: { ar: 'مجتمع المقرر', en: 'Course community' }, upload: { ar: 'رفع ملف', en: 'Upload' }, 'virtual-classes': { ar: 'الفصول الافتراضية', en: 'Virtual classes' }, messages: { ar: 'الرسائل', en: 'Messages' }, announcements: { ar: 'الإعلانات', en: 'Announcements' }, communications: { ar: 'التواصل', en: 'Communications' }, 'learning-content': { ar: 'المحتوى التعليمي', en: 'Learning content' }, workflows: { ar: 'سير العمل', en: 'Workflows' }, 'academic-settings': { ar: 'الإعداد الأكاديمي', en: 'Academic settings' }, 'grades-management': { ar: 'إدارة الدرجات', en: 'Grade management' }, children: { ar: 'الأبناء', en: 'Children' }, child: { ar: 'ملف الطالب', en: 'Child profile' }, tickets: { ar: 'تذاكر الدعم', en: 'Support tickets' }, 'knowledge-base': { ar: 'قاعدة المعرفة', en: 'Knowledge base' }, customers: { ar: 'العملاء', en: 'Customers' }, help: { ar: 'المساعدة', en: 'Help center' }, edit: { ar: 'تعديل', en: 'Edit' }, new: { ar: 'إنشاء جديد', en: 'Create new' }, import: { ar: 'استيراد الطلاب', en: 'Import students' },
  }
  const segments = path.split('/').filter(Boolean)
  for (const segment of [...segments].reverse()) {
    if (segment.startsWith(':')) continue
    if (segment === 'new') return lang === 'ar' ? 'إنشاء جديد' : 'Create new'
    if (segment === 'edit') return lang === 'ar' ? 'تعديل' : 'Edit'
    if (segment === 'import') return lang === 'ar' ? 'استيراد الطلاب' : 'Import students'
    if (labels[segment]) return lang === 'ar' ? labels[segment].ar : labels[segment].en
  }
  return lang === 'ar' ? 'مساحة العمل' : 'Workspace'
}
