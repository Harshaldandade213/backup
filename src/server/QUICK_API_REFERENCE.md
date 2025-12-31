# 🚀 KINDERNET - QUICK API REFERENCE

## ⚡ Base URL
```
http://localhost:5000
```

---

## 🔥 QUICK START (5 Minutes)

### 1. Health Check ✅
```bash
GET http://localhost:5000/health
```

### 2. Register ✅
```bash
POST http://localhost:5000/api/v1/auth/sign-up

{
  "name": "Admin",
  "email": "admin@test.com",
  "password": "Test@123"
}
```

### 3. Login ✅
```bash
POST http://localhost:5000/api/v1/auth/sign-in

{
  "email": "admin@test.com",
  "password": "Test@123"
}

➡️ Copy accessToken from response!
```

### 4. Create Class ✅
```bash
POST http://localhost:5000/api/v1/classes
Authorization: Bearer YOUR_TOKEN

{
  "name": "Grade 1",
  "section": "A",
  "academicYear": "2024-2025",
  "capacity": 30,
  "fee": 15000
}

➡️ Copy class _id from response!
```

### 5. Add Student ✅
```bash
POST http://localhost:5000/api/v1/students
Authorization: Bearer YOUR_TOKEN

{
  "studentId": "STU001",
  "firstName": "Test",
  "lastName": "Student",
  "class": "CLASS_ID_HERE",
  "dateOfBirth": "2015-01-01",
  "gender": "MALE"
}
```

---

## 📚 ALL ENDPOINTS SUMMARY

### 🔐 Authentication (No Auth Required)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/auth/sign-up` | Register new admin |
| POST | `/api/v1/auth/sign-in` | Login |
| POST | `/api/v1/auth/logout` | Logout |
| GET | `/api/v1/auth/verify` | Verify token |

### 🎓 Students (Auth Required)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/students` | Add single student |
| POST | `/api/v1/students/bulk` | Add multiple students |
| POST | `/api/v1/students/promote` | Promote students |
| GET | `/api/v1/students/organization/:orgId` | Get all students |
| GET | `/api/v1/students/:id` | Get student details |
| GET | `/api/v1/students/search/:query` | Search student |
| PATCH | `/api/v1/students/:id` | Update student |
| DELETE | `/api/v1/students/:id` | Delete student |

### 🏫 Classes (Auth Required)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/classes` | Create class |
| GET | `/api/v1/classes` | Get all classes |
| GET | `/api/v1/classes/:id` | Get class details |
| PATCH | `/api/v1/classes/:id` | Update class |
| DELETE | `/api/v1/classes/:id` | Delete class |

### 👨‍🏫 Employees (Auth Required)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/employees` | Create employee |
| GET | `/api/v1/employees` | Get all employees |
| GET | `/api/v1/employees/:id` | Get employee details |
| PATCH | `/api/v1/employees/:id` | Update employee |
| DELETE | `/api/v1/employees/:id` | Delete employee |

### 📚 Subjects (Auth Required)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/subjects` | Create subject |
| GET | `/api/v1/subjects` | Get all subjects |
| GET | `/api/v1/subjects/:id` | Get subject details |
| PATCH | `/api/v1/subjects/:id` | Update subject |
| DELETE | `/api/v1/subjects/:id` | Delete subject |

### 💰 Fees (Auth Required)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/fees` | Record fee payment |
| GET | `/api/v1/fees/student/:studentId` | Get student fees |
| GET | `/api/v1/fees/organization/summary` | Get fee summary |

### 📅 Attendance (Auth Required)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/attendance` | Mark attendance |
| GET | `/api/v1/attendance/class/:classId` | Get class attendance |
| GET | `/api/v1/attendance/student/:studentId` | Get student attendance |

---

## 🔑 Authorization Header

All protected endpoints require:
```
Authorization: Bearer YOUR_ACCESS_TOKEN_HERE
```

---

## 📦 Sample Request Bodies

### Create Student (Minimal)
```json
{
  "studentId": "STU001",
  "firstName": "Ahmed",
  "lastName": "Ali",
  "class": "67890abcdef",
  "dateOfBirth": "2015-01-01",
  "gender": "MALE"
}
```

### Create Student (Complete)
```json
{
  "studentId": "STU001",
  "firstName": "Ahmed",
  "lastName": "Ali",
  "dateOfBirth": "2015-05-15",
  "gender": "MALE",
  "bloodGroup": "A+",
  "admissionDate": "2024-01-10",
  "class": "67890abcdef",
  "section": "A",
  "rollNumber": "001",
  "guardianInfo": {
    "fatherName": "Ali Ahmed",
    "fatherPhone": "+923001234567",
    "motherName": "Fatima Ali",
    "motherPhone": "+923007654321"
  },
  "address": {
    "city": "Karachi",
    "country": "Pakistan"
  },
  "email": "ahmed@student.com",
  "phone": "+923009876543"
}
```

### Create Class
```json
{
  "name": "Grade 1",
  "section": "A",
  "academicYear": "2024-2025",
  "capacity": 30,
  "fee": 15000
}
```

### Create Employee
```json
{
  "employeeId": "EMP001",
  "firstName": "Sarah",
  "lastName": "Johnson",
  "email": "sarah@school.com",
  "phone": "+923001234567",
  "dateOfBirth": "1990-05-15",
  "gender": "FEMALE",
  "designation": "Teacher",
  "joiningDate": "2024-01-01",
  "salary": 50000
}
```

### Mark Attendance
```json
{
  "class": "67890abcdef",
  "date": "2024-12-19",
  "attendance": [
    {
      "student": "student_id_1",
      "status": "PRESENT"
    },
    {
      "student": "student_id_2",
      "status": "ABSENT"
    }
  ]
}
```

### Record Fee Payment
```json
{
  "student": "student_id",
  "amount": 15000,
  "month": "JANUARY",
  "academicYear": "2024-2025",
  "paymentMethod": "CASH",
  "paymentDate": "2024-01-05",
  "receiptNumber": "REC001"
}
```

---

## ✅ Response Format

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    // Response data here
  }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error message here",
  "error": {
    "code": "ERROR_CODE",
    "details": "Detailed error information"
  }
}
```

---

## 🎯 Testing Sequence

1. ✅ Health Check → `/health`
2. ✅ Register → `/api/v1/auth/sign-up`
3. ✅ Login → `/api/v1/auth/sign-in` (save token)
4. ✅ Create Class → `/api/v1/classes` (save class ID)
5. ✅ Add Student → `/api/v1/students` (use class ID)
6. ✅ Get Students → `/api/v1/students/organization/:orgId`
7. ✅ Create Employee → `/api/v1/employees`
8. ✅ Mark Attendance → `/api/v1/attendance`
9. ✅ Record Fee → `/api/v1/fees`

---

## 🚨 Common Errors

| Code | Error | Solution |
|------|-------|----------|
| 401 | Unauthorized | Check Authorization header |
| 400 | Bad Request | Check request body format |
| 404 | Not Found | Check endpoint URL |
| 500 | Server Error | Check server logs |
| 429 | Rate Limit | Wait before retrying |

---

## 📝 Notes

- All dates use ISO 8601 format: `YYYY-MM-DD`
- Gender values: `MALE`, `FEMALE`, `OTHER`
- Payment methods: `CASH`, `CARD`, `ONLINE`, `CHEQUE`
- Attendance status: `PRESENT`, `ABSENT`, `LATE`, `EXCUSED`
- Months: `JANUARY`, `FEBRUARY`, ..., `DECEMBER`

---

## 🔗 Full Documentation

See [POSTMAN_TESTING_GUIDE.md](./POSTMAN_TESTING_GUIDE.md) for detailed examples.

---

**🎉 Happy Testing!**