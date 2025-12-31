# ✅ KINDERNET - COPY-PASTE TEST EXAMPLES

**Quick copy-paste examples for testing in Postman**

---

## 🔥 STEP-BY-STEP TESTING (Just Copy & Paste!)

---

### **TEST 1: Health Check** ✅

**Method:** `GET`  
**URL:** 
```
http://localhost:5000/health
```

**Headers:** None needed!

**Expected Response:**
```json
{
  "success": true,
  "message": "KinderNet API is running"
}
```

---

### **TEST 2: Register Admin** ✅

**Method:** `POST`  
**URL:** 
```
http://localhost:5000/api/v1/auth/sign-up
```

**Headers:**
```
Content-Type: application/json
```

**Body (raw JSON):**
```json
{
  "name": "Admin User",
  "email": "admin@kindernet.com",
  "password": "Admin@123456"
}
```

**Expected Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "name": "Admin User",
    "email": "admin@kindernet.com",
    "role": "ADMIN",
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzY0NTY3ODlhYmNkZWYxMjM0NTY3OCIsImlhdCI6MTcwMzAwMDAwMH0.abcdefghijklmnopqrstuvwxyz123456",
    "refreshToken": "..."
  }
}
```

**📝 ACTION:** Copy the `accessToken` and save it! You'll need it for all other requests.

---

### **TEST 3: Login (if already registered)** ✅

**Method:** `POST`  
**URL:** 
```
http://localhost:5000/api/v1/auth/sign-in
```

**Headers:**
```
Content-Type: application/json
```

**Body (raw JSON):**
```json
{
  "email": "admin@kindernet.com",
  "password": "Admin@123456"
}
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "organization": "676456789abcdef123456789"
  }
}
```

**📝 ACTION:** Copy both `accessToken` and `organization` ID!

---

### **TEST 4: Create Class** ✅

**Method:** `POST`  
**URL:** 
```
http://localhost:5000/api/v1/classes
```

**Headers:**
```
Authorization: Bearer YOUR_ACCESS_TOKEN_HERE
Content-Type: application/json
```

**Body (raw JSON):**
```json
{
  "name": "Grade 1",
  "section": "A",
  "academicYear": "2024-2025",
  "capacity": 30
}
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Class created successfully",
  "data": {
    "_id": "676456789abcdef123456789",
    "organization": "676456789abcdef123456789",
    "name": "Grade 1",
    "section": "A",
    "academicYear": "2024-2025",
    "capacity": 30,
    "createdAt": "2025-12-19T10:30:00.000Z"
  }
}
```

**📝 ACTION:** Copy the class `_id`!

---

### **TEST 5: Get All Classes** ✅

**Method:** `GET`  
**URL:** 
```
http://localhost:5000/api/v1/classes
```

**Headers:**
```
Authorization: Bearer YOUR_ACCESS_TOKEN_HERE
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Classes fetched successfully",
  "data": [
    {
      "_id": "676456789abcdef123456789",
      "name": "Grade 1",
      "section": "A",
      "academicYear": "2024-2025",
      "capacity": 30
    }
  ]
}
```

---

### **TEST 6: Add Student** ✅

**Method:** `POST`  
**URL:** 
```
http://localhost:5000/api/v1/students
```

**Headers:**
```
Authorization: Bearer YOUR_ACCESS_TOKEN_HERE
Content-Type: application/json
```

**Body (Minimal - raw JSON):**
```json
{
  "studentId": "STU001",
  "firstName": "Ahmed",
  "lastName": "Ali",
  "class": "CLASS_ID_FROM_TEST_4",
  "dateOfBirth": "2015-05-15",
  "gender": "MALE"
}
```

**Body (Complete - raw JSON):**
```json
{
  "studentId": "STU001",
  "firstName": "Ahmed",
  "lastName": "Ali",
  "dateOfBirth": "2015-05-15",
  "gender": "MALE",
  "bloodGroup": "A+",
  "admissionDate": "2024-01-10",
  "class": "CLASS_ID_FROM_TEST_4",
  "section": "A",
  "rollNumber": "001",
  "guardianInfo": {
    "fatherName": "Ali Ahmed",
    "fatherPhone": "+923001234567",
    "fatherOccupation": "Engineer",
    "motherName": "Fatima Ali",
    "motherPhone": "+923007654321",
    "motherOccupation": "Teacher"
  },
  "address": {
    "street": "123 Main Street",
    "city": "Karachi",
    "state": "Sindh",
    "country": "Pakistan",
    "zipCode": "75500"
  },
  "email": "ahmed.ali@student.com",
  "phone": "+923009876543"
}
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Student added successfully",
  "data": {
    "_id": "676456789abcdef123456789",
    "studentId": "STU001",
    "firstName": "Ahmed",
    "lastName": "Ali",
    "class": "676456789abcdef123456789"
  }
}
```

**📝 ACTION:** Copy the student `_id`!

---

### **TEST 7: Get All Students** ✅

**Method:** `GET`  
**URL:** 
```
http://localhost:5000/api/v1/students/organization/YOUR_ORGANIZATION_ID
```

**Headers:**
```
Authorization: Bearer YOUR_ACCESS_TOKEN_HERE
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Students fetched successfully",
  "data": {
    "students": [
      {
        "_id": "676456789abcdef123456789",
        "studentId": "STU001",
        "firstName": "Ahmed",
        "lastName": "Ali",
        "class": {
          "name": "Grade 1",
          "section": "A"
        }
      }
    ]
  }
}
```

---

### **TEST 8: Get Student Details** ✅

**Method:** `GET`  
**URL:** 
```
http://localhost:5000/api/v1/students/STUDENT_ID_FROM_TEST_6
```

**Headers:**
```
Authorization: Bearer YOUR_ACCESS_TOKEN_HERE
```

---

### **TEST 9: Create Employee** ✅

**Method:** `POST`  
**URL:** 
```
http://localhost:5000/api/v1/employees
```

**Headers:**
```
Authorization: Bearer YOUR_ACCESS_TOKEN_HERE
Content-Type: application/json
```

**Body (raw JSON):**
```json
{
  "employeeId": "EMP001",
  "firstName": "Sarah",
  "lastName": "Johnson",
  "email": "sarah.johnson@kindernet.com",
  "phone": "+923001234567",
  "dateOfBirth": "1990-05-15",
  "gender": "FEMALE",
  "designation": "Teacher",
  "department": "Primary",
  "joiningDate": "2024-01-01",
  "qualification": "M.Ed",
  "experience": 5,
  "salary": 50000,
  "address": {
    "street": "456 Teacher Lane",
    "city": "Karachi",
    "state": "Sindh",
    "country": "Pakistan",
    "zipCode": "75500"
  }
}
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Employee created successfully",
  "data": {
    "_id": "676456789abcdef123456789",
    "employeeId": "EMP001",
    "firstName": "Sarah",
    "lastName": "Johnson"
  }
}
```

---

### **TEST 10: Create Subject** ✅

**Method:** `POST`  
**URL:** 
```
http://localhost:5000/api/v1/subjects
```

**Headers:**
```
Authorization: Bearer YOUR_ACCESS_TOKEN_HERE
Content-Type: application/json
```

**Body (raw JSON):**
```json
{
  "name": "Mathematics",
  "code": "MATH101",
  "description": "Basic Mathematics for Grade 1",
  "type": "CORE"
}
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Subject created successfully",
  "data": {
    "_id": "676456789abcdef123456789",
    "name": "Mathematics",
    "code": "MATH101"
  }
}
```

---

### **TEST 11: Mark Attendance** ✅

**Method:** `POST`  
**URL:** 
```
http://localhost:5000/api/v1/attendance
```

**Headers:**
```
Authorization: Bearer YOUR_ACCESS_TOKEN_HERE
Content-Type: application/json
```

**Body (raw JSON):**
```json
{
  "class": "CLASS_ID_FROM_TEST_4",
  "date": "2024-12-19",
  "attendance": [
    {
      "student": "STUDENT_ID_FROM_TEST_6",
      "status": "PRESENT"
    }
  ]
}
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Attendance marked successfully"
}
```

---

### **TEST 12: Record Fee Payment** ✅

**Method:** `POST`  
**URL:** 
```
http://localhost:5000/api/v1/fees
```

**Headers:**
```
Authorization: Bearer YOUR_ACCESS_TOKEN_HERE
Content-Type: application/json
```

**Body (raw JSON):**
```json
{
  "student": "STUDENT_ID_FROM_TEST_6",
  "amount": 15000,
  "month": "JANUARY",
  "academicYear": "2024-2025",
  "paymentMethod": "CASH",
  "paymentDate": "2024-01-05",
  "receiptNumber": "REC001"
}
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Fee payment recorded successfully"
}
```

---

## 🎯 MULTIPLE EXAMPLES

### **Create Multiple Classes:**

**Grade 1 Section A:**
```json
{
  "name": "Grade 1",
  "section": "A",
  "academicYear": "2024-2025",
  "capacity": 30
}
```

**Grade 1 Section B:**
```json
{
  "name": "Grade 1",
  "section": "B",
  "academicYear": "2024-2025",
  "capacity": 30
}
```

**Grade 2 Section A:**
```json
{
  "name": "Grade 2",
  "section": "A",
  "academicYear": "2024-2025",
  "capacity": 35
}
```

---

### **Create Multiple Students:**

**Student 1:**
```json
{
  "studentId": "STU001",
  "firstName": "Ahmed",
  "lastName": "Ali",
  "class": "YOUR_CLASS_ID",
  "dateOfBirth": "2015-01-15",
  "gender": "MALE"
}
```

**Student 2:**
```json
{
  "studentId": "STU002",
  "firstName": "Sara",
  "lastName": "Khan",
  "class": "YOUR_CLASS_ID",
  "dateOfBirth": "2015-03-20",
  "gender": "FEMALE"
}
```

**Student 3:**
```json
{
  "studentId": "STU003",
  "firstName": "Usman",
  "lastName": "Malik",
  "class": "YOUR_CLASS_ID",
  "dateOfBirth": "2015-05-10",
  "gender": "MALE"
}
```

---

### **Create Multiple Employees:**

**Teacher:**
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

**Principal:**
```json
{
  "employeeId": "EMP002",
  "firstName": "John",
  "lastName": "Smith",
  "email": "john@school.com",
  "phone": "+923009876543",
  "dateOfBirth": "1985-08-20",
  "gender": "MALE",
  "designation": "Principal",
  "joiningDate": "2023-01-01",
  "salary": 80000
}
```

**Accountant:**
```json
{
  "employeeId": "EMP003",
  "firstName": "Maria",
  "lastName": "Garcia",
  "email": "maria@school.com",
  "phone": "+923005551234",
  "dateOfBirth": "1992-03-10",
  "gender": "FEMALE",
  "designation": "Accountant",
  "joiningDate": "2024-02-01",
  "salary": 45000
}
```

---

### **Create Multiple Subjects:**

**Mathematics:**
```json
{
  "name": "Mathematics",
  "code": "MATH101",
  "description": "Basic Mathematics",
  "type": "CORE"
}
```

**English:**
```json
{
  "name": "English",
  "code": "ENG101",
  "description": "English Language and Literature",
  "type": "CORE"
}
```

**Science:**
```json
{
  "name": "Science",
  "code": "SCI101",
  "description": "General Science",
  "type": "CORE"
}
```

**Art:**
```json
{
  "name": "Art",
  "code": "ART101",
  "description": "Drawing and Painting",
  "type": "ELECTIVE"
}
```

---

## 🔑 **Important Notes:**

### **Replace These Placeholders:**

- `YOUR_ACCESS_TOKEN_HERE` → Token from login/register response
- `YOUR_ORGANIZATION_ID` → Organization ID from login response
- `CLASS_ID_FROM_TEST_4` → Class `_id` from create class response
- `STUDENT_ID_FROM_TEST_6` → Student `_id` from create student response

### **Date Format:**
Always use: `YYYY-MM-DD`
```
✅ "2024-12-19"
✅ "2015-05-15"
❌ "19-12-2024"
❌ "12/19/2024"
```

### **Academic Year Format:**
Always use: `YYYY-YYYY`
```
✅ "2024-2025"
✅ "2023-2024"
❌ "2024"
❌ "24-25"
```

### **Gender Values:**
```
✅ "MALE"
✅ "FEMALE"
✅ "OTHER"
❌ "male"
❌ "M"
```

### **Payment Methods:**
```
✅ "CASH"
✅ "CARD"
✅ "ONLINE"
✅ "CHEQUE"
```

### **Attendance Status:**
```
✅ "PRESENT"
✅ "ABSENT"
✅ "LATE"
✅ "EXCUSED"
```

### **Months:**
```
✅ "JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE"
✅ "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"
❌ "Jan", "january", "1", "01"
```

---

## ✅ **Success Indicators:**

**Green status code: 200, 201** = Success! ✅  
**Red status code: 400, 401, 404, 500** = Error! ❌

---

**🎉 Happy Testing! Just copy, paste, and send!**
