# 🔧 KINDERNET API - TROUBLESHOOTING GUIDE

## 🎯 Your Current Error: Create Class 400 Bad Request

### ❌ **Error Message:**
```json
{
  "success": false,
  "message": "Name, section, and academic year are required",
  "data": {}
}
```

### ✅ **Solution:**

You're missing the **`academicYear`** field!

**WRONG Request:**
```json
{
  "name": "Grade 1",
  "section": "A",
  "capacity": 30
}
```

**CORRECT Request:**
```json
{
  "name": "Grade 1",
  "section": "A",
  "academicYear": "2024-2025",  ← ADD THIS!
  "capacity": 30
}
```

---

## 📋 **Complete Create Class Request:**

### **Postman Setup:**

**1. Method & URL:**
```
POST http://localhost:5000/api/v1/classes
```

**2. Headers Tab:**
```
Authorization: Bearer YOUR_ACCESS_TOKEN_HERE
Content-Type: application/json
```

**3. Body Tab:**
- Select **raw**
- Select **JSON** from dropdown
- Paste this:

```json
{
  "name": "Grade 1",
  "section": "A",
  "academicYear": "2024-2025",
  "capacity": 30
}
```

**4. Click Send**

---

## ✅ **Expected Success Response:**

```json
{
  "success": true,
  "message": "Class created successfully",
  "data": {
    "_id": "676456789abcdef12345678",
    "organization": "org_id_here",
    "name": "Grade 1",
    "section": "A",
    "academicYear": "2024-2025",
    "capacity": 30,
    "createdAt": "2025-12-19T10:30:00.000Z",
    "updatedAt": "2025-12-19T10:30:00.000Z"
  }
}
```

---

## 🔍 **Field Requirements Breakdown:**

### **Create Class Endpoint:**

| Field | Required? | Type | Example | Notes |
|-------|-----------|------|---------|-------|
| `name` | ✅ YES | String | "Grade 1" | Class/grade name |
| `section` | ✅ YES | String | "A" | Section letter |
| `academicYear` | ✅ YES | String | "2024-2025" | **Must be in YYYY-YYYY format** |
| `capacity` | ❌ Optional | Number | 30 | Max students allowed |
| `tuitionFee` | ❌ Optional | Number | 15000 | Monthly fee |
| `classTeacher` | ❌ Optional | String | "employee_id" | Employee ID |
| `subjects` | ❌ Optional | Array | ["sub1", "sub2"] | Subject IDs |

---

## 🚨 **Common Errors & Solutions:**

### **Error 1: "Name, section, and academic year are required"**

**Cause:** Missing `academicYear` field

**Solution:**
```json
{
  "name": "Grade 1",
  "section": "A",
  "academicYear": "2024-2025"  ← Add this!
}
```

---

### **Error 2: "Unauthorized" (401)**

**Cause:** Missing or invalid Authorization token

**Solution:**
1. Make sure you're logged in
2. Copy the `accessToken` from login response
3. Add to Headers:
   ```
   Authorization: Bearer YOUR_TOKEN_HERE
   ```

**Check:**
- Token should start with `eyJ...`
- No extra spaces before/after token
- Word "Bearer" followed by ONE space

---

### **Error 3: "Class Grade 1-A already exists"**

**Cause:** You're trying to create a duplicate class

**Solution:**
- Use a different section (e.g., "B" instead of "A")
- Or use a different name (e.g., "Grade 2")

---

### **Error 4: "Cannot POST /api/v1/class"**

**Cause:** Wrong endpoint URL (missing 'es')

**Correct URL:**
```
http://localhost:5000/api/v1/classes  ← Note the 'es'
```

**Wrong URLs:**
```
❌ /api/v1/class     (missing 'es')
❌ /api/classes      (missing version)
❌ /classes          (missing /api/v1)
```

---

### **Error 5: POST /health 404**

**Cause:** Wrong HTTP method

**Solution:**
```
GET http://localhost:5000/health  ← Use GET, not POST!
```

---

### **Error 6: "Cannot connect to server"**

**Cause:** Server not running

**Solution:**
```bash
cd server
npm run dev
```

**Expected output:**
```
🚀 KinderNet API is live on port 5000
```

---

### **Error 7: "MongoDB connection failed"**

**Cause:** MongoDB not running or wrong connection string

**Solution:**

**Option A: Local MongoDB**
1. Start MongoDB:
   ```bash
   mongod
   ```
2. Check `.env`:
   ```
   MONGO_URI=mongodb://localhost:27017/kindernet
   ```

**Option B: MongoDB Atlas (Cloud)**
1. Update `.env`:
   ```
   MONGO_URI=mongodb+srv://username:password@cluster.xxxxx.mongodb.net/kindernet
   ```

---

## 📸 **Postman Visual Checklist:**

### **✅ Correct Setup:**

```
┌────────────────────────────────────────────────────────┐
│ Method: POST ✅                                        │
│ URL: http://localhost:5000/api/v1/classes ✅          │
├────────────────────────────────────────────────────────┤
│ HEADERS TAB:                                           │
│   Authorization: Bearer eyJhbGc... ✅                  │
│   Content-Type: application/json ✅                    │
├────────────────────────────────────────────────────────┤
│ BODY TAB:                                              │
│   ○ none                                               │
│   ○ form-data                                          │
│   ○ x-www-form-urlencoded                              │
│   ● raw  [JSON ▼] ✅                                   │
│                                                        │
│   {                                                    │
│     "name": "Grade 1", ✅                              │
│     "section": "A", ✅                                 │
│     "academicYear": "2024-2025", ✅ DON'T FORGET!      │
│     "capacity": 30                                     │
│   }                                                    │
└────────────────────────────────────────────────────────┘
```

---

## 🔥 **Step-by-Step: First Time Setup:**

### **Step 1: Start Server ✅**
```bash
# Terminal 1
cd server
npm install
npm run dev
```

**Expected:**
```
✅ MongoDB connected successfully
🚀 KinderNet API is live on port 5000
```

---

### **Step 2: Health Check ✅**
```
GET http://localhost:5000/health
```

**Expected:**
```json
{
  "success": true,
  "message": "KinderNet API is running"
}
```

---

### **Step 3: Register Admin ✅**
```
POST http://localhost:5000/api/v1/auth/sign-up

Headers:
Content-Type: application/json

Body:
{
  "name": "Admin User",
  "email": "admin@test.com",
  "password": "Test@123"
}
```

**Expected:**
```json
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGci..."
  }
}
```

**➡️ COPY THE TOKEN!**

---

### **Step 4: Create Class ✅**
```
POST http://localhost:5000/api/v1/classes

Headers:
Authorization: Bearer YOUR_TOKEN_FROM_STEP_3
Content-Type: application/json

Body:
{
  "name": "Grade 1",
  "section": "A",
  "academicYear": "2024-2025",
  "capacity": 30
}
```

**Expected:**
```json
{
  "success": true,
  "message": "Class created successfully",
  "data": {
    "_id": "676456789abcdef12345678",
    "name": "Grade 1"
  }
}
```

**➡️ COPY THE CLASS ID!**

---

### **Step 5: Add Student ✅**
```
POST http://localhost:5000/api/v1/students

Headers:
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json

Body:
{
  "studentId": "STU001",
  "firstName": "Test",
  "lastName": "Student",
  "class": "CLASS_ID_FROM_STEP_4",
  "dateOfBirth": "2015-01-01",
  "gender": "MALE"
}
```

---

## 🎯 **Quick Reference: All Required Fields:**

### **Authentication:**
| Endpoint | Required Fields |
|----------|----------------|
| Sign Up | `name`, `email`, `password` |
| Sign In | `email`, `password` |

### **Classes:**
| Endpoint | Required Fields |
|----------|----------------|
| Create | `name`, `section`, `academicYear` ✅ |

### **Students:**
| Endpoint | Required Fields |
|----------|----------------|
| Create | `studentId`, `firstName`, `lastName`, `class`, `dateOfBirth`, `gender` |

### **Employees:**
| Endpoint | Required Fields |
|----------|----------------|
| Create | `employeeId`, `firstName`, `lastName`, `email`, `phone`, `designation` |

---

## 🔧 **Debug Checklist:**

Before asking for help, check:

- [ ] Server is running (`npm run dev`)
- [ ] MongoDB is connected (check server logs)
- [ ] Using correct HTTP method (GET/POST/PATCH/DELETE)
- [ ] URL is correct (`/api/v1/classes` not `/api/v1/class`)
- [ ] Authorization header is set (for protected routes)
- [ ] Content-Type is `application/json`
- [ ] Body is valid JSON
- [ ] All required fields are present
- [ ] Field names use camelCase (`academicYear` not `academic_year`)
- [ ] Token is fresh (login again if expired)

---

## 📞 **Still Having Issues?**

### **Check Server Logs:**
Look at your terminal where `npm run dev` is running. You'll see detailed error messages.

### **Common Log Messages:**

**✅ Good:**
```
✅ MongoDB connected successfully
🚀 KinderNet API is live on port 5000
POST /api/v1/classes 201 45.123 ms - 234
```

**❌ Bad:**
```
❌ MongoDB connection failed
POST /api/v1/classes 400 12.345 ms - 89
```

---

## 💡 **Pro Tips:**

1. **Use Postman Collection:**
   - Import `/server/KinderNet_Postman_Collection.json`
   - All requests pre-configured!

2. **Save Environment Variables:**
   - Create `access_token` variable in Postman
   - Auto-update after login

3. **Check Response Tab:**
   - Look at Status Code (200, 400, 401, etc.)
   - Read error messages carefully

4. **Test in Order:**
   - Health → Register → Login → Create Class → Add Student

---

## 📚 **More Help:**

- [Postman Testing Guide](./POSTMAN_TESTING_GUIDE.md)
- [Quick API Reference](./QUICK_API_REFERENCE.md)
- [Server README](./README.md)

---

**✨ Your Next Step:**

Try creating the class again with the correct body:

```json
{
  "name": "Grade 1",
  "section": "A",
  "academicYear": "2024-2025",
  "capacity": 30
}
```

**It should work now! 🎉**
