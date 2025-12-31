// Core Types for Student Management System

export interface Student {
  id: string;
  admissionNumber: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: 'Male' | 'Female' | 'Other';
  bloodGroup?: string;
  religion?: string;
  caste?: string;
  nationality: string;
  motherTongue?: string;
  mobile: string;
  email?: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  photo?: string;
  classId: string;
  rollNumber?: string;
  admissionDate: string;
  fatherName: string;
  fatherMobile: string;
  fatherProfession?: string;
  fatherIncome?: string;
  fatherEducation?: string;
  motherName: string;
  motherMobile?: string;
  motherProfession?: string;
  motherIncome?: string;
  motherEducation?: string;
  guardianName?: string;
  guardianRelation?: string;
  previousSchool?: string;
  status: 'Active' | 'Inactive' | 'Graduated';
}

export interface Employee {
  id: string;
  employeeId: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: 'Male' | 'Female' | 'Other';
  email: string;
  mobile: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  photo?: string;
  designation: string;
  department: string;
  joiningDate: string;
  qualification: string;
  experience: string;
  salary: number;
  bloodGroup?: string;
  emergencyContact: string;
  emergencyContactName: string;
  aadhaarNumber?: string;
  panNumber?: string;
  username: string;
  password: string;
  status: 'Active' | 'Inactive';
}

export interface Class {
  id: string;
  name: string;
  monthlyFees: number;
  classTeacherId?: string;
  totalStudents: number;
  boysCount: number;
  girlsCount: number;
  otherCount: number;
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  classIds: string[];
  teacherId?: string;
  description?: string;
}

export interface Attendance {
  id: string;
  studentId?: string;
  employeeId?: string;
  date: string;
  status: 'Present' | 'Absent' | 'On-leave';
  classId?: string;
  remarks?: string;
}

export interface Fee {
  id: string;
  studentId: string;
  amount: number;
  dueDate: string;
  paidDate?: string;
  status: 'Paid' | 'Pending' | 'Overdue';
  feeType: string;
  remarks?: string;
}

export interface Salary {
  id: string;
  employeeId: string;
  month: string;
  year: number;
  basicSalary: number;
  allowances: number;
  deductions: number;
  netSalary: number;
  paidDate?: string;
  status: 'Paid' | 'Pending';
}

export interface Timetable {
  id: string;
  classId: string;
  day: string;
  period: number;
  subjectId: string;
  teacherId: string;
  startTime: string;
  endTime: string;
}

export interface Homework {
  id: string;
  classId: string;
  subjectId: string;
  title: string;
  description: string;
  assignedDate: string;
  dueDate: string;
  attachments?: string[];
}

export interface Certificate {
  id: string;
  templateType: string;
  recipientType: 'Student' | 'Employee';
  recipientId: string;
  reason: string;
  date: string;
  generatedDate: string;
}

export interface Exam {
  id: string;
  name: string;
  classId: string;
  subjectId: string;
  date: string;
  totalMarks: number;
  passingMarks: number;
  duration: string;
}

export interface ExamResult {
  id: string;
  examId: string;
  studentId: string;
  marksObtained: number;
  grade: string;
  remarks?: string;
}

export interface BehaviourRecord {
  id: string;
  studentId: string;
  date: string;
  type: 'Behaviour' | 'Skill';
  category: string;
  rating: number;
  remarks: string;
  teacherId: string;
}

export interface DashboardStats {
  totalStudents: number;
  totalEmployees: number;
  totalClasses: number;
  totalSubjects: number;
  presentToday: number;
  absentToday: number;
  pendingFees: number;
  totalRevenue: number;
}

export interface SchoolSettings {
  schoolName: string;
  email: string;
  phone: string;
  address: string;
  website: string;
  established: string;
  principalName: string;
  sessionStart: string;
  sessionEnd: string;
}