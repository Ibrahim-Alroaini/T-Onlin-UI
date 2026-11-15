export type ExpandedScreen = {
  path: string
  role: 'platform' | 'institution' | 'academic' | 'teacher' | 'student' | 'guardian' | 'support'
  ar: string
  en: string
  module: string
  descriptionAr: string
  descriptionEn: string
  actionsAr: string[]
  actionsEn: string[]
  statesAr: string[]
  statesEn: string[]
}

const groups = {
  platform: {
    role: 'platform' as const,
    module: 'Platform administration',
    items: [
      ['tenants', 'المؤسسات والعملاء', 'Tenants & customers'], ['tenant-details', 'تفاصيل المؤسسة', 'Tenant details'], ['platform-users', 'مستخدمو المنصة', 'Platform users'], ['support', 'مركز دعم المنصة', 'Platform support'], ['audit', 'التدقيق والامتثال', 'Audit & compliance'],
    ],
  },
  institution: {
    role: 'institution' as const,
    module: 'Institution workspace',
    items: [
      ['campuses', 'الحرم والفروع', 'Campuses & branches'], ['academic-calendar', 'التقويم الأكاديمي', 'Academic calendar'], ['policies', 'السياسات', 'Policies'], ['branding', 'قيم الهوية', 'Branding values'], ['organization-tree', 'شجرة المنظمة', 'Organization tree'], ['positions', 'المناصب', 'Positions'], ['role-assignments', 'تعيينات الأدوار', 'Role assignments'], ['delegations', 'التفويضات', 'Delegations'], ['access-simulation', 'محاكاة الوصول', 'Access simulation'],
      ['application-forms', 'نماذج القبول', 'Application forms'], ['applications', 'طلبات القبول', 'Applications'], ['review-queue', 'طابور المراجعة', 'Review queue'], ['interviews', 'المقابلات', 'Interviews'], ['admission-decisions', 'قرارات القبول', 'Admission decisions'], ['applicant-import', 'استيراد المتقدمين', 'Applicant import'],
      ['registration-windows', 'نوافذ التسجيل', 'Registration windows'], ['course-selection', 'اختيار المقررات', 'Course selection'], ['add-drop', 'الإضافة والإسقاط', 'Add / drop'], ['waitlist', 'قائمة الانتظار', 'Waitlist'], ['enrollment-records', 'سجلات التسجيل', 'Enrollment records'], ['transfers-equivalencies', 'النقل والمعادلات', 'Transfers & equivalencies'],
      ['resources', 'الموارد', 'Resources'], ['schedule-conflicts', 'تعارضات الجدول', 'Schedule conflicts'], ['change-requests', 'طلبات تغيير الجدول', 'Schedule change requests'], ['attendance-sessions', 'جلسات الحضور', 'Attendance sessions'], ['attendance-register', 'سجل الحضور', 'Attendance register'], ['excuses', 'الأعذار', 'Excuses'], ['attendance-alerts', 'تنبيهات الحضور', 'Attendance alerts'],
      ['course-catalog', 'كتالوج المقررات', 'Course catalog'], ['my-learning', 'تعلمي', 'My learning'], ['course-overview', 'نظرة المقرر', 'Course overview'], ['course-studio', 'استوديو المقرر', 'Course studio'], ['module-editor', 'محرر الوحدات والدروس', 'Module & lesson editor'], ['content-library', 'مكتبة المحتوى', 'Content library'], ['learning-paths', 'مسارات التعلم', 'Learning paths'], ['discussions', 'النقاشات', 'Discussions'], ['learning-groups', 'مجموعات التعلم', 'Learning groups'], ['peer-review', 'مراجعة الأقران', 'Peer review'], ['ai-tutor', 'المعلم الذكي', 'AI tutor'], ['ai-teacher-assistant', 'مساعد المعلم الذكي', 'AI teacher assistant'], ['learning-analytics', 'تحليلات التعلم', 'Learning analytics'],
      ['assignment-builder', 'منشئ الواجبات', 'Assignment builder'], ['submissions-review', 'مراجعة التسليمات', 'Submission review'], ['rubrics', 'معايير التقييم', 'Rubrics'], ['question-bank', 'بنك الأسئلة', 'Question bank'], ['exam-builder', 'منشئ الاختبارات', 'Exam builder'], ['exam-delivery', 'تقديم الاختبار', 'Exam delivery'], ['proctoring', 'مراقبة الاختبارات', 'Proctoring'], ['assessment-results', 'نتائج التقييم', 'Assessment results'], ['grade-appeals', 'اعتراضات الدرجات', 'Grade appeals'], ['graduation-audit', 'تدقيق التخرج', 'Graduation audit'],
      ['advisor-workspace', 'مساحة المرشد', 'Advisor workspace'], ['student-progress', 'تقدم الطالب', 'Student progress'], ['learning-outcomes', 'مخرجات التعلم', 'Learning outcomes'], ['surveys', 'الاستبيانات', 'Surveys'], ['quality-actions', 'إجراءات الجودة', 'Quality actions'],
      ['training-programs', 'برامج التدريب', 'Training programs'], ['cohorts', 'المجموعات التدريبية', 'Cohorts'], ['trainers', 'المدربون', 'Trainers'], ['training-learners', 'متعلمو التدريب', 'Training learners'], ['certificates', 'الشهادات', 'Certificates'], ['certificate-verification', 'التحقق من الشهادة', 'Certificate verification'],
      ['session-schedule', 'جدولة الجلسات', 'Session schedule'], ['join-lobby', 'ردهة الانضمام', 'Join lobby'], ['host-controls', 'تحكم المضيف', 'Host controls'], ['session-attendance', 'حضور الجلسة', 'Session attendance'], ['recordings', 'التسجيلات', 'Recordings'],
      ['fee-structures', 'هياكل الرسوم', 'Fee structures'], ['invoices', 'الفواتير', 'Invoices'], ['payments', 'المدفوعات', 'Payments'], ['refunds', 'المبالغ المستردة', 'Refunds'], ['reconciliation', 'المطابقة المالية', 'Reconciliation'], ['report-catalog', 'كتالوج التقارير', 'Report catalog'], ['report-builder', 'منشئ التقارير', 'Report builder'], ['report-dashboards', 'لوحات التقارير', 'Report dashboards'], ['report-exports', 'تصدير التقارير', 'Report exports'],
      ['notification-center', 'مركز الإشعارات', 'Notification center'], ['security', 'الأمان', 'Security'],
    ],
  },
  academic: {
    role: 'academic' as const,
    module: 'Academic coordination',
    items: [['advising', 'الإرشاد الأكاديمي', 'Academic advising'], ['registration-approvals', 'اعتمادات التسجيل', 'Registration approvals'], ['grade-approvals', 'اعتماد الدرجات', 'Grade approvals'], ['transcript-requests', 'طلبات السجلات', 'Transcript requests'], ['academic-reports', 'تقارير الأداء الأكاديمي', 'Academic performance reports']],
  },
  teacher: {
    role: 'teacher' as const,
    module: 'Teacher experience',
    items: [['course-studio', 'استوديو المقرر', 'Course studio'], ['lesson-editor', 'محرر الدرس', 'Lesson editor'], ['content-library', 'مكتبة المحتوى', 'Content library'], ['peer-review', 'مراجعة الأقران', 'Peer review'], ['ai-assistant', 'مساعد المعلم الذكي', 'AI assistant'], ['submission-review', 'مراجعة التسليمات', 'Submission review'], ['rubrics', 'معايير التقييم', 'Rubrics'], ['question-bank', 'بنك الأسئلة', 'Question bank'], ['exam-builder', 'منشئ الاختبارات', 'Exam builder'], ['learning-analytics', 'تحليلات التعلم', 'Learning analytics']],
  },
  student: {
    role: 'student' as const,
    module: 'Learner experience',
    items: [['course-catalog', 'كتالوج المقررات', 'Course catalog'], ['course-overview', 'نظرة المقرر', 'Course overview'], ['learner-player', 'مشغل التعلم', 'Learner player'], ['learning-progress', 'التقدم التعليمي', 'Learning progress'], ['discussions', 'النقاشات', 'Discussions'], ['learning-groups', 'مجموعات التعلم', 'Learning groups'], ['peer-review', 'مراجعة الأقران', 'Peer review'], ['ai-tutor', 'المعلم الذكي', 'AI tutor'], ['assessment-results', 'نتائج التقييم', 'Assessment results'], ['grade-appeals', 'اعتراضات الدرجات', 'Grade appeals']],
  },
  guardian: {
    role: 'guardian' as const,
    module: 'Guardian experience',
    items: [['child-progress', 'تقدم الأبناء', 'Child progress'], ['child-alerts', 'تنبيهات الأبناء', 'Child alerts'], ['guardian-reports', 'تقارير المتابعة', 'Guardian reports']],
  },
  support: {
    role: 'support' as const,
    module: 'Support & settings',
    items: [['ticket-workbench', 'معالجة التذاكر', 'Ticket workbench'], ['knowledge-articles', 'مقالات قاعدة المعرفة', 'Knowledge articles'], ['support-audit', 'تدقيق الدعم', 'Support audit'], ['integrations', 'التكاملات', 'Integrations'], ['preferences', 'التفضيلات', 'Preferences']],
  },
}

export const expandedScreens: ExpandedScreen[] = Object.values(groups).flatMap(group => group.items.map(([slug, ar, en]) => ({
  path: `/${group.role}/${slug}`,
  role: group.role,
  ar,
  en,
  module: group.module,
  descriptionAr: `مساحة تشغيلية تفاعلية لـ${ar} ضمن النسخة التجريبية.`,
  descriptionEn: `Interactive ${en.toLowerCase()} workspace for this prototype.`,
  actionsAr: ['إضافة سجل', 'تعديل السجل', 'حذف مع تأكيد', 'تصفية وبحث', 'تصدير تجريبي'],
  actionsEn: ['Add record', 'Edit record', 'Delete with confirmation', 'Filter and search', 'Demo export'],
  statesAr: ['افتراضي', 'تحميل', 'فارغ', 'خطأ قابل لإعادة المحاولة', 'نجاح', 'معطل', 'منع الوصول', 'تغييرات غير محفوظة'],
  statesEn: ['Default', 'Loading', 'Empty', 'Retryable error', 'Success', 'Disabled', 'Permission denied', 'Unsaved changes'],
})))

export const expandedByPath = new Map(expandedScreens.map(screen => [screen.path, screen]))
