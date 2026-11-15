import { useState } from 'react'
import * as XLSX from 'xlsx'
import { Check, FileSpreadsheet, Pencil, Plus, Upload, UserPlus } from 'lucide-react'
import type { Lang } from './data'

type Person = { id: string; name: string; email: string; phone: string; department: string; courses: string[]; status: string; nationalId?: string; birthDate?: string; gender?: string; startDate?: string }

const courseCatalog = [
  { code: 'CS201', name: 'هندسة البرمجيات' },
  { code: 'CS101', name: 'قواعد البيانات' },
  { code: 'AR110', name: 'اللغة العربية' },
  { code: 'MATH204', name: 'الرياضيات المتقدمة' },
]

const teacherSeed: Person[] = [
  { id: 'T-104', name: 'د. أحمد السامعي', email: 'ahmed@taiz.demo', phone: '+967 771 234 501', department: 'علوم الحاسوب', courses: ['CS201', 'CS301', 'CS405'], status: 'متاح' },
  { id: 'T-105', name: 'د. هناء العريقي', email: 'hana@taiz.demo', phone: '+967 772 145 220', department: 'الرياضيات', courses: ['MATH204', 'MATH110'], status: 'متاح' },
]
const studentSeed: Person[] = [
  { id: 'ST-24031', name: 'ليان محمد أحمد', email: 'layan.demo@example.com', phone: '+967 771 000 214', department: 'هندسة البرمجيات · CS-3A', courses: ['CS201', 'CS101', 'AR110'], status: 'نشط' },
  { id: 'ST-24032', name: 'عمر خالد علي', email: 'omar.demo@example.com', phone: '+967 771 000 803', department: 'علوم الحاسوب · CS-3A', courses: ['CS201', 'MATH204'], status: 'نشط' },
]

export default function PeopleManagementPanel({ path, lang, notify }: { path: string; lang: Lang; notify: (message: string) => void }) {
  const ar = lang === 'ar'
  const isTeacher = path.includes('teacher')
  const [records, setRecords] = useState<Person[]>(isTeacher ? teacherSeed : studentSeed)
  const [selectedId, setSelectedId] = useState(records[0]?.id || '')
  const [editorOpen, setEditorOpen] = useState(path.endsWith('/new'))
  const [importOpen, setImportOpen] = useState(false)
  const [preview, setPreview] = useState<string[][]>([])
  const [draft, setDraft] = useState({ id: '', name: '', email: '', phone: '', department: '', nationalId: '', birthDate: '', gender: '', startDate: '', courses: [] as string[] })
  const selected = records.find(item => item.id === selectedId) || records[0]
  const title = isTeacher ? (ar ? 'بيانات الدكاترة والمعلمين' : 'Teacher and professor details') : (ar ? 'بيانات الطلاب' : 'Student details')
  const relation = isTeacher ? (ar ? 'المقررات والشُعب المسندة' : 'Assigned courses and sections') : (ar ? 'المقررات المسجلة' : 'Enrolled courses')

  const openNew = () => { setDraft({ id: '', name: '', email: '', phone: '', department: '', nationalId: '', birthDate: '', gender: '', startDate: '', courses: [] }); setEditorOpen(true) }
  const save = () => {
    if (!draft.name.trim() || !draft.email.trim()) { notify(ar ? 'أدخل الاسم والبريد الإلكتروني أولًا.' : 'Enter a name and email first.'); return }
    const person: Person = { id: draft.id.trim() || `${isTeacher ? 'T' : 'ST'}-${String(records.length + 106).padStart(4, '0')}`, name: draft.name, email: draft.email, phone: draft.phone || '—', department: draft.department || (isTeacher ? 'قسم جديد' : 'برنامج جديد'), nationalId: draft.nationalId, birthDate: draft.birthDate, gender: draft.gender, startDate: draft.startDate, courses: draft.courses, status: ar ? 'مسودة' : 'Draft' }
    setRecords(current => [...current, person]); setSelectedId(person.id); setEditorOpen(false); notify(ar ? 'تمت إضافة السجل محليًا مع كل التعيينات.' : 'Record added locally with its assignments.')
  }
  const toggleCourse = (code: string) => setDraft(current => ({ ...current, courses: current.courses.includes(code) ? current.courses.filter(item => item !== code) : [...current.courses, code] }))
  const readWorkbook = (file: File) => {
    const reader = new FileReader()
    reader.onload = event => {
      try {
        const workbook = XLSX.read(event.target?.result, { type: 'array' })
        const sheet = workbook.Sheets[workbook.SheetNames[0]]
        const rows = XLSX.utils.sheet_to_json<string[]>(sheet, { header: 1, defval: '' }).slice(0, 8).map(row => row.map(value => String(value)))
        setPreview(rows); setImportOpen(true); notify(ar ? 'تمت معاينة ملف Excel/CSV. راجع الأعمدة قبل التأكيد.' : 'Excel/CSV preview is ready. Review columns before confirming.')
      } catch { notify(ar ? 'تعذر قراءة الملف التجريبي.' : 'The demo file could not be read.') }
    }
    reader.readAsArrayBuffer(file)
  }
  const confirmImport = () => { setImportOpen(false); notify(ar ? 'تم استيراد الصفوف كمعاينة محلية فقط. لم يتم استدعاء خادم.' : 'Rows imported as a local preview only. No server was called.') }

  return <Card className="people-management-panel"><div className="workspace-card-heading"><div><h2>{title}</h2><p>{ar ? 'أدخل البيانات الأساسية، ثم اربط أكثر من مقرر أو شعبة بكل مستخدم.' : 'Enter identity details, then assign multiple courses or sections to each person.'}</p></div><div className="people-panel-actions"><Button variant="soft" icon={<Upload size={15} />} onClick={() => setImportOpen(true)}>{ar ? 'استيراد Excel / CSV' : 'Import Excel / CSV'}</Button><Button icon={<UserPlus size={15} />} onClick={openNew}>{ar ? 'إضافة يدويًا' : 'Add manually'}</Button></div></div>
    <div className="people-layout"><div className="people-list">{records.map(person => <button key={person.id} className={person.id === selected?.id ? 'active' : ''} onClick={() => setSelectedId(person.id)}><span className="avatar">{person.name.slice(0, 1)}</span><span><b>{person.name}</b><small>{person.id} · {person.courses.length} {ar ? 'مقررات' : 'courses'}</small></span></button>)}</div>{selected && <div className="people-profile"><div className="people-profile-head"><div><span className="eyebrow">{selected.id}</span><h3>{selected.name}</h3><p>{selected.department} · {selected.status}</p></div><Button variant="outline" icon={<Pencil size={15} />} onClick={() => { setDraft({ id: selected.id, name: selected.name, email: selected.email, phone: selected.phone, department: selected.department, nationalId: selected.nationalId || '', birthDate: selected.birthDate || '', gender: selected.gender || '', startDate: selected.startDate || '', courses: [...selected.courses] }); setEditorOpen(true) }}>{ar ? 'تعديل' : 'Edit'}</Button></div><div className="people-fields"><div><small>{ar ? 'البريد الإلكتروني' : 'Email'}</small><b>{selected.email}</b></div><div><small>{ar ? 'الهاتف' : 'Phone'}</small><b>{selected.phone}</b></div><div><small>{ar ? 'القسم / البرنامج' : 'Department / program'}</small><b>{selected.department}</b></div></div><div className="assigned-courses"><div className="card-heading"><div><h4>{relation}</h4><p>{ar ? 'يمكن أن يكون للدكتور أو المعلم أكثر من مقرر.' : 'A professor or teacher can own multiple courses.'}</p></div><span className="badge badge-soft">{selected.courses.length}</span></div><div className="course-chip-list">{selected.courses.length ? selected.courses.map(code => <span className="course-chip" key={code}><Check size={13} />{code} · {courseCatalog.find(item => item.code === code)?.name || (ar ? 'مقرر إضافي' : 'Additional course')}</span>) : <span className="helper-text">{ar ? 'لم يتم ربط مقررات بعد.' : 'No courses assigned yet.'}</span>}</div></div></div>}</div>
    {editorOpen && <div className="people-editor"><div className="people-editor-head"><div><h3>{ar ? 'نموذج بيانات كامل' : 'Complete profile form'}</h3><p>{ar ? 'الحقول تحفظ محليًا في هذا النموذج الأولي.' : 'Fields are saved locally in this prototype.'}</p></div><button onClick={() => setEditorOpen(false)} aria-label={ar ? 'إغلاق' : 'Close'}>×</button></div><div className="form-grid"><label>{ar ? 'الاسم الكامل *' : 'Full name *'}<input value={draft.name} onChange={e => setDraft({ ...draft, name: e.target.value })} placeholder={ar ? 'د. الاسم الكامل' : 'Full name'} /></label><label>{ar ? 'البريد الإلكتروني *' : 'Email *'}<input type="email" value={draft.email} onChange={e => setDraft({ ...draft, email: e.target.value })} placeholder="name@institution.edu" /></label><label>{ar ? 'الرقم الجامعي / الوظيفي' : 'Student / staff ID'}<input value={draft.id} onChange={e => setDraft({ ...draft, id: e.target.value })} placeholder={isTeacher ? 'T-107' : 'ST-24040'} /></label><label>{ar ? 'رقم الهاتف' : 'Phone'}<input value={draft.phone} onChange={e => setDraft({ ...draft, phone: e.target.value })} placeholder="+967 ..." /></label><label>{ar ? 'رقم الهوية / الجواز' : 'National ID / passport'}<input value={draft.nationalId} onChange={e => setDraft({ ...draft, nationalId: e.target.value })} placeholder={ar ? 'اختياري' : 'Optional'} /></label><label>{ar ? 'تاريخ الميلاد' : 'Date of birth'}<input type="date" value={draft.birthDate} onChange={e => setDraft({ ...draft, birthDate: e.target.value })} /></label><label>{ar ? 'الجنس' : 'Gender'}<select value={draft.gender} onChange={e => setDraft({ ...draft, gender: e.target.value })}><option value="">{ar ? 'اختر' : 'Select'}</option><option value="male">{ar ? 'ذكر' : 'Male'}</option><option value="female">{ar ? 'أنثى' : 'Female'}</option></select></label><label>{ar ? 'تاريخ الالتحاق' : 'Start / enrollment date'}<input type="date" value={draft.startDate} onChange={e => setDraft({ ...draft, startDate: e.target.value })} /></label><label className="full-field">{isTeacher ? (ar ? 'القسم الأكاديمي' : 'Academic department') : (ar ? 'البرنامج / الصف / الشعبة' : 'Program / grade / section')}<input value={draft.department} onChange={e => setDraft({ ...draft, department: e.target.value })} placeholder={isTeacher ? 'علوم الحاسوب' : 'هندسة البرمجيات · CS-3A'} /></label></div><div className="course-assignment-editor"><h4>{isTeacher ? (ar ? 'المقررات والشُعب المسندة' : 'Assigned courses and sections') : (ar ? 'المقررات المسجلة' : 'Enrolled courses')}</h4><div className="course-checkbox-grid">{courseCatalog.map(course => <label key={course.code}><input type="checkbox" checked={draft.courses.includes(course.code)} onChange={() => toggleCourse(course.code)} /><span><b>{course.code}</b><small>{course.name}</small></span></label>)}</div></div><div className="form-actions"><Button variant="ghost" onClick={() => setEditorOpen(false)}>{ar ? 'إلغاء' : 'Cancel'}</Button><Button icon={<Check size={15} />} onClick={save}>{ar ? 'حفظ البيانات والتعيينات' : 'Save profile and assignments'}</Button></div></div>}
    {importOpen && <div className="people-import"><div className="people-editor-head"><div><h3>{ar ? 'استيراد Excel / CSV' : 'Import Excel / CSV'}</h3><p>{ar ? 'ارفع ملفًا لمعاينة الأعمدة والصفوف قبل التأكيد.' : 'Upload a file to preview columns and rows before confirmation.'}</p></div><button onClick={() => setImportOpen(false)} aria-label={ar ? 'إغلاق' : 'Close'}>×</button></div><label className="import-dropzone"><FileSpreadsheet size={24} /><b>{ar ? 'اختر ملف Excel أو CSV' : 'Choose an Excel or CSV file'}</b><small>.xlsx, .xls, .csv · {ar ? 'المعاينة أول 8 صفوف' : 'first 8 rows preview'}</small><input type="file" accept=".xlsx,.xls,.csv" onChange={e => { const file = e.target.files?.[0]; if (file) readWorkbook(file) }} /></label>{preview.length > 0 && <><div className="table-scroll import-preview"><table><tbody>{preview.map((row, index) => <tr key={index}>{row.map((cell, column) => index === 0 ? <th key={column}>{cell || `Column ${column + 1}`}</th> : <td key={column}>{cell}</td>)}</tr>)}</tbody></table></div><Button icon={<Check size={15} />} onClick={confirmImport}>{ar ? 'تأكيد المعاينة والاستيراد' : 'Confirm preview and import'}</Button></>}</div>}
  </Card>
}

function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) { return <section className={`card ${className}`}>{children}</section> }
function Button({ children, onClick, variant = 'primary', icon }: { children: React.ReactNode; onClick?: () => void; variant?: 'primary' | 'outline' | 'ghost' | 'soft'; icon?: React.ReactNode }) { return <button className={`btn btn-${variant}`} onClick={onClick}>{icon}{children}</button> }
