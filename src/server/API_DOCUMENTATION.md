# KinderNet API Documentation

Complete API documentation for KinderNet Backend.

## Base URL

```
Local: http://localhost:5000/api/v1
Production: https://your-domain.com/api/v1
```

## Authentication

All protected endpoints require a Bearer token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

---

## 🔐 Authentication Endpoints

### 1. Register Admin

**Endpoint:** `POST /auth/sign-up`

**Description:** Register a new admin user

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "name": "John Doe",
    "email": "john@example.com",
    "role": "ADMIN",
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### 2. Login

**Endpoint:** `POST /auth/sign-in`

**Description:** Login existing user

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "name": "John Doe",
    "email": "john@example.com",
    "role": "ADMIN",
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "isOrganizationConfigured": false,
    "organization": null
  }
}
```

### 3. Verify Token

**Endpoint:** `GET /auth/verify`

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "message": "User is logged in",
  "data": {
    "name": "John Doe",
    "email": "john@example.com",
    "role": "ADMIN",
    "organization": {
      "_id": "64a1b2c3d4e5f6g7h8i9j0k1",
      "name": "ABC School",
      "code": "ABC_1234"
    },
    "isOrganizationConfigured": true
  }
}
```

### 4. Logout

**Endpoint:** `POST /auth/logout`

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "message": "Logged out successfully",
  "data": {}
}
```

---

## 🏢 Organization Endpoints

### 1. Create Organization

**Endpoint:** `POST /organizations`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "name": "ABC International School",
  "address": {
    "street": "123 Main Street",
    "city": "Mumbai",
    "state": "Maharashtra",
    "postalCode": "400001",
    "country": "IND"
  },
  "contactEmail": "contact@abcschool.com",
  "contactPhone": "9876543210",
  "principalName": "Dr. Jane Smith",
  "establishedYear": 1995,
  "website": "https://abcschool.com"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Organization created successfully",
  "data": {
    "_id": "64a1b2c3d4e5f6g7h8i9j0k1",
    "name": "ABC International School",
    "code": "ABC_1234",
    "address": { ... },
    "contactEmail": "contact@abcschool.com",
    "contactPhone": "9876543210",
    "principalName": "Dr. Jane Smith",
    "establishedYear": 1995,
    "website": "https://abcschool.com",
    "isActive": true,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

### 2. Get All Organizations

**Endpoint:** `GET /organizations?page=1&limit=10`

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "message": "Organizations fetched successfully",
  "data": {
    "organizations": [ ... ],
    "meta": {
      "total": 25,
      "page": 1,
      "limit": 10,
      "totalPages": 3
    }
  }
}
```

### 3. Get Organization Details

**Endpoint:** `GET /organizations/:id`

**Headers:** `Authorization: Bearer <token>`

---

## 👨‍🎓 Student Endpoints

### 1. Add Student

**Endpoint:** `POST /students`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "organization": "64a1b2c3d4e5f6g7h8i9j0k1",
  "name": "Rahul Kumar",
  "studentId": "STU2024001",
  "class": "5",
  "section": "A",
  "rollNumber": 15,
  "gender": "MALE",
  "dateOfBirth": "2012-05-15",
  "guardianName": "Mr. Kumar",
  "guardianContact": "9876543210",
  "contactNumber": "9876543210",
  "email": "rahul@example.com",
  "address": {
    "street": "456 Park Lane",
    "city": "Delhi",
    "state": "Delhi",
    "postalCode": "110001"
  }
}
```

**Response:**
```json
{
  "success": true,
  "message": "Student registered successfully",
  "data": { ... }
}
```

### 2. Bulk Add Students

**Endpoint:** `POST /students/bulk`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "organization": "64a1b2c3d4e5f6g7h8i9j0k1",
  "students": [
    {
      "name": "Student 1",
      "studentId": "STU2024001",
      "class": "5",
      "section": "A"
    },
    {
      "name": "Student 2",
      "studentId": "STU2024002",
      "class": "5",
      "section": "A"
    }
  ]
}
```

### 3. Get Students

**Endpoint:** `GET /students/organization/:organizationId?page=1&limit=10&class=5&section=A&query=rahul`

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `class` (optional): Filter by class
- `section` (optional): Filter by section
- `query` (optional): Search by name or studentId

**Response:**
```json
{
  "success": true,
  "message": "Students fetched successfully",
  "data": {
    "students": [ ... ],
    "pagination": {
      "total": 150,
      "page": 1,
      "limit": 10,
      "totalPages": 15,
      "hasNextPage": true,
      "hasPrevPage": false
    }
  }
}
```

### 4. Search Students

**Endpoint:** `GET /students/search/:query`

**Headers:** `Authorization: Bearer <token>`

**Example:** `GET /students/search/rahul`

### 5. Promote Students

**Endpoint:** `POST /students/promote`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "studentIds": [
    "64a1b2c3d4e5f6g7h8i9j0k1",
    "64a1b2c3d4e5f6g7h8i9j0k2"
  ],
  "toClass": "6",
  "toSection": "A"
}
```

### 6. Update Student

**Endpoint:** `PATCH /students/:id`

**Headers:** `Authorization: Bearer <token>`

### 7. Delete Student

**Endpoint:** `DELETE /students/:id`

**Headers:** `Authorization: Bearer <token>`

---

## 👨‍💼 Employee Endpoints

### 1. Add Employee

**Endpoint:** `POST /employees`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "firstName": "Priya",
  "lastName": "Sharma",
  "email": "priya@school.com",
  "phone": "9876543210",
  "dob": "1985-03-20",
  "gender": "FEMALE",
  "role": "TEACHER",
  "department": "MATH",
  "joiningDate": "2020-06-01",
  "employeeId": "EMP001",
  "address": {
    "street": "789 School Road",
    "city": "Mumbai",
    "state": "Maharashtra",
    "country": "INDIA",
    "zipCode": "400001"
  },
  "bank": {
    "accountHolderName": "Priya Sharma",
    "accountNumber": "1234567890",
    "ifscCode": "HDFC0001234",
    "bankName": "HDFC Bank"
  }
}
```

### 2. Get All Employees

**Endpoint:** `GET /employees?page=1&limit=10`

**Headers:** `Authorization: Bearer <token>`

### 3. Update Employee

**Endpoint:** `PATCH /employees/:employeeId`

**Headers:** `Authorization: Bearer <token>`

### 4. Delete Employee

**Endpoint:** `DELETE /employees/:employeeId`

**Headers:** `Authorization: Bearer <token>`

---

## 📚 Class Endpoints

### 1. Create Class

**Endpoint:** `POST /classes`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "name": "5",
  "section": "A",
  "classTeacher": "64a1b2c3d4e5f6g7h8i9j0k1",
  "subjects": [
    "64a1b2c3d4e5f6g7h8i9j0k2",
    "64a1b2c3d4e5f6g7h8i9j0k3"
  ],
  "tuitionFee": 5000,
  "capacity": 40,
  "academicYear": "2024-2025"
}
```

### 2. Get All Classes

**Endpoint:** `GET /classes?academicYear=2024-2025`

**Headers:** `Authorization: Bearer <token>`

---

## 📖 Subject Endpoints

### 1. Create Subject

**Endpoint:** `POST /subjects`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "name": "Mathematics",
  "code": "MATH101",
  "description": "Basic Mathematics",
  "teacher": "64a1b2c3d4e5f6g7h8i9j0k1",
  "classes": ["64a1b2c3d4e5f6g7h8i9j0k2"],
  "category": "MATHEMATICS"
}
```

---

## 💰 Fee Endpoints

### 1. Create Fee

**Endpoint:** `POST /fees`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "student": "64a1b2c3d4e5f6g7h8i9j0k1",
  "academicYear": "2024-2025",
  "month": "January",
  "feeType": "TUITION",
  "amount": 5000,
  "dueDate": "2024-01-10",
  "remarks": "Monthly tuition fee"
}
```

### 2. Pay Fee

**Endpoint:** `PATCH /fees/:id/pay`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "amountPaid": 5000,
  "paymentMethod": "UPI",
  "transactionId": "TXN123456789",
  "paidDate": "2024-01-08"
}
```

---

## 💵 Salary Endpoints

### 1. Generate Salary

**Endpoint:** `POST /salaries`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "employee": "64a1b2c3d4e5f6g7h8i9j0k1",
  "month": "January",
  "year": 2024,
  "basicSalary": 50000,
  "allowances": {
    "hra": 10000,
    "da": 5000,
    "ta": 2000,
    "medical": 1000
  },
  "deductions": {
    "pf": 6000,
    "tax": 5000
  },
  "workingDays": 26,
  "presentDays": 24
}
```

### 2. Pay Salary

**Endpoint:** `PATCH /salaries/:id/pay`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "paymentMethod": "BANK_TRANSFER",
  "transactionId": "SAL123456789",
  "paymentDate": "2024-01-31"
}
```

---

## 📊 Attendance Endpoints

### 1. Mark Attendance

**Endpoint:** `POST /attendance`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "attendanceType": "STUDENT",
  "student": "64a1b2c3d4e5f6g7h8i9j0k1",
  "date": "2024-01-15",
  "status": "PRESENT",
  "checkInTime": "08:00",
  "checkOutTime": "14:00",
  "remarks": ""
}
```

### 2. Bulk Mark Attendance

**Endpoint:** `POST /attendance/bulk`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "attendanceType": "STUDENT",
  "attendanceRecords": [
    {
      "student": "64a1b2c3d4e5f6g7h8i9j0k1",
      "date": "2024-01-15",
      "status": "PRESENT"
    },
    {
      "student": "64a1b2c3d4e5f6g7h8i9j0k2",
      "date": "2024-01-15",
      "status": "ABSENT"
    }
  ]
}
```

### 3. Get Attendance

**Endpoint:** `GET /attendance?attendanceType=STUDENT&startDate=2024-01-01&endDate=2024-01-31&studentId=64a1b2c3d4e5f6g7h8i9j0k1`

**Headers:** `Authorization: Bearer <token>`

### 4. Get Attendance Report

**Endpoint:** `GET /attendance/report?attendanceType=STUDENT&month=1&year=2024`

**Headers:** `Authorization: Bearer <token>`

---

## 👤 Profile Endpoints

### 1. Get Profile

**Endpoint:** `GET /profile`

**Headers:** `Authorization: Bearer <token>`

### 2. Update Profile

**Endpoint:** `PATCH /profile`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "name": "John Doe Updated",
  "email": "john.updated@example.com"
}
```

### 3. Change Password

**Endpoint:** `PATCH /profile/change-password`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "currentPassword": "oldPassword123",
  "newPassword": "newPassword456"
}
```

---

## 🏷️ Category Endpoints

### 1. Create Category

**Endpoint:** `POST /categories`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "name": "Extra Curricular",
  "type": "FEE",
  "description": "Fees for extra curricular activities"
}
```

### 2. Get Categories

**Endpoint:** `GET /categories?type=FEE`

**Headers:** `Authorization: Bearer <token>`

---

## ❌ Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "message": "Validation error message",
  "data": {}
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "message": "Unauthorized - No token provided",
  "data": {}
}
```

### 403 Forbidden
```json
{
  "success": false,
  "message": "You are not authorized to perform this action",
  "data": {}
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Resource not found",
  "data": {}
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "message": "Internal server error",
  "data": {}
}
```

---

## 📝 Notes

1. All dates should be in ISO 8601 format
2. All requests with body data should have `Content-Type: application/json`
3. Rate limiting: 100 requests per 15 minutes
4. Auth endpoints: 5 login attempts per 15 minutes
5. All protected routes require valid JWT token
6. Organization isolation ensures multi-tenancy
