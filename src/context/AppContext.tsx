import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  Student,
  Employee,
  Class,
  Subject,
  Attendance,
  Fee,
  Salary,
  Timetable,
  Homework,
  Certificate,
  Exam,
  ExamResult,
  BehaviourRecord,
  DashboardStats,
  SchoolSettings,
} from '../types';

interface AppContextType {
  students: Student[];
  employees: Employee[];
  classes: Class[];
  subjects: Subject[];
  attendance: Attendance[];
  fees: Fee[];
  salaries: Salary[];
  timetables: Timetable[];
  homework: Homework[];
  certificates: Certificate[];
  exams: Exam[];
  examResults: ExamResult[];
  behaviourRecords: BehaviourRecord[];
  
  navigateTo: (section: string) => void;
  
  addStudent: (student: Student) => void;
  updateStudent: (id: string, student: Partial<Student>) => void;
  deleteStudent: (id: string) => void;
  
  addEmployee: (employee: Employee) => void;
  updateEmployee: (id: string, employee: Partial<Employee>) => void;
  deleteEmployee: (id: string) => void;
  
  addClass: (classData: Class) => void;
  updateClass: (id: string, classData: Partial<Class>) => void;
  deleteClass: (id: string) => void;
  
  addSubject: (subject: Subject) => void;
  updateSubject: (id: string, subject: Partial<Subject>) => void;
  deleteSubject: (id: string) => void;
  
  addAttendance: (attendance: Attendance[]) => void;
  
  addFee: (fee: Fee) => void;
  updateFee: (id: string, fee: Partial<Fee>) => void;
  
  addSalary: (salary: Salary) => void;
  updateSalary: (id: string, salary: Partial<Salary>) => void;
  
  addTimetable: (timetable: Timetable) => void;
  updateTimetable: (id: string, timetable: Partial<Timetable>) => void;
  deleteTimetable: (id: string) => void;
  
  addHomework: (homework: Homework) => void;
  updateHomework: (id: string, homework: Partial<Homework>) => void;
  deleteHomework: (id: string) => void;
  
  addCertificate: (certificate: Certificate) => void;
  
  addExam: (exam: Exam) => void;
  updateExam: (id: string, exam: Partial<Exam>) => void;
  
  addExamResult: (result: ExamResult) => void;
  updateExamResult: (id: string, result: Partial<ExamResult>) => void;
  
  addBehaviourRecord: (record: BehaviourRecord) => void;
  
  promoteStudents: (studentIds: string[], newClassId: string) => void;
  
  getDashboardStats: () => DashboardStats;
  
  schoolSettings: SchoolSettings;
  updateSchoolSettings: (settings: Partial<SchoolSettings>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [students, setStudents] = useState<Student[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [classes, setClasses] = useState<Class[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [attendance, setAttendance] = useState<Attendance[]>([]);
  const [fees, setFees] = useState<Fee[]>([]);
  const [salaries, setSalaries] = useState<Salary[]>([]);
  const [timetables, setTimetables] = useState<Timetable[]>([]);
  const [homework, setHomework] = useState<Homework[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [exams, setExams] = useState<Exam[]>([]);
  const [examResults, setExamResults] = useState<ExamResult[]>([]);
  const [behaviourRecords, setBehaviourRecords] = useState<BehaviourRecord[]>([]);
  const [schoolSettings, setSchoolSettings] = useState<SchoolSettings>({
    schoolName: '',
    email: '',
    phone: '',
    address: '',
    website: '',
    established: '',
    principalName: '',
    sessionStart: '',
    sessionEnd: '',
  });

  // Initialize from localStorage only (no mock data)
  useEffect(() => {
    // Try to load from localStorage
    const savedStudents = localStorage.getItem('eskoofy_students');
    const savedEmployees = localStorage.getItem('eskoofy_employees');
    const savedClasses = localStorage.getItem('eskoofy_classes');
    const savedSubjects = localStorage.getItem('eskoofy_subjects');
    const savedAttendance = localStorage.getItem('eskoofy_attendance');
    const savedFees = localStorage.getItem('eskoofy_fees');
    const savedSalaries = localStorage.getItem('eskoofy_salaries');
    const savedTimetables = localStorage.getItem('eskoofy_timetables');
    const savedHomework = localStorage.getItem('eskoofy_homework');
    const savedCertificates = localStorage.getItem('eskoofy_certificates');
    const savedExams = localStorage.getItem('eskoofy_exams');
    const savedExamResults = localStorage.getItem('eskoofy_examResults');
    const savedBehaviourRecords = localStorage.getItem('eskoofy_behaviourRecords');
    const savedSchoolSettings = localStorage.getItem('eskoofy_schoolSettings');

    // Load from localStorage if data exists, otherwise keep empty arrays
    if (savedStudents) setStudents(JSON.parse(savedStudents));
    if (savedEmployees) setEmployees(JSON.parse(savedEmployees));
    if (savedClasses) setClasses(JSON.parse(savedClasses));
    if (savedSubjects) setSubjects(JSON.parse(savedSubjects));
    if (savedAttendance) setAttendance(JSON.parse(savedAttendance));
    if (savedFees) setFees(JSON.parse(savedFees));
    if (savedSalaries) setSalaries(JSON.parse(savedSalaries));
    if (savedTimetables) setTimetables(JSON.parse(savedTimetables));
    if (savedHomework) setHomework(JSON.parse(savedHomework));
    if (savedCertificates) setCertificates(JSON.parse(savedCertificates));
    if (savedExams) setExams(JSON.parse(savedExams));
    if (savedExamResults) setExamResults(JSON.parse(savedExamResults));
    if (savedBehaviourRecords) setBehaviourRecords(JSON.parse(savedBehaviourRecords));
    if (savedSchoolSettings) setSchoolSettings(JSON.parse(savedSchoolSettings));
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('eskoofy_students', JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem('eskoofy_employees', JSON.stringify(employees));
  }, [employees]);

  useEffect(() => {
    localStorage.setItem('eskoofy_classes', JSON.stringify(classes));
  }, [classes]);

  useEffect(() => {
    localStorage.setItem('eskoofy_subjects', JSON.stringify(subjects));
  }, [subjects]);

  useEffect(() => {
    localStorage.setItem('eskoofy_attendance', JSON.stringify(attendance));
  }, [attendance]);

  useEffect(() => {
    localStorage.setItem('eskoofy_fees', JSON.stringify(fees));
  }, [fees]);

  useEffect(() => {
    localStorage.setItem('eskoofy_salaries', JSON.stringify(salaries));
  }, [salaries]);

  useEffect(() => {
    localStorage.setItem('eskoofy_timetables', JSON.stringify(timetables));
  }, [timetables]);

  useEffect(() => {
    localStorage.setItem('eskoofy_homework', JSON.stringify(homework));
  }, [homework]);

  useEffect(() => {
    localStorage.setItem('eskoofy_certificates', JSON.stringify(certificates));
  }, [certificates]);

  useEffect(() => {
    localStorage.setItem('eskoofy_exams', JSON.stringify(exams));
  }, [exams]);

  useEffect(() => {
    localStorage.setItem('eskoofy_examResults', JSON.stringify(examResults));
  }, [examResults]);

  useEffect(() => {
    localStorage.setItem('eskoofy_behaviourRecords', JSON.stringify(behaviourRecords));
  }, [behaviourRecords]);

  useEffect(() => {
    localStorage.setItem('eskoofy_schoolSettings', JSON.stringify(schoolSettings));
  }, [schoolSettings]);

  // Student operations
  const addStudent = (student: Student) => {
    setStudents((prev) => [...prev, student]);
    // Update class stats
    updateClassStats(student.classId);
  };

  const updateStudent = (id: string, studentData: Partial<Student>) => {
    setStudents((prev) =>
      prev.map((student) => (student.id === id ? { ...student, ...studentData } : student))
    );
    const student = students.find(s => s.id === id);
    if (student && studentData.classId && studentData.classId !== student.classId) {
      updateClassStats(student.classId);
      updateClassStats(studentData.classId);
    }
  };

  const deleteStudent = (id: string) => {
    const student = students.find(s => s.id === id);
    setStudents((prev) => prev.filter((student) => student.id !== id));
    if (student) {
      updateClassStats(student.classId);
    }
  };

  // Employee operations
  const addEmployee = (employee: Employee) => {
    setEmployees((prev) => [...prev, employee]);
  };

  const updateEmployee = (id: string, employeeData: Partial<Employee>) => {
    setEmployees((prev) =>
      prev.map((employee) => (employee.id === id ? { ...employee, ...employeeData } : employee))
    );
  };

  const deleteEmployee = (id: string) => {
    setEmployees((prev) => prev.filter((employee) => employee.id !== id));
  };

  // Class operations
  const addClass = (classData: Class) => {
    setClasses((prev) => [...prev, classData]);
  };

  const updateClass = (id: string, classData: Partial<Class>) => {
    setClasses((prev) =>
      prev.map((cls) => (cls.id === id ? { ...cls, ...classData } : cls))
    );
  };

  const deleteClass = (id: string) => {
    setClasses((prev) => prev.filter((cls) => cls.id !== id));
  };

  const updateClassStats = (classId: string) => {
    const classStudents = students.filter(s => s.classId === classId && s.status === 'Active');
    const totalStudents = classStudents.length;
    const boysCount = classStudents.filter(s => s.gender === 'Male').length;
    const girlsCount = classStudents.filter(s => s.gender === 'Female').length;
    const otherCount = classStudents.filter(s => s.gender === 'Other').length;
    
    updateClass(classId, { totalStudents, boysCount, girlsCount, otherCount });
  };

  // Subject operations
  const addSubject = (subject: Subject) => {
    setSubjects((prev) => [...prev, subject]);
  };

  const updateSubject = (id: string, subjectData: Partial<Subject>) => {
    setSubjects((prev) =>
      prev.map((subject) => (subject.id === id ? { ...subject, ...subjectData } : subject))
    );
  };

  const deleteSubject = (id: string) => {
    setSubjects((prev) => prev.filter((subject) => subject.id !== id));
  };

  // Attendance operations
  const addAttendance = (attendanceData: Attendance[]) => {
    setAttendance((prev) => [...prev, ...attendanceData]);
  };

  // Fee operations
  const addFee = (fee: Fee) => {
    setFees((prev) => [...prev, fee]);
  };

  const updateFee = (id: string, feeData: Partial<Fee>) => {
    setFees((prev) =>
      prev.map((fee) => (fee.id === id ? { ...fee, ...feeData } : fee))
    );
  };

  // Salary operations
  const addSalary = (salary: Salary) => {
    setSalaries((prev) => [...prev, salary]);
  };

  const updateSalary = (id: string, salaryData: Partial<Salary>) => {
    setSalaries((prev) =>
      prev.map((salary) => (salary.id === id ? { ...salary, ...salaryData } : salary))
    );
  };

  // Timetable operations
  const addTimetable = (timetable: Timetable) => {
    setTimetables((prev) => [...prev, timetable]);
  };

  const updateTimetable = (id: string, timetableData: Partial<Timetable>) => {
    setTimetables((prev) =>
      prev.map((tt) => (tt.id === id ? { ...tt, ...timetableData } : tt))
    );
  };

  const deleteTimetable = (id: string) => {
    setTimetables((prev) => prev.filter((tt) => tt.id !== id));
  };

  // Homework operations
  const addHomework = (hw: Homework) => {
    setHomework((prev) => [...prev, hw]);
  };

  const updateHomework = (id: string, hwData: Partial<Homework>) => {
    setHomework((prev) =>
      prev.map((hw) => (hw.id === id ? { ...hw, ...hwData } : hw))
    );
  };

  const deleteHomework = (id: string) => {
    setHomework((prev) => prev.filter((hw) => hw.id !== id));
  };

  // Certificate operations
  const addCertificate = (certificate: Certificate) => {
    setCertificates((prev) => [...prev, certificate]);
  };

  // Exam operations
  const addExam = (exam: Exam) => {
    setExams((prev) => [...prev, exam]);
  };

  const updateExam = (id: string, examData: Partial<Exam>) => {
    setExams((prev) =>
      prev.map((exam) => (exam.id === id ? { ...exam, ...examData } : exam))
    );
  };

  // Exam Result operations
  const addExamResult = (result: ExamResult) => {
    setExamResults((prev) => [...prev, result]);
  };

  const updateExamResult = (id: string, resultData: Partial<ExamResult>) => {
    setExamResults((prev) =>
      prev.map((result) => (result.id === id ? { ...result, ...resultData } : result))
    );
  };

  // Behaviour operations
  const addBehaviourRecord = (record: BehaviourRecord) => {
    setBehaviourRecords((prev) => [...prev, record]);
  };

  // Promote students
  const promoteStudents = (studentIds: string[], newClassId: string) => {
    studentIds.forEach((id) => {
      updateStudent(id, { classId: newClassId });
    });
  };

  // Dashboard stats
  const getDashboardStats = (): DashboardStats => {
    const today = new Date().toISOString().split('T')[0];
    const todayAttendance = attendance.filter(a => a.date === today && a.studentId);
    
    return {
      totalStudents: students.filter(s => s.status === 'Active').length,
      totalEmployees: employees.filter(e => e.status === 'Active').length,
      totalClasses: classes.length,
      totalSubjects: subjects.length,
      presentToday: todayAttendance.filter(a => a.status === 'Present').length,
      absentToday: todayAttendance.filter(a => a.status === 'Absent').length,
      pendingFees: fees.filter(f => f.status === 'Pending' || f.status === 'Overdue').length,
      totalRevenue: fees.filter(f => f.status === 'Paid').reduce((sum, f) => sum + f.amount, 0),
    };
  };

  const value: AppContextType = {
    students,
    employees,
    classes,
    subjects,
    attendance,
    fees,
    salaries,
    timetables,
    homework,
    certificates,
    exams,
    examResults,
    behaviourRecords,
    navigateTo: (section: string) => {},
    addStudent,
    updateStudent,
    deleteStudent,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    addClass,
    updateClass,
    deleteClass,
    addSubject,
    updateSubject,
    deleteSubject,
    addAttendance,
    addFee,
    updateFee,
    addSalary,
    updateSalary,
    addTimetable,
    updateTimetable,
    deleteTimetable,
    addHomework,
    updateHomework,
    deleteHomework,
    addCertificate,
    addExam,
    updateExam,
    addExamResult,
    updateExamResult,
    addBehaviourRecord,
    promoteStudents,
    getDashboardStats,
    schoolSettings,
    updateSchoolSettings: (settings) => setSchoolSettings(prev => ({ ...prev, ...settings })),
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};