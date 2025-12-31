# 📚 KINDERNET API - TESTING DOCUMENTATION INDEX

**All testing resources in one place!**

---

## 🚨 **FIXING YOUR CURRENT ERROR (START HERE!)** 

### Your Error: "Name, section, and academic year are required"

**📄 [SOLUTION_FOR_YOUR_ERROR.md](./SOLUTION_FOR_YOUR_ERROR.md)**
- ✅ Exact fix for your 400 error
- ✅ Copy-paste solution
- ✅ Visual guide
- ⏱️ **2 minutes to fix**

**TL;DR:** Add `"academicYear": "2024-2025"` to your request body!

---

## 📖 **DOCUMENTATION FILES:**

### 1️⃣ **Quick Start (Fastest)**
**📄 [TEST_EXAMPLES.md](./TEST_EXAMPLES.md)**
- ✅ Copy-paste examples for every endpoint
- ✅ Ready-to-use request bodies
- ✅ No explanation, just working code
- ⏱️ **5 minutes to test everything**

---

### 2️⃣ **Quick Reference (Cheat Sheet)**
**📄 [QUICK_API_REFERENCE.md](./QUICK_API_REFERENCE.md)**
- ✅ All endpoints in one page
- ✅ Sample request bodies
- ✅ Field requirements
- ⏱️ **Quick lookup**

---

### 3️⃣ **Complete Guide (Detailed)**
**📄 [POSTMAN_TESTING_GUIDE.md](./POSTMAN_TESTING_GUIDE.md)**
- ✅ Step-by-step instructions
- ✅ Request/response examples
- ✅ Authorization setup
- ✅ 50+ API examples
- ⏱️ **Complete reference**

---

### 4️⃣ **Troubleshooting (When Stuck)**
**📄 [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)**
- ✅ Common errors & solutions
- ✅ Debug checklist
- ✅ Visual guides
- ⏱️ **Problem solving**

---

### 5️⃣ **Postman Collection (Import)**
**📄 [KinderNet_Postman_Collection.json](./KinderNet_Postman_Collection.json)**
- ✅ Import to Postman
- ✅ All requests pre-configured
- ✅ Auto-save tokens
- ⏱️ **30 seconds setup**

**How to use:**
1. Open Postman
2. Click **Import**
3. Select this file
4. Done! All requests ready

---

## 🎯 **QUICK START GUIDE:**

### **Step 1: Start Server**
```bash
cd server
npm install
npm run dev
```

Expected:
```
🚀 KinderNet API is live on port 5000
✅ MongoDB connected successfully
```

---

### **Step 2: Test Health**
```
GET http://localhost:5000/health
```

Expected: `200 OK` ✅

---

### **Step 3: Register/Login**
```
POST http://localhost:5000/api/v1/auth/sign-in

Body:
{
  "email": "admin@kindernet.com",
  "password": "Admin@123456"
}
```

**➡️ Copy the `accessToken`!**

---

### **Step 4: Create Class (YOUR CURRENT ISSUE)**
```
POST http://localhost:5000/api/v1/classes

Headers:
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json

Body:
{
  "name": "Grade 1",
  "section": "A",
  "academicYear": "2024-2025",  ← DON'T FORGET THIS!
  "capacity": 30
}
```

**➡️ Copy the class `_id`!**

---

### **Step 5: Add Student**
```
POST http://localhost:5000/api/v1/students

Headers:
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json

Body:
{
  "studentId": "STU001",
  "firstName": "Ahmed",
  "lastName": "Ali",
  "class": "CLASS_ID_FROM_STEP_4",
  "dateOfBirth": "2015-01-01",
  "gender": "MALE"
}
```

✅ **Done! Your first student created!**

---

## 📊 **ALL AVAILABLE ENDPOINTS:**

### **Authentication (No Auth Required):**
- `POST /api/v1/auth/sign-up` - Register
- `POST /api/v1/auth/sign-in` - Login
- `GET /api/v1/auth/verify` - Verify token
- `POST /api/v1/auth/logout` - Logout

### **Classes (Auth Required):**
- `POST /api/v1/classes` - Create class
- `GET /api/v1/classes` - Get all classes
- `GET /api/v1/classes/:id` - Get class details
- `PATCH /api/v1/classes/:id` - Update class
- `DELETE /api/v1/classes/:id` - Delete class

### **Students (Auth Required):**
- `POST /api/v1/students` - Add student
- `POST /api/v1/students/bulk` - Add multiple students
- `POST /api/v1/students/promote` - Promote students
- `GET /api/v1/students/organization/:orgId` - Get all students
- `GET /api/v1/students/:id` - Get student details
- `GET /api/v1/students/search/:query` - Search student
- `PATCH /api/v1/students/:id` - Update student
- `DELETE /api/v1/students/:id` - Delete student

### **Employees (Auth Required):**
- `POST /api/v1/employees` - Create employee
- `GET /api/v1/employees` - Get all employees
- `GET /api/v1/employees/:id` - Get employee details
- `PATCH /api/v1/employees/:id` - Update employee
- `DELETE /api/v1/employees/:id` - Delete employee

### **Subjects (Auth Required):**
- `POST /api/v1/subjects` - Create subject
- `GET /api/v1/subjects` - Get all subjects
- `PATCH /api/v1/subjects/:id` - Update subject
- `DELETE /api/v1/subjects/:id` - Delete subject

### **Fees (Auth Required):**
- `POST /api/v1/fees` - Record fee payment
- `GET /api/v1/fees/student/:studentId` - Get student fees
- `GET /api/v1/fees/organization/summary` - Get fee summary

### **Attendance (Auth Required):**
- `POST /api/v1/attendance` - Mark attendance
- `GET /api/v1/attendance/class/:classId` - Get class attendance
- `GET /api/v1/attendance/student/:studentId` - Get student attendance

**Total: 30+ Endpoints** ✅

---

## 🔑 **Important Notes:**

### **Authorization Header:**
All protected endpoints require:
```
Authorization: Bearer YOUR_ACCESS_TOKEN
```

### **Date Format:**
Always use: `YYYY-MM-DD`
```
✅ "2024-12-19"
❌ "19/12/2024"
```

### **Academic Year Format:**
Always use: `YYYY-YYYY`
```
✅ "2024-2025"
❌ "2024"
```

### **Field Names:**
Use **camelCase**:
```
✅ academicYear
❌ academic_year
```

---

## 🎯 **Which File Should I Use?**

| Situation | Use This File | Time |
|-----------|---------------|------|
| **I have an error right now!** | [SOLUTION_FOR_YOUR_ERROR.md](./SOLUTION_FOR_YOUR_ERROR.md) | 2 min |
| **Just give me working examples** | [TEST_EXAMPLES.md](./TEST_EXAMPLES.md) | 5 min |
| **Quick lookup for an endpoint** | [QUICK_API_REFERENCE.md](./QUICK_API_REFERENCE.md) | 1 min |
| **I want to learn everything** | [POSTMAN_TESTING_GUIDE.md](./POSTMAN_TESTING_GUIDE.md) | 30 min |
| **Something is not working** | [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) | 10 min |
| **Setup Postman quickly** | [KinderNet_Postman_Collection.json](./KinderNet_Postman_Collection.json) | 30 sec |

---

## ✅ **Testing Checklist:**

Before you start:
- [ ] Server is running (`npm run dev`)
- [ ] MongoDB is connected
- [ ] Port 5000 is available
- [ ] Postman is installed

After each step:
- [ ] Health check works
- [ ] Can register/login
- [ ] Can create class
- [ ] Can add student
- [ ] Can fetch data

---

## 📞 **Need Help?**

### **Check Server Logs:**
Look at terminal where `npm run dev` is running for error details.

### **Common Issues:**

| Error | Solution File |
|-------|---------------|
| 400 Bad Request | [SOLUTION_FOR_YOUR_ERROR.md](./SOLUTION_FOR_YOUR_ERROR.md) |
| 401 Unauthorized | [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) |
| 404 Not Found | [QUICK_API_REFERENCE.md](./QUICK_API_REFERENCE.md) |
| MongoDB Connection | [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) |
| Missing Fields | [TEST_EXAMPLES.md](./TEST_EXAMPLES.md) |

---

## 📁 **File Structure:**

```
/server/
├── README_TESTING.md                    ← YOU ARE HERE! (Index)
├── SOLUTION_FOR_YOUR_ERROR.md          ← Fix your current error
├── TEST_EXAMPLES.md                    ← Copy-paste examples
├── QUICK_API_REFERENCE.md              ← Quick lookup
├── POSTMAN_TESTING_GUIDE.md            ← Complete guide
├── TROUBLESHOOTING.md                  ← Debug help
├── KinderNet_Postman_Collection.json   ← Import to Postman
├── .env                                ← Environment config
├── package.json                        ← Dependencies
└── src/
    ├── server.js                       ← Main entry
    ├── routes/                         ← API routes
    ├── controllers/                    ← Logic
    └── models/                         ← Database schemas
```

---

## 🚀 **Your Next Steps:**

### **Right Now (2 minutes):**
1. Open [SOLUTION_FOR_YOUR_ERROR.md](./SOLUTION_FOR_YOUR_ERROR.md)
2. Add `"academicYear": "2024-2025"` to your request
3. Send the request again
4. ✅ Should work!

### **After That (5 minutes):**
1. Open [TEST_EXAMPLES.md](./TEST_EXAMPLES.md)
2. Test creating students, employees, etc.
3. Build your database!

### **For Future Reference:**
1. Import [KinderNet_Postman_Collection.json](./KinderNet_Postman_Collection.json)
2. Bookmark [QUICK_API_REFERENCE.md](./QUICK_API_REFERENCE.md)
3. Keep [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) handy

---

## 🎉 **Summary:**

```
✅ 6 Documentation files created
✅ 1 Postman collection ready
✅ 30+ API endpoints documented
✅ 100+ code examples
✅ Complete testing workflow
✅ Your error solution included
```

---

**Start with [SOLUTION_FOR_YOUR_ERROR.md](./SOLUTION_FOR_YOUR_ERROR.md) to fix your current issue! 🚀**

---

## 📚 **Additional Resources:**

- [Server README](./README.md) - General server info
- [API Documentation](./API_DOCUMENTATION.md) - API specs
- [Quick Start Guide](./QUICK_START.md) - Setup guide
- [Setup Guide](./SETUP_GUIDE.md) - Detailed setup

---

**✨ Happy Testing!**
