# ⚡ Quick Start Guide - KinderNet Backend

## 🚀 Get Started in 5 Minutes

### Step 1️⃣: Create Your `.env` File

```bash
# Navigate to server folder
cd server

# Copy the example file
cp .env.example .env

# On Windows use:
# copy .env.example .env
```

---

### Step 2️⃣: Choose Your Database

Edit `/server/.env` and choose ONE option:

#### **Option A: MongoDB Atlas (Cloud - Recommended, No Installation)**

1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up for free account
3. Create free cluster (M0)
4. Create database user
5. Get connection string
6. Update `.env`:

```env
MONGO_URI=mongodb+srv://your-username:your-password@cluster0.xxxxx.mongodb.net/kindernet?retryWrites=true&w=majority
```

**✅ Best for: Quick setup, no installation**

#### **Option B: Local MongoDB (Install on Your Computer)**

1. Download MongoDB: https://www.mongodb.com/try/download/community
2. Install and start MongoDB service
3. Keep default in `.env`:

```env
MONGO_URI=mongodb://localhost:27017/kindernet
```

**✅ Best for: Offline development**

---

### Step 3️⃣: Generate Secure JWT Secret

Run this command in terminal:

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

Copy the output and update in `.env`:

```env
JWT_SECRET=paste_your_generated_secret_here
```

---

### Step 4️⃣: Install Dependencies

```bash
npm install
```

---

### Step 5️⃣: Start the Server

```bash
npm run dev
```

**Expected Output:**
```
🚀 KinderNet API is live on port 5000
📝 Environment: development
✅ MongoDB Connected: ...
📦 Database: KINDERNET
```

---

### Step 6️⃣: Test the API

Open browser or use curl:

```bash
curl http://localhost:5000/health
```

**Expected Response:**
```json
{
  "success": true,
  "message": "KinderNet API is running",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

---

## ✅ **Your `.env` File Should Look Like:**

```env
NODE_ENV=development
PORT=5000

# Choose MongoDB Atlas OR Local
MONGO_URI=mongodb://localhost:27017/kindernet

# Your generated secret
JWT_SECRET=a1b2c3d4e5f6...your_64_char_secret

JWT_EXPIRE=3d
JWT_REFRESH_EXPIRE=7d

CLIENT_URL=http://localhost:5173
```

---

## 🔐 **Security Reminders**

- ✅ `.env` is in `.gitignore` (won't be committed to Git)
- ✅ Never share your `.env` file
- ✅ Never commit `.env` to GitHub
- ✅ Generate new JWT_SECRET for production
- ✅ Use strong passwords for MongoDB

---

## ❌ **Common Issues**

### Issue: "Cannot find module"
```bash
# Solution:
npm install
```

### Issue: "MongoDB connection failed"
```bash
# Check:
1. MongoDB is running (local) or credentials correct (Atlas)
2. MONGO_URI is correct in .env
3. IP is whitelisted (Atlas only)
```

### Issue: "Port 5000 already in use"
```bash
# Solution: Change port in .env
PORT=5001
```

---

## 📚 **Next Steps**

1. ✅ Create `.env` file
2. ✅ Choose database (Atlas recommended)
3. ✅ Generate JWT secret
4. ✅ Install dependencies
5. ✅ Start server
6. ✅ Test endpoints
7. 🚀 Connect frontend!

---

## 🆘 **Need Help?**

- **Setup Guide:** See `SETUP_GUIDE.md`
- **API Docs:** See `API_DOCUMENTATION.md`
- **Integration:** See `FRONTEND_INTEGRATION.md`

---

**Ready to build something amazing! 🎉**
