# Frontend-Backend Integration Guide

Complete guide for connecting your React frontend with the KinderNet backend API.

## 📁 Create API Service Layer

### Step 1: Create API Configuration

Create `/src/services/api.config.ts`:

```typescript
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1';

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - Add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('accessToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
```

---

## 🔐 Authentication Service

Create `/src/services/auth.service.ts`:

```typescript
import api from './api.config';

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    name: string;
    email: string;
    role: string;
    accessToken: string;
    refreshToken?: string;
    isOrganizationConfigured?: boolean;
    organization?: string;
  };
}

class AuthService {
  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/sign-up', data);
    if (response.data.success) {
      localStorage.setItem('accessToken', response.data.data.accessToken);
      if (response.data.data.refreshToken) {
        localStorage.setItem('refreshToken', response.data.data.refreshToken);
      }
    }
    return response.data;
  }

  async login(data: LoginData): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/sign-in', data);
    if (response.data.success) {
      localStorage.setItem('accessToken', response.data.data.accessToken);
      localStorage.setItem('user', JSON.stringify(response.data.data));
    }
    return response.data;
  }

  async logout(): Promise<void> {
    try {
      await api.post('/auth/logout');
    } finally {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
    }
  }

  async verifyToken(): Promise<any> {
    const response = await api.get('/auth/verify');
    return response.data;
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('accessToken');
  }

  getUser(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
}

export default new AuthService();
```

---

## 👨‍🎓 Student Service

Create `/src/services/student.service.ts`:

```typescript
import api from './api.config';
import { Student } from '@/types';

interface StudentResponse {
  success: boolean;
  message: string;
  data: {
    students: Student[];
    pagination?: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
      hasNextPage: boolean;
      hasPrevPage: boolean;
    };
  };
}

class StudentService {
  async getStudents(
    organizationId: string,
    params?: {
      page?: number;
      limit?: number;
      query?: string;
      class?: string;
      section?: string;
    }
  ): Promise<StudentResponse> {
    const response = await api.get<StudentResponse>(
      `/students/organization/${organizationId}`,
      { params }
    );
    return response.data;
  }

  async addStudent(data: Partial<Student>): Promise<any> {
    const response = await api.post('/students', data);
    return response.data;
  }

  async addBulkStudents(organizationId: string, students: Partial<Student>[]): Promise<any> {
    const response = await api.post('/students/bulk', {
      organization: organizationId,
      students,
    });
    return response.data;
  }

  async updateStudent(id: string, data: Partial<Student>): Promise<any> {
    const response = await api.patch(`/students/${id}`, data);
    return response.data;
  }

  async deleteStudent(id: string): Promise<any> {
    const response = await api.delete(`/students/${id}`);
    return response.data;
  }

  async searchStudents(query: string): Promise<any> {
    const response = await api.get(`/students/search/${query}`);
    return response.data;
  }

  async promoteStudents(studentIds: string[], toClass: string, toSection?: string): Promise<any> {
    const response = await api.post('/students/promote', {
      studentIds,
      toClass,
      toSection,
    });
    return response.data;
  }
}

export default new StudentService();
```

---

## 👨‍💼 Employee Service

Create `/src/services/employee.service.ts`:

```typescript
import api from './api.config';
import { Employee } from '@/types';

class EmployeeService {
  async getEmployees(params?: { page?: number; limit?: number }): Promise<any> {
    const response = await api.get('/employees', { params });
    return response.data;
  }

  async addEmployee(data: Partial<Employee>): Promise<any> {
    const response = await api.post('/employees', data);
    return response.data;
  }

  async updateEmployee(id: string, data: Partial<Employee>): Promise<any> {
    const response = await api.patch(`/employees/${id}`, data);
    return response.data;
  }

  async deleteEmployee(id: string): Promise<any> {
    const response = await api.delete(`/employees/${id}`);
    return response.data;
  }

  async getEmployeeDetails(id: string): Promise<any> {
    const response = await api.get(`/employees/${id}`);
    return response.data;
  }
}

export default new EmployeeService();
```

---

## 🏢 Organization Service

Create `/src/services/organization.service.ts`:

```typescript
import api from './api.config';

class OrganizationService {
  async createOrganization(data: any): Promise<any> {
    const response = await api.post('/organizations', data);
    return response.data;
  }

  async getOrganizations(params?: { page?: number; limit?: number }): Promise<any> {
    const response = await api.get('/organizations', { params });
    return response.data;
  }

  async getOrganizationDetails(id: string): Promise<any> {
    const response = await api.get(`/organizations/${id}`);
    return response.data;
  }

  async updateOrganization(id: string, data: any): Promise<any> {
    const response = await api.patch(`/organizations/${id}`, data);
    return response.data;
  }
}

export default new OrganizationService();
```

---

## 📊 Attendance Service

Create `/src/services/attendance.service.ts`:

```typescript
import api from './api.config';

class AttendanceService {
  async markAttendance(data: any): Promise<any> {
    const response = await api.post('/attendance', data);
    return response.data;
  }

  async bulkMarkAttendance(attendanceType: string, records: any[]): Promise<any> {
    const response = await api.post('/attendance/bulk', {
      attendanceType,
      attendanceRecords: records,
    });
    return response.data;
  }

  async getAttendance(params: {
    attendanceType?: string;
    startDate?: string;
    endDate?: string;
    studentId?: string;
    employeeId?: string;
    status?: string;
  }): Promise<any> {
    const response = await api.get('/attendance', { params });
    return response.data;
  }

  async getAttendanceReport(params: {
    attendanceType: string;
    month: number;
    year: number;
  }): Promise<any> {
    const response = await api.get('/attendance/report', { params });
    return response.data;
  }

  async deleteAttendance(id: string): Promise<any> {
    const response = await api.delete(`/attendance/${id}`);
    return response.data;
  }
}

export default new AttendanceService();
```

---

## 🎯 Usage in Components

### Example: Login Component

```typescript
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '@/services/auth.service';
import { toast } from 'sonner';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await authService.login({ email, password });
      
      if (response.success) {
        toast.success(response.message);
        navigate('/dashboard');
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      {/* Your form fields */}
    </form>
  );
}
```

### Example: Fetch Students

```typescript
import { useEffect, useState } from 'react';
import studentService from '@/services/student.service';
import { Student } from '@/types';

export function StudentList() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const organizationId = 'your-org-id'; // Get from context or auth

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const response = await studentService.getStudents(organizationId, {
        page: 1,
        limit: 10,
      });

      if (response.success) {
        setStudents(response.data.students);
      }
    } catch (error) {
      console.error('Failed to fetch students:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Render students */}
    </div>
  );
}
```

---

## 🔧 Environment Variables

Add to `/client/.env`:

```env
VITE_API_BASE_URL=http://localhost:5000/api/v1
```

For production:
```env
VITE_API_BASE_URL=https://your-production-api.com/api/v1
```

---

## 🛡️ Protected Routes

Create `/src/components/ProtectedRoute.tsx`:

```typescript
import { Navigate } from 'react-router-dom';
import authService from '@/services/auth.service';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  if (!authService.isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
```

Usage in routes:
```typescript
<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>
```

---

## ✅ Testing Checklist

- [ ] Backend API is running on port 5000
- [ ] Frontend can connect to backend
- [ ] CORS is configured correctly
- [ ] Authentication works (login/register)
- [ ] Token is stored and sent with requests
- [ ] Protected routes redirect to login
- [ ] API error handling works
- [ ] Loading states are shown
- [ ] Success/error messages display

---

## 🔍 Debugging Tips

### Check Network Tab
1. Open browser DevTools (F12)
2. Go to Network tab
3. Watch API requests
4. Check status codes and responses

### Console Errors
```typescript
// Add logging to services
try {
  const response = await api.get('/students');
  console.log('✅ API Response:', response.data);
} catch (error: any) {
  console.error('❌ API Error:', error.response?.data);
}
```

### CORS Issues
If you see CORS errors:
1. Check `CLIENT_URL` in backend `.env`
2. Restart backend after changing `.env`
3. Clear browser cache

---

**Your frontend-backend integration is complete! 🎉**
