# Taiz-Onlin demo accounts

The prototype includes separate presentation accounts for the main roles and institution types, including a university professor, school teacher, university student, and school student. The login page validates the email and password, assigns the account's institution type and role, stores a demo session, and routes the user to that role's workspace. The role switcher is restricted to the signed-in account, and protected routes redirect back to login when the demo session is absent.

| User | Email | Password | Institution | Role |
|---|---|---|---|---|
| Platform administrator | `platform.admin@tonlin.demo` | `Platform#2026` | University | Platform |
| Taiz University administrator | `university.admin@taiz.demo` | `University#2026` | University | Institution |
| Al-Mustaqbal School administrator | `school.admin@future.demo` | `School#2026` | School | Institution |
| Academic coordinator | `academic@taiz.demo` | `Academic#2026` | University | Academic |
| University professor | `professor@taiz.demo` | `Professor#2026` | University | Teacher |
| School teacher | `teacher@future.demo` | `Teacher#2026` | School | Teacher |
| University student | `student@taiz.demo` | `Student#2026` | University | Student |
| School student | `student@future.demo` | `SchoolStudent#2026` | School | Student |
| Guardian | `guardian@future.demo` | `Guardian#2026` | School | Guardian |
| Support agent | `support@tonlin.demo` | `Support#2026` | University | Support |

## Security boundary

These credentials are intentionally for a frontend prototype. They are shipped to the browser bundle and are therefore discoverable by anyone who can inspect the site. `localStorage` is used only to preserve the demo session; it is not an authentication boundary. Do not use these credentials for real customer data.

For production, keep the source repository private and move authentication and authorization to a backend or managed identity provider. Store only password hashes server-side, issue short-lived secure HttpOnly sessions, enforce authorization on every API request, and keep tenant data on the server. GitHub Pages can remain the public presentation host, but it cannot by itself protect customer data or enforce real user permissions.
