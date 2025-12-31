import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from '../context/AppContext';
import { AuthProvider } from '../context/AuthContext';
import { ProtectedRoute } from '../components/routing/ProtectedRoute';
import { PublicRoute } from '../components/routing/PublicRoute';
import { NotFound } from '../components/routing/NotFound';
import { ComingSoon } from '../components/routing/ComingSoon';
import { MainLayout } from '../components/layout/MainLayout';
import { Login } from '../components/auth/Login';
import { SignUp } from '../components/auth/SignUp';
import { OrganizationSetup } from '../components/auth/OrganizationSetup';
import { Dashboard } from '../components/dashboard/Dashboard';
import { ClassesPage } from '../components/classes/ClassesPage';
import { StudentsList } from '../components/students/StudentsList';
import { AdmissionForm } from '../components/students/AdmissionForm';
import { PromoteStudents } from '../components/students/PromoteStudents';
import { StudentsAttendance } from '../components/attendance/StudentsAttendance';
import { ClassWiseReport } from '../components/attendance/ClassWiseReport';
import { StudentAttendanceReport } from '../components/attendance/StudentAttendanceReport';
import { EmployeesAttendance } from '../components/attendance/EmployeesAttendance';
import { CertificatesPage } from '../components/certificates/CertificatesPage';
import { EmployeesList } from '../components/employees/EmployeesList';
import { StaffLogin } from '../components/employees/StaffLogin';
import { AddEmployee } from '../components/employees/AddEmployee';
import { SubjectsPage } from '../components/subjects/SubjectsPage';
import { FeesPage } from '../components/fees/FeesPage';
import { SalaryPage } from '../components/salary/SalaryPage';
import { AccountsPage } from '../components/accounts/AccountsPage';
import { GeneralSettings } from '../components/settings/GeneralSettings';
import { Toaster } from 'sonner@2.0.3';
import { useAuth } from '../context/AuthContext';

// Component wrapper to access auth context
const AuthenticatedRoutes: React.FC = () => {
  const { isAuthenticated, setupComplete } = useAuth();

  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path="/login"
        element={
          <PublicRoute isAuthenticated={isAuthenticated} setupComplete={setupComplete}>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <PublicRoute isAuthenticated={isAuthenticated} setupComplete={setupComplete}>
            <SignUp />
          </PublicRoute>
        }
      />
      
      {/* Setup Route */}
      <Route
        path="/setup"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated} setupComplete={setupComplete}>
            <OrganizationSetup />
          </ProtectedRoute>
        }
      />

      {/* Protected Routes with Layout */}
      <Route
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated} requiresSetup setupComplete={setupComplete}>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        {/* Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />
        
        {/* Settings */}
        <Route path="/settings" element={<GeneralSettings />} />
        
        {/* Classes & Subjects */}
        <Route path="/classes" element={<ClassesPage />} />
        <Route path="/subjects" element={<SubjectsPage />} />
        
        {/* Students Routes */}
        <Route path="/students/list" element={<StudentsList />} />
        <Route path="/students/admission" element={<AdmissionForm />} />
        <Route path="/students/promote" element={<PromoteStudents />} />
        
        {/* Employees Routes */}
        <Route path="/employees/list" element={<EmployeesList />} />
        <Route path="/employees/add" element={<AddEmployee />} />
        <Route path="/employees/staff-login" element={<StaffLogin />} />
        
        {/* Financial Routes */}
        <Route path="/accounts" element={<AccountsPage />} />
        <Route path="/fees" element={<FeesPage />} />
        <Route path="/salary" element={<SalaryPage />} />
        
        {/* Attendance Routes */}
        <Route path="/attendance/students" element={<StudentsAttendance />} />
        <Route path="/attendance/employees" element={<EmployeesAttendance />} />
        <Route path="/attendance/class-report" element={<ClassWiseReport />} />
        <Route path="/attendance/student-report" element={<StudentAttendanceReport />} />
        
        {/* Certificates */}
        <Route path="/certificates/generate" element={<CertificatesPage />} />
        
        {/* Coming Soon Pages */}
        <Route path="/whatsapp" element={<ComingSoon title="WhatsApp Integration" />} />
        <Route path="/messaging" element={<ComingSoon title="Messaging" />} />
        <Route path="/sms" element={<ComingSoon title="SMS Services" />} />
        <Route path="/live-class" element={<ComingSoon title="Live Class" />} />
        <Route path="/question-paper" element={<ComingSoon title="Question Paper" />} />
        <Route path="/exams/list" element={<ComingSoon title="Exams" />} />
        <Route path="/exams/results" element={<ComingSoon title="Exam Results" />} />
        <Route path="/class-tests" element={<ComingSoon title="Class Tests" />} />
        <Route path="/reports" element={<ComingSoon title="Reports" />} />
        <Route path="/certificates/templates" element={<ComingSoon title="Certificate Templates" />} />
      </Route>

      {/* Root Redirect */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      
      {/* 404 - Not Found */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

// Main App Component
const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppProvider>
        <AuthProvider>
          <AuthenticatedRoutes />
          <Toaster position="top-right" richColors />
        </AuthProvider>
      </AppProvider>
    </BrowserRouter>
  );
};

export default App;
