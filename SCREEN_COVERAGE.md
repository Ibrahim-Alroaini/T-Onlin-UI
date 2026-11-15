# T-Onlin Prototype — Screen Coverage

## Status

The attached frontend specification is implemented as a functional prototype expansion. Existing screens remain intact. The expansion adds a centralized screen catalog in `src/screenCatalog.ts`, role-aware navigation, route labels, a route manifest, and a reusable interactive screen experience.

## Coverage

- **170 declared routes** in `manus-routes.json`.
- **116 expanded screens** added from the specification families.
- Existing specialized flows are preserved for dashboards, attendance, assignments, gradebook, timetable, virtual sessions, messaging, imports, transcripts, and detail pages.
- New catalog screens are available through role-aware navigation and direct routes.

## Expanded modules

- Platform administration: tenants, tenant details, platform users, support, audit and compliance.
- Institution workspace: campuses, calendar, policies, organization tree, positions, RBAC assignments, delegations and access simulation.
- Admissions and registration: application forms, applications, review queue, interviews, decisions, imports, registration windows, course selection, add/drop, waitlist, enrollment records, transfers and equivalencies.
- Scheduling and attendance: resources, conflicts, change requests, sessions, register, excuses and alerts.
- LMS: course catalog, learning space, course overview, course studio, module/lesson editor, content library, learning paths, discussions, groups, peer review, AI tutor, AI teacher assistant and learning analytics.
- Assessment and grades: assignment builder, submission review, rubrics, question bank, exam builder, exam delivery, proctoring, results, appeals and graduation audit.
- Quality and advising: advisor workspace, student progress, learning outcomes, surveys and quality actions.
- Training and certificates: programs, cohorts, trainers, learners, certificates and verification.
- Virtual sessions: scheduling, join lobby, host controls, attendance and recordings.
- Finance and reports: fee structures, invoices, payments, refunds, reconciliation, report catalog, report builder, dashboards and exports.
- Communication and support: notifications, security, ticket workbench, knowledge articles, support audit, integrations and preferences.

## Prototype behavior

Each expanded screen includes:

- Bilingual RTL/LTR title, description and module context.
- Role and institution scope summary.
- Local sample records with search and empty-state behavior.
- Add record, delete record, save locally and demo export actions.
- Action matrix for create, edit, delete, search/filter and export.
- Documented state gallery: default, loading, empty, retryable error, success, disabled, permission denied and unsaved changes.
- Explicit prototype/no-backend labeling; no real payments, messages, authentication, video, or database writes are claimed.

## Validation

- `pnpm build` passes.
- `manus-routes.json` contains no duplicate paths.
- Root and public route manifests are synchronized.
- Existing design tokens and component language are reused; no visual redesign was introduced.
