import { useEffect, useMemo, useState } from 'react'
import type { LucideIcon } from 'lucide-react'
import './role-switcher.css'
import './crud.css'
import {
  Activity, AlertTriangle, ArrowLeft, ArrowRight, ArrowUpRight, Award, BarChart3, Bell, BookOpen,
  Building2, CalendarDays, Check, CheckCircle2, ChevronDown, ChevronLeft, ChevronRight, CircleDot,
  CircleUserRound, ClipboardList, Clock3, CreditCard, Download, ExternalLink, Eye, FileSpreadsheet,
  FileText, Filter, Globe2, GraduationCap, HelpCircle, Home, Inbox, Layers3, LayoutDashboard,
  LockKeyhole, LogOut, Menu, MessageSquare, MoreHorizontal, Paperclip, Pencil, Play, Plus, RefreshCw,
  RotateCcw, Save, Search, Send, Settings, ShieldCheck, SlidersHorizontal, Sparkles, Trash2, Upload, Mail,
  Users, Video, X, FileCheck2, WifiOff, Mic, Camera, Volume2, Wifi
} from 'lucide-react'
import {
  activities, allRouteLabels, chartData, courses, institutions, navByRole, roleInfo, roleLabel,
  schedule, students, teachers, type InstitutionType, type Lang, type NavItem, type Role, routeTitle
} from './data'
import { demoAccounts, findDemoAccount } from './authData'
import { resourceRows } from './resourceData'
import OperationalWorkspacePage, { ExpandedScreenPage, MessageCenterPage, RecordDetailPage } from './OperationalPages'
import { expandedByPath } from './screenCatalog'

const iconMap: Record<string, LucideIcon> = {
  layout: LayoutDashboard, building: Building2, users: Users, shield: ShieldCheck, 'credit-card': CreditCard,
  activity: Activity, settings: Settings, graduation: GraduationCap, book: BookOpen, layers: Layers3,
  'check-circle': CheckCircle2, calendar: CalendarDays, file: FileText, 'bar-chart': BarChart3,
  inbox: Inbox, award: Award, video: Video, message: MessageSquare, clipboard: ClipboardList,
  help: HelpCircle, upload: Upload, download: Download, filter: Filter, pencil: Pencil,
  save: Save, send: Send, check: Check, plus: Plus, refresh: RefreshCw, clock: Clock3,
  alert: AlertTriangle, lock: LockKeyhole, password: LockKeyhole, email: Mail,
}

const copy = {
  ar: {
    direction: 'rtl', brandLine: 'تعليم إلكتروني وإدارة تعليمية متكاملة', sample: 'بيانات تجريبية', search: 'بحث عام...', notifications: 'الإشعارات', language: 'English', help: 'مركز المساعدة', profile: 'الملف الشخصي', logout: 'تسجيل الخروج', switchRole: 'تجربة دور آخر', institution: 'أكاديمية النور', breadcrumbHome: 'الرئيسية', save: 'حفظ التغييرات', cancel: 'إلغاء', add: 'إضافة', export: 'تصدير', filter: 'تصفية', all: 'الكل', view: 'عرض', edit: 'تعديل', more: 'المزيد', previous: 'السابق', next: 'التالي', results: 'نتائج', noResults: 'لا توجد نتائج مطابقة', retry: 'إعادة المحاولة', close: 'إغلاق', success: 'تمت العملية بنجاح', demoNote: 'هذه واجهة Prototype ببيانات تجريبية وليست اتصالًا فعليًا بقاعدة بيانات.', quickActions: 'إجراءات سريعة', today: 'اليوم', viewAll: 'عرض الكل', recentActivity: 'آخر النشاطات', weeklyTrend: 'النشاط خلال آخر 12 أسبوعًا', upcoming: 'القادم', status: 'الحالة', actions: 'إجراءات', records: 'سجلًا', loading: 'جارٍ التحميل...', role: 'الدور', signIn: 'تسجيل الدخول', requestDemo: 'طلب عرض توضيحي', learnMore: 'اكتشف المزيد', menu: 'القائمة', closeMenu: 'إغلاق القائمة', welcome: 'صباح الخير، أ. أحمد', welcomeStudent: 'مرحبًا ليان، مستعدة ليوم تعلّم جديد؟', welcomeTeacher: 'صباح الخير، أ. أحمد', welcomeAdmin: 'صباح الخير، د. لينا عباس', hero: 'منصة تعليمية متكاملة لإدارة المدارس والجامعات', heroSub: 'اجمع الإدارة الأكاديمية، التعليم الافتراضي، التواصل والتقييم في مساحة هادئة واحدة.', trusted: 'مصممة لفرق التعليم التي تريد وضوحًا أكثر، لا شاشات أكثر.', signInSub: 'ادخل إلى مساحة عملك التجريبية واستكشف التدفقات الأساسية.', email: 'البريد الإلكتروني أو الرقم الجامعي', password: 'كلمة المرور', remember: 'تذكرني على هذا الجهاز', forgot: 'نسيت كلمة المرور؟', demoRole: 'اختر دورًا للتجربة', continue: 'متابعة', viewDashboard: 'استكشف لوحة التحكم', features: 'المزايا', solutions: 'الحلول', about: 'عن المنصة', contact: 'تواصل معنا', publicNav: 'المنتج', systemReady: 'النظام يعمل بشكل طبيعي', dataFresh: 'آخر تحديث منذ 4 دقائق', viewDetails: 'عرض التفاصيل', create: 'إنشاء جديد', addInstitution: 'إضافة مؤسسة', addStudent: 'إضافة طالب', importStudents: 'استيراد طلاب', createClass: 'إنشاء شعبة', buildTimetable: 'بناء الجدول', markAttendance: 'تسجيل الحضور', createAssignment: 'إنشاء واجب', join: 'انضمام', start: 'بدء', publish: 'نشر', draft: 'مسودة', active: 'نشطة', pending: 'قيد المراجعة', suspended: 'معلقة', emptyTitle: 'لا توجد عناصر بعد', emptySub: 'أضف أول عنصر لتظهر البيانات هنا.', toastSaved: 'تم حفظ التغييرات في هذه الجلسة التجريبية.', prototype: 'Prototype', routeNotFound: 'الصفحة غير موجودة', routeNotFoundSub: 'تحقق من الرابط أو عد إلى لوحة التحكم.', backHome: 'العودة للرئيسية', noRealIntegration: 'التكامل غير متصل في النسخة التجريبية', tableSearch: 'ابحث في السجلات...', page: 'صفحة', of: 'من', rows: 'صفوف', allInstitutions: 'كل المؤسسات', allStatuses: 'كل الحالات', noPermission: 'لا تملك صلاحية عرض هذه الصفحة', retryConnection: 'تحقق من الاتصال وأعد المحاولة', offline: 'أنت تعمل دون اتصال — التغييرات محلية فقط.', closeToast: 'إغلاق التنبيه'
  },
  en: {
    direction: 'ltr', brandLine: 'Integrated learning & education management', sample: 'Sample data', search: 'Global search...', notifications: 'Notifications', language: 'العربية', help: 'Help center', profile: 'Profile', logout: 'Sign out', switchRole: 'Try another role', institution: 'Al Noor Academy', breadcrumbHome: 'Home', save: 'Save changes', cancel: 'Cancel', add: 'Add', export: 'Export', filter: 'Filter', all: 'All', view: 'View', edit: 'Edit', more: 'More', previous: 'Previous', next: 'Next', results: 'results', noResults: 'No matching results', retry: 'Try again', close: 'Close', success: 'Action completed', demoNote: 'This is a prototype with sample data, not a live database connection.', quickActions: 'Quick actions', today: 'Today', viewAll: 'View all', recentActivity: 'Recent activity', weeklyTrend: 'Activity over 12 weeks', upcoming: 'Upcoming', status: 'Status', actions: 'Actions', records: 'records', loading: 'Loading...', role: 'Role', signIn: 'Sign in', requestDemo: 'Request a demo', learnMore: 'Learn more', menu: 'Menu', closeMenu: 'Close menu', welcome: 'Good morning, Ahmed', welcomeStudent: 'Hi Layan, ready for a new learning day?', welcomeTeacher: 'Good morning, Ahmed', welcomeAdmin: 'Good morning, Dr. Lina Abbas', hero: 'A complete education platform for schools and universities', heroSub: 'Bring academic operations, virtual learning, communication and assessment into one calm workspace.', trusted: 'Designed for education teams that want more clarity, not more screens.', signInSub: 'Enter your demo workspace and explore the core flows.', email: 'Email or student number', password: 'Password', remember: 'Remember me on this device', forgot: 'Forgot password?', demoRole: 'Choose a demo role', continue: 'Continue', viewDashboard: 'Explore dashboard', features: 'Features', solutions: 'Solutions', about: 'About', contact: 'Contact', publicNav: 'Product', systemReady: 'System operational', dataFresh: 'Updated 4 minutes ago', viewDetails: 'View details', create: 'Create new', addInstitution: 'Add institution', addStudent: 'Add student', importStudents: 'Import students', createClass: 'Create section', buildTimetable: 'Build timetable', markAttendance: 'Mark attendance', createAssignment: 'Create assignment', join: 'Join', start: 'Start', publish: 'Publish', draft: 'Draft', active: 'Active', pending: 'In review', suspended: 'Suspended', emptyTitle: 'Nothing here yet', emptySub: 'Add your first item to see data here.', toastSaved: 'Changes saved in this demo session.', prototype: 'Prototype', routeNotFound: 'Page not found', routeNotFoundSub: 'Check the link or return to the dashboard.', backHome: 'Back home', noRealIntegration: 'Integration is not connected in this prototype', tableSearch: 'Search records...', page: 'Page', of: 'of', rows: 'rows', allInstitutions: 'All institutions', allStatuses: 'All statuses', noPermission: 'You do not have permission to view this page', retryConnection: 'Check your connection and try again', offline: 'You are offline — changes are local only.', closeToast: 'Dismiss notification'
  }
}

type UI = typeof copy.ar

function Icon({ name, size = 18 }: { name: string; size?: number }) {
  const Component = name === 'arrow'
    ? (document.documentElement.dir === 'rtl' ? ArrowLeft : ArrowRight)
    : iconMap[name] || CircleDot
  return <Component size={size} strokeWidth={1.8} aria-hidden="true" />
}

function Logo({ compact = false }: { compact?: boolean }) {
  return <div className={`logo ${compact ? 'logo-compact' : ''}`} aria-label="T-Onlin">
    <span className="logo-signature-dots logo-signature-start" aria-hidden="true"><i/><i/></span>
    <span className="logo-mark" aria-hidden="true"><svg viewBox="0 0 36 36" focusable="false"><path d="M4 15.5 10.5 12v17L4 32.5z" fill="#347b68"/><path d="M13.5 8.5 20.5 4v23l-7 4.5z" fill="#176b59"/><path d="M23 14.5 30 10v18l-7 4.5z" fill="#bd9650"/></svg></span>
    {!compact && <span><strong>T-Onlin</strong></span>}
    <span className="logo-signature-dots logo-signature-end" aria-hidden="true"><i/></span>
  </div>
}
function Button({ children, variant = 'primary', onClick, icon, type = 'button', disabled = false, className = '' }: { children: React.ReactNode; variant?: 'primary' | 'outline' | 'ghost' | 'soft' | 'danger'; onClick?: () => void; icon?: string; type?: 'button' | 'submit'; disabled?: boolean; className?: string }) {
  return <button className={`btn btn-${variant} ${className}`} onClick={onClick} type={type} disabled={disabled}>{icon && <Icon name={icon} size={16} />}{children}</button>
}

function Badge({ children, tone = 'neutral' }: { children: React.ReactNode; tone?: string }) {
  return <span className={`badge badge-${tone}`}>{children}</span>
}

function Card({ children, className = '', flush = false }: { children: React.ReactNode; className?: string; flush?: boolean }) {
  return <section className={`card ${flush ? 'card-flush' : ''} ${className}`}>{children}</section>
}

function StatCard({ label, value, change, icon, tone = 'green' }: { label: string; value: string; change: string; icon: string; tone?: string }) {
  return <Card className="stat-card">
    <div className="stat-head"><span className={`stat-icon stat-${tone}`}><Icon name={icon} size={19} /></span><span className="stat-change">{change}</span></div>
    <div className="stat-value">{value}</div><div className="stat-label">{label}</div>
  </Card>
}

function PageHeader({ title, description, actions, ui, sample = true }: { title: string; description?: string; actions?: React.ReactNode; ui: UI; sample?: boolean }) {
  return <div className="page-header"><div><div className="eyebrow">{sample && <Badge tone="soft">{ui.sample}</Badge>}</div><h1>{title}</h1>{description && <p>{description}</p>}</div><div className="page-actions">{actions}</div></div>
}

function Toast({ message, tone = 'success', onClose, ui }: { message: string; tone?: 'success' | 'error' | 'info'; onClose: () => void; ui: UI }) {
  return <div className={`toast toast-${tone}`} role="status"><span className="toast-symbol">{tone === 'success' ? <Check size={16} /> : tone === 'error' ? <AlertTriangle size={16} /> : <CircleDot size={16} />}</span><span>{message}</span><button aria-label={ui.closeToast} onClick={onClose}><X size={15} /></button></div>
}

function PublicPage({ path, lang, setLang, navigate, ui, institutionType, setInstitutionType, role, setRole }: { path: string; lang: Lang; setLang: (lang: Lang) => void; navigate: (path: string) => void; ui: UI; institutionType: InstitutionType; setInstitutionType: (type: InstitutionType) => void; role: Role; setRole: (role: Role) => void }) {
  const [openFaq, setOpenFaq] = useState(0)
  if (path === '/login') return <LoginPage lang={lang} setLang={setLang} navigate={navigate} ui={ui} institutionType={institutionType} setInstitutionType={setInstitutionType} role={role} setRole={setRole} />
  if (path === '/forgot-password') return <AuthUtility type="forgot" lang={lang} setLang={setLang} navigate={navigate} ui={ui} />
  if (path === '/reset-password') return <AuthUtility type="reset" lang={lang} setLang={setLang} navigate={navigate} ui={ui} />
  if (path === '/register-institution') return <AuthUtility type="register" lang={lang} setLang={setLang} navigate={navigate} ui={ui} />
  if (path === '/verify-account') return <AuthUtility type="verify" lang={lang} setLang={setLang} navigate={navigate} ui={ui} />
  if (['/access-denied', '/not-found', '/session-expired', '/maintenance'].includes(path)) {
    const states = {
      '/access-denied': { title: ui.noPermission, body: lang === 'ar' ? 'هذه الحالة توضيحية؛ يتطلب الوصول الحقيقي تسجيلًا وصلاحية من جهة مخولة.' : 'This is a demo state; real access requires an authenticated, authorized account.', action: ui.signIn, destination: '/login', icon: 'shield' },
      '/not-found': { title: ui.routeNotFound, body: ui.routeNotFoundSub, action: ui.backHome, destination: '/', icon: 'help' },
      '/session-expired': { title: lang === 'ar' ? 'انتهت الجلسة' : 'Session expired', body: lang === 'ar' ? 'انتهت جلسة العرض. سجّل الدخول مجددًا لمواصلة استكشاف النموذج.' : 'The demo session has ended. Sign in again to continue exploring.', action: ui.signIn, destination: '/login', icon: 'lock' },
      '/maintenance': { title: lang === 'ar' ? 'النظام في وضع الصيانة' : 'Maintenance in progress', body: lang === 'ar' ? 'هذه حالة عرض للصيانة؛ لا توجد خدمة خلفية متصلة بهذا النموذج.' : 'This is a demo maintenance state; no backend service is connected.', action: ui.backHome, destination: '/', icon: 'settings' },
    }[path]!
    return <div className="auth-simple" dir={ui.direction}><div className="auth-brand"><Logo /><button className="lang-btn" onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}><Globe2 size={16} />{ui.language}</button></div><Card className="utility-card state-card"><span className="feature-icon"><Icon name={states.icon} size={21} /></span><Badge tone="soft">T-Onlin · {ui.sample}</Badge><h1>{states.title}</h1><p>{states.body}</p><Button onClick={() => navigate(states.destination)} icon="arrow">{states.action}</Button><Button variant="ghost" onClick={() => navigate('/')}>{ui.backHome}</Button></Card></div>
  }
  const isSub = path !== '/'
  const title = path === '/features' ? (lang === 'ar' ? 'كل أدوات المؤسسة في مساحة واحدة' : 'Every institutional tool in one workspace') : path.includes('schools') ? (lang === 'ar' ? 'حلول عملية للمدارس' : 'Practical solutions for schools') : path.includes('universities') ? (lang === 'ar' ? 'تشغيل أكاديمي للجامعات' : 'Academic operations for universities') : path === '/about' ? (lang === 'ar' ? 'نبني وضوحًا في كل خطوة تعليمية' : 'Clarity in every learning step') : path === '/contact' ? (lang === 'ar' ? 'لنتحدث عن مؤسستك' : 'Let’s talk about your institution') : path === '/pricing' ? (lang === 'ar' ? 'خطط تناسب طريقة عمل مؤسستك' : 'Plans shaped around your institution') : path === '/privacy' ? (lang === 'ar' ? 'الخصوصية في النموذج الأولي' : 'Privacy in this prototype') : path === '/terms' ? (lang === 'ar' ? 'شروط استخدام نموذج العرض' : 'Prototype terms of use') : ui.hero
  return <div className="public-shell">
    <header className="public-header"><Logo /><nav><a onClick={() => navigate('/features')}>{ui.features}</a><a onClick={() => navigate('/solutions/schools')}>{ui.solutions}</a><a onClick={() => navigate('/about')}>{ui.about}</a><a onClick={() => navigate('/contact')}>{ui.contact}</a></nav><div className="public-actions"><button className="lang-btn" onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}><Globe2 size={16} />{ui.language}</button><Button variant="ghost" onClick={() => navigate('/login')}>{ui.signIn}</Button><Button onClick={() => navigate('/register-institution')} icon="arrow">{ui.requestDemo}</Button></div></header>
    {isSub ? <section className="public-subpage"><div className="public-sub-hero"><Badge tone="soft">T-Onlin · {ui.sample}</Badge><h1>{title}</h1><p>{ui.heroSub}</p><Button onClick={() => navigate('/login')} icon="arrow">{ui.viewDashboard}</Button></div><div className="subpage-grid"><Card><span className="feature-icon"><Icon name="layout" /></span><h3>{lang === 'ar' ? 'تشغيل متصل' : 'Connected operations'}</h3><p>{lang === 'ar' ? 'من لوحة المؤسسة إلى مساحة الطالب، كل خطوة مرتبطة بسياقها.' : 'From institution admin to student space, every step keeps its context.'}</p></Card><Card><span className="feature-icon teal"><Icon name="shield" /></span><h3>{lang === 'ar' ? 'صلاحيات واضحة' : 'Clear permissions'}</h3><p>{lang === 'ar' ? 'أدوار محددة وأفعال آمنة بدون مفاجآت.' : 'Role-aware actions with safe defaults and no surprises.'}</p></Card><Card><span className="feature-icon purple"><Icon name="bar-chart" /></span><h3>{lang === 'ar' ? 'قرارات مبنية على البيانات' : 'Data-led decisions'}</h3><p>{lang === 'ar' ? 'مؤشرات وتقارير قابلة للفهم قبل أن تكون قابلة للتصدير.' : 'Readable indicators and reports before exportable reports.'}</p></Card></div></section> : <>
      <section className="hero"><div className="hero-copy"><Badge tone="soft">T-Onlin · {ui.sample}</Badge><h1>{ui.hero}</h1><p>{ui.heroSub}</p><div className="hero-actions"><Button onClick={() => navigate('/login')} icon="arrow">{ui.signIn}</Button><Button variant="outline" onClick={() => navigate('/contact')}>{ui.requestDemo}</Button></div><div className="hero-proof"><span className="avatar-stack"><i>أ</i><i>ر</i><i>س</i><i>م</i></span><span>{ui.trusted}</span></div></div><DashboardPreview ui={ui} navigate={navigate} /></section>
      <section className="public-section"><div className="section-intro"><Badge tone="soft">{ui.features}</Badge><h2>{lang === 'ar' ? 'مساحة عمل واحدة، ستة محاور تشغيلية' : 'One workspace, six operating pillars'}</h2><p>{lang === 'ar' ? 'مصممة لتقليل الانتقال بين الأدوات وتحسين لحظة القرار.' : 'Designed to reduce tool switching and improve the moment of decision.'}</p></div><div className="feature-grid">{[['building','إدارة المؤسسات','Institution operations'],['video','التعليم الافتراضي','Virtual learning'],['award','الاختبارات والتقييم','Assessment & grading'],['bar-chart','التحليلات والتقارير','Analytics & reports'],['users','إدارة المستخدمين','People & permissions'],['message','التواصل','Communication']].map(([ic, ar, en]) => <Card key={String(ic)} className="feature-card"><span className="feature-icon"><Icon name={String(ic)} /></span><h3>{lang === 'ar' ? ar : en}</h3><p>{lang === 'ar' ? 'سياق واضح، إجراء قريب، وحالة يمكن فهمها.' : 'Clear context, close action, and a state you can understand.'}</p><ArrowLeft className="feature-arrow" size={18} /></Card>)}</div></section>
      <section className="split-section"><div><Badge tone="soft">{ui.solutions}</Badge><h2>{lang === 'ar' ? 'من المؤسسة إلى الطالب، نفس اللغة التشغيلية' : 'From institution to student, one operating language'}</h2><p>{lang === 'ar' ? 'يبدأ المسار من إعداد المؤسسة ويمر عبر المنسق والمعلم وينتهي بتجربة تعلم مفهومة للطالب.' : 'Start with institution setup, move through coordinators and teachers, and end with a student experience that makes sense.'}</p><Button variant="outline" onClick={() => navigate('/solutions/universities')}>{ui.learnMore}</Button></div><div className="workflow"><div><strong>01</strong><span>{lang === 'ar' ? 'المؤسسة' : 'Institution'}</span></div><div><strong>02</strong><span>{lang === 'ar' ? 'الإدارة الأكاديمية' : 'Academic ops'}</span></div><div><strong>03</strong><span>{lang === 'ar' ? 'المعلم' : 'Teacher'}</span></div><div><strong>04</strong><span>{lang === 'ar' ? 'الطالب' : 'Student'}</span></div></div></section>
      <section className="faq-section"><div className="section-intro"><Badge tone="soft">FAQ</Badge><h2>{lang === 'ar' ? 'أسئلة قبل أن تبدأ' : 'Questions before you start'}</h2></div><div className="faq-list">{[lang === 'ar' ? 'هل هذه نسخة تشغيل حقيقية؟' : 'Is this a live production system?', lang === 'ar' ? 'هل تدعم المنصة العربية والإنجليزية؟' : 'Does it support Arabic and English?', lang === 'ar' ? 'هل يمكن تخصيص الأدوار؟' : 'Can roles be customized?'].map((q, i) => <button className={`faq-item ${openFaq === i ? 'open' : ''}`} key={q} onClick={() => setOpenFaq(openFaq === i ? -1 : i)}><span>{q}</span><ChevronDown size={18} />{openFaq === i && <p>{i === 0 ? ui.demoNote : lang === 'ar' ? 'نعم، RTL/LTR جزء من الشِلّ ويمكن حفظ التفضيل.' : 'Yes. RTL/LTR is part of the shell and the preference persists.'}</p>}</button>)}</div></section>
    </>}
    <footer className="public-footer"><Logo /><span>{ui.brandLine}</span><div><a onClick={() => navigate('/privacy')}>Privacy</a><a onClick={() => navigate('/terms')}>Terms</a><a onClick={() => navigate('/contact')}>{ui.contact}</a></div></footer>
  </div>
}

function DashboardPreview({ ui, navigate }: { ui: UI; navigate: (path: string) => void }) {
  return <div className="dashboard-preview"><div className="preview-window"><div className="preview-top"><Logo compact /><span className="preview-top-icons"><Search size={13} /><Bell size={13} /><i /></span></div><div className="preview-body"><aside><span className="preview-active"><LayoutDashboard size={12} /></span><span><Users size={12} /></span><span><BookOpen size={12} /></span><span><CalendarDays size={12} /></span><span><Settings size={12} /></span></aside><div className="preview-content"><div className="preview-heading"><div><small>{ui.breadcrumbHome} / {ui.institution}</small><h3>{ui.welcomeAdmin}</h3></div><button onClick={() => navigate('/institution/students')}><Plus size={12} /> {ui.addStudent}</button></div><div className="preview-stats"><span><b>2,840</b><small>{ui.role === 'Role' ? 'Students' : 'الطلاب'}</small></span><span><b>124</b><small>المعلمون</small></span><span><b>94%</b><small>الحضور اليوم</small></span></div><div className="preview-chart"><div className="mini-bars">{chartData.slice(-8).map((v, i) => <i key={i} style={{ height: `${v / 1.7}%` }} />)}</div><div className="preview-list"><b>{ui.recentActivity}</b><span><i className="dot green" /> تم تحديث الحضور</span><span><i className="dot teal" /> واجب جديد في CS201</span><span><i className="dot purple" /> إعلان أكاديمي</span></div></div></div></div></div></div>
}

function LoginPage({ lang, setLang, navigate, ui, institutionType, setInstitutionType, role, setRole }: { lang: Lang; setLang: (lang: Lang) => void; navigate: (path: string) => void; ui: UI; institutionType: InstitutionType; setInstitutionType: (type: InstitutionType) => void; role: Role; setRole: (role: Role) => void }) {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const roles: Role[] = institutionType === 'school' ? ['institution', 'platform', 'academic', 'teacher', 'student', 'guardian', 'support'] : ['institution', 'platform', 'academic', 'teacher', 'student', 'support']
  return <div className="auth-shell" dir={ui.direction}>
    <div className="auth-brand"><Logo /><button className="lang-btn" onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}><Globe2 size={16} />{ui.language}</button></div>
    <div className="auth-layout">
      <div className="auth-aside"><Badge tone="soft">T-Onlin · {ui.sample}</Badge><h1>{ui.hero}</h1><p>{ui.heroSub}</p>
        <div className="auth-aside-card"><CheckCircle2 size={18} /><span>{lang === 'ar' ? 'واجهة آمنة وواضحة لكل دور' : 'A clear, role-aware workspace'}</span></div>
        <div className="auth-aside-card"><ShieldCheck size={18} /><span>{lang === 'ar' ? 'بيانات العرض تجريبية وموسومة' : 'Demo data is clearly labeled'}</span></div>
      </div>
      <div className="auth-card">
        <div className="auth-heading"><span className="feature-icon"><LockKeyhole size={19} /></span><h2>{ui.signIn}</h2><p>{ui.signInSub}</p></div>
          <form onSubmit={event => {
            event.preventDefault()
            const account = findDemoAccount(email, password)
            if (!account) {
              setError(lang === 'ar' ? 'بيانات الدخول غير صحيحة. استخدم أحد حسابات العرض أدناه.' : 'Invalid credentials. Use one of the demo accounts below.')
              return
            }
            setError('')
            setRole(account.role)
            setInstitutionType(account.institutionType)
            localStorage.setItem('tonlin-role', account.role)
            localStorage.setItem('tonlin-institution-type', account.institutionType)
            localStorage.setItem('tonlin-user', JSON.stringify(account))
            localStorage.setItem('tonlin-authenticated', 'true')
            navigate(roleInfo[account.role].home)
          }}>
          <label>{ui.email}<input name="email" value={email} onChange={event => setEmail(event.target.value)} autoComplete="username" required placeholder="student@taiz.demo" /></label>
          <label>{ui.password}<div className="password-field"><input name="password" value={password} onChange={event => setPassword(event.target.value)} type={showPassword ? 'text' : 'password'} autoComplete="current-password" required placeholder="Student#2026" /><button type="button" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? (lang === 'ar' ? 'إخفاء كلمة المرور' : 'Hide password') : (lang === 'ar' ? 'إظهار كلمة المرور' : 'Show password')}>{showPassword ? (lang === 'ar' ? 'إخفاء' : 'Hide') : (lang === 'ar' ? 'إظهار' : 'Show')}</button></div></label>
          {error && <div className="field-error" role="alert"><AlertTriangle size={15} />{error}</div>}
          <div className="form-row"><label className="check-label"><input name="remember" type="checkbox" defaultChecked />{ui.remember}</label><a role="link" tabIndex={0} onClick={() => navigate('/forgot-password')} onKeyDown={event => event.key === 'Enter' && navigate('/forgot-password')}>{ui.forgot}</a></div>
          <Button type="submit" className="full-btn" icon="arrow">{ui.continue}</Button>
        </form>
        <div className="demo-auth-note"><InfoIcon /><span>{lang === 'ar' ? 'حسابات العرض مرتبطة بدور ومؤسسة محددة. هذه الحسابات للعرض فقط وليست نظام مصادقة حقيقي.' : 'Demo accounts are tied to a specific role and institution. They are for presentation only, not production authentication.'}</span></div>
        <div className="demo-account-list"><div className="label-line"><span>{lang === 'ar' ? 'حسابات العملاء الجاهزة' : 'Ready demo accounts'}</span><Badge tone="neutral">{demoAccounts.length}</Badge></div>{demoAccounts.map(account => <button type="button" key={account.email} onClick={() => { setEmail(account.email); setPassword(account.password); setRole(account.role); setInstitutionType(account.institutionType) }}><span><b>{lang === 'ar' ? account.nameAr : account.nameEn}</b><small>{account.email} · {roleLabel(account.role, lang, account.institutionType)}</small></span><ArrowLeft size={14} /></button>)}</div>
          <div className="role-select"><div className="label-line"><span>{lang === 'ar' ? 'نوع المؤسسة والدور' : 'Institution type and role'}</span><Badge tone="neutral">{roleLabel(role, lang, institutionType)}</Badge></div><div className="institution-context-switch" role="group" aria-label={lang === 'ar' ? 'نوع المؤسسة' : 'Institution type'}><button type="button" className={institutionType === 'school' ? 'selected' : ''} aria-pressed={institutionType === 'school'} onClick={() => { setInstitutionType('school'); if (role === 'guardian') setRole('student') }}><Building2 size={15} />{lang === 'ar' ? 'مدرسة' : 'School'}</button><button type="button" className={institutionType === 'university' ? 'selected' : ''} aria-pressed={institutionType === 'university'} onClick={() => setInstitutionType('university')}><GraduationCap size={15} />{lang === 'ar' ? 'جامعة' : 'University'}</button></div><div className="role-grid">{roles.map(r => <button type="button" key={r} className={role === r ? 'selected' : ''} aria-pressed={role === r} onClick={() => setRole(r)}><span><Icon name={r === 'student' ? 'graduation' : r === 'teacher' ? 'book' : r === 'platform' ? 'shield' : r === 'academic' ? 'calendar' : r === 'guardian' ? 'users' : r === 'support' ? 'inbox' : 'building'} size={16} /></span>{roleLabel(r, lang, institutionType)}</button>)}</div></div>
        <p className="auth-foot">{lang === 'ar' ? 'تريد استكشاف التسجيل؟' : 'Want to explore registration?'} <a role="link" tabIndex={0} onClick={() => navigate('/register-institution')} onKeyDown={event => event.key === 'Enter' && navigate('/register-institution')}>{ui.requestDemo}</a></p>
      </div>
    </div>
  </div>
}

function AuthUtility({ type, lang, setLang, navigate, ui }: { type: 'forgot' | 'register' | 'verify' | 'reset'; lang: Lang; setLang: (lang: Lang) => void; navigate: (path: string) => void; ui: UI }) {
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')
  const isRegister = type === 'register'
  const isVerify = type === 'verify'
  const isReset = type === 'reset'
  const ar = lang === 'ar'
  const title = isRegister ? (ar ? 'تسجيل مؤسسة جديدة' : 'Register an institution') : isVerify ? (ar ? 'التحقق من الحساب' : 'Verify account') : isReset ? (ar ? 'تعيين كلمة مرور جديدة' : 'Set a new password') : ui.forgot
  const description = isRegister ? (ar ? 'أدخل بيانات جهة الاتصال والمؤسسة لعرض مسار المراجعة.' : 'Enter institution and contact details to preview the review flow.') : isVerify ? (ar ? 'أدخل رمزًا تجريبيًا من ستة أرقام؛ لا يرسل النموذج رسالة فعلية.' : 'Enter a six-digit demo code; this prototype does not send a real message.') : isReset ? (ar ? 'اختر كلمة مرور تجريبية جديدة لتوضيح الخطوة.' : 'Choose a demo password to preview the reset step.') : (ar ? 'أدخل بريدك لمحاكاة إرسال رابط استعادة؛ لا يُرسل بريد فعلي.' : 'Enter your email to simulate a recovery link; no email is sent.')
  const doneTitle = isRegister ? (ar ? 'تم حفظ طلب العرض' : 'Demo request saved') : isVerify ? (ar ? 'تم التحقق في النموذج' : 'Demo verification complete') : isReset ? (ar ? 'تم تحديث كلمة المرور التجريبية' : 'Demo password updated') : (ar ? 'تم إعداد رسالة الاستعادة' : 'Recovery message prepared')
  const doneBody = isRegister ? (ar ? 'هذه بيانات عرض محلية؛ لا تُرسل إلى خادم. انتقل إلى خطوة رمز التحقق التجريبي.' : 'This is local demo data; nothing was sent to a server. Continue to demo verification.') : isVerify ? (ar ? 'نجح الانتقال التجريبي فقط؛ لم يتم إنشاء حساب أو إرسال رمز.' : 'Only the demo transition succeeded; no account or code was created.') : isReset ? (ar ? 'لم تتغير بيانات حساب حقيقي؛ عُرضت حالة النجاح في المتصفح فقط.' : 'No real account changed; success was shown in this browser only.') : (ar ? 'جهزنا رسالة توضيحية داخل المتصفح فقط، ولم نرسل بريدًا حقيقيًا.' : 'A confirmation was prepared in this browser; no real email was sent.')
  return <div className="auth-simple" dir={ui.direction}>
    <div className="auth-brand"><Logo /><button className="lang-btn" onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}><Globe2 size={16} />{ui.language}</button></div>
    <Card className="utility-card">
      {sent ? <div className="utility-success"><span className="success-circle"><Check size={24} /></span><Badge tone="soft">T-Onlin · {ui.sample}</Badge><h1>{doneTitle}</h1><p>{doneBody}</p><Button onClick={() => navigate(isRegister ? '/verify-account' : '/login')} icon="arrow">{isRegister ? (ar ? 'متابعة التحقق' : 'Continue to verification') : ui.signIn}</Button></div> : <>
        <span className="feature-icon"><Icon name={isRegister ? 'building' : isVerify ? 'shield' : 'lock'} /></span><Badge tone="soft">T-Onlin · {ui.sample}</Badge><h1>{title}</h1><p>{description}</p>
        <form onSubmit={event => { event.preventDefault(); const values = new FormData(event.currentTarget); if (isReset && values.get('password') !== values.get('confirm')) { setError(ar ? 'كلمتا المرور غير متطابقتين.' : 'The passwords do not match.'); return } setError(''); setSent(true) }}>
          {isRegister && <>
            <label>{ar ? 'نوع المؤسسة *' : 'Institution type *'}<select name="institutionType" required defaultValue=""><option value="" disabled>{ar ? 'اختر النوع' : 'Choose a type'}</option><option>{ar ? 'مدرسة' : 'School'}</option><option>{ar ? 'جامعة' : 'University'}</option></select></label>
            <div className="form-grid"><label>{ar ? 'اسم المؤسسة بالعربية *' : 'Institution name (Arabic) *'}<input name="nameAr" required placeholder={ar ? 'مثال: جامعة تعز' : 'Taiz University'} /></label><label>{ar ? 'اسم المؤسسة بالإنجليزية *' : 'Institution name (English) *'}<input name="nameEn" required placeholder="Taiz University" /></label></div>
            <div className="form-grid"><label>{ar ? 'الدولة *' : 'Country *'}<input name="country" required defaultValue={ar ? 'اليمن' : 'Yemen'} /></label><label>{ar ? 'المدينة *' : 'City *'}<input name="city" required /></label></div>
            <label>{ar ? 'اسم جهة الاتصال *' : 'Contact name *'}<input name="contact" required /></label>
            <div className="form-grid"><label>{ar ? 'بريد العمل *' : 'Work email *'}<input name="email" type="email" required placeholder="admin@example.edu" /></label><label>{ar ? 'الهاتف *' : 'Phone *'}<input name="phone" type="tel" required pattern="[+0-9() -]{7,24}" placeholder="+967 7xx xxx xxx" /></label></div>
            <label>{ar ? 'حجم المؤسسة (اختياري)' : 'Institution size (optional)'}<select name="size" defaultValue="">{['', '1–500', '501–2,500', '2,501+'].map((value, index) => <option key={value} value={value} disabled={!index}>{index ? value : (ar ? 'اختر نطاقًا' : 'Choose a range')}</option>)}</select></label>
            <label className="check-label"><input name="consent" type="checkbox" required />{ar ? 'أوافق على تواصل فريق العرض بشأن هذا الطلب التجريبي.' : 'I agree to be contacted about this demo request.'}</label>
          </>}
          {!isRegister && !isVerify && !isReset && <label>{ui.email}<input name="email" type="email" required placeholder="demo@tonlin.edu" /></label>}
          {isVerify && <label>{ar ? 'رمز التحقق (6 أرقام) *' : 'Verification code (6 digits) *'}<input name="code" inputMode="numeric" pattern="[0-9]{6}" maxLength={6} required placeholder="123456" /></label>}
          {isReset && <><label>{ar ? 'كلمة المرور الجديدة *' : 'New password *'}<input name="password" type="password" minLength={8} required /></label><label>{ar ? 'تأكيد كلمة المرور *' : 'Confirm password *'}<input name="confirm" type="password" minLength={8} required /></label></>}
          {error && <div className="field-error" role="alert"><AlertTriangle size={15} />{error}</div>}
          <Button type="submit" className="full-btn" icon="arrow">{isRegister ? (ar ? 'مراجعة الطلب' : 'Review request') : isVerify ? (ar ? 'تحقق' : 'Verify') : isReset ? (ar ? 'حفظ كلمة المرور' : 'Save password') : ui.continue}</Button>
        </form>
        <Button variant="ghost" onClick={() => navigate('/login')} className="full-btn">{ui.signIn}</Button>
      </>}
    </Card>
  </div>
}

function AppShell({ path, role, setRole, lang, setLang, navigate, ui, institutionType, setInstitutionType }: { path: string; role: Role; setRole: (role: Role) => void; lang: Lang; setLang: (lang: Lang) => void; navigate: (path: string) => void; ui: UI; institutionType: InstitutionType; setInstitutionType: (type: InstitutionType) => void }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [toast, setToast] = useState<string>('')
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setSearchOpen(true)
      }
      if (event.key === 'Escape') {
        setSearchOpen(false)
        setNotificationsOpen(false)
        setProfileOpen(false)
        setSidebarOpen(false)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])
  const title = routeTitle(path, lang)
  const groups = navByRole[role].map(group => ({ ...group, items: group.items
    .filter(item => !(role === 'institution' && institutionType === 'school' && ['/institution/faculties', '/institution/programs'].includes(item.path)))
    .filter(item => !(role === 'institution' && institutionType === 'university' && item.path === '/institution/grades'))
    .map(item => {
      if (item.path === '/institution/departments' && institutionType === 'school') return { ...item, label: 'الإدارات والأقسام', en: 'School departments' }
      if (item.path === '/institution/grades' && institutionType === 'school') return { ...item, label: 'المراحل والصفوف', en: 'Grades & stages' }
      if (item.path === '/institution/courses' && institutionType === 'school') return { ...item, label: 'المواد الدراسية', en: 'School subjects' }
      if (item.path === '/teacher/my-courses' && institutionType === 'school') return { ...item, label: 'موادي الدراسية', en: 'My school subjects' }
      if (item.path === '/teacher/my-courses' && institutionType === 'university') return { ...item, label: 'مقرراتي الجامعية', en: 'My university courses' }
      if (item.path === '/teacher/dashboard' && institutionType === 'university') return { ...item, label: 'لوحة الدكتور', en: 'Faculty dashboard' }
      if (item.path === '/student/my-courses' && institutionType === 'school') return { ...item, label: 'موادي الدراسية', en: 'My school subjects' }
      return item
    }) })).filter(group => group.items.length > 0)
  const allNav = groups.flatMap(g => g.items)
  const mobilePathSets: Record<Role, string[]> = {
    platform: ['/platform/dashboard', '/platform/institutions', '/platform/users'],
    institution: ['/institution/dashboard', '/institution/students', '/institution/attendance'],
    academic: ['/academic/dashboard', '/academic/students', '/academic/timetable'],
    teacher: ['/teacher/dashboard', '/teacher/my-classes', '/teacher/assignments'],
    student: ['/student/dashboard', '/student/my-courses', '/student/assignments'],
    guardian: ['/guardian/dashboard', '/guardian/children', '/guardian/attendance'],
    support: ['/support/dashboard', '/support/tickets', '/support/knowledge-base'],
  }
  const mobileNavItems = mobilePathSets[role].map(itemPath => allNav.find(item => item.path === itemPath)).filter((item): item is NavItem => Boolean(item))
  const results = allNav.filter(item => `${item.label} ${item.en}`.toLowerCase().includes(search.toLowerCase()))
  const go = (next: string) => {
    setSidebarOpen(false)
    setSearchOpen(false)
    setProfileOpen(false)
    navigate(next)
  }
  const roleIcons: Record<Role, string> = {
    platform: 'shield', institution: 'building', academic: 'calendar', teacher: 'book',
    student: 'graduation', guardian: 'users', support: 'inbox',
  }
  const selectableRoles: Role[] = [role]
  const switchInstitutionType = () => setToast(lang === 'ar' ? 'نوع المؤسسة ثابت حسب الحساب المسجل.' : 'Institution type is fixed by the signed-in account.')
  const signOut = () => {
    localStorage.removeItem('tonlin-role')
    localStorage.removeItem('tonlin-user')
    localStorage.removeItem('tonlin-authenticated')
    go('/login')
  }
  const notificationRows = [
    'تم نشر إعلان أكاديمي جديد',
    'موعد تسليم واجب CS201 غدًا',
    'تم تحديث حالة الحضور',
  ]
  const currentUser = useMemo(() => {
    try { return JSON.parse(localStorage.getItem('tonlin-user') || 'null') as { email?: string; nameAr?: string; nameEn?: string } | null } catch { return null }
  }, [])
  const profileName = currentUser ? (lang === 'ar' ? currentUser.nameAr || currentUser.email : currentUser.nameEn || currentUser.email) : (role === 'institution' ? (lang === 'ar' ? 'د. لينا عباس' : 'Dr. Lina Abbas') : 'أحمد محمد')
  const profileEmail = currentUser?.email || 'demo@tonlin.edu'
  const profileInitial = String(profileName || 'T').slice(0, 2)

  return (
    <div className="app-shell" dir={ui.direction}>
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-top"><Logo /><button className="mobile-close" onClick={() => setSidebarOpen(false)} aria-label={ui.closeMenu}><X size={19} /></button></div>
        <button className="institution-switch" onClick={switchInstitutionType} aria-label={`${ui.institution} · ${roleLabel(role, lang, institutionType)} · ${lang === 'ar' ? 'تبديل نوع المؤسسة' : 'Switch institution type'}`} title={lang === 'ar' ? 'اضغط للتبديل بين المدرسة والجامعة' : 'Switch between school and university'}>
          <span className="institution-logo">{institutionType === 'school' ? 'م' : 'ج'}</span><span><b>{ui.institution}</b><small>{roleLabel(role, lang, institutionType)} · {lang === 'ar' ? (institutionType === 'school' ? 'مدرسة' : 'جامعة') : (institutionType === 'school' ? 'School' : 'University')}</small></span><ChevronDown size={15} />
        </button>
        <nav className="side-nav" aria-label={lang === 'ar' ? 'التنقل الرئيسي' : 'Main navigation'}>
          {groups.map(group => <div className="nav-group" key={group.label}>
            <div className="nav-group-label">{lang === 'ar' ? group.label : group.en}</div>
            {group.items.map(item => <button className={`nav-item ${path === item.path || (path.startsWith(item.path + '/') && !item.path.includes('dashboard')) ? 'active' : ''}`} key={item.path} onClick={() => go(item.path)} aria-current={path === item.path ? 'page' : undefined}>
              <Icon name={item.icon} size={17} /><span>{lang === 'ar' ? item.label : item.en}</span>{item.badge && <Badge tone="nav">{item.badge}</Badge>}
            </button>)}
          </div>)}
        </nav>
        <div className="sidebar-bottom">
          <div className="demo-pill"><Sparkles size={15} /><span><b>{ui.prototype}</b><small>{ui.sample}</small></span></div>
          <button className="nav-item" onClick={signOut}><LogOut size={17} /><span>{ui.logout}</span></button>
        </div>
      </aside>
      {sidebarOpen && <button className="sidebar-overlay" onClick={() => setSidebarOpen(false)} aria-label={ui.closeMenu} />}
      <nav className="mobile-nav" aria-label={lang === 'ar' ? 'التنقل السريع' : 'Quick navigation'}>
        {mobileNavItems.map(item => <button key={item.path} className={`mobile-nav-item ${path === item.path ? 'active' : ''}`} onClick={() => go(item.path)} aria-current={path === item.path ? 'page' : undefined}>
          <Icon name={item.icon} size={19} /><span>{lang === 'ar' ? item.label : item.en}</span>
        </button>)}
        <button className="mobile-nav-item" onClick={() => setSidebarOpen(true)} aria-label={ui.menu}>
          <Menu size={19} aria-hidden="true" /><span>{ui.menu}</span>
        </button>
      </nav>
      <main className="main-area">
        <header className="topbar">
          <div className="topbar-start">
            <button className="menu-btn" onClick={() => setSidebarOpen(true)} aria-label={ui.menu}><Menu size={20} /></button>
            <div className="breadcrumbs"><button onClick={() => go(roleInfo[role].home)}><Home size={14} />{ui.breadcrumbHome}</button><ChevronLeft size={14} /><span>{title}</span></div>
          </div>
          <div className="topbar-actions">
            <button className="search-trigger" onClick={() => setSearchOpen(true)} aria-label={`${ui.search} (Ctrl+K)`}><Search size={16} /><span>{ui.search}</span><kbd>⌘ K</kbd></button>
            <button className="icon-btn" aria-label={ui.notifications} aria-expanded={notificationsOpen} onClick={() => setNotificationsOpen(!notificationsOpen)}><Bell size={18} /><i className="notification-dot" /></button>
            <button className="lang-switch" onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}><Globe2 size={16} /><span>{ui.language}</span></button>
            <div className="profile-wrap">
              <button className="profile-trigger" onClick={() => setProfileOpen(!profileOpen)} aria-expanded={profileOpen} aria-haspopup="menu">
                <span className="avatar">{profileInitial}</span><span className="profile-name"><b>{profileName}</b><small>{roleLabel(role, lang, institutionType)}</small></span><ChevronDown size={15} />
              </button>
              {profileOpen && <div className="profile-menu" role="menu">
                <div className="profile-menu-head"><span className="avatar large">{profileInitial}</span><span><b>{profileName}</b><small>{profileEmail}</small></span></div>
                <button role="menuitem" onClick={() => go(`/${role}/profile`)}><CircleUserRound size={16} />{ui.profile}</button>
                <button role="menuitem" onClick={() => go(`/${role}/settings`)}><Settings size={16} />{lang === 'ar' ? 'الإعدادات' : 'Settings'}</button>
                <div className="role-switcher-label">{ui.switchRole}</div>
                <div className="role-switcher">{selectableRoles.map(option => <button role="menuitemradio" aria-checked={role === option} className={role === option ? 'selected' : ''} key={option} onClick={() => { setProfileOpen(false); setRole(option) }}>
                  <Icon name={roleIcons[option]} size={15} /><span>{roleLabel(option, lang, institutionType)}</span>{role === option && <Check size={14} />}
                </button>)}</div>
                <button className="danger-text" role="menuitem" onClick={signOut}><LogOut size={16} />{ui.logout}</button>
              </div>}
            </div>
          </div>
        </header>
        {notificationsOpen && <div className="notification-drawer" role="region" aria-label={ui.notifications}>
          <div className="drawer-head"><div><b>{ui.notifications}</b><small>3 {lang === 'ar' ? 'جديدة' : 'new'}</small></div><button onClick={() => setNotificationsOpen(false)} aria-label={ui.close}><X size={17} /></button></div>
          {notificationRows.map((message, index) => <div className="notification-item" key={message}>
            <span className={`notification-icon tone-${index}`}><Bell size={14} /></span><span><b>{message}</b><small>{index + 1} {lang === 'ar' ? 'ساعة مضت' : 'hours ago'}</small></span>
          </div>)}
          <Button variant="soft" onClick={() => go(`/${role}/notifications`)} className="full-btn">{ui.viewAll}</Button>
        </div>}
        <div className="content-wrap"><div className="offline-banner"><WifiOff size={14} />{ui.demoNote}</div>{renderPage(path, { role, lang, institutionType, navigate: go, ui, setToast })}</div>
      </main>
      {searchOpen && <div className="search-overlay" role="dialog" aria-modal="true" aria-label={ui.search} onMouseDown={event => { if (event.target === event.currentTarget) setSearchOpen(false) }}>
        <div className="search-modal">
          <div className="search-modal-head"><Search size={18} /><input autoFocus value={search} onChange={event => setSearch(event.target.value)} placeholder={ui.search} /><button onClick={() => setSearchOpen(false)} aria-label={ui.close}><X size={18} /></button></div>
          <div className="search-results">{results.length ? results.map(item => <button key={item.path} onClick={() => go(item.path)}><span className="result-icon"><Icon name={item.icon} size={16} /></span><span><b>{lang === 'ar' ? item.label : item.en}</b><small>{item.path}</small></span><ArrowUpRight size={15} /></button>) : <EmptyState ui={ui} compact />}</div>
          <div className="search-hint"><kbd>ESC</kbd> {ui.close}</div>
        </div>
      </div>}
      {toast && <Toast message={toast} onClose={() => setToast('')} ui={ui} />}
    </div>
  )
}

function renderPage(path: string, ctx: { role: Role; lang: Lang; institutionType: InstitutionType; navigate: (path: string) => void; ui: UI; setToast: (message: string) => void }) {
  const { role, lang, institutionType, navigate, ui, setToast } = ctx
  if (path.includes('dashboard')) return <DashboardPage role={role} lang={lang} ui={ui} institutionType={institutionType} navigate={navigate} setToast={setToast} />
  if (path === '/institution/students/import') return <ImportPage ui={ui} navigate={navigate} setToast={setToast} />
  if (path.includes('/teacher/attendance')) return <AttendancePage ui={ui} setToast={setToast} />
  if (path.includes('/teacher/assignments/new')) return <AssignmentForm ui={ui} navigate={navigate} setToast={setToast} />
  if (/^\/(teacher\/(submissions|assignments|roster)|student\/(assignments|submissions)|academic\/enrollment|support\/tickets|guardian\/child|platform\/users|institution\/(students|teachers|staff|guardians|users))\/(?!new$|edit$)[^/]+$/.test(path)) return <RecordDetailPage path={path} role={role} lang={lang} institutionType={institutionType} navigate={navigate} notify={setToast} />
  if (path.includes('/teacher/assignments') || path === '/student/assignments') return <AssignmentsPage path={path} ui={ui} navigate={navigate} setToast={setToast} />
  if (path.includes('gradebook') || path.includes('/student/grades')) return <GradebookPage path={path} ui={ui} setToast={setToast} />
  if (path.includes('timetable')) return <TimetablePage path={path} ui={ui} navigate={navigate} setToast={setToast} />
  if (path === '/institution/courses') return <CourseCatalogPage ui={ui} navigate={navigate} institutionType={institutionType} />
  if (path === '/teacher/virtual-classes/sessions') return <VirtualClassesPage ui={ui} setToast={setToast} />
  if (path.includes('/teacher/virtual-classes')) return <LiveLearningCheckPage ui={ui} navigate={navigate} setToast={setToast} />
  if (path.includes('virtual-classes')) return <VirtualClassesPage ui={ui} setToast={setToast} />
  if (path.includes('settings') || path.includes('profile')) return <SettingsPage path={path} ui={ui} setToast={setToast} institutionType={institutionType} />
  if (path.includes('/new') || path.includes('/edit')) return <FormPage path={path} ui={ui} navigate={navigate} setToast={setToast} />
  if (path.includes('/reports')) return <ReportsPage ui={ui} setToast={setToast} />
  if (path.match(/\/institutions\/[^/]+$/)) return <InstitutionDetailPage ui={ui} navigate={navigate} setToast={setToast} />
  if (path.includes('/institution/attendance') || path.includes('/academic/attendance') || path.includes('/guardian/attendance')) return <AttendanceOverviewPage ui={ui} navigate={navigate} setToast={setToast} />
  if (path.includes('/transcript')) return <TranscriptPage ui={ui} setToast={setToast} />
  if (path.includes('/course/')) return <CourseDetailPage ui={ui} navigate={navigate} setToast={setToast} />
  if (path.includes('/messages')) return <MessageCenterPage path={path} role={role} lang={lang} institutionType={institutionType} navigate={navigate} notify={setToast} />
  if (path.includes('/help') || path.includes('/knowledge-base')) return <HelpPage ui={ui} />
  if (expandedByPath.has(path)) return <ExpandedScreenPage path={path} role={role} lang={lang} institutionType={institutionType} navigate={navigate} notify={setToast} />
  const config = getListConfig(path, lang)
  if (config) return <DataTablePage path={path} config={config} ui={ui} navigate={navigate} setToast={setToast} />
  return <OperationalWorkspacePage path={path} role={role} lang={lang} institutionType={institutionType} navigate={navigate} notify={setToast} />
}

function DashboardPage({ role, lang, ui, institutionType, navigate, setToast }: { role: Role; lang: Lang; ui: UI; institutionType: InstitutionType; navigate: (path: string) => void; setToast: (message: string) => void }) {
  if (role === 'institution') return <InstitutionDashboardReference ui={ui} institutionType={institutionType} navigate={navigate} setToast={setToast} />
  const data: Record<Role, { title: string; sub: string; stats: [string, string, string, string, string][]; action: [string, string, string][] }> = {
    platform: { title: lang === 'ar' ? 'لوحة المنصة' : 'Platform dashboard', sub: lang === 'ar' ? 'نظرة تشغيلية على المؤسسات والاستخدام والدعم.' : 'Operational view of institutions, usage and support.', stats: [['إجمالي المؤسسات','126','+12.4%','building','green'],['المؤسسات النشطة','118','+8.2%','check-circle','teal'],['المستخدمون','28,430','+16.8%','users','purple'],['تذاكر الدعم','14','-4.1%','inbox','orange']], action: [['إضافة مؤسسة','/platform/institutions/new','building'],['دعوة مدير','/platform/users/new','users'],['مراجعة الاستخدام','/platform/usage','bar-chart']] },
    institution: { title: lang === 'ar' ? 'لوحة المؤسسة' : 'Institution dashboard', sub: lang === 'ar' ? 'كل ما تحتاجه لتشغيل جامعة تعز في لمحة واحدة.' : 'Everything you need to operate Taiz University at a glance.', stats: [['الطلاب','2,840','+6.4%','graduation','green'],['المعلمون','124','+3.1%','users','teal'],['الشُعب','86','+8.6%','layers','purple'],['الحضور اليوم','94%','+2.4%','check-circle','orange']], action: [['إضافة طالب','/institution/students/new','graduation'],['استيراد طلاب','/institution/students/import','upload'],['بناء الجدول','/institution/timetable','calendar']] },
    academic: { title: lang === 'ar' ? 'لوحة التنسيق الأكاديمي' : 'Academic operations', sub: lang === 'ar' ? 'رتّب الطلبات، الجداول والنتائج قبل أن تتحول إلى عوائق.' : 'Keep enrollment, timetables and results moving.', stats: [['طلبات التسجيل','12','3 جديدة','inbox','orange'],['الطلاب النشطون','2,840','+6.4%','graduation','green'],['ملاحظات الجدول','6','تحتاج مراجعة','calendar','purple'],['اختبارات قادمة','18','هذا الشهر','clipboard','teal']], action: [['مراجعة التسجيل','/academic/enrollment','inbox'],['بناء الجدول','/academic/timetable/builder','calendar'],['مراجعة النتائج','/academic/results','award']] },
    teacher: { title: lang === 'ar' ? 'لوحة المعلم' : 'Teacher dashboard', sub: lang === 'ar' ? 'تركيز اليوم: الحصة القادمة، الحضور، وما يحتاج إلى تقييم.' : 'Focus today: your next class, attendance and grading.', stats: [['حصص اليوم','3','الحصة التالية 10:00','calendar','green'],['للتقييم','18','5 متأخرة','file','orange'],['نسبة الحضور','92%','هذا الفصل','check-circle','teal'],['اختبارات قادمة','2','هذا الأسبوع','award','purple']], action: [['تسجيل الحضور','/teacher/attendance','check-circle'],['إنشاء واجب','/teacher/assignments/new','file'],['فتح دفتر الدرجات','/teacher/gradebook','award']] },
    student: { title: lang === 'ar' ? 'لوحة الطالب' : 'Student dashboard', sub: lang === 'ar' ? 'كل موعدك الدراسي ومهامك القادمة في مكان واحد.' : 'Your timetable and next learning tasks in one place.', stats: [['المقررات','6','هذا الفصل','book','green'],['واجبات قادمة','3','أقربها غدًا','file','orange'],['نسبة الحضور','92%','ممتاز','check-circle','teal'],['المعدل الحالي','88%','+4.2%','award','purple']], action: [['فتح المقرر','/student/course/cs201','book'],['تسليم واجب','/student/assignments','upload'],['الانضمام لفصل','/student/virtual-classes','video']] },
    guardian: { title: lang === 'ar' ? 'لوحة ولي الأمر' : 'Guardian dashboard', sub: lang === 'ar' ? 'متابعة الأبناء المرتبطين بالحساب فقط.' : 'Follow linked children only.', stats: [['الأبناء','2','مرتبطان','users','green'],['الحضور','94%','هذا الشهر','check-circle','teal'],['متوسط الدرجات','86%','+2.1%','award','purple'],['إعلانات جديدة','5','تحتاج القراءة','inbox','orange']], action: [['عرض الأبناء','/guardian/children','users'],['متابعة الحضور','/guardian/attendance','check-circle'],['عرض الدرجات','/guardian/grades','award']] },
    support: { title: lang === 'ar' ? 'لوحة الدعم' : 'Support dashboard', sub: lang === 'ar' ? 'رتّب التذاكر، الأولويات، واتفاقية مستوى الخدمة.' : 'Triage tickets, priorities and service levels.', stats: [['تذاكر مفتوحة','8','3 عالية الأولوية','inbox','orange'],['زمن الاستجابة','92%','ضمن SLA','clock','green'],['المؤسسات','126','عملاء نشطون','building','teal'],['تصعيدات','3','تحتاج متابعة','alert','purple']], action: [['فتح التذاكر','/support/tickets','inbox'],['قاعدة المعرفة','/support/knowledge-base','book'],['العملاء','/support/customers','building']] },
  }
  const currentBase = data[role]
  const current = role === 'teacher' && institutionType === 'university' ? { ...currentBase, title: lang === 'ar' ? 'لوحة الدكتور' : 'Faculty dashboard', sub: lang === 'ar' ? 'مقرراتك الجامعية، الحصص، والتقييمات التي تحتاج إلى متابعة.' : 'Your university courses, sessions and grading tasks at a glance.' } : currentBase
  const welcome = role === 'student' ? ui.welcomeStudent : role === 'teacher' ? ui.welcomeTeacher : ui.welcome
  return <><PageHeader title={current.title} description={current.sub} ui={ui} actions={<><Button variant="ghost" icon="refresh" onClick={() => setToast(ui.toastSaved)}>{ui.retry}</Button><Button onClick={() => navigate(current.action[0][1])} icon={current.action[0][2]}>{current.action[0][0]}</Button></>} /><div className="welcome-strip"><div><span className="welcome-kicker">{ui.today} · {ui.institution}</span><h2>{welcome}</h2><p>{ui.demoNote}</p></div><div className="welcome-pattern"><Sparkles size={22} /><span>{ui.systemReady}<small>{ui.dataFresh}</small></span></div></div><div className="stats-grid">{current.stats.map(([label, value, change, icon, tone]) => <StatCard key={label} label={label} value={value} change={change} icon={icon} tone={tone} />)}</div><div className="dashboard-grid"><Card className="chart-card"><div className="card-heading"><div><h3>{ui.weeklyTrend}</h3><p>{ui.sample} · {ui.dataFresh}</p></div><button className="select-like">{lang === 'ar' ? 'آخر 12 أسبوعًا' : 'Last 12 weeks'} <ChevronDown size={14} /></button></div><div className="chart"><div className="chart-y"><span>120</span><span>80</span><span>40</span><span>0</span></div><div className="bars">{chartData.map((v, i) => <div className="bar-col" key={i}><i style={{ height: `${v / 1.25}%` }} /><span>{['أ','أ','س','س','أ','أ','س','س','أ','أ','س','س'][i]}</span></div>)}</div></div></Card><Card><div className="card-heading"><div><h3>{ui.upcoming}</h3><p>{ui.today} · {ui.institution}</p></div><button className="link-btn" onClick={() => navigate(role === 'student' ? '/student/timetable' : '/institution/timetable')}>{ui.viewAll}<ArrowLeft size={15} /></button></div><div className="schedule-list">{schedule.map(item => <div className="schedule-item" key={item.code}><div className={`schedule-time schedule-${item.tone}`}><b>{item.time}</b><small>{item.end}</small></div><div><b>{item.name}</b><small>{item.code} · {item.room}</small></div><ChevronLeft size={15} /></div>)}</div></Card></div><div className="dashboard-grid lower-grid"><Card><div className="card-heading"><div><h3>{ui.recentActivity}</h3><p>{ui.sample}</p></div><button className="link-btn" onClick={() => navigate('/platform/audit-log')}>{ui.viewAll}<ArrowLeft size={15} /></button></div><div className="activity-list">{activities.map(item => <div className="activity-item" key={item.title}><span className={`activity-icon activity-${item.tone}`}><Icon name={item.icon} size={16} /></span><span><b>{item.title}</b><small>{item.detail}</small></span><button aria-label={ui.more}><MoreHorizontal size={16} /></button></div>)}</div></Card><Card><div className="card-heading"><div><h3>{ui.quickActions}</h3><p>{lang === 'ar' ? 'اختصارات للمهام التي تتكرر يوميًا.' : 'Shortcuts for daily work.'}</p></div></div><div className="quick-actions">{current.action.map(([label, path, icon]) => <button key={path} onClick={() => navigate(path)}><span className="quick-icon"><Icon name={icon} size={17} /></span><span>{label}</span><ArrowUpRight size={15} /></button>)}</div></Card></div></>
}

function getListConfig(path: string, lang: Lang) {
  const label = routeTitle(path, lang)
  const resourceKey = path.split('/').filter(Boolean).filter(segment => !segment.startsWith(':')).at(-1) || ''
  const resource = resourceRows[resourceKey]
  if (resource) {
    const columns = lang === 'ar' ? ['السجل', 'التفاصيل', 'الحالة'] : ['Record', 'Details', 'Status']
    const rows = resource.map(([id, nameAr, nameEn, detailAr, detailEn, statusAr, statusEn]) => ({
      id,
      [columns[0]]: lang === 'ar' ? nameAr : nameEn,
      [columns[1]]: lang === 'ar' ? detailAr : detailEn,
      [columns[2]]: lang === 'ar' ? statusAr : statusEn,
      السجل: nameAr, التفاصيل: detailAr, الحالة: statusAr,
      Record: nameEn, Details: detailEn, Status: statusEn,
    }))
    return { title: label, description: allRouteLabels[path]?.description || (lang === 'ar' ? 'بيانات نموذجية توضيحية؛ لا تمثل سجلات تشغيلية حقيقية.' : 'Illustrative sample data; these are not live operational records.'), addLabel: lang === 'ar' ? `إضافة ${label}` : `Add ${label}`, addPath: `${path}/new`, columns, rows }
  }
  if (path === '/platform/institutions') return { title: label, description: allRouteLabels[path]?.description || '', addLabel: lang === 'ar' ? 'إضافة مؤسسة' : 'Add institution', addPath: '/platform/institutions/new', columns: lang === 'ar' ? ['المؤسسة','النوع','الرمز','المدير','المتعلمون','الخطة','الحالة'] : ['Institution','Type','Code','Admin','Learners','Plan','Status'], rows: institutions.map(i => ({ id: i.id, المؤسسة: i.name, النوع: i.type, الرمز: i.code, المدير: i.admin, المتعلمون: i.learners, الخطة: i.plan, الحالة: i.status, Institution: i.name, Type: i.type, Code: i.code, Admin: i.admin, Learners: i.learners, Plan: i.plan, Status: i.status })) }
  if (path.includes('/students')) return { title: label, description: allRouteLabels[path]?.description || '', addLabel: lang === 'ar' ? 'إضافة طالب' : 'Add student', addPath: '/institution/students/new', columns: lang === 'ar' ? ['الرقم','اسم الطالب','البرنامج','الشعبة','البريد','الحالة'] : ['ID','Student','Program','Section','Email','Status'], rows: students.map(s => ({ id: s.id, الرقم: s.id, 'اسم الطالب': s.name, البرنامج: s.track, الشعبة: s.section, البريد: s.email, الحالة: s.status, ID: s.id, Student: s.name, Program: s.track, Section: s.section, Email: s.email, Status: s.status })) }
  if (path.includes('/teachers')) return { title: label, description: allRouteLabels[path]?.description || '', addLabel: lang === 'ar' ? 'دعوة معلم' : 'Invite teacher', addPath: '/institution/teachers/new', columns: lang === 'ar' ? ['المعلم','القسم','المقررات','الشُعب','الحالة','آخر دخول'] : ['Teacher','Department','Courses','Sections','Status','Last login'], rows: teachers.map(t => ({ id: t.id, المعلم: t.name, القسم: t.department, المقررات: t.courses, الشُعب: t.classes, الحالة: t.status, 'آخر دخول': t.last, Teacher: t.name, Department: t.department, Courses: t.courses, Sections: t.classes, Status: t.status, 'Last login': t.last })) }
  if (path.includes('/courses')) return { title: label, description: allRouteLabels[path]?.description || '', addLabel: lang === 'ar' ? 'إضافة مقرر' : 'Add course', addPath: '/institution/courses/new', columns: lang === 'ar' ? ['الرمز','المقرر','المعلم','الطلاب','التقدم','الحالة'] : ['Code','Course','Teacher','Students','Progress','Status'], rows: courses.map(c => ({ id: c.code, الرمز: c.code, المقرر: c.name, المعلم: c.teacher, الطلاب: c.students, التقدم: c.progress, الحالة: c.status, Code: c.code, Course: c.name, Teacher: c.teacher, Students: c.students, Progress: c.progress, Status: c.status })) }
  if (path.includes('/classes')) return { title: label, description: allRouteLabels[path]?.description || '', addLabel: lang === 'ar' ? 'إنشاء شعبة' : 'Create section', addPath: '/institution/classes/new', columns: lang === 'ar' ? ['الشعبة','المقرر','المعلم','الغرفة','عدد الطلاب','الحالة'] : ['Section','Course','Teacher','Room','Students','Status'], rows: ['CS-3A','CS-3B','IS-2B','MATH-1C'].map((s, i) => ({ id: s, الشعبة: s, المقرر: courses[i % courses.length].name, المعلم: teachers[i % teachers.length].name, الغرفة: ['قاعة 204','مختبر 3','قاعة 112','قاعة 205'][i], 'عدد الطلاب': ['32','29','28','36'][i], الحالة: 'نشطة', Section: s, Course: courses[i % courses.length].name, Teacher: teachers[i % teachers.length].name, Room: ['Room 204','Lab 3','Room 112','Room 205'][i], Students: ['32','29','28','36'][i], Status: 'Active' })) }
  if (path.includes('/enrollment') || path.includes('/requests')) return { title: label, description: allRouteLabels[path]?.description || '', addLabel: lang === 'ar' ? 'تصدير القائمة' : 'Export list', addPath: path, columns: lang === 'ar' ? ['الطلب','المتقدم','البرنامج','التاريخ','الحالة','المراجع'] : ['Request','Applicant','Program','Date','Status','Reviewer'], rows: ['ENR-3021','ENR-3022','REQ-118','REQ-119'].map((id, i) => ({ id, الطلب: id, المتقدم: ['سمية علي','خالد حسن','ياسمين عمر','محمد ناصر'][i], البرنامج: ['هندسة البرمجيات','علوم الحاسوب','تغيير شعبة','تصحيح سجل'][i], التاريخ: ['15/09/2025','15/09/2025','14/09/2025','12/09/2025'][i], الحالة: ['قيد المراجعة','مقبول','بانتظار معلومات','قيد المراجعة'][i], المراجع: ['أ. نوال','أ. سامي','—','أ. نوال'][i], Request: id, Applicant: ['Somaya Ali','Khaled Hassan','Yasmin Omar','Mohammed Nasser'][i], Program: ['Software Engineering','Computer Science','Section change','Record correction'][i], Date: ['15 Sep 2025','15 Sep 2025','14 Sep 2025','12 Sep 2025'][i], Status: ['In review','Approved','Needs info','In review'][i], Reviewer: ['Nawal','Sami','—','Nawal'][i] })) }
  if (path.includes('/subscriptions')) return { title: label, description: allRouteLabels[path]?.description || '', addLabel: lang === 'ar' ? 'إنشاء خطة' : 'Create plan', addPath: '/platform/plans/new', columns: lang === 'ar' ? ['الخطة','المؤسسات','المستخدمون','الدورة','الحالة'] : ['Plan','Institutions','Users','Cycle','Status'], rows: [['Enterprise','12','25,000','سنوي','نشطة'],['Growth','68','8,000','سنوي','نشطة'],['Standard','46','2,500','شهري','نشطة']].map((r, i) => ({ id: r[0], الخطة:r[0], المؤسسات:r[1], المستخدمون:r[2], الدورة:r[3], الحالة:r[4], Plan:r[0], Institutions:r[1], Users:r[2], Cycle:r[3], Status:'Active' })) }
  if (path.includes('/users')) return { title: label, description: allRouteLabels[path]?.description || '', addLabel: lang === 'ar' ? 'دعوة مستخدم' : 'Invite user', addPath: '/platform/users/new', columns: lang === 'ar' ? ['المستخدم','الدور','المؤسسة','آخر دخول','الحالة'] : ['User','Role','Institution','Last login','Status'], rows: teachers.concat([{ id:'U-201', name:'أ. ريم الحداد', department:'إدارة', courses:'—', classes:'—', status:'نشط', last:'اليوم 09:11' }]).map(t => ({ id:t.id, المستخدم:t.name, الدور:t.department, المؤسسة:'جامعة تعز', 'آخر دخول':t.last, الحالة:t.status, User:t.name, Role:t.department, Institution:'Taiz University', 'Last login':t.last, Status:'Active' })) }
  if (path.includes('/audit-log')) return { title: label, description: allRouteLabels[path]?.description || '', addLabel: lang === 'ar' ? 'تصدير السجل' : 'Export log', addPath: path, columns: lang === 'ar' ? ['الوقت','الفاعل','الإجراء','الوحدة','النتيجة'] : ['Time','Actor','Action','Module','Outcome'], rows: activities.map((a, i) => ({ id:String(i), الوقت:`اليوم ${8+i}:2${i}`, الفاعل:['أحمد محمد','ريم الحداد','سامي القيسي','نوال علي'][i], الإجراء:a.title, الوحدة:['المؤسسات','المستخدمون','الطلاب','الصلاحيات'][i], النتيجة:'ناجح', Time:`Today ${8+i}:2${i}`, Actor:['Ahmed','Reem','Sami','Nawal'][i], Action:a.title, Module:['Institutions','Users','Students','Permissions'][i], Outcome:'Success' })) }
  if (path.includes('/exams')) return { title: label, description: allRouteLabels[path]?.description || '', addLabel: lang === 'ar' ? 'إنشاء اختبار' : 'Create exam', addPath: '/institution/exams/new', columns: lang === 'ar' ? ['الاختبار','المقرر','التاريخ','المدة','المكان','الحالة'] : ['Exam','Course','Date','Duration','Location','Status'], rows: [['منتصف الفصل','CS201','22/10/2025','90 دقيقة','قاعة 204','منشور'],['اختبار قصير 2','CS101','26/10/2025','45 دقيقة','مختبر 3','مسودة'],['النهائي','AR110','04/11/2025','120 دقيقة','قاعة 112','قيد المراجعة']].map((r, i) => ({ id:String(i), الاختبار:r[0], المقرر:r[1], التاريخ:r[2], المدة:r[3], المكان:r[4], الحالة:r[5], Exam:r[0], Course:r[1], Date:r[2], Duration:r[3], Location:r[4], Status:r[5] })) }
  return null
}

function DataTablePage({ path, config, ui, navigate, setToast }: { path: string; config: { title: string; description: string; addLabel: string; addPath: string; columns: string[]; rows: Record<string, string>[] }; ui: UI; navigate: (path: string) => void; setToast: (message: string) => void }) {
  type Row = Record<string, string> & { id: string }
  const storageKey = `tonlin-crud-${path}`
  const [storedRows, setStoredRows] = useState<Row[]>(() => {
    try { return JSON.parse(localStorage.getItem(storageKey) || '[]') as Row[] } catch { return [] }
  })
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('all')
  const [page, setPage] = useState(1)
  const [selected, setSelected] = useState<string[]>([])
  const [sortAsc, setSortAsc] = useState(true)
  const [editor, setEditor] = useState<{ mode: 'create' | 'edit'; row: Row } | null>(null)
  const [confirm, setConfirm] = useState<{ ids: string[]; label: string } | null>(null)
  const baseRows = config.rows as Row[]
  const allRows = [...storedRows, ...baseRows.filter(row => !storedRows.some(saved => saved.id === row.id))]
  const rows = useMemo(() => allRows
    .filter(row => Object.values(row).join(' ').toLowerCase().includes(query.toLowerCase()))
    .filter(row => status === 'all' || Object.values(row).includes(status)), [allRows, query, status])
  const visible = [...rows].sort((a, b) => String(a[config.columns[0]]).localeCompare(String(b[config.columns[0]]), 'ar') * (sortAsc ? 1 : -1)).slice((page - 1) * 5, page * 5)
  const persist = (next: Row[]) => { setStoredRows(next); localStorage.setItem(storageKey, JSON.stringify(next)) }
  const toggle = (id: string) => setSelected(current => current.includes(id) ? current.filter(x => x !== id) : [...current, id])
  const openCreate = () => setEditor({ mode: 'create', row: { id: `DEMO-${Date.now()}`, ...Object.fromEntries(config.columns.map(column => [column, ''])) } })
  const openEdit = (row: Row) => setEditor({ mode: 'edit', row: { ...row } })
  const saveRow = () => {
    if (!editor) return
    const firstValue = String(editor.row[config.columns[0]] || '').trim()
    if (!firstValue) { setToast(ui.direction === 'rtl' ? 'أدخل قيمة للحقل الأساسي قبل الحفظ.' : 'Enter a value for the primary field before saving.'); return }
    const next = editor.mode === 'edit' ? [...storedRows.filter(row => row.id !== editor.row.id), editor.row] : [...storedRows, editor.row]
    persist(next)
    setEditor(null)
    setToast(editor.mode === 'edit' ? (ui.direction === 'rtl' ? 'تم تحديث السجل محليًا.' : 'Record updated locally.') : (ui.direction === 'rtl' ? 'تمت إضافة السجل محليًا.' : 'Record added locally.'))
  }
  const confirmDelete = () => {
    if (!confirm) return
    persist(storedRows.filter(row => !confirm.ids.includes(row.id)))
    setSelected(current => current.filter(id => !confirm.ids.includes(id)))
    setConfirm(null)
    setToast(ui.direction === 'rtl' ? 'تم حذف السجلات المحددة من النموذج المحلي.' : 'Selected records were deleted from the local prototype.')
  }
  const titleFor = (column: string) => column.replace(/\*/g, '')
  return <>
    <PageHeader title={config.title} description={config.description} ui={ui} actions={<><Button variant="outline" icon="download" onClick={() => setToast(ui.direction === 'rtl' ? 'تم تجهيز تصدير تجريبي؛ لم يُنشأ ملف فعلي.' : 'Demo export prepared; no real file was generated.')}>{ui.export}</Button><Button icon="plus" onClick={openCreate}>{config.addLabel}</Button></>} />
    <Card className="table-card"><div className="table-toolbar"><div className="table-search"><Search size={16} /><input value={query} onChange={e => { setQuery(e.target.value); setPage(1) }} placeholder={ui.tableSearch} /><kbd>/</kbd></div><div className="toolbar-actions"><select value={status} onChange={e => { setStatus(e.target.value); setPage(1) }}><option value="all">{ui.allStatuses}</option><option value="نشط">{ui.active}</option><option value="نشطة">{ui.active}</option><option value="Active">Active</option><option value="قيد المراجعة">{ui.pending}</option><option value="معلقة">{ui.suspended}</option><option value="Suspended">Suspended</option></select><Button variant="soft" icon="filter" onClick={() => setToast(ui.direction === 'rtl' ? 'الفلاتر مفعّلة على بيانات هذه الجلسة.' : 'Filters are active for this session.')}>{ui.filter}</Button></div></div>{selected.length > 0 && <div className="bulk-bar"><span>{selected.length} {ui.rows}</span><Button variant="ghost" onClick={() => setToast(ui.direction === 'rtl' ? 'تم تجهيز تصدير السجلات المحددة.' : 'Export prepared for selected records.')}>{ui.export}</Button><Button variant="danger" onClick={() => setConfirm({ ids: selected, label: `${selected.length} ${ui.rows}` })}>{langDelete(ui)}</Button></div>}<div className="table-scroll"><table><thead><tr><th className="check-col"><input type="checkbox" checked={selected.length === visible.length && visible.length > 0} onChange={e => setSelected(e.target.checked ? visible.map(r => r.id) : [])} /></th>{config.columns.map((col, i) => <th key={col}><button className="th-button" onClick={() => i === 0 && setSortAsc(!sortAsc)}>{col}{i === 0 && <SlidersHorizontal size={13} />}</button></th>)}<th>{ui.actions}</th></tr></thead><tbody>{visible.map(row => <tr key={row.id}><td className="check-col"><input type="checkbox" checked={selected.includes(row.id)} onChange={() => toggle(row.id)} /></td>{config.columns.map(col => <td key={col}>{col.includes('الحالة') || col === 'Status' || col === 'Outcome' ? <Badge tone={statusTone(row[col])}>{row[col] || '—'}</Badge> : col === config.columns[0] ? <button className="table-primary" onClick={() => navigate(path + '/' + row.id)}>{row[col] || '—'}</button> : row[col] || '—'}</td>)}<td><div className="row-actions"><button aria-label={ui.view} onClick={() => navigate(path + '/' + row.id)}><Eye size={16} /></button><button aria-label={ui.edit} onClick={() => openEdit(row)}><Pencil size={16} /></button><button aria-label={(ui.direction === 'rtl' ? 'حذف' : 'Delete')} onClick={() => setConfirm({ ids: [row.id], label: String(row[config.columns[0]] || row.id) })}><Trash2 size={16} /></button></div></td></tr>)}</tbody></table></div>{visible.length === 0 && <EmptyState ui={ui} />}<div className="table-footer"><span>{rows.length} {ui.results}</span><div className="pagination"><button disabled={page === 1} onClick={() => setPage(page - 1)}><ChevronRight size={15} /></button><span>{ui.page} {page} {ui.of} {Math.max(1, Math.ceil(rows.length / 5))}</span><button disabled={page >= Math.max(1, Math.ceil(rows.length / 5))} onClick={() => setPage(page + 1)}><ChevronLeft size={15} /></button></div></div></Card>
    {editor && <div className="crud-overlay" role="dialog" aria-modal="true" aria-label={editor.mode === 'edit' ? ui.edit : config.addLabel} onMouseDown={event => { if (event.target === event.currentTarget) setEditor(null) }}><div className="crud-modal"><div className="crud-modal-head"><div><Badge tone="soft">{ui.sample}</Badge><h2>{editor.mode === 'edit' ? ui.edit : config.addLabel}</h2><p>{ui.direction === 'rtl' ? 'تُحفظ التغييرات داخل هذا النموذج فقط ويمكن التراجع عنها بالحذف.' : 'Changes stay inside this prototype and can be removed locally.'}</p></div><button onClick={() => setEditor(null)} aria-label={ui.close}><X size={18} /></button></div><div className="crud-form-grid">{config.columns.map((column, index) => <label key={column}>{titleFor(column)}{index === config.columns.length - 1 || column.includes('الحالة') || column === 'Status' ? <select value={editor.row[column] || ''} onChange={event => setEditor(current => current && ({ ...current, row: { ...current.row, [column]: event.target.value } }))}><option value="">{ui.direction === 'rtl' ? 'اختر الحالة' : 'Choose status'}</option><option value="نشط">نشط</option><option value="نشطة">نشطة</option><option value="قيد المراجعة">قيد المراجعة</option><option value="مسودة">مسودة</option><option value="Active">Active</option><option value="Pending">Pending</option><option value="Draft">Draft</option></select> : <input value={editor.row[column] || ''} onChange={event => setEditor(current => current && ({ ...current, row: { ...current.row, [column]: event.target.value } }))} />}</label>)}</div><div className="crud-modal-actions"><Button variant="ghost" onClick={() => setEditor(null)}>{ui.cancel}</Button><Button variant="outline" onClick={() => { setEditor(null); setToast(ui.direction === 'rtl' ? 'تم تجاهل التغييرات غير المحفوظة.' : 'Unsaved changes were discarded.') }}>{ui.close}</Button><Button onClick={saveRow} icon="save">{ui.save}</Button></div></div></div>}
    {confirm && <div className="crud-overlay" role="alertdialog" aria-modal="true"><div className="crud-modal crud-confirm"><span className="feature-icon danger"><Trash2 size={21} /></span><h2>{ui.direction === 'rtl' ? 'تأكيد الحذف' : 'Confirm deletion'}</h2><p>{ui.direction === 'rtl' ? `سيتم حذف «${confirm.label}» من بيانات النموذج المحلي فقط. لا يمكن التراجع عن هذه الخطوة.` : `“${confirm.label}” will be removed from the local prototype only. This cannot be undone.`}</p><div className="crud-modal-actions"><Button variant="ghost" onClick={() => setConfirm(null)}>{ui.cancel}</Button><Button variant="danger" onClick={confirmDelete}>{ui.direction === 'rtl' ? 'حذف نهائي' : 'Delete permanently'}</Button></div></div></div>}
  </>
}
function langDelete(ui: UI) { return ui.direction === 'rtl' ? 'حذف التحديد' : 'Delete selected' }
function statusTone(value: string | undefined) { if (!value) return 'neutral'; if (['نشط','نشطة','مقبول','منشور','متاح','Active','Approved','Published','Success'].includes(value)) return 'success'; if (['قيد المراجعة','بانتظار التفعيل','مسودة','في إجازة','In review','Draft'].includes(value)) return 'warning'; if (['معلقة','غير نشط','Needs info','Suspended'].includes(value)) return 'danger'; return 'neutral' }

function EmptyState({ ui, compact = false }: { ui: UI; compact?: boolean }) { return <div className={`empty-state ${compact ? 'compact' : ''}`}><span className="empty-icon"><Inbox size={compact ? 18 : 25} /></span><h3>{ui.noResults}</h3><p>{compact ? ui.tableSearch : ui.emptySub}</p>{!compact && <Button variant="soft" icon="refresh">{ui.retry}</Button>}</div> }

function ImportPage({ ui, navigate, setToast }: { ui: UI; navigate: (path: string) => void; setToast: (message: string) => void }) {
  const [step, setStep] = useState(0)
  const steps = ui.direction === 'rtl' ? ['القالب', 'رفع الملف', 'مطابقة الأعمدة', 'مراجعة البيانات', 'النتيجة'] : ['Template', 'Upload', 'Map columns', 'Review data', 'Results']
  const next = () => { if (step < steps.length - 1) setStep(step + 1); else { setToast(ui.toastSaved); navigate('/institution/students') } }
  return <><PageHeader title={ui.direction === 'rtl' ? 'استيراد الطلاب' : 'Import students'} description={ui.direction === 'rtl' ? 'أضف سجلات الطلاب دفعة واحدة مع مراجعة واضحة قبل الحفظ.' : 'Add student records in bulk with a clear review before saving.'} ui={ui} actions={<Button variant="ghost" onClick={() => navigate('/institution/students')}>{ui.cancel}</Button>} /><Card className="flow-card"><div className="stepper">{steps.map((s, i) => <div className={`step ${i <= step ? 'done' : ''} ${i === step ? 'current' : ''}`} key={s}><span>{i < step ? <Check size={15} /> : i + 1}</span><small>{s}</small></div>)}</div><div className="flow-content">{step === 0 && <><span className="feature-icon"><FileSpreadsheet size={20} /></span><h2>{ui.direction === 'rtl' ? 'ابدأ بقالب الاستيراد' : 'Start with the import template'}</h2><p>{ui.direction === 'rtl' ? 'استخدم الحقول التالية: الرقم الجامعي، الاسم، البريد، البرنامج، الشعبة، تاريخ التسجيل. هذه نسخة تجريبية ولن تُرفع بيانات فعلية.' : 'Use these fields: student ID, name, email, program, section and enrollment date. This prototype never uploads live data.'}</p><Button variant="outline" icon="download" onClick={() => setToast(ui.toastSaved)}>{ui.direction === 'rtl' ? 'تحميل القالب' : 'Download template'}</Button></>}{step === 1 && <><span className="upload-zone"><Upload size={25} /><b>{ui.direction === 'rtl' ? 'اسحب ملف XLSX أو CSV هنا' : 'Drop an XLSX or CSV file here'}</b><small>{ui.direction === 'rtl' ? 'أو اختر ملفًا من جهازك · الحد الأقصى 10MB' : 'or choose a file · max 10MB'}</small><Button variant="soft" onClick={() => setToast(ui.toastSaved)}>{ui.direction === 'rtl' ? 'اختيار ملف تجريبي' : 'Choose demo file'}</Button></span></>}{step === 2 && <MappingPreview ui={ui} />}{step === 3 && <ValidationPreview ui={ui} />}{step === 4 && <><span className="success-circle"><Check size={24} /></span><h2>{ui.direction === 'rtl' ? 'جاهز للاستيراد' : 'Ready to import'}</h2><p>{ui.direction === 'rtl' ? 'تم إنشاء 124 سجلًا، تحديث 8، وتخطي 3 سجلات مكررة بعد المراجعة.' : '124 records created, 8 updated and 3 duplicates skipped after review.'}</p><div className="result-grid"><span><b>124</b><small>{ui.direction === 'rtl' ? 'تم إنشاؤها' : 'Created'}</small></span><span><b>8</b><small>{ui.direction === 'rtl' ? 'تم تحديثها' : 'Updated'}</small></span><span><b>3</b><small>{ui.direction === 'rtl' ? 'تم تخطيها' : 'Skipped'}</small></span></div></>}<div className="flow-actions"><Button variant="ghost" disabled={step === 0} onClick={() => setStep(step - 1)}>{ui.previous}</Button><Button onClick={next} icon={step === steps.length - 1 ? 'check' : 'arrow'}>{step === steps.length - 1 ? (ui.direction === 'rtl' ? 'إنهاء الاستيراد' : 'Finish import') : ui.next}</Button></div></div></Card></>
}

function MappingPreview({ ui }: { ui: UI }) { return <div className="mapping-preview"><h2>{ui.direction === 'rtl' ? 'مطابقة الأعمدة' : 'Map columns'}</h2><p>{ui.direction === 'rtl' ? 'تأكد من أن كل عمود مرتبط بالحقل الصحيح.' : 'Confirm each column is linked to the right field.'}</p>{[['student_id','الرقم الجامعي'],['full_name','اسم الطالب'],['email','البريد الإلكتروني'],['program','البرنامج'],['section','الشعبة']].map(([a,b]) => <div className="mapping-row" key={a}><span>{a}.csv</span><ArrowLeft size={15} /><select defaultValue={b}><option>{b}</option><option>تجاهل العمود</option></select><Check size={15} /></div>)}</div> }
function ValidationPreview({ ui }: { ui: UI }) { return <div className="validation-preview"><div className="validation-head"><div><h2>{ui.direction === 'rtl' ? 'مراجعة البيانات' : 'Review data'}</h2><p>{ui.direction === 'rtl' ? '124 صفًا صالحًا، وسطران يحتاجان إلى قرار.' : '124 valid rows, two rows need a decision.'}</p></div><Badge tone="warning">2 {ui.direction === 'rtl' ? 'تحذير' : 'warnings'}</Badge></div>{students.slice(0, 4).map((s, i) => <div className="validation-row" key={s.id}><span className="validation-check"><Check size={14} /></span><span><b>{s.name}</b><small>{s.id} · {s.track}</small></span><Badge tone={i === 2 ? 'warning' : 'success'}>{i === 2 ? (ui.direction === 'rtl' ? 'مكرر محتمل' : 'Possible duplicate') : (ui.direction === 'rtl' ? 'صالح' : 'Valid')}</Badge></div>)}</div> }

function AttendancePage({ ui, setToast }: { ui: UI; setToast: (message: string) => void }) {
  const ar = ui.direction === 'rtl'
  const storageKey = 'tonlin-demo-attendance-cs201-3a'
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem(storageKey)
      return saved ? JSON.parse(saved).status : Object.fromEntries(students.map(s => [s.id, 'present']))
    } catch { return Object.fromEntries(students.map(s => [s.id, 'present'])) }
  })
  const [submitted, setSubmitted] = useState(() => {
    try { return JSON.parse(localStorage.getItem(storageKey) || '{}').submitted === true } catch { return false }
  })
  const visibleStudents = students.filter(s => `${s.name} ${s.id} ${s.section}`.toLowerCase().includes(query.toLowerCase()))
  const counts = Object.values(status).reduce<Record<string, number>>((acc, value) => { acc[value] = (acc[value] || 0) + 1; return acc }, {})
  const persist = (nextStatus: Record<string, string>, isSubmitted: boolean) => {
    localStorage.setItem(storageKey, JSON.stringify({ status: nextStatus, submitted: isSubmitted, updatedAt: new Date().toISOString() }))
  }
  const cycle = (id: string) => {
    if (submitted) return
    const next = { ...status, [id]: status[id] === 'present' ? 'late' : status[id] === 'late' ? 'absent' : status[id] === 'absent' ? 'excused' : 'present' }
    setStatus(next)
  }
  const saveDraft = () => { persist(status, false); setSubmitted(false); setToast(ar ? 'حُفظت المسودة على هذا الجهاز فقط.' : 'Draft saved on this device only.') }
  const submit = () => { persist(status, true); setSubmitted(true); setToast(ar ? 'تم حفظ الإرسال التجريبي على هذا الجهاز.' : 'Demo submission saved on this device.') }
  const markAllPresent = () => { if (!submitted) setStatus(Object.fromEntries(students.map(s => [s.id, 'present']))) }
  return <>
    <PageHeader title={ar ? 'تسجيل حضور اليوم' : 'Today’s attendance'} description={ar ? 'هندسة البرمجيات · CS201 · الشعبة CS-3A · الأحد 21 سبتمبر 2025' : 'Software Engineering · CS201 · Section CS-3A · Sunday, Sep 21 2025'} ui={ui} actions={<><Button variant="outline" icon="save" onClick={saveDraft}>{ar ? 'حفظ كمسودة' : 'Save draft'}</Button><Button icon="send" disabled={submitted} onClick={submit}>{submitted ? (ar ? 'تم الإرسال' : 'Submitted') : ar ? 'إرسال الحضور' : 'Submit attendance'}</Button></>} />
    <div className="attendance-grid"><Card><div className="card-heading"><div><h3>{ar ? 'الطلاب' : 'Students'} <Badge tone="neutral">{students.length} {ui.records}</Badge></h3><p>{ar ? 'اختر الحالة لتبديلها بين حاضر، متأخر، غائب، ومعذور.' : 'Select a state to cycle between present, late, absent, and excused.'}</p></div></div>
      <div className="table-toolbar attendance-tools"><div className="table-search small"><Search size={15} /><input aria-label={ar ? 'ابحث عن طالب' : 'Search students'} value={query} onChange={e => setQuery(e.target.value)} placeholder={ar ? 'ابحث بالاسم أو الرقم...' : 'Search name or ID...'} /></div><Button variant="soft" disabled={submitted} onClick={markAllPresent}>{ar ? 'تحديد الكل حاضرًا' : 'Mark all present'}</Button></div>
      {submitted && <div className="inline-success" role="status"><CheckCircle2 size={16} />{ar ? 'أُرسلت هذه الجلسة التجريبية. استخدم حفظ المسودة لإعادة فتحها.' : 'This demo session is submitted. Save a draft to reopen it.'}</div>}
      <div className="attendance-list">{visibleStudents.map(s => <div className="attendance-row" key={s.id}><span className="avatar student-avatar">{s.name.slice(0,1)}</span><span className="attendance-student"><b>{s.name}</b><small>{s.id} · {s.section}</small></span><button type="button" aria-label={`${s.name}: ${statusLabel(status[s.id], ui)}${submitted ? '' : (ar ? '، تغيير الحالة' : ', change status')}`} aria-disabled={submitted} className={`attendance-status ${status[s.id]}`} onClick={() => cycle(s.id)}><span />{statusLabel(status[s.id], ui)}</button><button type="button" className="row-note" aria-label={ui.more} disabled={submitted}><MoreHorizontal size={17} /></button></div>)}{visibleStudents.length === 0 && <EmptyState ui={ui} compact />}</div>
    </Card><Card className="attendance-side"><div className="card-heading"><div><h3>{ar ? 'ملخص الجلسة' : 'Session summary'}</h3><p>{ui.sample}</p></div></div><div className="attendance-summary"><span><b>{counts.present || 0}</b><small>{ar ? 'حاضر' : 'Present'}</small></span><span><b>{counts.late || 0}</b><small>{ar ? 'متأخر' : 'Late'}</small></span><span><b>{counts.absent || 0}</b><small>{ar ? 'غائب' : 'Absent'}</small></span></div><div className="progress-line"><span style={{ width: `${((counts.present || 0) / students.length) * 100}%` }} /></div><p className="helper-text">{submitted ? (ar ? 'حُفظت حالة الإرسال محليًا لهذا النموذج التجريبي.' : 'Submission state was saved locally for this prototype.') : (ar ? 'المسودة محفوظة في المتصفح فقط عند الضغط على «حفظ كمسودة».' : 'Draft stays in this browser only when you choose “Save draft”.')}</p><Badge tone={submitted ? 'success' : 'warning'}>{submitted ? (ar ? 'مرسل تجريبيًا' : 'Demo submitted') : (ar ? 'مسودة' : 'Draft')}</Badge></Card></div>
  </>
}
function statusLabel(value: string, ui: UI) { const ar: Record<string,string> = { present:'حاضر', late:'متأخر', absent:'غائب', excused:'معذور' }; const en: Record<string,string> = { present:'Present', late:'Late', absent:'Absent', excused:'Excused' }; return (ui.direction === 'rtl' ? ar : en)[value] }

function AttendanceOverviewPage({ ui, navigate, setToast }: { ui: UI; navigate: (path: string) => void; setToast: (message: string) => void }) {
  const rows = [
    ['هندسة البرمجيات · CS-3A', '32', '30', '1', '1', '94%'],
    ['قواعد البيانات · CS-2B', '28', '26', '2', '0', '93%'],
    ['اللغة العربية · AR-1C', '36', '35', '0', '1', '97%'],
  ]
  return <><PageHeader title={ui.direction === 'rtl' ? 'نظرة عامة على الحضور' : 'Attendance overview'} description={ui.direction === 'rtl' ? 'ملخص اليوم مع حالة التسجيل لكل شعبة.' : 'Today’s summary with recording status per section.'} ui={ui} actions={<Button onClick={() => navigate('/teacher/attendance')} icon="check-circle">{ui.markAttendance}</Button>} /><div className="stats-grid"><StatCard label={ui.direction === 'rtl' ? 'الحضور اليوم' : 'Present today'} value="94%" change="+2.4%" icon="check-circle" tone="green" /><StatCard label={ui.direction === 'rtl' ? 'لم يُسجل بعد' : 'Not recorded'} value="3" change={ui.direction === 'rtl' ? 'شُعب' : 'sections'} icon="clock" tone="orange" /><StatCard label={ui.direction === 'rtl' ? 'غائبون' : 'Absent'} value="18" change={ui.direction === 'rtl' ? 'من 2,840' : 'of 2,840'} icon="users" tone="purple" /><StatCard label={ui.direction === 'rtl' ? 'طلبات تصحيح' : 'Correction requests'} value="4" change={ui.direction === 'rtl' ? 'قيد المراجعة' : 'in review'} icon="inbox" tone="teal" /></div><Card className="table-card"><div className="table-toolbar"><div><h3>{ui.direction === 'rtl' ? 'الحضور حسب الشعبة' : 'Attendance by section'}</h3><p className="toolbar-caption">{ui.sample} · {ui.dataFresh}</p></div><div className="toolbar-actions"><Button variant="soft" icon="filter">{ui.filter}</Button><Button variant="outline" icon="download" onClick={() => setToast(ui.toastSaved)}>{ui.export}</Button></div></div><div className="table-scroll"><table><thead><tr>{(ui.direction === 'rtl' ? ['الشعبة','الطلاب','حاضر','متأخر','غائب','النسبة','الحالة'] : ['Section','Students','Present','Late','Absent','Rate','Status']).map(h => <th key={h}>{h}</th>)}</tr></thead><tbody>{rows.map(r => <tr key={r[0]}>{r.map((cell, i) => <td key={i}>{i === 5 ? <strong className="grade-value">{cell}</strong> : cell}</td>)}<td><Badge tone="success">{ui.direction === 'rtl' ? 'مسجل' : 'Recorded'}</Badge></td></tr>)}</tbody></table></div></Card></>
}

function AssignmentForm({ ui, navigate, setToast }: { ui: UI; navigate: (path: string) => void; setToast: (message: string) => void }) { const [saved, setSaved] = useState(false); return <><PageHeader title={ui.createAssignment} description={ui.direction === 'rtl' ? 'أنشئ مهمة واضحة مع موعد وتسليم ودرجة قصوى.' : 'Create a clear task with due date, submission and max score.'} ui={ui} actions={<Button variant="ghost" onClick={() => navigate('/teacher/assignments')}>{ui.cancel}</Button>} /><Card className="form-card"><div className="form-section"><div><h3>{ui.direction === 'rtl' ? 'معلومات الواجب' : 'Assignment details'}</h3><p>{ui.direction === 'rtl' ? 'حقول مطلوبة مميزة بعلامة *' : 'Required fields are marked with *'}</p></div><div className="form-grid"><label>{ui.direction === 'rtl' ? 'عنوان الواجب *' : 'Assignment title *'}<input defaultValue={ui.direction === 'rtl' ? 'تصميم مخطط قاعدة البيانات' : 'Design a database schema'} /></label><label>{ui.direction === 'rtl' ? 'المقرر والشعبة *' : 'Course & section *'}<select defaultValue="CS201 · CS-3A"><option>CS201 · CS-3A</option><option>CS101 · CS-2B</option></select></label><label className="full-field">{ui.direction === 'rtl' ? 'التعليمات' : 'Instructions'}<textarea rows={5} defaultValue={ui.direction === 'rtl' ? 'صمّم مخططًا يوضح الجداول والعلاقات، وأرفق ملف PDF مختصرًا.' : 'Design a schema showing tables and relationships, and attach a short PDF.'} /></label><label>{ui.direction === 'rtl' ? 'موعد التسليم *' : 'Due date *'}<input type="date" defaultValue="2025-09-28" /></label><label>{ui.direction === 'rtl' ? 'الدرجة القصوى' : 'Max score'}<input type="number" defaultValue="20" /></label><label>{ui.direction === 'rtl' ? 'نوع التسليم' : 'Submission type'}<select defaultValue="ملف أو نص"><option>ملف أو نص</option><option>ملف فقط</option><option>نص فقط</option></select></label><label>{ui.direction === 'rtl' ? 'سياسة التأخير' : 'Late policy'}<select defaultValue="قبول مع تنبيه"><option>قبول مع تنبيه</option><option>منع بعد الموعد</option></select></label></div></div><div className="attachment-row"><Paperclip size={17} /><span><b>{ui.direction === 'rtl' ? 'المرفقات' : 'Attachments'}</b><small>{ui.direction === 'rtl' ? 'أضف ملفًا إرشاديًا (اختياري)' : 'Add a reference file (optional)'}</small></span><Button variant="soft" icon="upload" onClick={() => setToast(ui.toastSaved)}>{ui.direction === 'rtl' ? 'إرفاق ملف' : 'Attach file'}</Button></div><div className="form-actions"><Button variant="ghost" onClick={() => navigate('/teacher/assignments')}>{ui.cancel}</Button><Button variant="outline" icon="save" onClick={() => { setSaved(true); setToast(ui.toastSaved) }}>{ui.draft}</Button><Button icon="send" onClick={() => { setSaved(true); setToast(ui.toastSaved); navigate('/teacher/assignments') }}>{ui.publish}</Button></div>{saved && <div className="inline-success"><CheckCircle2 size={16} />{ui.toastSaved}</div>}</Card></> }

function AssignmentsPage({ path, ui, navigate, setToast }: { path: string; ui: UI; navigate: (path: string) => void; setToast: (message: string) => void }) { const isStudent = path.includes('/student'); const rows: Array<Record<string, string>> = isStudent ? [['تصميم مخطط قاعدة البيانات','CS201','غدًا · 23:59','قيد التسليم','20'],['تحليل متطلبات النظام','CS201','29 سبتمبر','لم يبدأ','15'],['تمارين SQL','CS101','02 أكتوبر','تم التسليم','10']].map((r, i) => ({ id:String(i), المهمة:r[0], المقرر:r[1], الموعد:r[2], الحالة:r[3], الدرجة:r[4] })) : [['تصميم مخطط قاعدة البيانات','CS201 · CS-3A','28 سبتمبر','18/32','منشور'],['تحليل متطلبات النظام','CS201 · CS-3A','29 سبتمبر','24/32','منشور'],['تمارين SQL','CS101 · CS-2B','02 أكتوبر','—','مسودة']].map((r, i) => ({ id:String(i), المهمة:r[0], الشعبة:r[1], الموعد:r[2], التسليمات:r[3], الحالة:r[4] })); return <><PageHeader title={isStudent ? (ui.direction === 'rtl' ? 'واجباتي' : 'My assignments') : ui.direction === 'rtl' ? 'الواجبات' : 'Assignments'} description={isStudent ? 'مهامك القادمة وحالات التسليم والتغذية الراجعة.' : 'Create, publish and grade tasks across your sections.'} ui={ui} actions={!isStudent && <Button icon="plus" onClick={() => navigate('/teacher/assignments/new')}>{ui.createAssignment}</Button>} /><Card className="table-card"><div className="table-toolbar"><div className="table-search"><Search size={16} /><input placeholder={ui.tableSearch} /></div><Button variant="soft" icon="filter">{ui.filter}</Button></div><div className="assignment-cards">{rows.map(row => <button className="assignment-row" key={row.id} onClick={() => isStudent ? navigate('/student/assignments/' + row.id) : navigate('/teacher/submissions/' + row.id)}><span className="assignment-icon"><FileText size={17} /></span><span><b>{row['المهمة']}</b><small>{row['المقرر'] || row['الشعبة']} · {row['الموعد']}</small></span><span className="assignment-meta"><Badge tone={statusTone(row['الحالة'])}>{row['الحالة']}</Badge><small>{row['الدرجة'] || row['التسليمات']}</small></span><ChevronLeft size={17} /></button>)}</div></Card></> }

function GradebookPage({ path, ui, setToast }: { path: string; ui: UI; setToast: (message: string) => void }) { const isStudent = path.includes('/student'); return <><PageHeader title={isStudent ? (ui.direction === 'rtl' ? 'درجاتي' : 'My grades') : ui.direction === 'rtl' ? 'دفتر الدرجات' : 'Gradebook'} description={isStudent ? 'نتائج منشورة مع تفصيل التقييم حسب المقرر.' : 'Spreadsheet-like view with draft saves and final grade calculation.'} ui={ui} actions={<><Button variant="outline" icon="download" onClick={() => setToast(ui.toastSaved)}>{ui.export}</Button><Button icon="save" onClick={() => setToast(ui.toastSaved)}>{ui.save}</Button></>} /><div className="grade-summary">{[['المتوسط الحالي','88%','+4.2%'],['المواد المكتملة','4 / 6','هذا الفصل'],['تحتاج مراجعة','5','درجات']].map(([a,b,c], i) => <Card key={a}><span className={`metric-icon metric-${i}`}><Icon name={i === 0 ? 'award' : i === 1 ? 'check-circle' : 'file'} size={18} /></span><span><b>{b}</b><small>{a} · {c}</small></span></Card>)}</div><Card className="gradebook-card"><div className="card-heading"><div><h3>{ui.direction === 'rtl' ? 'تفصيل التقييم' : 'Assessment breakdown'}</h3><p>{ui.sample} · {ui.direction === 'rtl' ? 'آخر حفظ منذ دقيقة' : 'Autosaved a minute ago'}</p></div><Badge tone="success">{ui.direction === 'rtl' ? 'محفوظ' : 'Autosaved'}</Badge></div><div className="table-scroll"><table className="grade-table"><thead><tr><th>{ui.direction === 'rtl' ? 'الطالب / المقرر' : 'Student / course'}</th><th>{ui.direction === 'rtl' ? 'واجب 1' : 'Assignment 1'}</th><th>{ui.direction === 'rtl' ? 'اختبار قصير' : 'Quiz'}</th><th>{ui.direction === 'rtl' ? 'مشروع' : 'Project'}</th><th>{ui.direction === 'rtl' ? 'النتيجة النهائية' : 'Final grade'}</th><th>{ui.status}</th></tr></thead><tbody>{(isStudent ? [['هندسة البرمجيات','18 / 20','9 / 10','—','88%'],['قواعد البيانات','20 / 20','8 / 10','17 / 20','91%'],['اللغة العربية','17 / 20','10 / 10','18 / 20','90%']] : students.slice(0,4).map((s, i) => [s.name, `${18+i} / 20`, `${8+i} / 10`, `${17+i} / 20`, `${82+i*3}%`])).map((r, i) => <tr key={i}>{r.map((cell, j) => <td key={j}>{j > 0 && j < 4 && !isStudent ? <input className="grade-input" defaultValue={cell} onChange={() => undefined} /> : j === r.length - 1 ? <strong className="grade-value">{cell}</strong> : cell}</td>)}<td><Badge tone="success">{ui.direction === 'rtl' ? 'منشور' : 'Published'}</Badge></td></tr>)}</tbody></table></div></Card></> }

function TimetablePage({ path, ui, navigate, setToast }: { path: string; ui: UI; navigate: (path: string) => void; setToast: (message: string) => void }) { const builder = path.includes('builder'); return <><PageHeader title={builder ? (ui.direction === 'rtl' ? 'بناء الجدول الدراسي' : 'Timetable builder') : ui.direction === 'rtl' ? 'الجدول الدراسي' : 'Timetable'} description={builder ? 'أضف الحصص، راجع التعارضات، ثم انشر نسخة الجدول.' : 'Week view with upcoming sessions and room context.'} ui={ui} actions={builder ? <><Button variant="outline" icon="save" onClick={() => setToast(ui.toastSaved)}>{ui.direction === 'rtl' ? 'حفظ كمسودة' : 'Save draft'}</Button><Button icon="send" onClick={() => setToast(ui.toastSaved)}>{ui.publish}</Button></> : <Button variant="outline" icon="download" onClick={() => setToast(ui.toastSaved)}>{ui.export}</Button>} /><div className="timetable-toolbar"><div className="week-switch"><button><ChevronRight size={16} /></button><b>{ui.direction === 'rtl' ? '21 – 27 سبتمبر 2025' : 'Sep 21 – 27, 2025'}</b><button><ChevronLeft size={16} /></button></div><div><Button variant="soft">{ui.direction === 'rtl' ? 'هذا الأسبوع' : 'This week'}</Button><Button variant="soft" icon="filter">{ui.filter}</Button></div></div>{builder && <div className="conflict-banner"><span><AlertTriangle size={18} /><b>{ui.direction === 'rtl' ? 'تعارض واحد يحتاج إلى مراجعة' : 'One conflict needs review'}</b><small>{ui.direction === 'rtl' ? 'قاعة 204 محجوزة لحصتين في نفس الوقت.' : 'Room 204 is booked for two sessions at the same time.'}</small></span><Button variant="soft">{ui.direction === 'rtl' ? 'عرض التعارض' : 'View conflict'}</Button></div>}<Card className="calendar-card"><div className="calendar-head"><span>{ui.direction === 'rtl' ? 'الأحد' : 'Sun'}</span><span>{ui.direction === 'rtl' ? 'الإثنين' : 'Mon'}</span><span className="today-col">{ui.direction === 'rtl' ? 'الثلاثاء' : 'Tue'}<small>23</small></span><span>{ui.direction === 'rtl' ? 'الأربعاء' : 'Wed'}</span><span>{ui.direction === 'rtl' ? 'الخميس' : 'Thu'}</span></div><div className="calendar-body"><div className="time-column"><span>08:00</span><span>10:00</span><span>12:00</span><span>14:00</span></div><div className="calendar-grid">{[0,1,2,3,4].map(day => <div className="day-column" key={day}>{day === 1 && <div className="calendar-event event-green" style={{ top: '5%' }}><b>هندسة البرمجيات</b><small>08:00 · قاعة 204</small></div>}{day === 2 && <><div className="calendar-event event-teal" style={{ top: '30%' }}><b>قواعد البيانات</b><small>10:00 · مختبر 3</small></div><div className="calendar-event event-purple" style={{ top: '61%' }}><b>اللغة العربية</b><small>12:00 · قاعة 112</small></div></>}{builder && day === 3 && <button className="add-slot" onClick={() => setToast(ui.toastSaved)}><Plus size={14} />{ui.direction === 'rtl' ? 'إضافة حصة' : 'Add lesson'}</button>}</div>)}</div></div></Card></> }

function VirtualClassesPage({ ui, setToast }: { ui: UI; setToast: (message: string) => void }) {
  const ar = ui.direction === 'rtl'
  const [view, setView] = useState<'list' | 'lobby' | 'room'>('list')
  const [showCompleted, setShowCompleted] = useState(false)
  const [showSchedule, setShowSchedule] = useState(false)
  const [activeId, setActiveId] = useState('cs201')
  const [mic, setMic] = useState(true)
  const [camera, setCamera] = useState(true)
  const [screen, setScreen] = useState(false)
  const [hand, setHand] = useState(false)
  const [draft, setDraft] = useState('')
  const [messages, setMessages] = useState<string[]>([])
  const [sessions, setSessions] = useState([
    { id: 'cs201', title: ar ? 'هندسة البرمجيات · مراجعة المشروع' : 'Software Engineering · Project review', detail: ar ? 'أ. أحمد السامعي · CS-3A' : 'Mr. Ahmed Al-Sami · CS-3A', time: ar ? 'اليوم · 10:00 – 11:30' : 'Today · 10:00 – 11:30', status: 'upcoming', participants: 28 },
    { id: 'db101', title: ar ? 'قواعد البيانات · جلسة أسئلة' : 'Database Systems · Q&A session', detail: ar ? 'د. هناء العريقي · CS-3A' : 'Dr. Hanaa Al-Areeqi · CS-3A', time: ar ? 'غدًا · 12:00 – 13:00' : 'Tomorrow · 12:00 – 13:00', status: 'upcoming', participants: 19 },
    { id: 'ar110', title: ar ? 'اللغة العربية · نقاش مفتوح' : 'Arabic Language · Open discussion', detail: ar ? 'أ. مروان القاسمي · AR-2B' : 'Mr. Marwan Al-Qasimi · AR-2B', time: ar ? 'الأحد الماضي · 09:00' : 'Last Sunday · 09:00', status: 'completed', participants: 31 },
  ])
  const active = sessions.find(item => item.id === activeId) || sessions[0]
  const openLobby = (id: string) => { setActiveId(id); setView('lobby') }
  const send = () => { const clean = draft.trim(); if (!clean) return; setMessages(current => [...current, clean]); setDraft(''); setToast(ar ? 'تمت إضافة الرسالة إلى دردشة الفصل التجريبية.' : 'Message added to the demo classroom chat.') }
  const schedule = () => { setSessions(current => [{ id: `new-${Date.now()}`, title: ar ? 'جلسة جديدة · مراجعة تفاعلية' : 'New session · Interactive review', detail: ar ? 'جلسة مجدولة محليًا' : 'Scheduled locally', time: ar ? 'غدًا · 09:00 – 10:00' : 'Tomorrow · 09:00 – 10:00', status: 'upcoming', participants: 0 }, ...current]); setShowSchedule(false); setToast(ar ? 'تمت جدولة جلسة محلية جديدة.' : 'A new local session was scheduled.') }
  if (view === 'lobby') return <><PageHeader title={ar ? 'ردهة الانضمام' : 'Join lobby'} description={active.title} ui={ui} actions={<Button variant="ghost" onClick={() => setView('list')}>{ar ? 'العودة للفصول' : 'Back to classes'}</Button>} /><div className="virtual-lobby-grid"><Card className="virtual-device-preview"><Badge tone="success">{ar ? 'الجهاز جاهز' : 'Device ready'}</Badge><div className="virtual-camera-art"><div className="virtual-camera-head" /><div className="virtual-camera-body" /></div><div className="virtual-preview-controls"><button className={mic ? 'on' : ''} onClick={() => setMic(!mic)}>{mic ? '🎙' : '🔇'} {ar ? 'الميكروفون' : 'Mic'}</button><button className={camera ? 'on' : ''} onClick={() => setCamera(!camera)}>{camera ? '◉' : '⊘'} {ar ? 'الكاميرا' : 'Camera'}</button></div></Card><Card><Badge tone="soft">{ar ? 'فحص قبل الدخول' : 'Pre-join check'}</Badge><h2>{ar ? 'أنت جاهز للانضمام' : 'You are ready to join'}</h2><p>{active.detail} · {active.time}</p><div className="virtual-check-list"><div><CheckCircle2 size={16} /><span>{ar ? 'الميكروفون متصل' : 'Microphone connected'}</span><Badge tone="success">{ar ? 'جاهز' : 'Ready'}</Badge></div><div><CheckCircle2 size={16} /><span>{ar ? 'الكاميرا متصلة' : 'Camera connected'}</span><Badge tone={camera ? 'success' : 'warning'}>{camera ? (ar ? 'جاهز' : 'Ready') : (ar ? 'متوقف' : 'Off')}</Badge></div><div><Wifi size={16} /><span>{ar ? 'الاتصال مستقر' : 'Stable connection'}</span><Badge tone="success">Excellent</Badge></div></div><Button icon="video" onClick={() => { setView('room'); setToast(ar ? 'تم دخول غرفة الفصل التجريبية.' : 'You entered the demo classroom.') }}>{ar ? 'الدخول إلى الفصل' : 'Enter classroom'}</Button></Card></div></>
  if (view === 'room') return <><div className="virtual-room-header"><div><Badge tone="success">● {ar ? 'مباشر تجريبي' : 'Demo live'}</Badge><h1>{active.title}</h1><p>{active.detail} · {ar ? 'لا يوجد بث خارجي فعلي' : 'No external broadcast'}</p></div><Button variant="danger" onClick={() => { setView('list'); setToast(ar ? 'تم إنهاء الجلسة التجريبية.' : 'Demo session ended.') }}>{ar ? 'إنهاء الجلسة' : 'End session'}</Button></div><div className="virtual-room-grid"><section className="virtual-stage"><div className="virtual-main-tile"><span className="virtual-live-label">{ar ? 'المعلم' : 'Instructor'}</span><div className="virtual-speaker-art"><div className="virtual-camera-head" /><div className="virtual-camera-body" /></div><b>{ar ? 'أ. أحمد السامعي' : 'Mr. Ahmed Al-Sami'}</b><small>{mic ? (ar ? 'الميكروفون مفعل' : 'Mic on') : (ar ? 'صامت' : 'Muted')}</small></div><div className="virtual-participant-grid">{['نوال','عمر','سارة','يحيى'].map((name, index) => <div className="virtual-participant-tile" key={name}><span>{name.slice(0, 1)}</span><b>{ar ? name : ['Nawal','Omar','Sara','Yahya'][index]}</b><small>{index === 1 ? '🔇' : '🎙'}</small></div>)}</div><div className="virtual-room-toolbar"><button className={mic ? 'active' : ''} onClick={() => setMic(!mic)}>{mic ? '🎙' : '🔇'}<small>{ar ? 'ميكروفون' : 'Mic'}</small></button><button className={camera ? 'active' : ''} onClick={() => setCamera(!camera)}>{camera ? '◉' : '⊘'}<small>{ar ? 'كاميرا' : 'Camera'}</small></button><button className={screen ? 'active' : ''} onClick={() => { setScreen(!screen); setToast(ar ? 'مشاركة الشاشة محاكاة محليًا.' : 'Screen sharing simulated locally.') }}>▣<small>{ar ? 'مشاركة' : 'Share'}</small></button><button className={hand ? 'active' : ''} onClick={() => setHand(!hand)}>✋<small>{hand ? (ar ? 'تم الرفع' : 'Raised') : (ar ? 'رفع اليد' : 'Raise hand')}</small></button><button onClick={() => setToast(ar ? 'تم فتح لوحة الأنشطة والاختبار القصير.' : 'Activities and quiz panel opened.')}>▤<small>{ar ? 'نشاط' : 'Activity'}</small></button></div></section><aside className="virtual-room-sidebar"><div className="virtual-side-tabs"><button className="active">{ar ? 'الدردشة' : 'Chat'}</button><button onClick={() => setToast(ar ? 'قائمة المشاركين محدثة.' : 'Participant list refreshed.')}>{ar ? 'المشاركون' : 'People'} <Badge tone="soft">{active.participants + 4}</Badge></button></div><div className="virtual-chat-list"><div className="virtual-chat-note"><Sparkles size={15} /><span>{ar ? 'مرحبًا بكم. احترموا قواعد النقاش.' : 'Welcome. Please follow the discussion guidelines.'}</span></div><div className="virtual-chat-message"><b>{ar ? 'نوال' : 'Nawal'}</b><p>{ar ? 'هل يمكن إعادة شرح المثال الثاني؟' : 'Could you explain the second example again?'}</p><small>10:14</small></div><div className="virtual-chat-message own"><b>{ar ? 'أنت' : 'You'}</b><p>{ar ? 'سأرفق ملخص الدرس في المواد.' : 'I will attach the lesson summary in materials.'}</p><small>10:15</small></div>{messages.map((message, index) => <div className="virtual-chat-message own" key={`${message}-${index}`}><b>{ar ? 'أنت' : 'You'}</b><p>{message}</p><small>{ar ? 'الآن' : 'Now'}</small></div>)}</div><div className="virtual-chat-compose"><input value={draft} onChange={event => setDraft(event.target.value)} onKeyDown={event => event.key === 'Enter' && send()} placeholder={ar ? 'اكتب رسالة...' : 'Write a message...'} /><button onClick={send}><Send size={16} /></button></div></aside></div></>
  return <><PageHeader title={ar ? 'الفصول الافتراضية' : 'Virtual classes'} description={ar ? 'جدولة، فحص جهاز، ردهة، غرفة تفاعلية وحضور المشاركين.' : 'Schedule, device check, lobby, interactive room and participant presence.'} ui={ui} actions={<Button icon="plus" onClick={() => setShowSchedule(true)}>{ar ? 'جدولة جلسة' : 'Schedule session'}</Button>} /><Card className="virtual-card"><div className="virtual-tabs"><button className={!showCompleted ? 'active' : ''} onClick={() => setShowCompleted(false)}>{ar ? 'القادمة' : 'Upcoming'} <Badge tone="soft">{sessions.filter(item => item.status === 'upcoming').length}</Badge></button><button className={showCompleted ? 'active' : ''} onClick={() => setShowCompleted(true)}>{ar ? 'المنتهية' : 'Completed'} <Badge tone="soft">{sessions.filter(item => item.status === 'completed').length}</Badge></button></div>{sessions.filter(item => showCompleted ? item.status === 'completed' : item.status === 'upcoming').map(item => <div className="virtual-row" key={item.id}><span className="virtual-icon green"><Video size={19} /></span><span><b>{item.title}</b><small>{item.detail} · {item.time}</small></span><Badge tone={showCompleted ? 'neutral' : 'success'}>{showCompleted ? (ar ? 'انتهت' : 'Completed') : (ar ? 'مجدولة' : 'Scheduled')}</Badge><span className="virtual-row-count"><Users size={14} />{item.participants}</span><Button variant={showCompleted ? 'ghost' : 'soft'} icon={showCompleted ? 'eye' : 'video'} onClick={() => showCompleted ? setToast(ar ? 'تم فتح ملخص التسجيل والحضور التجريبي.' : 'Demo recording and attendance summary opened.') : openLobby(item.id)}>{showCompleted ? ui.view : ui.join}</Button></div>)}</Card><div className="info-note"><InfoIcon /><span><b>{ar ? 'وضع العرض الآمن' : 'Safe demo mode'}</b><small>{ar ? 'الفيديو والصوت ومشاركة الشاشة والدردشة تعمل داخل الواجهة فقط ولا تفتح خدمة خارجية.' : 'Video, audio, screen sharing and chat work inside the UI only and do not open an external service.'}</small></span></div>{showSchedule && <div className="crud-overlay"><Card className="virtual-schedule-modal"><div className="workspace-card-heading"><div><h2>{ar ? 'جدولة جلسة جديدة' : 'Schedule a new session'}</h2><p>{ar ? 'أنشئ جلسة للعرض التجريبي.' : 'Create a session for the demo.'}</p></div><button onClick={() => setShowSchedule(false)}>×</button></div><div className="form-grid"><label>{ar ? 'عنوان الجلسة' : 'Session title'}<input defaultValue={ar ? 'جلسة مراجعة تفاعلية' : 'Interactive review session'} /></label><label>{ar ? 'المقرر' : 'Course'}<select><option>CS201 · {ar ? 'هندسة البرمجيات' : 'Software Engineering'}</option><option>CS101 · {ar ? 'قواعد البيانات' : 'Database Systems'}</option></select></label><label>{ar ? 'التاريخ والوقت' : 'Date & time'}<input type="datetime-local" defaultValue="2026-11-16T09:00" /></label><label>{ar ? 'الشعبة' : 'Section'}<select><option>CS-3A</option><option>CS-3B</option></select></label></div><div className="form-actions"><Button variant="ghost" onClick={() => setShowSchedule(false)}>{ui.cancel}</Button><Button onClick={schedule} icon="calendar">{ar ? 'حفظ وجدولة' : 'Save & schedule'}</Button></div></Card></div>}</>
}
function ReportsPage({ ui, setToast }: { ui: UI; setToast: (message: string) => void }) { return <><PageHeader title={ui.direction === 'rtl' ? 'التقارير' : 'Reports'} description={ui.direction === 'rtl' ? 'حوّل البيانات التشغيلية إلى قراءة سهلة قبل التصدير.' : 'Turn operational data into an easy read before export.'} ui={ui} actions={<Button variant="outline" icon="download" onClick={() => setToast(ui.toastSaved)}>{ui.export}</Button>} /><div className="report-grid">{[['الحضور حسب الأسبوع','94%','+2.4%','green'],['التسجيل حسب البرنامج','2,840','+6.4%','teal'],['متوسط الأداء','88%','+4.2%','purple']].map(([title, value, change, tone]) => <Card key={title} className="report-card"><div className="card-heading"><div><h3>{title}</h3><p>{ui.sample}</p></div><ArrowUpRight size={16} /></div><strong>{value}</strong><Badge tone={tone === 'purple' ? 'info' : 'success'}>{change}</Badge><div className={`report-spark spark-${tone}`}>{chartData.slice(-8).map((v, i) => <i key={i} style={{ height: `${v / 2.4}%` }} />)}</div></Card>)}</div><Card className="report-detail"><div className="card-heading"><div><h3>{ui.direction === 'rtl' ? 'ملخص الحضور حسب البرنامج' : 'Attendance by program'}</h3><p>{ui.dataFresh}</p></div><Button variant="soft" icon="filter">{ui.filter}</Button></div><div className="progress-report">{[['هندسة البرمجيات','96%'],['علوم الحاسوب','93%'],['نظم المعلومات','91%'],['الرياضيات','89%']].map(([name, value]) => <div className="progress-row" key={name}><span><b>{name}</b><small>{ui.sample}</small></span><div className="progress-line"><i style={{ width: value }} /></div><strong>{value}</strong></div>)}</div></Card></> }

function InfoIcon() { return <span className="info-symbol">i</span> }
function SettingsPage({ path, ui, setToast, institutionType }: { path: string; ui: UI; setToast: (message: string) => void; institutionType: InstitutionType }) {
  const ar = ui.direction === 'rtl'
  const school = institutionType === 'school'
  const [tab, setTab] = useState('general')
  const [provisioned, setProvisioned] = useState(false)
  const name = school ? (ar ? 'مدرسة المستقبل' : 'Al-Mustaqbal School') : (ar ? 'جامعة تعز' : 'Taiz University')
  const code = school ? 'FUT-SCH' : 'TAIZ-UNI'
  const save = () => setToast(ar ? 'تم حفظ الإعدادات داخل النموذج التجريبي.' : 'Settings saved inside this prototype.')
  return <>
    <PageHeader title={path.includes('profile') ? (ar ? 'ملف المؤسسة' : 'Institution profile') : (ar ? 'إعدادات المؤسسة والبيئة' : 'Institution settings')} description={ar ? 'إعدادات مختلفة للجامعة والمدرسة وتهيئة بيئة مستقلة.' : 'Different university and school settings plus dedicated environment setup.'} ui={ui} actions={<Button icon="save" onClick={save}>{ui.save}</Button>} />
    <div className="workspace-intro"><span className="workspace-intro-icon"><Building2 size={22} /></span><div><b>{name} · {school ? (ar ? 'نموذج مدرسة' : 'School') : (ar ? 'نموذج جامعة' : 'University')}</b><p>{ar ? 'تغيير نوع المؤسسة من شاشة الدخول يغير البيانات والوحدات.' : 'Changing the type on login changes sample data and modules.'}</p></div><Badge tone="warning">{ar ? 'Prototype فقط' : 'Prototype only'}</Badge></div>
    <Card className="settings-card"><div className="settings-nav"><button className={tab === 'general' ? 'active' : ''} onClick={() => setTab('general')}><Building2 size={16} />{ar ? 'هوية المؤسسة' : 'Identity'}</button><button className={tab === 'academic' ? 'active' : ''} onClick={() => setTab('academic')}><GraduationCap size={16} />{ar ? 'الإعداد الأكاديمي' : 'Academic setup'}</button><button className={tab === 'hosting' ? 'active' : ''} onClick={() => setTab('hosting')}><Globe2 size={16} />{ar ? 'الاستضافة' : 'Hosting'}</button><button className={tab === 'security' ? 'active' : ''} onClick={() => setTab('security')}><ShieldCheck size={16} />{ar ? 'الأمان' : 'Security'}</button></div><div className="settings-content">
      {tab === 'general' && <><div className="settings-heading"><div className="institution-logo large">{school ? 'م' : 'ج'}</div><div><h2>{name}</h2><p>{code} · {school ? (ar ? 'مدرسة' : 'School') : (ar ? 'جامعة' : 'University')}</p></div></div><div className="form-grid"><label>{ar ? 'الاسم بالعربية' : 'Arabic name'}<input defaultValue={school ? 'مدرسة المستقبل' : 'جامعة تعز'} /></label><label>{ar ? 'الاسم بالإنجليزية' : 'English name'}<input defaultValue={school ? 'Al-Mustaqbal School' : 'Taiz University'} /></label><label>{ar ? 'الرمز' : 'Code'}<input defaultValue={code} disabled /></label><label>{ar ? 'البريد الإداري' : 'Admin email'}<input defaultValue={school ? 'admin@future-school.demo' : 'admin@taiz-university.demo'} /></label><label className="full-field">{ar ? 'الوصف' : 'Description'}<textarea rows={4} defaultValue={school ? 'بيئة مدرسة للمراحل والصفوف والشعب.' : 'بيئة جامعة للكليات والأقسام والبرامج والساعات.'} /></label></div></>}
      {tab === 'academic' && <><div className="settings-heading"><span className="feature-icon"><GraduationCap size={20} /></span><div><h2>{school ? (ar ? 'إعداد المدرسة' : 'School setup') : (ar ? 'إعداد الجامعة' : 'University setup')}</h2><p>{school ? (ar ? 'مراحل وصفوف وشعب ومواد.' : 'Stages, grades, sections and subjects.') : (ar ? 'كليات وأقسام وبرامج ومقررات.' : 'Faculties, departments, programs and courses.')}</p></div></div><div className="form-grid"><label>{school ? (ar ? 'نظام المراحل' : 'Stage model') : (ar ? 'نظام الفصول' : 'Term model')}<select><option>{school ? 'مراحل وصفوف' : 'فصول دراسية'}</option><option>{school ? 'صفوف وشعب' : 'ساعات معتمدة'}</option></select></label><label>{school ? (ar ? 'مدة الحصة' : 'Class period') : (ar ? 'نظام الساعات' : 'Credit system')}<input defaultValue={school ? '45 دقيقة' : 'ساعات معتمدة'} /></label><label>{school ? (ar ? 'المرحلة الافتراضية' : 'Default stage') : (ar ? 'العام الأكاديمي' : 'Academic year')}<input defaultValue={school ? 'المرحلة الثانوية' : '2025–2026'} /></label><label>{school ? (ar ? 'سياسة الحضور' : 'Attendance policy') : (ar ? 'الفصل الحالي' : 'Current term')}<input defaultValue={school ? 'يومي حسب الشعبة' : 'الفصل الأول'} /></label></div></>}
      {tab === 'hosting' && <><div className="settings-heading"><span className="feature-icon teal"><Globe2 size={20} /></span><div><h2>{ar ? 'بيئة المؤسسة والاستضافة' : 'Environment & hosting'}</h2><p>{ar ? 'تهيئة جامعة أو مدرسة على بيئة مستقلة.' : 'Configure an isolated environment for this institution.'}</p></div></div><div className="detail-grid"><Card><Badge tone={provisioned ? 'success' : 'warning'}>{provisioned ? (ar ? 'مجهزة تجريبيًا' : 'Demo provisioned') : (ar ? 'بيئة مشتركة' : 'Shared demo')}</Badge><h2>{name}</h2><p>{ar ? 'في النظام الحقيقي سيُنشأ Tenant وقاعدة بيانات وDomain منفصل. هنا الاختيار محلي فقط.' : 'Production would create an isolated tenant, database and domain. Here it is local only.'}</p><Button onClick={() => { setProvisioned(true); setToast(ar ? 'تمت محاكاة تهيئة البيئة المستقلة.' : 'Dedicated environment simulated.') }}>{provisioned ? (ar ? 'إعادة التهيئة' : 'Re-provision') : (ar ? 'تهيئة بيئة مستقلة' : 'Provision environment')}</Button></Card><Card><div className="record-fields"><div><small>{ar ? 'النطاق' : 'Domain'}</small><b>{school ? 'school-demo.tonlin.local' : 'university-demo.tonlin.local'}</b></div><div><small>{ar ? 'الخادم' : 'Server'}</small><b>{provisioned ? 'tenant-demo-01' : 'shared-demo'}</b></div></div><div className="inline-success"><CheckCircle2 size={16} />{ar ? 'لا يتم إنشاء خادم فعلي من هذه الشاشة.' : 'No real server is created here.'}</div></Card></div></>}
      {tab === 'security' && <><div className="settings-heading"><span className="feature-icon"><ShieldCheck size={20} /></span><div><h2>{ar ? 'الأمان والوصول' : 'Security & access'}</h2><p>{ar ? 'ضبط الوصول على مستوى المؤسسة.' : 'Control institution-level access.'}</p></div></div><div className="setting-toggle"><span><b>{ar ? 'موافقة قبل نشر النتائج' : 'Approval before publishing'}</b><small>{ar ? 'المعلم يرسل والمنسق يعتمد.' : 'Teacher submits and coordinator approves.'}</small></span><button className="toggle on"><i /></button></div><div className="info-note"><ShieldCheck size={18} /><span><b>{ar ? 'النطاق الحالي' : 'Current scope'}</b><small>{name} · {code} · {ar ? 'بيانات تجريبية' : 'Sample data'}</small></span></div></>}
    </div></Card>
  </>
}
function InstitutionDetailPage({ ui, navigate, setToast }: { ui: UI; navigate: (path: string) => void; setToast: (message: string) => void }) { return <><PageHeader title="جامعة تعز" description="TAIZ-UNI · جامعة · آخر نشاط منذ 4 دقائق" ui={ui} actions={<><Button variant="outline" icon="pencil" onClick={() => navigate('/platform/institutions/uni-taiz/edit')}>{ui.edit}</Button><Button onClick={() => navigate('/institution/dashboard')} icon="arrow">{ui.direction === 'rtl' ? 'فتح مساحة المؤسسة' : 'Open workspace'}</Button></>} /><div className="detail-banner"><span className="institution-logo large">ج</span><div><Badge tone="success">{ui.active}</Badge><h2>جامعة تعز</h2><p>Taiz University · demo@taiz.edu · صنعاء، اليمن</p></div><div className="detail-meta"><span><small>{ui.direction === 'rtl' ? 'المتعلمون' : 'Learners'}</small><b>18,420</b></span><span><small>{ui.direction === 'rtl' ? 'الخطة' : 'Plan'}</small><b>Enterprise</b></span><span><small>{ui.direction === 'rtl' ? 'تاريخ التسجيل' : 'Created'}</small><b>12/01/2025</b></span></div></div><div className="tabs"><button className="active">{ui.direction === 'rtl' ? 'ملخص' : 'Overview'}</button><button>{ui.direction === 'rtl' ? 'المستخدمون' : 'Users'}</button><button>{ui.direction === 'rtl' ? 'الإعداد الأكاديمي' : 'Academic setup'}</button><button>{ui.direction === 'rtl' ? 'الاستخدام' : 'Usage'}</button><button>{ui.direction === 'rtl' ? 'التدقيق' : 'Audit'}</button></div><div className="detail-grid"><Card><div className="card-heading"><div><h3>{ui.direction === 'rtl' ? 'حالة الاشتراك' : 'Subscription health'}</h3><p>{ui.sample}</p></div><Badge tone="success">Enterprise</Badge></div><div className="limit-row"><span><b>18,420</b><small>{ui.direction === 'rtl' ? 'من 25,000 متعلم' : 'of 25,000 learners'}</small></span><div className="progress-line"><i style={{ width: '74%' }} /></div><strong>74%</strong></div><Button variant="soft" onClick={() => setToast(ui.toastSaved)}>{ui.direction === 'rtl' ? 'إدارة الخطة' : 'Manage plan'}</Button></Card><Card><div className="card-heading"><div><h3>{ui.direction === 'rtl' ? 'المديرون' : 'Administrators'}</h3><p>{ui.sample}</p></div><Button variant="ghost" icon="plus" onClick={() => setToast(ui.toastSaved)}>{ui.add}</Button></div><div className="mini-user"><span className="avatar">س</span><span><b>د. سامي القيسي</b><small>مالك المؤسسة · آخر دخول اليوم</small></span><Badge tone="success">{ui.active}</Badge></div><div className="mini-user"><span className="avatar">ن</span><span><b>أ. نوال علي</b><small>منسقة أكاديمية · آخر دخول أمس</small></span><Badge tone="success">{ui.active}</Badge></div></Card></div></> }

function CourseDetailPage({ ui, navigate, setToast }: { ui: UI; navigate: (path: string) => void; setToast: (message: string) => void }) { return <><PageHeader title="هندسة البرمجيات" description="CS201 · أ. أحمد السامعي · الشعبة CS-3A · 86 طالبًا" ui={ui} actions={<Button icon="upload" onClick={() => navigate('/teacher/assignments/new')}>{ui.createAssignment}</Button>} /><div className="course-hero"><div className="course-icon"><BookOpen size={25} /></div><div><Badge tone="soft">CS201 · {ui.sample}</Badge><h2>{ui.direction === 'rtl' ? 'هندسة البرمجيات' : 'Software Engineering'}</h2><p>{ui.direction === 'rtl' ? 'تعلّم دورة حياة المنتج، المتطلبات، التصميم والاختبار من خلال مشروع تطبيقي.' : 'Explore product lifecycle, requirements, design and testing through a practical project.'}</p></div><div className="course-progress"><strong>68%</strong><small>{ui.direction === 'rtl' ? 'نسبة التقدم' : 'Course progress'}</small><div className="progress-line"><i style={{ width: '68%' }} /></div></div></div><div className="tabs course-tabs"><button className="active">{ui.direction === 'rtl' ? 'نظرة عامة' : 'Overview'}</button><button>{ui.direction === 'rtl' ? 'المواد' : 'Materials'}</button><button>{ui.direction === 'rtl' ? 'الواجبات' : 'Assignments'}</button><button>{ui.direction === 'rtl' ? 'الاختبارات' : 'Exams'}</button><button>{ui.direction === 'rtl' ? 'المجتمع' : 'Community'}</button></div><div className="course-grid"><Card><div className="card-heading"><div><h3>{ui.direction === 'rtl' ? 'المواعيد القادمة' : 'Upcoming dates'}</h3><p>{ui.sample}</p></div></div><div className="date-list">{[['28','سبتمبر','تسليم واجب مخطط قاعدة البيانات'],['04','أكتوبر','اختبار قصير · المتطلبات'],['10','أكتوبر','جلسة مراجعة المشروع']].map(([d,m,n]) => <div key={n}><span><b>{d}</b><small>{m}</small></span><p><b>{n}</b><small>CS201 · {ui.institution}</small></p><ArrowLeft size={15} /></div>)}</div></Card><Card><div className="card-heading"><div><h3>{ui.direction === 'rtl' ? 'آخر المواد' : 'Recent materials'}</h3><p>{ui.sample}</p></div><button className="link-btn">{ui.viewAll}<ArrowLeft size={15} /></button></div><div className="material-list">{['محاضرة 04 · تصميم الأنظمة','قراءة إضافية · أنماط التصميم','فيديو · مراجعة المشروع'].map((n, i) => <button key={n} onClick={() => setToast(ui.toastSaved)}><span className={`material-icon mat-${i}`}><FileText size={16} /></span><span><b>{n}</b><small>تمت الإضافة منذ {i + 1} يوم</small></span><Download size={15} /></button>)}</div></Card></div></> }

function TranscriptPage({ ui, setToast }: { ui: UI; setToast: (message: string) => void }) { return <><PageHeader title={ui.direction === 'rtl' ? 'السجل الأكاديمي' : 'Transcript'} description={ui.direction === 'rtl' ? 'معاينة قابلة للطباعة — النتائج المنشورة فقط.' : 'Print-ready preview — published results only.'} ui={ui} actions={<><Button variant="outline" icon="download" onClick={() => setToast(ui.toastSaved)}>{ui.direction === 'rtl' ? 'تحميل PDF' : 'Download PDF'}</Button><Button icon="file" onClick={() => setToast(ui.toastSaved)}>{ui.direction === 'rtl' ? 'طباعة' : 'Print'}</Button></>} /><Card className="transcript-card"><div className="transcript-head"><Logo /><div><Badge tone="soft">{ui.sample}</Badge><h2>{ui.direction === 'rtl' ? 'السجل الأكاديمي' : 'Academic transcript'}</h2><p>ليان محمد أحمد · ST-24031 · هندسة البرمجيات</p></div><span><small>{ui.direction === 'rtl' ? 'العام الأكاديمي' : 'Academic year'}</small><b>2025 / 2026</b></span></div><div className="transcript-table"><div className="transcript-row head"><span>{ui.direction === 'rtl' ? 'المقرر' : 'Course'}</span><span>{ui.direction === 'rtl' ? 'الساعات' : 'Credits'}</span><span>{ui.direction === 'rtl' ? 'التقدير' : 'Grade'}</span><span>{ui.direction === 'rtl' ? 'النقاط' : 'Points'}</span></div>{courses.slice(0,3).map((c, i) => <div className="transcript-row" key={c.code}><span><b>{c.name}</b><small>{c.code}</small></span><span>3</span><span><Badge tone="success">{['A','A-','B+'][i]}</Badge></span><strong>{['4.0','3.7','3.3'][i]}</strong></div>)}</div><div className="transcript-footer"><span><small>{ui.direction === 'rtl' ? 'المعدل التراكمي' : 'GPA'}</small><b>3.67 / 4.00</b></span><span><small>{ui.direction === 'rtl' ? 'الحالة' : 'Status'}</small><Badge tone="success">{ui.direction === 'rtl' ? 'منتظم' : 'Good standing'}</Badge></span></div></Card></> }

function HelpPage({ ui }: { ui: UI }) { return <><PageHeader title={ui.direction === 'rtl' ? 'مركز المساعدة' : 'Help center'} description={ui.direction === 'rtl' ? 'إجابات سريعة ومسار واضح لطلب الدعم.' : 'Quick answers and a clear path to support.'} ui={ui} /><div className="help-grid">{[['book','كيف أرفع واجبًا؟','شرح خطوة بخطوة لرفع ملف أو نص.'],['shield','من يرى درجاتي؟','تظهر للطالب والمعلم والأدوار المصرح لها فقط.'],['message','أحتاج دعمًا','افتح تذكرة وسيتابعها فريق الدعم.']].map(([ic,title,desc]) => <Card key={title}><span className="feature-icon"><Icon name={ic} /></span><h3>{title}</h3><p>{desc}</p><button className="link-btn">{ui.learnMore}<ArrowLeft size={15} /></button></Card>)}</div><Card className="support-callout"><span className="feature-icon teal"><MessageSquare size={19} /></span><span><h3>{ui.direction === 'rtl' ? 'لم تجد ما تبحث عنه؟' : 'Could not find what you need?'}</h3><p>{ui.direction === 'rtl' ? 'أنشئ تذكرة تجريبية مع وصف المشكلة وأولوية الطلب.' : 'Create a demo ticket with a description and priority.'}</p></span><Button>{ui.direction === 'rtl' ? 'إنشاء تذكرة' : 'Create ticket'}</Button></Card></> }

function FormPage({ path, ui, navigate, setToast }: { path: string; ui: UI; navigate: (path: string) => void; setToast: (message: string) => void }) { const isInstitution = path.includes('institution'); const title = path.includes('institutions') ? ui.addInstitution : path.includes('students') ? ui.addStudent : path.includes('teachers') ? (ui.direction === 'rtl' ? 'دعوة معلم' : 'Invite teacher') : path.includes('courses') ? (ui.direction === 'rtl' ? 'إضافة مقرر' : 'Add course') : ui.create; return <><PageHeader title={title} description={ui.direction === 'rtl' ? 'املأ البيانات المطلوبة، ثم راجعها قبل الحفظ.' : 'Complete the required fields, then review before saving.'} ui={ui} actions={<Button variant="ghost" onClick={() => navigate(isInstitution ? '/institution/dashboard' : '/platform/dashboard')}>{ui.cancel}</Button>} /><Card className="form-card"><div className="form-section"><div><h3>{ui.direction === 'rtl' ? 'المعلومات الأساسية' : 'Basic information'}</h3><p>{ui.direction === 'rtl' ? 'هذه الحقول مطلوبة لإظهار التدفق فقط.' : 'These fields are required for the prototype flow.'}</p></div><div className="form-grid"><label>{ui.direction === 'rtl' ? 'الاسم بالعربية *' : 'Arabic name *'}<input placeholder="مثال: مدرسة المستقبل" /></label><label>{ui.direction === 'rtl' ? 'الاسم بالإنجليزية' : 'English name'}<input placeholder="Example: Future School" /></label><label>{ui.direction === 'rtl' ? 'الرمز' : 'Code'}<input placeholder="FUT-SCH" /></label><label>{ui.direction === 'rtl' ? 'الحالة' : 'Status'}<select defaultValue="نشط"><option>نشط</option><option>مسودة</option><option>قيد المراجعة</option></select></label><label className="full-field">{ui.direction === 'rtl' ? 'ملاحظات' : 'Notes'}<textarea rows={4} placeholder={ui.direction === 'rtl' ? 'أضف سياقًا اختياريًا...' : 'Add optional context...'} /></label></div></div><div className="form-actions"><Button variant="ghost" onClick={() => navigate(isInstitution ? '/institution/dashboard' : '/platform/dashboard')}>{ui.cancel}</Button><Button variant="outline" icon="save" onClick={() => setToast(ui.toastSaved)}>{ui.draft}</Button><Button icon="check" onClick={() => { setToast(ui.toastSaved); navigate(isInstitution ? '/institution/dashboard' : '/platform/institutions') }}>{ui.save}</Button></div></Card></> }

function GenericPage({ path, ui, navigate, setToast }: { path: string; ui: UI; navigate: (path: string) => void; setToast: (message: string) => void }) { const title = routeTitle(path, ui.direction === 'rtl' ? 'ar' : 'en'); return <><PageHeader title={title} description={ui.direction === 'rtl' ? 'هذه الشاشة متصلة بالشِلّ وتعرض الحالة المناسبة للمسار التجريبي.' : 'This screen is connected to the shell and shows the right prototype state.'} ui={ui} actions={<Button onClick={() => setToast(ui.toastSaved)} icon="plus">{ui.create}</Button>} /><Card className="generic-page"><span className="feature-icon"><Sparkles size={21} /></span><h2>{title}</h2><p>{ui.demoNote}</p><div className="generic-actions"><Button onClick={() => navigate(roleInfo['institution'].home)}>{ui.viewDashboard}</Button><Button variant="outline" onClick={() => setToast(ui.toastSaved)}>{ui.retry}</Button></div></Card></> }

export default function App() {
  const [lang, setLang] = useState<Lang>(() => (localStorage.getItem('tonlin-lang') as Lang) || 'ar')
  const [role, setRole] = useState<Role>(() => (localStorage.getItem('tonlin-role') as Role) || 'institution')
  const [institutionType, setInstitutionType] = useState<InstitutionType>(() => localStorage.getItem('tonlin-institution-type') === 'school' ? 'school' : 'university')
  const basePath = import.meta.env.BASE_URL || '/'
  const readCurrentPath = () => {
    const address = new URL(window.location.href)
    const recovered = address.searchParams.get('p')
    if (recovered) {
      const route = recovered.startsWith('/') ? recovered : `/${recovered}`
      address.searchParams.delete('p')
      const rest = address.searchParams.toString()
      const prefixed = basePath === '/' ? route : `${basePath}${route.replace(/^\/+/, '')}`
      window.history.replaceState({}, '', `${prefixed}${rest ? `?${rest}` : ''}${address.hash}`)
      return route
    }
    const pathname = window.location.pathname
    if (basePath !== '/' && pathname.startsWith(basePath)) return pathname.slice(basePath.length - 1) || '/'
    return pathname || '/'
  }
  const browserPath = (route: string) => basePath === '/' ? route : `${basePath}${route.replace(/^\/+/, '')}`
  const [path, setPath] = useState(() => readCurrentPath())
  useEffect(() => { document.documentElement.lang = lang; document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'; localStorage.setItem('tonlin-lang', lang); document.title = `T-Onlin | ${lang === 'ar' ? 'منصة تعليمية متكاملة' : 'Education platform'}` }, [lang])
  useEffect(() => { const onPop = () => setPath(readCurrentPath()); window.addEventListener('popstate', onPop); return () => window.removeEventListener('popstate', onPop) }, [])
  const navigate = (next: string) => { if (next === path) return; window.history.pushState({}, '', browserPath(next)); setPath(next); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  const selectRole = (next: Role) => { setRole(next); localStorage.setItem('tonlin-role', next) }
  const applyRole = (next: Role) => { selectRole(next); navigate(roleInfo[next].home) }
  const ui: UI = { ...copy[lang], institution: lang === 'ar' ? (institutionType === 'school' ? 'مدرسة المستقبل' : 'جامعة تعز') : (institutionType === 'school' ? 'Al-Mustaqbal School' : 'Taiz University') }
  const publicPaths = ['/', '/features', '/solutions/schools', '/solutions/universities', '/about', '/contact', '/pricing', '/login', '/register-institution', '/forgot-password', '/reset-password', '/verify-account', '/access-denied', '/not-found', '/session-expired', '/maintenance', '/privacy', '/terms']
  const authenticated = localStorage.getItem('tonlin-authenticated') === 'true'
  if (publicPaths.includes(path)) return <PublicPage path={path} lang={lang} setLang={setLang} navigate={navigate} ui={ui} institutionType={institutionType} setInstitutionType={setInstitutionType} role={role} setRole={selectRole} />
  const section = path.split('/').filter(Boolean)[0]
  const routeRole: Record<string, Role> = { platform: 'platform', institution: 'institution', academic: 'academic', teacher: 'teacher', student: 'student', guardian: 'guardian', support: 'support' }
  if (!authenticated) return <PublicPage path="/login" lang={lang} setLang={setLang} navigate={navigate} ui={ui} institutionType={institutionType} setInstitutionType={setInstitutionType} role={role} setRole={selectRole} />
  if (!routeRole[section]) return <PublicPage path="/not-found" lang={lang} setLang={setLang} navigate={navigate} ui={ui} institutionType={institutionType} setInstitutionType={setInstitutionType} role={role} setRole={selectRole} />
  const schoolOnly = institutionType === 'school' && ['/institution/faculties', '/institution/programs'].includes(path)
  const universityOnly = institutionType === 'university' && path === '/institution/grades'
  if (routeRole[section] !== role || schoolOnly || universityOnly || (role === 'guardian' && institutionType === 'university')) return <PublicPage path="/access-denied" lang={lang} setLang={setLang} navigate={navigate} ui={ui} institutionType={institutionType} setInstitutionType={setInstitutionType} role={role} setRole={selectRole} />
  return <AppShell path={path} role={role} setRole={applyRole} lang={lang} setLang={setLang} navigate={navigate} ui={ui} institutionType={institutionType} setInstitutionType={setInstitutionType} />
}


function CourseCatalogPage({ ui, navigate, institutionType }: { ui: UI; navigate: (path: string) => void; institutionType: InstitutionType }) {
  const ar = ui.direction === 'rtl'
  const school = institutionType === 'school'
  const items = [
    { code: 'MAT-311', title: ar ? 'الرياضيات المتقدمة' : 'Advanced Mathematics', teacher: ar ? 'أ. ريم صالح' : 'Ms. Reem Saleh', initials: 'RS', progress: 68, next: ar ? 'اليوم · 09:00' : 'Today · 09:00', tone: 'forest' },
    { code: 'PHY-304', title: ar ? 'الفيزياء' : 'Physics', teacher: ar ? 'أ. فادي ناصر' : 'Mr. Fadi Nasser', initials: 'FN', progress: 54, next: ar ? 'غدًا · 10:30' : 'Tomorrow · 10:30', tone: 'blue' },
    { code: 'ENG-210', title: ar ? 'الأدب الإنجليزي' : 'English Literature', teacher: ar ? 'أ. سارة أمين' : 'Ms. Sara Amin', initials: 'SA', progress: 72, next: ar ? 'الأربعاء · 12:15' : 'Wed · 12:15', tone: 'ochre' },
  ]
  return <>
    <PageHeader sample={false} title={ar ? 'المقررات والمواد' : 'Courses & subjects'} description={ar ? 'تقدم المقررات والموارد وأنشطة التعلم القادمة.' : 'Course progress, resources, and upcoming learning activities.'} ui={ui} actions={<Button icon="plus" onClick={() => navigate('/institution/courses/new')}>{ar ? 'إنشاء مقرر' : 'Create course'}</Button>} />
    <div className="course-catalog-grid">
      {items.map(item => <article className="course-product-card" key={item.code}>
        <div className={`course-product-band ${item.tone}`}><b>{item.code}</b><BookOpen size={21} aria-hidden="true" /></div>
        <div className="course-product-body">
          <Badge tone="soft">{ar ? 'جاري' : 'In progress'}</Badge>
          <h2>{item.title}</h2>
          <p className="course-product-grade">{school ? (ar ? 'الصف الحادي عشر · الشعبة أ' : 'Grade 11 · Section A') : (ar ? 'المستوى الثالث · المجموعة أ' : 'Level 3 · Group A')}</p>
          <div className="course-instructor"><span className="course-initials">{item.initials}</span><span><small>{ar ? 'المعلم' : 'Instructor'}</small><b>{item.teacher}</b></span></div>
          <div className="course-progress-label"><span>{ar ? 'تقدم الفصل' : 'Term progress'}</span><b>{item.progress}%</b></div>
          <div className="course-progress-track"><i style={{ width: `${item.progress}%` }} /></div>
          <button className="course-next" onClick={() => navigate(`/teacher/course/${item.code.toLowerCase()}`)}><span><Clock3 size={17} /><small>{ar ? 'الحصة القادمة' : 'Next class'} <b>{item.next}</b></small></span><ChevronLeft size={17} /></button>
        </div>
      </article>)}
    </div>
  </>
}

function LiveLearningCheckPage({ ui, navigate, setToast }: { ui: UI; navigate: (path: string) => void; setToast: (message: string) => void }) {
  const ar = ui.direction === 'rtl'
  const ready = ar ? 'يعمل' : 'Working'
  return <>
    <PageHeader sample={false} title={ar ? 'الرياضيات المتقدمة' : 'Advanced Mathematics'} description={ar ? 'الصف 11 · الشعبة أ · تبدأ الحصة الساعة 09:00' : 'Grade 11 · Section A · Starts at 09:00'} ui={ui} actions={<Button variant="outline" onClick={() => navigate('/teacher/virtual-classes/sessions')}>{ar ? 'كل الفصول' : 'All classes'}</Button>} />
    <div className="live-check-layout">
      <section className="live-preview-panel" aria-label={ar ? 'معاينة الكاميرا' : 'Camera preview'}>
        <div className="live-preview-status"><CheckCircle2 size={14} />{ar ? 'الكاميرا جاهزة' : 'Camera ready'}</div>
        <div className="teacher-avatar-art"><span className="teacher-avatar-head" /><span className="teacher-avatar-body" /></div>
        <div className="live-preview-caption"><span className="live-avatar-small">RS</span><b>{ar ? 'أ. ريم صالح' : 'Ms. Reem Saleh'}</b></div>
      </section>
      <Card className="device-check-card">
        <Badge tone="soft">{ar ? 'فحص الجهاز' : 'Device check'}</Badge>
        <h2>{ar ? 'أنت جاهز للانضمام' : 'You’re ready to join'}</h2>
        <p>{ar ? 'تحقق من الميكروفون والكاميرا والصوت قبل دخول الفصل.' : 'Check your microphone, camera, and audio before entering the classroom.'}</p>
        <div className="device-check-row"><Mic size={17} /><span><b>{ar ? 'الميكروفون' : 'Microphone'}</b><small>{ar ? 'الميكروفون الافتراضي' : 'Default microphone'}</small></span><Badge tone="success">{ready}</Badge></div>
        <div className="device-check-row"><Camera size={17} /><span><b>{ar ? 'الكاميرا' : 'Camera'}</b><small>{ar ? 'الكاميرا المدمجة' : 'Built-in camera'}</small></span><Badge tone="success">{ready}</Badge></div>
        <div className="device-check-row"><Volume2 size={17} /><span><b>{ar ? 'مكبر الصوت' : 'Speaker'}</b><small>{ar ? 'مكبر الصوت الافتراضي' : 'Default speakers'}</small></span><Button variant="outline" onClick={() => setToast(ar ? 'تم تشغيل نغمة الاختبار.' : 'Speaker test played.')}>{ar ? 'اختبار' : 'Test'}</Button></div>
        <div className="connection-status"><Wifi size={16} /><span><b>{ar ? 'الاتصال مستقر' : 'Connection is stable'}</b><small>{ar ? 'زمن الاستجابة منخفض · ممتاز' : 'Low latency · Excellent'}</small></span></div>
        <Button className="join-classroom-btn" icon="video" onClick={() => setToast(ar ? 'تم تجهيز الانضمام إلى الفصل التجريبي.' : 'Ready to join the demo classroom.')}>{ar ? 'الانضمام إلى الفصل' : 'Join classroom'}</Button>
      </Card>
    </div>
  </>
}


function InstitutionDashboardReference({ ui, institutionType, navigate, setToast }: { ui: UI; institutionType: InstitutionType; navigate: (path: string) => void; setToast: (message: string) => void }) {
  const ar = ui.direction === 'rtl'
  const school = institutionType === 'school'
  const stats = [
    { label: ar ? 'الطلاب النشطون' : 'Active students', value: '1,284', note: ar ? '+4.8% هذا الفصل' : '+4.8% this term', icon: GraduationCap, tone: 'mint' },
    { label: ar ? 'الهيئة التعليمية' : 'Teaching staff', value: '86', note: ar ? '4 في إجازة حاليًا' : '4 currently away', icon: Users, tone: 'sky' },
    { label: ar ? 'المقررات النشطة' : 'Active courses', value: '142', note: ar ? '18 قسمًا' : '18 departments', icon: BookOpen, tone: 'sand' },
    { label: ar ? 'الحضور اليوم' : 'Attendance today', value: '94.2%', note: ar ? '+1.4% هذا الأسبوع' : '+1.4% this week', icon: Activity, tone: 'rose' },
  ]
  const lessons = [
    { time: '09:00', meridiem: 'AM', title: ar ? 'الرياضيات المتقدمة' : 'Advanced Mathematics', detail: school ? (ar ? 'الصف 11 · الشعبة أ · فصل مباشر' : 'Grade 11 · Section A · Live classroom') : (ar ? 'المستوى الثالث · شعبة أ · فصل مباشر' : 'Level 3 · Group A · Live classroom'), tone: 'green' },
    { time: '10:30', meridiem: 'AM', title: ar ? 'الفيزياء' : 'Physics', detail: school ? (ar ? 'الصف 11 · الشعبة أ · القاعة 204' : 'Grade 11 · Section A · Room 204') : (ar ? 'المستوى الثالث · شعبة أ · القاعة 204' : 'Level 3 · Group A · Room 204'), tone: 'blue' },
    { time: '12:15', meridiem: 'PM', title: ar ? 'الأدب الإنجليزي' : 'English Literature', detail: school ? (ar ? 'الصف 11 · الشعبة أ · القاعة 204' : 'Grade 11 · Section A · Room 204') : (ar ? 'المستوى الثالث · شعبة أ · القاعة 204' : 'Level 3 · Group A · Room 204'), tone: 'ochre' },
  ]
  const attention = [
    { title: ar ? 'تدريب التفاضل والتكامل' : 'Calculus practice set', detail: ar ? 'يستحق اليوم · 18:00' : 'Due today · 18:00', icon: FileText, tone: 'sand' },
    { title: ar ? '18 تسليمًا للتقييم' : '18 submissions to grade', detail: ar ? 'موعد التسليم الأربعاء' : 'Due Wednesday', icon: CheckCircle2, tone: 'mint' },
    { title: ar ? 'قراءة الفصل 6' : 'Read chapter 6', detail: ar ? 'الأدب الإنجليزي' : 'English Literature', icon: BookOpen, tone: 'sky' },
  ]
  return <div className="reference-dashboard">
    <header className="reference-dashboard-header">
      <div><div className="reference-date">{ar ? 'الاثنين، 14 أبريل' : 'MONDAY, 14 APRIL'}</div><h1>{ar ? (school ? 'صباح الخير، مديرة المدرسة' : 'صباح الخير، د. لينا') : (school ? 'Good morning, School admin' : 'Good morning, Dr. Lina')}</h1><p>{ar ? `إليك ما يحتاج إلى اهتمامك اليوم في ${ui.institution}.` : `Here’s what needs your attention at ${ui.institution} today.`}</p></div>
      <Button icon="plus" onClick={() => navigate('/institution/students/new')}>{ar ? 'إضافة طالب' : 'Add student'}</Button>
    </header>
    <div className="reference-stats-grid">
      {stats.map(stat => <Card className="reference-stat-card" key={stat.label}><span className={`reference-stat-icon ${stat.tone}`}><stat.icon size={19} /></span><MoreHorizontal className="reference-stat-more" size={18} /><small>{stat.label}</small><strong>{stat.value}</strong><span className="reference-stat-note">{stat.note}</span></Card>)}
    </div>
    <div className="reference-dashboard-panels">
      <Card className="reference-schedule-card">
        <div className="reference-card-head"><div><h2>{ar ? 'جدول التعلم اليوم' : 'Today’s learning schedule'}</h2><p>{ar ? 'الاثنين، 14 أبريل' : 'Monday, 14 April'}</p></div><button className="link-btn" onClick={() => navigate('/institution/timetable')}>{ar ? 'الجدول الكامل' : 'Full timetable'}<ChevronRight size={15} /></button></div>
        <div className="reference-lesson-list">{lessons.map(lesson => <button className="reference-lesson" key={lesson.time} onClick={() => navigate('/teacher/virtual-classes')}><span className="reference-lesson-time"><b>{lesson.time}</b><small>{lesson.meridiem}</small></span><i className={lesson.tone} /><span className="reference-lesson-copy"><b>{lesson.title}</b><small>{lesson.detail}</small></span><span className="reference-lesson-action">{lesson.time === '09:00' ? (ar ? 'انضم' : 'Join') : <ChevronRight size={16} />}</span></button>)}</div>
      </Card>
      <Card className="reference-attention-card">
        <div className="reference-card-head"><div><h2>{ar ? 'يحتاج إلى انتباه' : 'Needs attention'}</h2><p>{ar ? 'حسب الأولوية لهذا الأسبوع' : 'Prioritized for this week'}</p></div></div>
        <div className="reference-attention-list">{attention.map(item => <button className="reference-attention-item" key={item.title} onClick={() => navigate('/institution/assignments')}><span className={`reference-attention-icon ${item.tone}`}><item.icon size={17} /></span><span><b>{item.title}</b><small>{item.detail}</small></span><ChevronRight size={16} /></button>)}</div>
      </Card>
    </div>
    <Card className="reference-calendar-update"><span className="reference-attention-icon sand"><Bell size={17} /></span><span><b>{ar ? 'تحديث التقويم الأكاديمي' : 'Academic calendar update'}</b><small>{ar ? 'تبدأ نافذة تقييم منتصف الفصل في 28 أبريل. أصبح الجدول متاحًا الآن.' : 'The mid-term assessment window opens on 28 April. Your timetable is now available.'}</small></span><Button variant="outline" onClick={() => { navigate('/institution/timetable'); setToast(ar ? 'تم فتح التقويم الأكاديمي.' : 'Academic calendar opened.') }}>{ar ? 'عرض التحديث' : 'View update'}</Button></Card>
  </div>
}
