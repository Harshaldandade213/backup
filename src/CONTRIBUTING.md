# Contributing to KinderNet

Thank you for your interest in contributing to KinderNet! This document provides guidelines and instructions for developers working on this project.

## Development Workflow

### Getting Started

1. **Clone/Download the repository**
2. **Run migration script**: `node migrate-to-src.js`
3. **Install dependencies**: `npm install`
4. **Start development server**: `npm run dev`

### Project Structure

```
src/
├── components/          # React components organized by feature
│   ├── auth/           # Authentication components
│   ├── dashboard/      # Dashboard and analytics
│   ├── students/       # Student management
│   ├── employees/      # Employee management
│   ├── classes/        # Class management
│   ├── attendance/     # Attendance tracking
│   ├── fees/           # Fee management
│   ├── salary/         # Salary management
│   ├── subjects/       # Subject management
│   ├── certificates/   # Certificate generation
│   ├── settings/       # Application settings
│   ├── accounts/       # Account management
│   ├── layout/         # Layout components (Header, Sidebar)
│   ├── common/         # Shared components
│   └── ui/             # UI component library
├── context/            # React Context for global state
├── data/               # Mock data and initial data
├── types/              # TypeScript type definitions
├── styles/             # Global CSS and Tailwind
├── App.tsx             # Main application component
└── main.tsx            # Application entry point
```

## Coding Standards

### TypeScript

- **Always use TypeScript** for new files
- Define proper interfaces/types in `/src/types/index.ts`
- Avoid using `any` type when possible
- Use proper type annotations for function parameters and return types

Example:
```typescript
interface Student {
  id: string;
  name: string;
  class: string;
}

const addStudent = (student: Student): void => {
  // Implementation
};
```

### React Components

- **Use functional components** with hooks
- **Use TypeScript** with proper prop types
- **Export named exports** for better tree-shaking
- Keep components **small and focused**
- Use **custom hooks** for reusable logic

Example:
```typescript
import React from 'react';

interface StudentCardProps {
  student: Student;
  onEdit: (id: string) => void;
}

export const StudentCard: React.FC<StudentCardProps> = ({ student, onEdit }) => {
  return (
    <div className="p-4 border rounded">
      <h3>{student.name}</h3>
      <button onClick={() => onEdit(student.id)}>Edit</button>
    </div>
  );
};
```

### Styling

- **Use Tailwind CSS** utility classes
- **Avoid inline styles** unless absolutely necessary
- **Follow the design system** colors from `/src/styles/globals.css`
- Use **responsive design** patterns (mobile-first)

Primary colors:
- Primary: Teal/Emerald (`bg-primary`, `text-primary`)
- Background: Gray shades
- Success: Green
- Error: Red
- Warning: Yellow

### File Naming

- **Components**: PascalCase (e.g., `StudentCard.tsx`)
- **Utilities**: camelCase (e.g., `formatDate.ts`)
- **Types**: PascalCase (e.g., `Student`, `Employee`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `MAX_STUDENTS`)

### Import Organization

Organize imports in this order:

```typescript
// 1. React and external libraries
import React, { useState } from 'react';
import { toast } from 'sonner@2.0.3';

// 2. Internal contexts and hooks
import { useApp } from '../../context/AppContext';

// 3. Components
import { Button } from '../common/Button';
import { Modal } from '../common/Modal';

// 4. Types
import { Student, Class } from '../../types';

// 5. Utilities and helpers
import { formatDate } from '../../utils/formatDate';

// 6. Styles (if any)
import './styles.css';
```

## Component Guidelines

### State Management

- Use **Context API** for global state (`AppContext`)
- Use **local state** (useState) for component-specific data
- Use **props** for parent-child communication

### Forms

- Use controlled components
- Validate input on submit
- Show error messages clearly
- Provide feedback with toast notifications

Example:
```typescript
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  
  if (!formData.name) {
    toast.error('Name is required');
    return;
  }
  
  // Process form
  toast.success('Student added successfully');
};
```

### Data Fetching

Currently using mock data from `/src/data/mockData.ts`. When implementing real API:

```typescript
const [loading, setLoading] = useState(false);
const [error, setError] = useState<string | null>(null);

const fetchData = async () => {
  setLoading(true);
  try {
    // API call
    const data = await api.getStudents();
    setStudents(data);
  } catch (err) {
    setError('Failed to load students');
    toast.error('Failed to load students');
  } finally {
    setLoading(false);
  }
};
```

## Adding New Features

### Step 1: Plan the Feature

1. Define requirements
2. Design component structure
3. Identify required types/interfaces
4. Plan state management approach

### Step 2: Create Types

Add necessary types to `/src/types/index.ts`:

```typescript
export interface Assignment {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  classId: string;
  subjectId: string;
}
```

### Step 3: Create Components

Create new component files in appropriate directory:

```
src/components/assignments/
├── AssignmentList.tsx
├── AssignmentForm.tsx
└── AssignmentCard.tsx
```

### Step 4: Update Context (if needed)

Add state and methods to `AppContext`:

```typescript
// In AppContext.tsx
const [assignments, setAssignments] = useState<Assignment[]>([]);

const addAssignment = (assignment: Assignment) => {
  setAssignments([...assignments, assignment]);
};
```

### Step 5: Add Navigation

Update sidebar navigation in `/src/components/layout/Sidebar.tsx`

### Step 6: Add Route

Update App.tsx to handle new section:

```typescript
case 'assignments':
  return <AssignmentList />;
```

### Step 7: Test

- Test all functionality
- Check responsive design
- Verify error handling
- Test with different data

## Common Patterns

### Modal Pattern

```typescript
const [isOpen, setIsOpen] = useState(false);

<Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
  <h2>Modal Title</h2>
  <p>Modal content</p>
</Modal>
```

### Table Pattern

```typescript
<Table
  columns={[
    { key: 'name', label: 'Name' },
    { key: 'class', label: 'Class' },
  ]}
  data={students}
  onRowClick={(student) => handleView(student)}
/>
```

### Loading State Pattern

```typescript
{loading ? (
  <div className="text-center py-8">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
    <p className="mt-4 text-gray-600">Loading...</p>
  </div>
) : (
  <ContentComponent />
)}
```

## Testing

Currently, the project doesn't have automated tests. When adding tests:

1. Use **React Testing Library**
2. Test user interactions, not implementation
3. Mock external dependencies
4. Test error states

## Performance

### Optimization Tips

- Use `React.memo()` for expensive components
- Implement proper key props in lists
- Lazy load images
- Debounce search inputs
- Paginate large lists

Example:
```typescript
const StudentCard = React.memo(({ student }) => {
  return <div>{student.name}</div>;
});
```

## Git Workflow

### Branch Naming

- Feature: `feature/add-assignment-module`
- Bugfix: `fix/student-form-validation`
- Hotfix: `hotfix/critical-login-issue`

### Commit Messages

Use clear, descriptive commit messages:

```
✨ Add assignment management module
🐛 Fix student form validation
♻️ Refactor attendance components
📝 Update documentation
🎨 Improve UI styling
```

## Troubleshooting Development Issues

### Issue: Changes not reflecting

**Solution:** 
- Hard refresh browser (Ctrl+F5)
- Clear browser cache
- Restart dev server

### Issue: TypeScript errors

**Solution:**
- Check type definitions in `/src/types/index.ts`
- Verify imports are correct
- Run `npm run lint`

### Issue: Styling not working

**Solution:**
- Check Tailwind class names
- Verify PostCSS is running
- Check `/src/styles/globals.css`

## Code Review Checklist

Before submitting code for review:

- [ ] Code follows TypeScript and React best practices
- [ ] Components are properly typed
- [ ] No console.log statements left in code
- [ ] Error handling is implemented
- [ ] UI is responsive
- [ ] Code is well-commented where needed
- [ ] No unused imports or variables
- [ ] Follows existing code style
- [ ] Works in Chrome, Firefox, Safari, Edge

## Resources

### Documentation

- [React Documentation](https://react.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Vite Documentation](https://vitejs.dev/)

### Libraries Used

- **Motion (Framer Motion)**: Animations
- **Recharts**: Charts and graphs
- **Lucide React**: Icons
- **Sonner**: Toast notifications

## Questions?

If you have questions or need help:

1. Check this contributing guide
2. Review existing code for patterns
3. Ask your team lead
4. Check the documentation

---

**Happy Coding! 🚀**
