import { useState } from 'react'
import { Check, Clock3, Pencil, Plus, Save, Users } from 'lucide-react'
import type { InstitutionType, Lang } from './data'

type AcademicRecord = { id: string; name: string; code: string; parent: string; owner: string; schedule: string; capacity: string; status: string }

const universityCourses: AcademicRecord[] = [
  { id: 'CS201', name: 'هندسة البرمجيات', code: 'CS201', parent: 'قسم علوم الحاسوب · بكالوريوس هندسة البرمجيات', owner: 'د. أحمد السامعي', schedule: 'الأحد والثلاثاء · 08:00–09:30', capacity: '86', status: 'جاري' },
  { id: 'CS101', name: 'قواعد البيانات', code: 'CS101', parent: 'قسم علوم الحاسوب · بكالوريوس علوم الحاسوب', owner: 'د. هناء العريقي', schedule: 'الإثنين والأربعاء · 10:00–11:30', capacity: '112', status: 'جاري' },
]
const schoolSubjects: AcademicRecord[] = [
  { id: 'MATH-7A', name: 'الرياضيات', code: 'MATH-7A', parent: 'المرحلة المتوسطة · الصف السابع · الشعبة أ', owner: 'أ. ريم صالح', schedule: 'الأحد والثلاثاء · الحصة 2', capacity: '32', status: 'نشط' },
  { id: 'AR-5B', name: 'اللغة العربية', code: 'AR-5B', parent: 'المرحلة الأساسية · الصف الخامس · الشعبة ب', owner: 'أ. خالد النعمان', schedule: 'الإثنين والأربعاء · الحصة 1', capacity: '28', status: 'نشط' },
]

export default function AcademicStructurePanel({ path, lang, institutionType, notify }: { path: string; lang: Lang; institutionType: InstitutionType; notify: (message: string) => void }) {
  const ar = lang === 'ar'
  const slug = path.split('/').filter(Boolean).at(-1) || 'courses'
  const isUniversity = institutionType === 'university'
  const isCourse = ['courses', 'subjects'].includes(slug)
  const isClass = ['classes', 'sections', 'grades'].includes(slug)
  const [records, setRecords] = useState<AcademicRecord[]>(isUniversity ? universityCourses : schoolSubjects)
  const [selectedId, setSelectedId] = useState(records[0]?.id || '')
  const [editorOpen, setEditorOpen] = useState(path.endsWith('/new'))
  const [draft, setDraft] = useState({ name: '', code: '', parent: '', owner: '', schedule: '', capacity: '' })
  const selected = records.find(item => item.id === selectedId) || records[0]
  const title = isCourse ? (isUniversity ? (ar ? 'إنشاء وإدارة المقررات الجامعية' : 'University course management') : (ar ? 'إنشاء وإدارة المواد الدراسية' : 'School subject management')) : isClass ? (ar ? 'إدارة الفصول والشُعب' : 'Classes and sections management') : (ar ? 'الهيكل الأكاديمي' : 'Academic structure')
  const parentLabel = isUniversity ? (ar ? 'الكلية / القسم / البرنامج' : 'Faculty / department / program') : (ar ? 'المرحلة / الصف / الشعبة' : 'Stage / grade / section')
  const ownerLabel = isUniversity ? (ar ? 'الدكتور أو المدرس المسؤول' : 'Assigned professor or teacher') : (ar ? 'المعلم المسؤول' : 'Assigned teacher')
  const openNew = () => { setDraft({ name: '', code: '', parent: '', owner: '', schedule: '', capacity: '' }); setEditorOpen(true) }
  const save = () => {
    if (!draft.name.trim() || !draft.code.trim()) { notify(ar ? 'أدخل اسم العنصر والرمز أولًا.' : 'Enter the name and code first.'); return }
    const record: AcademicRecord = { id: draft.code.toUpperCase(), name: draft.name, code: draft.code.toUpperCase(), parent: draft.parent || (isUniversity ? 'قسم جديد · برنامج جديد' : 'مرحلة جديدة · صف جديد'), owner: draft.owner || (isUniversity ? 'لم يعيّن بعد' : 'لم يعيّن بعد'), schedule: draft.schedule || (ar ? 'لم يحدد بعد' : 'Not scheduled'), capacity: draft.capacity || '30', status: ar ? 'مسودة' : 'Draft' }
    setRecords(current => [...current, record]); setSelectedId(record.id); setEditorOpen(false); notify(ar ? 'تم حفظ العنصر الأكاديمي محليًا.' : 'Academic record saved locally.')
  }
  const edit = () => { if (!selected) return; setDraft({ name: selected.name, code: selected.code, parent: selected.parent, owner: selected.owner, schedule: selected.schedule, capacity: selected.capacity }); setEditorOpen(true) }

  return <Card className="academic-structure-panel"><div className="workspace-card-heading"><div><h2>{title}</h2><p>{isCourse ? (ar ? 'كل مقرر أو مادة لها رمز، وحدة أكاديمية، مسؤول، شعب، ساعات/حصص، سعة وحالة نشر.' : 'Every course or subject has a code, academic owner, sections, schedule, capacity and publishing status.') : (ar ? 'تعريف السنة والفصل والمرحلة أو البرنامج والشعبة والقاعات والتعيينات بوضوح.' : 'Define year, term, stage or program, section, rooms and assignments clearly.')}</p></div><div className="academic-structure-actions"><Button variant="soft" icon={<Plus size={15} />} onClick={openNew}>{ar ? 'إضافة جديد' : 'Add new'}</Button><Button icon={<Save size={15} />} onClick={() => notify(ar ? 'تم حفظ التغييرات محليًا.' : 'Changes saved locally.')}>{ar ? 'حفظ' : 'Save'}</Button></div></div>
    <div className="academic-structure-layout"><div className="academic-record-list">{records.map(record => <button key={record.id} className={record.id === selected?.id ? 'active' : ''} onClick={() => setSelectedId(record.id)}><span className="academic-code">{record.code.slice(0, 3)}</span><span><b>{record.name}</b><small>{record.code} · {record.capacity} {ar ? 'مقعد' : 'seats'}</small></span></button>)}</div>{selected && <div className="academic-record-detail"><div className="academic-detail-head"><div><span className="eyebrow">{selected.code}</span><h3>{selected.name}</h3><p>{selected.parent}</p></div><Button variant="outline" icon={<Pencil size={15} />} onClick={edit}>{ar ? 'تعديل' : 'Edit'}</Button></div><div className="academic-detail-grid"><div><small>{parentLabel}</small><b>{selected.parent}</b></div><div><small>{ownerLabel}</small><b>{selected.owner}</b></div><div><small>{ar ? 'الجدول' : 'Schedule'}</small><b>{selected.schedule}</b></div><div><small>{ar ? 'السعة' : 'Capacity'}</small><b>{selected.capacity} {ar ? 'متعلم' : 'learners'}</b></div></div><div className="academic-detail-status"><span><Check size={15} />{selected.status}</span><span><Users size={15} />{isCourse ? (ar ? 'شعب متعددة يمكن ربطها' : 'Multiple sections supported') : (ar ? 'تعيين معلم وقاعة' : 'Teacher and room assignment')}</span><span><Clock3 size={15} />{ar ? 'فصل دراسي تجريبي' : 'Demo academic term'}</span></div></div>}</div>
    {editorOpen && <div className="academic-editor"><div className="people-editor-head"><div><h3>{isCourse ? (ar ? 'بيانات المقرر / المادة كاملة' : 'Complete course / subject form') : (ar ? 'بيانات الفصل / الشعبة كاملة' : 'Complete class / section form')}</h3><p>{ar ? 'نموذج Prototype يحفظ محليًا ويمنع حفظ عنصر ناقص الاسم والرمز.' : 'Prototype form saved locally; name and code are required.'}</p></div><button onClick={() => setEditorOpen(false)} aria-label={ar ? 'إغلاق' : 'Close'}>×</button></div><div className="form-grid"><label>{isCourse ? (ar ? 'اسم المقرر / المادة *' : 'Course / subject name *') : (ar ? 'اسم الفصل / الشعبة *' : 'Class / section name *')}<input value={draft.name} onChange={e => setDraft({ ...draft, name: e.target.value })} placeholder={isUniversity ? 'هندسة البرمجيات' : 'الرياضيات · الصف السابع'} /></label><label>{ar ? 'الرمز *' : 'Code *'}<input value={draft.code} onChange={e => setDraft({ ...draft, code: e.target.value })} placeholder={isUniversity ? 'CS301' : 'MATH-7A'} /></label><label className="full-field">{parentLabel}<input value={draft.parent} onChange={e => setDraft({ ...draft, parent: e.target.value })} placeholder={isUniversity ? 'كلية الحاسوب · قسم البرمجيات · البرنامج' : 'المرحلة المتوسطة · الصف السابع · الشعبة أ'} /></label><label>{ownerLabel}<input value={draft.owner} onChange={e => setDraft({ ...draft, owner: e.target.value })} placeholder={isUniversity ? 'د. أحمد السامعي' : 'أ. ريم صالح'} /></label><label>{ar ? 'السعة' : 'Capacity'}<input type="number" value={draft.capacity} onChange={e => setDraft({ ...draft, capacity: e.target.value })} placeholder="30" /></label><label className="full-field">{ar ? 'الجدول والقاعات' : 'Schedule and rooms'}<input value={draft.schedule} onChange={e => setDraft({ ...draft, schedule: e.target.value })} placeholder={isUniversity ? 'الأحد والثلاثاء · 08:00 · قاعة 204' : 'الأحد والثلاثاء · الحصة 2 · فصل 7A'} /></label></div><div className="form-actions"><Button variant="ghost" onClick={() => setEditorOpen(false)}>{ar ? 'إلغاء' : 'Cancel'}</Button><Button icon={<Check size={15} />} onClick={save}>{ar ? 'حفظ المقرر والهيكل' : 'Save academic structure'}</Button></div></div>}
  </Card>
}

function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) { return <section className={`card ${className}`}>{children}</section> }
function Button({ children, onClick, variant = 'primary', icon }: { children: React.ReactNode; onClick?: () => void; variant?: 'primary' | 'outline' | 'soft' | 'ghost'; icon?: React.ReactNode }) { return <button className={`btn btn-${variant}`} onClick={onClick}>{icon}{children}</button> }
