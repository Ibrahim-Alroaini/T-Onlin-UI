import { useMemo, useState } from 'react'
import {
  Activity, AlertCircle, ArrowDownToLine, ArrowLeft, ArrowUpRight, Bell, BookOpen,
  CalendarDays, Check, CheckCircle2, ChevronLeft, Clock3, FileText, Filter,
  GraduationCap, Inbox, MessageSquare, Plus, Search, Send, ShieldCheck, Sparkles,
  Users, Wallet, X,
} from 'lucide-react'
import { allRouteLabels, navByRole, roleLabel, roleInfo, routeTitle, type InstitutionType, type Lang, type Role } from './data'
import { resourceRows } from './resourceData'
import './operational-pages.css'

type Props = {
  path: string
  role: Role
  lang: Lang
  institutionType: InstitutionType
  navigate: (path: string) => void
  notify: (message: string) => void
}

const iconBySection = {
  platform: ShieldCheck,
  institution: GraduationCap,
  academic: CalendarDays,
  teacher: BookOpen,
  student: BookOpen,
  guardian: Users,
  support: Inbox,
} as const

const sampleActivity = [
  { ar: 'تمت مراجعة سجل تجريبي', en: 'A sample record was reviewed', timeAr: 'قبل 18 دقيقة', timeEn: '18 minutes ago' },
  { ar: 'تم تحديث حالة الطلب', en: 'Request status was updated', timeAr: 'قبل ساعة', timeEn: '1 hour ago' },
  { ar: 'أضيفت ملاحظة إلى المسار', en: 'A note was added to this workflow', timeAr: 'أمس', timeEn: 'Yesterday' },
]

function text(ar: string, en: string, lang: Lang) { return lang === 'ar' ? ar : en }
function slug(path: string) { return path.split('/').filter(Boolean).at(-1) || '' }
function Badge({ children, tone = 'neutral' }: { children: React.ReactNode; tone?: string }) {
  return <span className={`badge badge-${tone}`}>{children}</span>
}
function Button({ children, onClick, variant = 'primary', icon }: { children: React.ReactNode; onClick?: () => void; variant?: 'primary' | 'outline' | 'ghost' | 'soft'; icon?: React.ReactNode }) {
  return <button className={`btn btn-${variant}`} onClick={onClick}>{icon}{children}</button>
}
function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <section className={`card ${className}`}>{children}</section>
}

export function RecordDetailPage({ path, role, lang, institutionType, navigate, notify }: Props) {
  const ar = lang === 'ar'
  const parts = path.split('/').filter(Boolean)
  const id = parts.at(-1) || 'SMP-REC-01'
  const section = parts[0] || 'institution'
  const resource = parts.at(-2) || ''
  const label = routeTitle(path, lang)
  const record = resourceRows[resource]?.find(row => row[0] === id)
  const knownName = record ? (ar ? record[1] : record[2]) : null
  const displayName = knownName || (resource === 'students' || resource === 'children' ? (ar ? 'ليان محمد أحمد' : 'Layan Mohammed Ahmed') : resource === 'teachers' ? (ar ? 'أ. أحمد السامعي' : 'Ahmed Al-Samaei') : resource === 'tickets' ? (ar ? 'تعذر الدخول إلى بوابة الطالب' : 'Student portal access issue') : `${label} · ${id}`)
  const [tab, setTab] = useState('overview')
  const tabs = [
    ['overview', text('نظرة عامة', 'Overview', lang)],
    ['activity', text('النشاط', 'Activity', lang)],
    ['related', text('السجلات المرتبطة', 'Related records', lang)],
  ]
  const isTicket = resource === 'tickets'
  const isChild = resource === 'child' || resource === 'children'
  const isStudent = resource === 'students' || resource === 'student-records' || isChild
  const meta = record ? (ar ? record[3] : record[4]) : text('سجل توضيحي · لا توجد بيانات خادمية', 'Illustrative record · no server data', lang)
  const status = record ? (ar ? record[5] : record[6]) : text('قيد المراجعة', 'In review', lang)
  const statusTone = ['نشط', 'Active', 'مقبول', 'Approved'].includes(status) ? 'success' : ['قيد المراجعة', 'Pending', 'جديد', 'New'].includes(status) ? 'warning' : 'neutral'

  return <>
    <div className="record-breadcrumb"><button onClick={() => navigate(`/${section}/${resource}`)}><ArrowLeft size={14} />{text('العودة إلى القائمة', 'Back to list', lang)}</button><span>/</span><span>{label}</span></div>
    <div className="record-hero">
      <span className="record-avatar">{isTicket ? <MessageSquare size={22} /> : isStudent ? <GraduationCap size={24} /> : <FileText size={21} />}</span>
      <div className="record-hero-copy"><div className="record-kicker">{roleLabel(role, lang, institutionType)} · {text('بيانات تجريبية', 'Sample data', lang)}</div><h1>{displayName}</h1><p>{id} · {meta}</p></div>
      <div className="record-hero-actions"><Badge tone={statusTone}>{status}</Badge><Button variant="outline" icon={<ArrowDownToLine size={16} />} onClick={() => notify(text('التصدير تجريبي ولا ينشئ ملفًا حقيقيًا.', 'Export is simulated; no real file was generated.', lang))}>{text('تصدير', 'Export', lang)}</Button><Button icon={<Plus size={16} />} onClick={() => navigate(`/${section}/${resource}/${id}/edit`)}>{text('تعديل السجل', 'Edit record', lang)}</Button></div>
    </div>
    <div className="record-metrics">
      {[
        [text('الحالة الحالية', 'Current status', lang), status, CheckCircle2],
        [isStudent ? text('المسار الأكاديمي', 'Academic track', lang) : text('الجهة المرتبطة', 'Related organization', lang), isStudent ? text('هندسة البرمجيات · المستوى الثالث', 'Software Engineering · Level 3', lang) : text('جامعة تعز · عينة', 'Taiz University · sample', lang), BookOpen],
        [text('آخر تحديث', 'Last updated', lang), text('اليوم · 09:42', 'Today · 09:42', lang), Clock3],
      ].map(([caption, value, Icon]) => <Card className="record-metric" key={String(caption)}><span className="record-metric-icon"><Icon size={18} /></span><span><small>{String(caption)}</small><b>{String(value)}</b></span></Card>)}
    </div>
    <div className="workspace-tabs" role="tablist" aria-label={text('تفاصيل السجل', 'Record details', lang)}>{tabs.map(([key, title]) => <button key={key} className={tab === key ? 'active' : ''} onClick={() => setTab(key)} role="tab" aria-selected={tab === key}>{title}</button>)}</div>
    {tab === 'overview' && <div className="record-columns">
      <Card><div className="workspace-card-heading"><div><h2>{isTicket ? text('ملخص التذكرة', 'Ticket overview', lang) : text('المعلومات الأساسية', 'Basic information', lang)}</h2><p>{text('معلومات العرض التوضيحي لهذه الجلسة.', 'Illustrative information for this prototype session.', lang)}</p></div><Badge tone="soft">{text('نموذج أولي', 'Prototype', lang)}</Badge></div>
        <div className="record-fields">{[
          [text('المعرف', 'Identifier', lang), id],
          [text('الاسم / العنوان', 'Name / title', lang), displayName],
          [text(isStudent ? 'البرنامج أو الصف' : 'النطاق', isStudent ? 'Program or grade' : 'Scope', lang), isStudent ? text('هندسة البرمجيات · CS-3A', 'Software Engineering · CS-3A', lang) : roleLabel(role, lang, institutionType)],
          [text('الحالة', 'Status', lang), status],
          [text('التفاصيل', 'Details', lang), meta],
        ].map(([key, value]) => <div key={key}><small>{key}</small><b>{value}</b></div>)}</div>
      </Card>
      <Card><div className="workspace-card-heading"><div><h2>{isTicket ? text('معالجة الطلب', 'Resolution workflow', lang) : text('إجراءات مقترحة', 'Suggested actions', lang)}</h2><p>{text('خطوات آمنة مع توضيح أنها محلية.', 'Safe actions clearly marked as local-only.', lang)}</p></div><ShieldCheck size={18} /></div>
        <div className="record-action-list">{[
          [text('إضافة ملاحظة للمراجعة', 'Add a review note', lang), text('تُحفظ داخل حالة العرض فقط.', 'Stored in this demo state only.', lang)],
          [text('مراجعة السجل المرتبط', 'Review related record', lang), text('لا يؤدي إلى تغيير أي سجل فعلي.', 'Does not change any live record.', lang)],
        ].map(([title, detail]) => <button key={title} onClick={() => notify(text('تم تنفيذ الإجراء في واجهة النموذج فقط.', 'Action simulated in this prototype only.', lang))}><span><b>{title}</b><small>{detail}</small></span><ChevronLeft size={16} /></button>)}</div>
        {isTicket && <div className="ticket-reply"><label>{text('رد تجريبي', 'Demo reply', lang)}<textarea rows={3} placeholder={text('اكتب ردًا توضيحيًا...', 'Write an illustrative reply...', lang)} /></label><Button icon={<Send size={15} />} onClick={() => notify(text('تمت محاكاة إرسال الرد؛ لم يتم إرسال رسالة فعلية.', 'Reply simulated; no real message was sent.', lang))}>{text('إضافة رد', 'Add reply', lang)}</Button></div>}
      </Card>
    </div>}
    {tab === 'activity' && <Card className="record-activity-card"><div className="workspace-card-heading"><div><h2>{text('سجل النشاط', 'Activity history', lang)}</h2><p>{text('آخر التغييرات ضمن البيانات النموذجية.', 'Recent changes in the illustrative data.', lang)}</p></div><Activity size={18} /></div>{sampleActivity.map((item, i) => <div className="record-timeline" key={item.en}><span className="record-timeline-dot">{i === 0 ? <Check size={12} /> : <Clock3 size={12} />}</span><div><b>{ar ? item.ar : item.en}</b><small>{ar ? item.timeAr : item.timeEn} · {text('بيانات تجريبية', 'Sample data', lang)}</small></div></div>)}</Card>}
    {tab === 'related' && <Card className="record-related-card"><div className="workspace-card-heading"><div><h2>{text('السجلات المرتبطة', 'Related records', lang)}</h2><p>{text('روابط تنقل داخل النموذج.', 'Navigation within the prototype.', lang)}</p></div><Users size={18} /></div><div className="record-related-grid">{[
      [text('المقرر الدراسي', 'Course', lang), '/institution/courses'],
      [text('الحضور', 'Attendance', lang), `/${section}/attendance`],
      [text('الطلبات', 'Requests', lang), `/${section}/requests`],
    ].map(([caption, target]) => <button key={target} onClick={() => navigate(target)}><span><BookOpen size={16} /></span><b>{caption}</b><ArrowUpRight size={15} /></button>)}</div></Card>}
  </>
}

export function MessageCenterPage({ path, role, lang, institutionType, notify }: Props) {
  const ar = lang === 'ar'
  const conversations = useMemo(() => [
    { id: 'c1', name: ar ? 'نوال علي · المنسقة الأكاديمية' : 'Nawal Ali · Academic coordinator', preview: ar ? 'تم تحديث جدول الأسبوع القادم...' : 'The timetable for next week was updated...', time: ar ? '09:20' : '9:20 AM', initials: 'ن', unread: true },
    { id: 'c2', name: ar ? 'مجتمع مقرر CS201' : 'CS201 course community', preview: ar ? 'أحمد: أرفقت ملخص المحاضرة.' : 'Ahmed: I attached the lecture summary.', time: ar ? 'أمس' : 'Yesterday', initials: 'CS', unread: false },
    { id: 'c3', name: ar ? 'ريم الحداد · شؤون الطلاب' : 'Reem Al-Haddad · Student affairs', preview: ar ? 'شكرًا، وصل الطلب للمراجعة.' : 'Thanks, the request is under review.', time: ar ? 'الأحد' : 'Sunday', initials: 'ر', unread: false },
  ], [ar])
  const [active, setActive] = useState('c1')
  const [query, setQuery] = useState('')
  const [draft, setDraft] = useState('')
  const [sent, setSent] = useState<string[]>([])
  const filtered = conversations.filter(item => item.name.toLowerCase().includes(query.toLowerCase()) || item.preview.toLowerCase().includes(query.toLowerCase()))
  const current = conversations.find(item => item.id === active) || conversations[0]
  return <>
    <div className="page-header"><div><div className="eyebrow"><Badge tone="soft">{text('بيانات تجريبية', 'Sample data', lang)}</Badge></div><h1>{routeTitle(path, lang)}</h1><p>{text('محادثات مصممة للتوضيح؛ لا ترسل رسائل خارج النموذج.', 'Illustrative conversations only; nothing is sent outside this prototype.', lang)}</p></div><div className="page-actions"><Button variant="outline" icon={<Plus size={16} />} onClick={() => notify(text('ابدأ محادثة تجريبية جديدة من اختيار جهة اتصال.', 'Start a new demo conversation by choosing a contact.', lang))}>{text('محادثة جديدة', 'New message', lang)}</Button></div></div>
    <div className="message-center card">
      <aside className="message-list"><div className="message-search"><Search size={16} /><input value={query} onChange={event => setQuery(event.target.value)} placeholder={text('ابحث في المحادثات', 'Search conversations', lang)} /></div>{filtered.map(item => <button key={item.id} className={`message-preview ${item.id === active ? 'active' : ''}`} onClick={() => setActive(item.id)}><span className="message-avatar">{item.initials}</span><span className="message-preview-copy"><b>{item.name}</b><small>{item.preview}</small></span><span className="message-preview-meta"><small>{item.time}</small>{item.unread && <i />}</span></button>)}</aside>
      <section className="message-thread"><header><span className="message-avatar">{current.initials}</span><div><b>{current.name}</b><small>{roleLabel(role, lang, institutionType)} · {text('محادثة تجريبية', 'Demo conversation', lang)}</small></div><button aria-label={text('معلومات المحادثة', 'Conversation information', lang)} onClick={() => notify(text('هذه محادثة تجريبية محلية.', 'This is a local demo conversation.', lang))}><Bell size={17} /></button></header>
        <div className="thread-messages"><div className="thread-date">{text('اليوم · نموذج تجريبي', 'Today · Demo', lang)}</div><article className="thread-bubble received"><p>{ar ? 'مرحبًا، تم تحديث الجدول الدراسي للأسبوع القادم. هل يناسبك موعد المراجعة يوم الثلاثاء؟' : 'Hello, the timetable for next week has been updated. Does Tuesday work for your review?'}</p><small>09:20</small></article><article className="thread-bubble sent"><p>{ar ? 'شكرًا للتحديث. الثلاثاء مناسب، سأراجع التفاصيل قبل الاجتماع.' : 'Thanks for the update. Tuesday works; I’ll review the details before the meeting.'}</p><small>09:26 · {text('تم التسليم (نموذجي)', 'Delivered (demo)', lang)}</small></article>{sent.map((message, index) => <article className="thread-bubble sent" key={`${message}-${index}`}><p>{message}</p><small>{text('الآن · محلي', 'Now · local', lang)}</small></article>)}</div>
        <form className="message-compose" onSubmit={event => { event.preventDefault(); const clean = draft.trim(); if (!clean) return; setSent(previous => [...previous, clean]); setDraft(''); notify(text('تمت إضافة الرسالة إلى المحادثة التجريبية فقط.', 'Message added to the demo conversation only.', lang)) }}><textarea rows={2} value={draft} onChange={event => setDraft(event.target.value)} placeholder={text('اكتب رسالة تجريبية...', 'Write a demo message...', lang)} /><button disabled={!draft.trim()} aria-label={text('إرسال', 'Send', lang)}><Send size={17} /></button></form>
      </section>
    </div>
  </>
}

export default function OperationalWorkspacePage({ path, role, lang, institutionType, navigate, notify }: Props) {
  const ar = lang === 'ar'
  const section = path.split('/').filter(Boolean)[0] as Role
  const Icon = iconBySection[section] || Sparkles
  const title = routeTitle(path, lang)
  const description = allRouteLabels[path]?.description || text('مساحة عمل تفاعلية لهذه الوظيفة. البيانات تجريبية ولا تتصل بخدمات فعلية.', 'An interactive workspace for this function. Sample data only; no live services are connected.', lang)
  const [activeTab, setActiveTab] = useState('overview')
  const [query, setQuery] = useState('')
  const [checked, setChecked] = useState<string[]>([])
  const itemRoutes = navByRole[role].flatMap(group => group.items)
  const related = itemRoutes.filter(item => item.path !== path && (item.path.startsWith(`/${section}/`) || item.path === roleInfo[role].home)).slice(0, 4)
  const rows = resourceRows[slug(path)] || []
  const filteredRows = rows.filter(row => row.slice(1, 5).join(' ').toLowerCase().includes(query.toLowerCase()))
  const isFinance = /billing|plans|subscriptions|usage/.test(path)
  const isGovernance = /roles|permissions|integrations|settings/.test(path)
  const isPeople = /users|staff|teachers|guardians|children|students/.test(path)
  const stats = isFinance
    ? [[text('الاستخدام الحالي', 'Current usage', lang), '71%', Wallet], [text('العناصر النشطة', 'Active items', lang), '08', CheckCircle2], [text('تحتاج مراجعة', 'Needs review', lang), '02', AlertCircle]]
    : isGovernance
      ? [[text('السياسات النشطة', 'Active policies', lang), '12', ShieldCheck], [text('آخر مراجعة', 'Last review', lang), ar ? 'اليوم' : 'Today', Clock3], [text('عناصر غير متصلة', 'Not connected', lang), '02', AlertCircle]]
      : isPeople
        ? [[text('السجلات النشطة', 'Active records', lang), rows.length ? String(rows.length).padStart(2, '0') : '24', Users], [text('بانتظار الإجراء', 'Awaiting action', lang), '03', Clock3], [text('تم تحديثها اليوم', 'Updated today', lang), '08', Activity]]
        : [[text('إجمالي العناصر', 'Total items', lang), rows.length ? String(rows.length).padStart(2, '0') : '12', Icon], [text('بانتظار الإجراء', 'Awaiting action', lang), '03', Clock3], [text('نشاط اليوم', 'Activity today', lang), '08', Activity]]
  const tasks = isFinance
    ? [[text('مراجعة حدود الخطة', 'Review plan limits', lang), text('جامعة تعز · تنبيه توضيحي', 'Taiz University · illustrative notice', lang), 'warning'], [text('مطابقة فاتورة سبتمبر', 'Review September invoice', lang), text('لا توجد دفعة فعلية', 'No real payment', lang), 'neutral']]
    : isGovernance
      ? [[text('راجع صلاحيات التصدير', 'Review export permissions', lang), text('التغيير يحتاج اعتمادًا مخولًا', 'Changes need authorized review', lang), 'warning'], [text('تحقق من حالة التكاملات', 'Check integration status', lang), text('غير متصلة في هذا النموذج', 'Disconnected in this prototype', lang), 'neutral']]
      : [[text('مراجعة السجلات الجديدة', 'Review new records', lang), text('ضمن بيانات العرض فقط', 'Sample data only', lang), 'warning'], [text('متابعة تحديث اليوم', 'Follow up on today’s update', lang), text('آخر تحديث تجريبي · 09:42', 'Last demo update · 09:42', lang), 'neutral']]

  return <>
    <div className="page-header"><div><div className="eyebrow"><Badge tone="soft">{text('بيانات تجريبية', 'Sample data', lang)}</Badge></div><h1>{title}</h1><p>{description}</p></div><div className="page-actions"><Button variant="outline" icon={<ArrowDownToLine size={16} />} onClick={() => notify(text('التصدير محاكاة ولا ينشئ ملفًا فعليًا.', 'Export is simulated; no real file is generated.', lang))}>{text('تصدير', 'Export', lang)}</Button><Button icon={<Plus size={16} />} onClick={() => navigate(`${path}/new`)}>{text('إضافة جديد', 'Add new', lang)}</Button></div></div>
    <div className="workspace-intro"><span className="workspace-intro-icon"><Icon size={22} /></span><div><b>{roleLabel(role, lang, institutionType)} · {title}</b><p>{text('هذه واجهة نموذج أولي للعرض على العملاء. الإجراءات محلية فقط ولا يتم إرسال بيانات إلى خادم.', 'Client-facing prototype screen. Actions are local only and no data is sent to a server.', lang)}</p></div><Badge tone="warning">{text('غير متصل ببيانات حية', 'No live data', lang)}</Badge></div>
    <div className="workspace-stats">{stats.map(([label, value, MetricIcon]) => <Card className="workspace-stat" key={String(label)}><span><MetricIcon size={18} /></span><small>{String(label)}</small><b>{String(value)}</b></Card>)}</div>
    <div className="workspace-tabs" role="tablist">{[['overview', text('نظرة عامة', 'Overview', lang)], ['records', text('السجلات', 'Records', lang)], ['activity', text('النشاط', 'Activity', lang)]].map(([key, caption]) => <button className={activeTab === key ? 'active' : ''} role="tab" aria-selected={activeTab === key} key={key} onClick={() => setActiveTab(key)}>{caption}</button>)}</div>
    {activeTab === 'overview' && <div className="workspace-columns"><Card><div className="workspace-card-heading"><div><h2>{text('قائمة العمل', 'Work queue', lang)}</h2><p>{text('أهم العناصر التي تحتاج إلى متابعة.', 'Items that may need follow-up.', lang)}</p></div><Inbox size={18} /></div><div className="workspace-task-list">{tasks.map(([name, detail, tone]) => <div className="workspace-task" key={name}><span className={`workspace-task-icon ${tone}`}><Clock3 size={17} /></span><span><b>{name}</b><small>{detail}</small></span><Badge tone={tone}>{tone === 'warning' ? text('للمراجعة', 'Review', lang) : text('توضيحي', 'Sample', lang)}</Badge></div>)}</div><Button variant="soft" onClick={() => setActiveTab('records')}>{text('عرض السجلات', 'View records', lang)}<ChevronLeft size={15} /></Button></Card>
      <Card><div className="workspace-card-heading"><div><h2>{text('إجراءات سريعة', 'Quick actions', lang)}</h2><p>{text('اختصارات لهذه المساحة.', 'Shortcuts for this workspace.', lang)}</p></div><Sparkles size={18} /></div><div className="workspace-shortcuts">{related.length ? related.map(item => <button key={item.path} onClick={() => navigate(item.path)}><span><Icon size={16} /></span><b>{ar ? item.label : item.en}</b><ArrowUpRight size={15} /></button>) : <button onClick={() => navigate(roleInfo[role].home)}><span><Icon size={16} /></span><b>{text('لوحة التحكم', 'Dashboard', lang)}</b><ArrowUpRight size={15} /></button>}{!related.length && <button onClick={() => notify(text('تم حفظ تفضيل العرض لهذه الجلسة فقط.', 'View preference saved for this session only.', lang))}><span><CheckCircle2 size={16} /></span><b>{text('حفظ العرض الحالي', 'Save current view', lang)}</b><ArrowUpRight size={15} /></button>}</div></Card></div>}
    {activeTab === 'records' && <Card className="workspace-records"><div className="workspace-card-heading"><div><h2>{text('السجلات المرتبطة بالمسار', 'Records for this workspace', lang)}</h2><p>{text('بيانات توضيحية خيالية.', 'Illustrative fictional data.', lang)}</p></div><div className="workspace-record-tools"><div className="message-search"><Search size={15} /><input value={query} onChange={event => setQuery(event.target.value)} placeholder={text('بحث سريع', 'Quick search', lang)} /></div><button aria-label={text('تصفية', 'Filter', lang)} onClick={() => notify(text('تصفية العرض التوضيحي جاهزة للتخصيص.', 'Demo filters are ready to customize.', lang))}><Filter size={16} /></button></div></div>
      {filteredRows.length ? <div className="workspace-row-list">{filteredRows.map(row => <label className="workspace-data-row" key={row[0]}><input type="checkbox" checked={checked.includes(row[0])} onChange={() => setChecked(current => current.includes(row[0]) ? current.filter(id => id !== row[0]) : [...current, row[0]])} /><span><b>{ar ? row[1] : row[2]}</b><small>{ar ? row[3] : row[4]}</small></span><Badge tone={['نشط','Active'].includes(ar ? row[5] : row[6]) ? 'success' : 'warning'}>{ar ? row[5] : row[6]}</Badge></label>)}</div> : <div className="workspace-empty"><Inbox size={23} /><b>{text('لا توجد سجلات مطابقة', 'No matching records', lang)}</b><small>{text('البيانات المتاحة لهذا المسار محدودة في النموذج الحالي.', 'Sample data for this route is limited in this prototype.', lang)}</small></div>}
      <div className="workspace-record-footer"><span>{filteredRows.length} {text('سجلات', 'records', lang)}{checked.length ? ` · ${checked.length} ${text('محدد', 'selected', lang)}` : ''}</span><Button variant="outline" onClick={() => { setChecked([]); notify(text('تم مسح التحديد المحلي.', 'Local selection cleared.', lang)) }}>{text('مسح التحديد', 'Clear selection', lang)}</Button></div>
    </Card>}
    {activeTab === 'activity' && <Card className="record-activity-card"><div className="workspace-card-heading"><div><h2>{text('آخر النشاطات', 'Recent activity', lang)}</h2><p>{text('سجل توضيحي غير متصل بخدمة تدقيق فعلية.', 'Illustrative log; no live audit service is connected.', lang)}</p></div><Activity size={18} /></div>{sampleActivity.map((item, i) => <div className="record-timeline" key={item.en}><span className="record-timeline-dot">{i === 0 ? <Check size={12} /> : <Clock3 size={12} />}</span><div><b>{ar ? item.ar : item.en}</b><small>{ar ? item.timeAr : item.timeEn} · {text('محلي', 'Local demo', lang)}</small></div></div>)}</Card>}
    <div className="workspace-note"><AlertCircle size={15} /><span>{text('هذا نموذج واجهة فقط. لا توجد مصادقة أو قاعدة بيانات أو فوترة أو إرسال رسائل فعلي.', 'UI prototype only. Authentication, database, billing and message delivery are not connected.', lang)}</span></div>
  </>
}
