# KinderNet - Complete File Structure

This document provides a complete overview of all files and directories in the KinderNet project after the migration script has been run.

## Root Directory

```
kindernet-student-portal/
│
├── 📁 public/                    Static assets served directly
├── 📁 src/                       All source code (created by migration)
├── 📁 .vscode/                   VSCode editor settings
│
├── 📄 index.html                 HTML entry point
├── 📄 package.json               Project dependencies and scripts
├── 📄 vite.config.ts             Vite build configuration
├── 📄 tsconfig.json              TypeScript configuration
├── 📄 tsconfig.node.json         TypeScript config for build tools
├── 📄 postcss.config.js          PostCSS/Tailwind configuration
├── 📄 .eslintrc.cjs              ESLint linting rules
├── 📄 .gitignore                 Git ignore patterns
├── 📄 .env.example               Environment variables template
│
├── 📄 README.md                  Main documentation
├── 📄 QUICK-START.md             5-minute quick start guide
├── 📄 SETUP.md                   Detailed setup instructions
├── 📄 CONTRIBUTING.md            Development guidelines
├── 📄 PROJECT-INFO.md            Complete project information
├── 📄 FILE-STRUCTURE.md          This file
│
└── 📄 migrate-to-src.js          Migration script (delete after use)
```

## public/ Directory

```
public/
└── favicon.svg                   Application icon/logo
```

**Purpose**: Static files that are served as-is without processing.

## src/ Directory (Main Source Code)

```
src/
├── 📁 components/                All React components
├── 📁 context/                   Global state management
├── 📁 data/                      Mock data and initial data
├── 📁 types/                     TypeScript type definitions
├── 📁 styles/                    Global CSS and styling
│
├── App.tsx                       Main application component
├── main.tsx                      Application entry point
└── vite-env.d.ts                 Vite type definitions
```

### src/components/ Directory

```
components/
├── 📁 accounts/                  Account management
│   └── AccountsPage.tsx
│
├── 📁 attendance/                Attendance tracking
│   ├── ClassWiseReport.tsx
│   ├── EmployeesAttendance.tsx
│   ├── StudentAttendanceReport.tsx
│   └── StudentsAttendance.tsx
│
├── 📁 auth/                      Authentication
│   ├── Login.tsx
│   ├── SignUp.tsx
│   └── OrganizationSetup.tsx
│
├── 📁 certificates/              Certificate generation
│   └── CertificatesPage.tsx
│
├── 📁 classes/                   Class management
│   └── ClassesPage.tsx
│
├── 📁 common/                    Shared/reusable components
│   ├── Button.tsx
│   ├── Input.tsx
│   ├── Modal.tsx
│   └── Table.tsx
│
├── 📁 dashboard/                 Dashboard and analytics
│   └── Dashboard.tsx
│
├── 📁 employees/                 Employee management
│   ├── AddEmployee.tsx
│   ├── EmployeeDetails.tsx
│   ├── EmployeesList.tsx
│   └── StaffLogin.tsx
│
├── 📁 fees/                      Fee management
│   └── FeesPage.tsx
│
├── 📁 figma/                     Special components (protected)
│   └── ImageWithFallback.tsx    (Do not modify)
│
├── 📁 homework/                  Homework management
│   └── HomeworkPage.tsx
│
├── 📁 layout/                    Layout components
│   ├── Header.tsx               Top navigation bar
│   └── Sidebar.tsx              Side navigation menu
│
├── 📁 salary/                    Salary management
│   └── SalaryPage.tsx
│
├── 📁 settings/                  Application settings
│   └── GeneralSettings.tsx
│
├── 📁 students/                  Student management
│   ├── AdmissionForm.tsx
│   ├── PromoteStudents.tsx
│   ├── StudentDetails.tsx
│   └── StudentsList.tsx
│
├── 📁 subjects/                  Subject management
│   └── SubjectsPage.tsx
│
├── 📁 timetable/                 Timetable management
│   └── TimetablePage.tsx
│
└── 📁 ui/                        UI component library
    ├── accordion.tsx
    ├── alert-dialog.tsx
    ├── alert.tsx
    ├── aspect-ratio.tsx
    ├── avatar.tsx
    ├── badge.tsx
    ├── breadcrumb.tsx
    ├── button.tsx
    ├── calendar.tsx
    ├── card.tsx
    ├── carousel.tsx
    ├── chart.tsx
    ├── checkbox.tsx
    ├── collapsible.tsx
    ├── command.tsx
    ├── context-menu.tsx
    ├── dialog.tsx
    ├── drawer.tsx
    ├── dropdown-menu.tsx
    ├── form.tsx
    ├── hover-card.tsx
    ├── input-otp.tsx
    ├── input.tsx
    ├── label.tsx
    ├── menubar.tsx
    ├── navigation-menu.tsx
    ├── pagination.tsx
    ├── popover.tsx
    ├── progress.tsx
    ├── radio-group.tsx
    ├── resizable.tsx
    ├── scroll-area.tsx
    ├── select.tsx
    ├── separator.tsx
    ├── sheet.tsx
    ├── sidebar.tsx
    ├── skeleton.tsx
    ├── slider.tsx
    ├── sonner.tsx
    ├── switch.tsx
    ├── table.tsx
    ├── tabs.tsx
    ├── textarea.tsx
    ├── toggle-group.tsx
    ├── toggle.tsx
    ├── tooltip.tsx
    ├── use-mobile.ts
    └── utils.ts
```

### src/context/ Directory

```
context/
└── AppContext.tsx                Global application state
```

**Purpose**: Manages global state for students, employees, classes, etc.

### src/data/ Directory

```
data/
└── mockData.ts                   Initial/mock data for development
```

**Purpose**: Sample data for testing and development.

### src/types/ Directory

```
types/
└── index.ts                      All TypeScript type definitions
```

**Purpose**: Centralized type definitions for the entire application.

**Key Types Include**:
- Student
- Employee
- Class
- Subject
- Attendance
- Fee
- Salary
- Certificate
- Exam
- And more...

### src/styles/ Directory

```
styles/
└── globals.css                   Global CSS styles and Tailwind config
```

**Purpose**: Application-wide styles, CSS variables, and Tailwind directives.

## .vscode/ Directory

```
.vscode/
├── extensions.json               Recommended VSCode extensions
└── settings.json                 VSCode workspace settings
```

**Purpose**: Ensures consistent development environment across team.

## Configuration Files Explained

### index.html
- HTML template
- Contains root div and script tag
- Minimal, most UI comes from React

### package.json
- Lists all project dependencies
- Defines npm scripts (dev, build, preview, lint)
- Project metadata

### vite.config.ts
- Vite build tool configuration
- Path aliases (@/ for src/)
- Plugin configuration
- Build optimizations

### tsconfig.json
- TypeScript compiler options
- Module resolution settings
- Include/exclude patterns
- Path mappings

### tsconfig.node.json
- TypeScript config for build tools
- Used by Vite and other Node-based tools

### postcss.config.js
- PostCSS configuration
- Enables Tailwind CSS processing

### .eslintrc.cjs
- ESLint linting rules
- Code quality standards
- TypeScript-specific rules

### .gitignore
- Files/folders to exclude from Git
- node_modules, dist, .env, etc.

### .env.example
- Template for environment variables
- Copy to .env and fill in values
- Not committed to Git

## Documentation Files

### README.md
- Main project documentation
- Quick overview
- Links to other docs

### QUICK-START.md
- 5-minute setup guide
- Minimal instructions
- For quick testing

### SETUP.md
- Detailed setup instructions
- Troubleshooting guide
- Step-by-step walkthrough

### CONTRIBUTING.md
- Development guidelines
- Code standards
- Git workflow
- Component patterns

### PROJECT-INFO.md
- Complete project overview
- Architecture details
- Technology stack
- Data models
- Future roadmap

### FILE-STRUCTURE.md
- This file
- Complete file listing
- Purpose of each file/folder

## Migration Script

### migrate-to-src.js
- One-time use script
- Organizes files into /src structure
- Deletes unnecessary files
- **Can be deleted after migration**

## Generated/Temporary Files (Not in Repository)

These files are created during development/build but not committed to Git:

```
node_modules/                     # Installed npm packages
dist/                            # Production build output
.env                             # Local environment variables
package-lock.json                # Dependency lock file
*.log                            # Log files
.DS_Store                        # macOS system files
Thumbs.db                        # Windows system files
```

## File Count Summary

- **Total Components**: ~70+ React components
- **Total TypeScript Files**: ~80+
- **Configuration Files**: 8
- **Documentation Files**: 6
- **Total Project Files**: ~100+

## File Naming Conventions

### Components
- **PascalCase**: `StudentsList.tsx`, `Dashboard.tsx`
- One component per file
- Export named component

### Utilities/Helpers
- **camelCase**: `formatDate.ts`, `validateEmail.ts`
- Descriptive names
- Export functions

### Types/Interfaces
- **PascalCase**: `Student`, `Employee`, `Class`
- Defined in `/src/types/index.ts`
- Exported for use throughout app

### Configuration Files
- **lowercase/kebab-case**: `vite.config.ts`, `package.json`
- Standard naming conventions
- Follow tool requirements

## Import Path Examples

```typescript
// Absolute import from src/ (using @ alias)
import { Student } from '@/types';
import { useApp } from '@/context/AppContext';

// Relative import (within same directory)
import { Button } from './Button';

// Relative import (parent directory)
import { useApp } from '../../context/AppContext';

// Relative import (from src/)
import { Student } from '../types';
```

## Protected Files (Do Not Modify)

```
src/components/figma/ImageWithFallback.tsx
```

This file is system-generated and should not be edited.

## Files to Delete After Setup

```
migrate-to-src.js                 # Delete after running migration
```

## Next Steps

1. ✅ Understand the file structure
2. ✅ Run migration script
3. ✅ Explore component files
4. ✅ Review type definitions
5. ✅ Start developing!

---

**Last Updated**: December 2024  
**Document Version**: 1.0
