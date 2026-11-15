import type { InstitutionType, Role } from './data'

export type DemoAccount = {
  email: string
  password: string
  role: Role
  institutionType: InstitutionType
  nameAr: string
  nameEn: string
}

/**
 * Demo-only identities. These are intentionally not production credentials.
 * A real deployment must validate credentials on a server and never ship passwords.
 */
export const demoAccounts: DemoAccount[] = [
  { email: 'platform.admin@tonlin.demo', password: 'Platform#2026', role: 'platform', institutionType: 'university', nameAr: 'مدير المنصة', nameEn: 'Platform administrator' },
  { email: 'university.admin@taiz.demo', password: 'University#2026', role: 'institution', institutionType: 'university', nameAr: 'مدير جامعة تعز', nameEn: 'Taiz University administrator' },
  { email: 'school.admin@future.demo', password: 'School#2026', role: 'institution', institutionType: 'school', nameAr: 'مديرة مدرسة المستقبل', nameEn: 'Al-Mustaqbal School administrator' },
  { email: 'academic@taiz.demo', password: 'Academic#2026', role: 'academic', institutionType: 'university', nameAr: 'المنسق الأكاديمي', nameEn: 'Academic coordinator' },
  { email: 'professor@taiz.demo', password: 'Professor#2026', role: 'teacher', institutionType: 'university', nameAr: 'د. أحمد السامعي · أستاذ جامعي', nameEn: 'Dr. Ahmed Al-Sami · University professor' },
  { email: 'teacher@future.demo', password: 'Teacher#2026', role: 'teacher', institutionType: 'school', nameAr: 'أ. ريم صالح · معلمة المدرسة', nameEn: 'Ms. Reem Saleh · School teacher' },
  { email: 'student@taiz.demo', password: 'Student#2026', role: 'student', institutionType: 'university', nameAr: 'الطالب التجريبي', nameEn: 'Demo student' },
  { email: 'student@future.demo', password: 'SchoolStudent#2026', role: 'student', institutionType: 'school', nameAr: 'طالب مدرسة المستقبل', nameEn: 'Al-Mustaqbal school student' },
  { email: 'guardian@future.demo', password: 'Guardian#2026', role: 'guardian', institutionType: 'school', nameAr: 'ولي الأمر', nameEn: 'Guardian' },
  { email: 'support@tonlin.demo', password: 'Support#2026', role: 'support', institutionType: 'university', nameAr: 'فريق الدعم', nameEn: 'Support agent' },
]

export function findDemoAccount(email: string, password: string) {
  return demoAccounts.find(account => account.email.toLowerCase() === email.trim().toLowerCase() && account.password === password)
}
