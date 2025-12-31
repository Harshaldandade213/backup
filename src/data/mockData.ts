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
} from '../types';

export const generateMockData = () => {
  // Classes
  const classes: Class[] = [
    {
      id: 'class-1',
      name: '10 a',
      monthlyFees: 5000,
      classTeacherId: 'emp-1',
      totalStudents: 0,
      boysCount: 0,
      girlsCount: 0,
      otherCount: 0,
    },
    {
      id: 'class-2',
      name: '10 b',
      monthlyFees: 5000,
      classTeacherId: 'emp-2',
      totalStudents: 0,
      boysCount: 0,
      girlsCount: 0,
      otherCount: 0,
    },
    {
      id: 'class-3',
      name: '9 a',
      monthlyFees: 4500,
      totalStudents: 0,
      boysCount: 0,
      girlsCount: 0,
      otherCount: 0,
    },
    {
      id: 'class-4',
      name: '8 a',
      monthlyFees: 4000,
      totalStudents: 0,
      boysCount: 0,
      girlsCount: 0,
      otherCount: 0,
    },
  ];

  // Employees
  const employees: Employee[] = [
    {
      id: 'emp-1',
      employeeId: 'EMP001',
      firstName: 'Rajesh',
      lastName: 'Kumar',
      dateOfBirth: '1985-05-15',
      gender: 'Male',
      email: 'rajesh.kumar@school.com',
      mobile: '9876543210',
      address: '123 Main Street',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001',
      designation: 'Senior Teacher',
      department: 'Mathematics',
      joiningDate: '2015-06-01',
      qualification: 'M.Sc Mathematics, B.Ed',
      experience: '10 years',
      salary: 45000,
      bloodGroup: 'O+',
      emergencyContact: '9876543211',
      emergencyContactName: 'Priya Kumar',
      username: 'rajesh.kumar',
      password: 'password123',
      status: 'Active',
    },
    {
      id: 'emp-2',
      employeeId: 'EMP002',
      firstName: 'Priya',
      lastName: 'Sharma',
      dateOfBirth: '1988-08-20',
      gender: 'Female',
      email: 'priya.sharma@school.com',
      mobile: '9876543220',
      address: '456 Park Avenue',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400002',
      designation: 'Teacher',
      department: 'Science',
      joiningDate: '2017-07-15',
      qualification: 'M.Sc Physics, B.Ed',
      experience: '6 years',
      salary: 38000,
      bloodGroup: 'A+',
      emergencyContact: '9876543221',
      emergencyContactName: 'Amit Sharma',
      username: 'priya.sharma',
      password: 'password123',
      status: 'Active',
    },
    {
      id: 'emp-3',
      employeeId: 'EMP003',
      firstName: 'Amit',
      lastName: 'Patel',
      dateOfBirth: '1990-03-10',
      gender: 'Male',
      email: 'amit.patel@school.com',
      mobile: '9876543230',
      address: '789 Lake Road',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400003',
      designation: 'Teacher',
      department: 'English',
      joiningDate: '2019-08-01',
      qualification: 'M.A English, B.Ed',
      experience: '4 years',
      salary: 35000,
      bloodGroup: 'B+',
      emergencyContact: '9876543231',
      emergencyContactName: 'Sneha Patel',
      username: 'amit.patel',
      password: 'password123',
      status: 'Active',
    },
  ];

  // Students
  const students: Student[] = [
    {
      id: 'std-1',
      admissionNumber: 'ADM2023001',
      firstName: 'Ankur',
      lastName: 'Singh',
      dateOfBirth: '2008-04-15',
      gender: 'Male',
      bloodGroup: 'A+',
      religion: 'Hindu',
      nationality: 'Indian',
      mobile: '9876543240',
      email: 'ankur.singh@student.com',
      address: '123 Student Street',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400010',
      classId: 'class-2',
      rollNumber: '01',
      admissionDate: '2023-04-01',
      fatherName: 'Vikram Singh',
      fatherMobile: '9876543241',
      fatherProfession: 'Business',
      fatherIncome: '500000',
      fatherEducation: 'Graduate',
      motherName: 'Sunita Singh',
      motherMobile: '9876543242',
      motherProfession: 'Teacher',
      motherIncome: '300000',
      motherEducation: 'Post Graduate',
      status: 'Active',
    },
    {
      id: 'std-2',
      admissionNumber: 'ADM2023002',
      firstName: 'Sujit',
      lastName: 'Verma',
      dateOfBirth: '2008-07-22',
      gender: 'Male',
      bloodGroup: 'O+',
      religion: 'Hindu',
      nationality: 'Indian',
      mobile: '9876543250',
      address: '456 School Lane',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400011',
      classId: 'class-2',
      rollNumber: '02',
      admissionDate: '2023-04-01',
      fatherName: 'Ramesh Verma',
      fatherMobile: '9876543251',
      fatherProfession: 'Engineer',
      fatherIncome: '800000',
      fatherEducation: 'Post Graduate',
      motherName: 'Kavita Verma',
      motherMobile: '9876543252',
      motherProfession: 'Homemaker',
      motherEducation: 'Graduate',
      status: 'Active',
    },
    {
      id: 'std-3',
      admissionNumber: 'ADM2023003',
      firstName: 'Harshall',
      lastName: 'Desai',
      dateOfBirth: '2008-11-05',
      gender: 'Male',
      bloodGroup: 'B+',
      religion: 'Hindu',
      nationality: 'Indian',
      mobile: '9876543260',
      address: '789 Education Road',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400012',
      classId: 'class-2',
      rollNumber: '03',
      admissionDate: '2023-04-01',
      fatherName: 'Prakash Desai',
      fatherMobile: '9876543261',
      fatherProfession: 'Doctor',
      fatherIncome: '1200000',
      fatherEducation: 'Post Graduate',
      motherName: 'Meera Desai',
      motherMobile: '9876543262',
      motherProfession: 'Nurse',
      motherIncome: '400000',
      motherEducation: 'Graduate',
      status: 'Active',
    },
    {
      id: 'std-4',
      admissionNumber: 'ADM2023004',
      firstName: 'Ananya',
      lastName: 'Reddy',
      dateOfBirth: '2008-09-12',
      gender: 'Female',
      bloodGroup: 'AB+',
      religion: 'Hindu',
      nationality: 'Indian',
      mobile: '9876543270',
      address: '321 College Street',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400013',
      classId: 'class-1',
      rollNumber: '01',
      admissionDate: '2023-04-01',
      fatherName: 'Suresh Reddy',
      fatherMobile: '9876543271',
      fatherProfession: 'Businessman',
      fatherIncome: '1500000',
      fatherEducation: 'Graduate',
      motherName: 'Lakshmi Reddy',
      motherMobile: '9876543272',
      motherProfession: 'Teacher',
      motherIncome: '350000',
      motherEducation: 'Post Graduate',
      status: 'Active',
    },
    {
      id: 'std-5',
      admissionNumber: 'ADM2023005',
      firstName: 'Neha',
      lastName: 'Gupta',
      dateOfBirth: '2008-12-18',
      gender: 'Female',
      bloodGroup: 'O+',
      religion: 'Hindu',
      nationality: 'Indian',
      mobile: '9876543280',
      address: '654 Academy Road',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400014',
      classId: 'class-1',
      rollNumber: '02',
      admissionDate: '2023-04-01',
      fatherName: 'Manoj Gupta',
      fatherMobile: '9876543281',
      fatherProfession: 'Accountant',
      fatherIncome: '600000',
      fatherEducation: 'Graduate',
      motherName: 'Pooja Gupta',
      motherMobile: '9876543282',
      motherProfession: 'Banker',
      motherIncome: '700000',
      motherEducation: 'Post Graduate',
      status: 'Active',
    },
  ];

  // Update class counts
  classes.forEach((cls) => {
    const classStudents = students.filter(s => s.classId === cls.id && s.status === 'Active');
    cls.totalStudents = classStudents.length;
    cls.boysCount = classStudents.filter(s => s.gender === 'Male').length;
    cls.girlsCount = classStudents.filter(s => s.gender === 'Female').length;
    cls.otherCount = classStudents.filter(s => s.gender === 'Other').length;
  });

  // Subjects
  const subjects: Subject[] = [
    {
      id: 'sub-1',
      name: 'Mathematics',
      code: 'MATH',
      classIds: ['class-1', 'class-2', 'class-3', 'class-4'],
      teacherId: 'emp-1',
    },
    {
      id: 'sub-2',
      name: 'Science',
      code: 'SCI',
      classIds: ['class-1', 'class-2', 'class-3', 'class-4'],
      teacherId: 'emp-2',
    },
    {
      id: 'sub-3',
      name: 'English',
      code: 'ENG',
      classIds: ['class-1', 'class-2', 'class-3', 'class-4'],
      teacherId: 'emp-3',
    },
    {
      id: 'sub-4',
      name: 'Social Studies',
      code: 'SST',
      classIds: ['class-1', 'class-2', 'class-3', 'class-4'],
      teacherId: 'emp-1',
    },
    {
      id: 'sub-5',
      name: 'Hindi',
      code: 'HIN',
      classIds: ['class-1', 'class-2', 'class-3', 'class-4'],
      teacherId: 'emp-3',
    },
  ];

  // Attendance - Generate for last 30 days
  const attendance: Attendance[] = [];
  const today = new Date();
  for (let i = 0; i < 30; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    
    // Skip weekends
    if (date.getDay() === 0 || date.getDay() === 6) continue;
    
    students.forEach((student) => {
      const random = Math.random();
      let status: 'Present' | 'Absent' | 'On-leave';
      if (random > 0.9) {
        status = 'Absent';
      } else if (random > 0.85) {
        status = 'On-leave';
      } else {
        status = 'Present';
      }
      
      attendance.push({
        id: `att-${student.id}-${dateStr}`,
        studentId: student.id,
        date: dateStr,
        status,
        classId: student.classId,
      });
    });
  }

  // Fees
  const fees: Fee[] = [];
  students.forEach((student, index) => {
    const classData = classes.find(c => c.id === student.classId);
    if (classData) {
      // Generate fees for last 6 months
      for (let i = 0; i < 6; i++) {
        const dueDate = new Date();
        dueDate.setMonth(dueDate.getMonth() - i);
        const dueDateStr = dueDate.toISOString().split('T')[0];
        
        const isPaid = i > 1 || Math.random() > 0.3;
        
        fees.push({
          id: `fee-${student.id}-${i}`,
          studentId: student.id,
          amount: classData.monthlyFees,
          dueDate: dueDateStr,
          paidDate: isPaid ? dueDateStr : undefined,
          status: isPaid ? 'Paid' : (i > 1 ? 'Overdue' : 'Pending'),
          feeType: 'Tuition Fee',
        });
      }
    }
  });

  // Salaries
  const salaries: Salary[] = [];
  employees.forEach((employee) => {
    // Generate salaries for last 6 months
    for (let i = 0; i < 6; i++) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      const month = date.toLocaleString('default', { month: 'long' });
      const year = date.getFullYear();
      
      const allowances = employee.salary * 0.2;
      const deductions = employee.salary * 0.1;
      const netSalary = employee.salary + allowances - deductions;
      
      salaries.push({
        id: `sal-${employee.id}-${i}`,
        employeeId: employee.id,
        month,
        year,
        basicSalary: employee.salary,
        allowances,
        deductions,
        netSalary,
        paidDate: i > 0 ? date.toISOString().split('T')[0] : undefined,
        status: i > 0 ? 'Paid' : 'Pending',
      });
    }
  });

  // Timetable
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const timetables: Timetable[] = [];
  
  classes.forEach((cls) => {
    days.forEach((day, dayIndex) => {
      subjects.slice(0, 6).forEach((subject, period) => {
        const hour = 9 + period;
        timetables.push({
          id: `tt-${cls.id}-${dayIndex}-${period}`,
          classId: cls.id,
          day,
          period: period + 1,
          subjectId: subject.id,
          teacherId: subject.teacherId || 'emp-1',
          startTime: `${hour.toString().padStart(2, '0')}:00`,
          endTime: `${(hour + 1).toString().padStart(2, '0')}:00`,
        });
      });
    });
  });

  // Homework
  const homework: Homework[] = [
    {
      id: 'hw-1',
      classId: 'class-2',
      subjectId: 'sub-1',
      title: 'Algebra Problems',
      description: 'Solve exercises 1-20 from chapter 5',
      assignedDate: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    },
    {
      id: 'hw-2',
      classId: 'class-2',
      subjectId: 'sub-2',
      title: 'Science Project',
      description: 'Prepare a project on renewable energy sources',
      assignedDate: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    },
  ];

  // Certificates
  const certificates: Certificate[] = [];

  // Exams
  const exams: Exam[] = [
    {
      id: 'exam-1',
      name: 'Mid Term Examination',
      classId: 'class-2',
      subjectId: 'sub-1',
      date: '2025-09-15',
      totalMarks: 100,
      passingMarks: 40,
      duration: '3 hours',
    },
    {
      id: 'exam-2',
      name: 'Mid Term Examination',
      classId: 'class-2',
      subjectId: 'sub-2',
      date: '2025-09-17',
      totalMarks: 100,
      passingMarks: 40,
      duration: '3 hours',
    },
  ];

  // Exam Results
  const examResults: ExamResult[] = [];
  students.filter(s => s.classId === 'class-2').forEach((student) => {
    exams.forEach((exam) => {
      const marks = Math.floor(Math.random() * 40) + 60; // 60-100
      let grade = 'A';
      if (marks < 70) grade = 'B';
      if (marks < 60) grade = 'C';
      if (marks < 50) grade = 'D';
      if (marks < 40) grade = 'F';
      
      examResults.push({
        id: `result-${student.id}-${exam.id}`,
        examId: exam.id,
        studentId: student.id,
        marksObtained: marks,
        grade,
      });
    });
  });

  // Behaviour Records
  const behaviourRecords: BehaviourRecord[] = [];

  return {
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
  };
};
