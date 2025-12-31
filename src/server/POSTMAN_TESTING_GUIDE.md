# 🚀 KINDERNET API - POSTMAN TESTING GUIDE

## 📋 Table of Contents
1. [Server Setup](#server-setup)
2. [Postman Setup](#postman-setup)
3. [Authentication APIs](#authentication-apis)
4. [Student Management APIs](#student-management-apis)
5. [Employee Management APIs](#employee-management-apis)
6. [Class Management APIs](#class-management-apis)
7. [Subject Management APIs](#subject-management-apis)
8. [Fee Management APIs](#fee-management-apis)
9. [Attendance Management APIs](#attendance-management-apis)

---

## 🔧 Server Setup

### Step 1: Start MongoDB
Make sure MongoDB is running:
```bash
# For Local MongoDB
mongod

# Or use MongoDB Atlas (cloud) - just update .env
```

### Step 2: Install Dependencies
```bash
cd server
npm install
```

### Step 3: Start Server
```bash
npm run dev
```

Expected output:
```
🚀 KinderNet API is live on port 5000
📝 Environment: development
🌐 Client URL: http://localhost:5173
✅ MongoDB connected successfully
```

---

## 🔧 Postman Setup

### Base URL
```
http://localhost:5000
```

### Environment Variables (Postman)
Create these in Postman:
- `base_url`: `http://localhost:5000`
- `access_token`: (will be set automatically after login)

---

## 🔐 AUTHENTICATION APIS

### 1️⃣ Health Check (Test Server)
**No authentication required**

```http
GET {{base_url}}/health
```

**Expected Response:**
```json
{
  "success": true,
  "message": "KinderNet API is running",
  "timestamp": "2025-12-19T10:30:00.000Z"
}
```

---

### 2️⃣ Register Admin (Sign Up)
**First step - Create your account**

```http
POST {{base_url}}/api/v1/auth/sign-up
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "John Doe",
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
    "name": "John Doe",
    "email": "admin@kindernet.com",
    "role": "ADMIN",
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

📝 **Important:** Copy the `accessToken` for next requests!

---

### 3️⃣ Login (Sign In)
**Use this if already registered**

```http
POST {{base_url}}/api/v1/auth/sign-in
Content-Type: application/json
```

**Request Body:**
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
    "name": "John Doe",
    "email": "admin@kindernet.com",
    "role": "ADMIN",
    "organization": "org_id_here",
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

### 4️⃣ Verify Token
**Check if token is valid**

```http
GET {{base_url}}/api/v1/auth/verify
Authorization: Bearer {{access_token}}
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Token is valid",
  "data": {
    "userId": "user_id_here",
    "email": "admin@kindernet.com",
    "role": "ADMIN"
  }
}
```

---

### 5️⃣ Logout

```http
POST {{base_url}}/api/v1/auth/logout
Authorization: Bearer {{access_token}}
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

## 🎓 STUDENT MANAGEMENT APIS

**⚠️ All requests require Authorization header:**
```
Authorization: Bearer YOUR_ACCESS_TOKEN
```

### 1️⃣ Add Single Student

```http
POST {{base_url}}/api/v1/students
Authorization: Bearer {{access_token}}
Content-Type: application/json
```

**Request Body:**
```json
{
  "studentId": "STU001",
  "firstName": "Ahmed",
  "lastName": "Ali",
  "dateOfBirth": "2015-05-15",
  "gender": "MALE",
  "bloodGroup": "A+",
  "admissionDate": "2024-01-10",
  "class": "class_id_here",
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
    "_id": "student_id_here",
    "studentId": "STU001",
    "firstName": "Ahmed",
    "lastName": "Ali",
    "class": "class_id_here",
    "organization": "org_id_here"
  }
}
```

---

### 2️⃣ Get All Students (Organization)

```http
GET {{base_url}}/api/v1/students/organization/{{organization_id}}
Authorization: Bearer {{access_token}}
```

**Query Parameters (Optional):**
```
?page=1&limit=10&class=class_id&section=A&search=Ahmed
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Students fetched successfully",
  "data": {
    "students": [
      {
        "_id": "student_id",
        "studentId": "STU001",
        "firstName": "Ahmed",
        "lastName": "Ali",
        "class": {
          "name": "Grade 1",
          "section": "A"
        }
      }
    ],
    "pagination": {
      "total": 50,
      "page": 1,
      "pages": 5,
      "limit": 10
    }
  }
}
```

---

### 3️⃣ Get Student Details

```http
GET {{base_url}}/api/v1/students/{{student_id}}
Authorization: Bearer {{access_token}}
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Student details fetched successfully",
  "data": {
    "_id": "student_id",
    "studentId": "STU001",
    "firstName": "Ahmed",
    "lastName": "Ali",
    "dateOfBirth": "2015-05-15",
    "gender": "MALE",
    "bloodGroup": "A+",
    "class": {
      "_id": "class_id",
      "name": "Grade 1",
      "section": "A"
    },
    "guardianInfo": {
      "fatherName": "Ali Ahmed",
      "fatherPhone": "+923001234567"
    },
    "address": {
      "city": "Karachi",
      "country": "Pakistan"
    }
  }
}
```

---

### 4️⃣ Search Student by Name or ID

```http
GET {{base_url}}/api/v1/students/search/Ahmed
Authorization: Bearer {{access_token}}
```

Or search by ID:
```http
GET {{base_url}}/api/v1/students/search/STU001
Authorization: Bearer {{access_token}}
```

---

### 5️⃣ Update Student

```http
PATCH {{base_url}}/api/v1/students/{{student_id}}
Authorization: Bearer {{access_token}}
Content-Type: application/json
```

**Request Body (Partial Update):**
```json
{
  "phone": "+923009999999",
  "address": {
    "city": "Lahore"
  },
  "section": "B"
}
```

---

### 6️⃣ Delete Student

```http
DELETE {{base_url}}/api/v1/students/{{student_id}}
Authorization: Bearer {{access_token}}
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Student deleted successfully"
}
```

---

### 7️⃣ Promote Students (Bulk)

```http
POST {{base_url}}/api/v1/students/promote
Authorization: Bearer {{access_token}}
Content-Type: application/json
```

**Request Body:**
```json
{
  "studentIds": ["student_id_1", "student_id_2", "student_id_3"],
  "newClass": "class_id_for_grade_2",
  "newSection": "A",
  "academicYear": "2025-2026"
}
```

---

### 8️⃣ Add Bulk Students

```http
POST {{base_url}}/api/v1/students/bulk
Authorization: Bearer {{access_token}}
Content-Type: application/json
```

**Request Body:**
```json
{
  "students": [
    {
      "studentId": "STU002",
      "firstName": "Sara",
      "lastName": "Khan",
      "dateOfBirth": "2015-08-20",
      "gender": "FEMALE",
      "class": "class_id_here",
      "guardianInfo": {
        "fatherName": "Khan Sahab",
        "fatherPhone": "+923001111111"
      }
    },
    {
      "studentId": "STU003",
      "firstName": "Usman",
      "lastName": "Malik",
      "dateOfBirth": "2015-03-10",
      "gender": "MALE",
      "class": "class_id_here",
      "guardianInfo": {
        "fatherName": "Malik Sahab",
        "fatherPhone": "+923002222222"
      }
    }
  ]
}
```

---

## 👨‍🏫 EMPLOYEE MANAGEMENT APIS

### 1️⃣ Create Employee

```http
POST {{base_url}}/api/v1/employees
Authorization: Bearer {{access_token}}
Content-Type: application/json
```

**Request Body:**
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

---

### 2️⃣ Get All Employees

```http
GET {{base_url}}/api/v1/employees
Authorization: Bearer {{access_token}}
```

**Query Parameters (Optional):**
```
?page=1&limit=10&designation=Teacher&department=Primary
```

---

### 3️⃣ Get Employee Details

```http
GET {{base_url}}/api/v1/employees/{{employee_id}}
Authorization: Bearer {{access_token}}
```

---

### 4️⃣ Update Employee

```http
PATCH {{base_url}}/api/v1/employees/{{employee_id}}
Authorization: Bearer {{access_token}}
Content-Type: application/json
```

**Request Body:**
```json
{
  "salary": 55000,
  "designation": "Senior Teacher"
}
```

---

### 5️⃣ Delete Employee

```http
DELETE {{base_url}}/api/v1/employees/{{employee_id}}
Authorization: Bearer {{access_token}}
```

---

## 🏫 CLASS MANAGEMENT APIS

### 1️⃣ Create Class

```http
POST {{base_url}}/api/v1/classes
Authorization: Bearer {{access_token}}
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "Grade 1",
  "section": "A",
  "academicYear": "2024-2025",
  "capacity": 30,
  "fee": 15000
}
```

**Required Fields:**
- `name` - Class name (e.g., "Grade 1", "Class 5")
- `section` - Section letter (e.g., "A", "B", "C")
- `academicYear` - Academic year (e.g., "2024-2025") **REQUIRED!**

**Optional Fields:**
- `capacity` - Maximum number of students
- `tuitionFee` - Monthly fee amount
- `classTeacher` - Employee ID of class teacher
- `subjects` - Array of subject IDs

---

### 2️⃣ Get All Classes

```http
GET {{base_url}}/api/v1/classes
Authorization: Bearer {{access_token}}
```

**Query Parameters (Optional):**
```
?academicYear=2024-2025&section=A
```

---

### 3️⃣ Get Class Details

```http
GET {{base_url}}/api/v1/classes/{{class_id}}
Authorization: Bearer {{access_token}}
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Class details fetched successfully",
  "data": {
    "_id": "class_id",
    "name": "Grade 1",
    "section": "A",
    "capacity": 30,
    "currentStrength": 25,
    "classTeacher": {
      "_id": "employee_id",
      "firstName": "Sarah",
      "lastName": "Johnson"
    },
    "subjects": [
      {
        "_id": "subject_id",
        "name": "Mathematics"
      }
    ],
    "students": [
      {
        "_id": "student_id",
        "firstName": "Ahmed",
        "lastName": "Ali"
      }
    ]
  }
}
```

---

### 4️⃣ Update Class

```http
PATCH {{base_url}}/api/v1/classes/{{class_id}}
Authorization: Bearer {{access_token}}
Content-Type: application/json
```

**Request Body:**
```json
{
  "capacity": 35,
  "fee": 16000
}
```

---

### 5️⃣ Delete Class

```http
DELETE {{base_url}}/api/v1/classes/{{class_id}}
Authorization: Bearer {{access_token}}
```

---

## 📚 SUBJECT MANAGEMENT APIS

### 1️⃣ Create Subject

```http
POST {{base_url}}/api/v1/subjects
Authorization: Bearer {{access_token}}
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "Mathematics",
  "code": "MATH101",
  "description": "Basic Mathematics for Grade 1",
  "type": "CORE"
}
```

---

### 2️⃣ Get All Subjects

```http
GET {{base_url}}/api/v1/subjects
Authorization: Bearer {{access_token}}
```

---

### 3️⃣ Get Subject Details

```http
GET {{base_url}}/api/v1/subjects/{{subject_id}}
Authorization: Bearer {{access_token}}
```

---

### 4️⃣ Update Subject

```http
PATCH {{base_url}}/api/v1/subjects/{{subject_id}}
Authorization: Bearer {{access_token}}
Content-Type: application/json
```

---

### 5️⃣ Delete Subject

```http
DELETE {{base_url}}/api/v1/subjects/{{subject_id}}
Authorization: Bearer {{access_token}}
```

---

## 💰 FEE MANAGEMENT APIS

### 1️⃣ Record Fee Payment

```http
POST {{base_url}}/api/v1/fees
Authorization: Bearer {{access_token}}
Content-Type: application/json
```

**Request Body:**
```json
{
  "student": "student_id_here",
  "amount": 15000,
  "month": "JANUARY",
  "academicYear": "2024-2025",
  "paymentMethod": "CASH",
  "paymentDate": "2024-01-05",
  "receiptNumber": "REC001"
}
```

---

### 2️⃣ Get Student Fee Records

```http
GET {{base_url}}/api/v1/fees/student/{{student_id}}
Authorization: Bearer {{access_token}}
```

**Query Parameters:**
```
?academicYear=2024-2025&status=PAID
```

---

### 3️⃣ Get Organization Fee Summary

```http
GET {{base_url}}/api/v1/fees/organization/summary
Authorization: Bearer {{access_token}}
```

---

## 📅 ATTENDANCE MANAGEMENT APIS

### 1️⃣ Mark Attendance

```http
POST {{base_url}}/api/v1/attendance
Authorization: Bearer {{access_token}}
Content-Type: application/json
```

**Request Body:**
```json
{
  "class": "class_id_here",
  "date": "2024-12-19",
  "attendance": [
    {
      "student": "student_id_1",
      "status": "PRESENT"
    },
    {
      "student": "student_id_2",
      "status": "ABSENT"
    },
    {
      "student": "student_id_3",
      "status": "LATE"
    }
  ]
}
```

---

### 2️⃣ Get Class Attendance

```http
GET {{base_url}}/api/v1/attendance/class/{{class_id}}
Authorization: Bearer {{access_token}}
```

**Query Parameters:**
```
?date=2024-12-19&month=12&year=2024
```

---

### 3️⃣ Get Student Attendance

```http
GET {{base_url}}/api/v1/attendance/student/{{student_id}}
Authorization: Bearer {{access_token}}
```

**Query Parameters:**
```
?month=12&year=2024
```

---

## 🔥 QUICK START TEST SEQUENCE

**Follow this exact order for first time testing:**

### ✅ Step 1: Health Check
```
GET http://localhost:5000/health
```

### ✅ Step 2: Register Admin
```
POST http://localhost:5000/api/v1/auth/sign-up
Body: { "name": "Admin", "email": "admin@test.com", "password": "Test@123" }
```
➡️ Copy the `accessToken` from response

### ✅ Step 3: Verify Token
```
GET http://localhost:5000/api/v1/auth/verify
Headers: Authorization: Bearer YOUR_TOKEN
```

### ✅ Step 4: Create Class
```
POST http://localhost:5000/api/v1/classes
Headers: Authorization: Bearer YOUR_TOKEN
Body: { "name": "Grade 1", "section": "A", "capacity": 30 }
```
➡️ Copy the class `_id` from response

### ✅ Step 5: Add Student
```
POST http://localhost:5000/api/v1/students
Headers: Authorization: Bearer YOUR_TOKEN
Body: {
  "studentId": "STU001",
  "firstName": "Test",
  "lastName": "Student",
  "class": "CLASS_ID_FROM_STEP_4",
  "dateOfBirth": "2015-01-01",
  "gender": "MALE"
}
```

### ✅ Step 6: Get All Students
```
GET http://localhost:5000/api/v1/students/organization/YOUR_ORG_ID
Headers: Authorization: Bearer YOUR_TOKEN
```

---

## 📝 Common Response Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request (validation error) |
| 401 | Unauthorized (invalid/missing token) |
| 403 | Forbidden (insufficient permissions) |
| 404 | Not Found |
| 429 | Too Many Requests (rate limit) |
| 500 | Internal Server Error |

---

## 🔐 Setting Up Authorization in Postman

### Method 1: Manual Header
Add to each request:
```
Key: Authorization
Value: Bearer YOUR_ACCESS_TOKEN_HERE
```

### Method 2: Environment Variable (Recommended)
1. Create environment variable `access_token`
2. After login, manually copy token to this variable
3. Use in requests: `{{access_token}}`

### Method 3: Auto-Set Token (Advanced)
Add this to the **Tests** tab of login request:
```javascript
const response = pm.response.json();
if (response.success && response.data.accessToken) {
    pm.environment.set("access_token", response.data.accessToken);
}
```

---

## 🎯 Testing Checklist

- [ ] Server is running on port 5000
- [ ] MongoDB is connected
- [ ] Health check returns 200
- [ ] Can register new admin
- [ ] Can login successfully
- [ ] Token is being sent in requests
- [ ] Can create classes
- [ ] Can add students
- [ ] Can fetch students
- [ ] Can update students
- [ ] Can delete students

---

## ⚠️ Troubleshooting

### Issue: "Cannot connect to server"
**Solution:** Check if server is running: `npm run dev`

### Issue: "MongoDB connection failed"
**Solution:** Start MongoDB or update MONGO_URI in .env

### Issue: "Unauthorized" (401)
**Solution:** Check if Authorization header is set correctly

### Issue: "Token expired"
**Solution:** Login again to get new token

### Issue: "Organization not found"
**Solution:** Make sure you're using the correct organization ID from your user profile

---

## 📚 Additional Resources

- [Server README](/server/README.md)
- [API Documentation](/server/API_DOCUMENTATION.md)
- [Quick Start Guide](/server/QUICK_START.md)

---

**✨ Happy Testing! If you need help, check the server console logs for detailed error messages.**