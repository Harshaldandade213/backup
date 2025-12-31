# KinderNet Backend Setup Guide

Step-by-step guide to set up the KinderNet backend API.

## 📋 Prerequisites Checklist

Before starting, ensure you have:

- ✅ Node.js (v18.0.0 or higher) - [Download](https://nodejs.org/)
- ✅ npm (v9.0.0 or higher) - Comes with Node.js
- ✅ MongoDB - Choose one:
  - **Local MongoDB** - [Download](https://www.mongodb.com/try/download/community)
  - **MongoDB Atlas (Cloud)** - [Sign up free](https://www.mongodb.com/cloud/atlas)
- ✅ Code editor (VS Code recommended)
- ✅ Terminal/Command Prompt

---

## 🚀 Installation Steps

### Step 1: Navigate to Server Directory

```bash
cd server
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install all required packages:
- express
- mongoose
- jsonwebtoken
- bcryptjs
- cors
- helmet
- and more...

**Expected output:**
```
added 150 packages in 30s
```

### Step 3: Setup Environment Variables

Create a `.env` file:

```bash
# On Mac/Linux
cp .env.example .env

# On Windows (PowerShell)
copy .env.example .env

# On Windows (CMD)
copy .env.example .env
```

### Step 4: Configure Environment Variables

Open `.env` file and update the following:

#### 🔧 Required Configuration

```env
# Server Configuration
NODE_ENV=development
PORT=5000

# Database Configuration - CHOOSE ONE:

# Option A: Local MongoDB
MONGO_URI=mongodb://localhost:27017/kindernet

# Option B: MongoDB Atlas (Cloud)
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/kindernet?retryWrites=true&w=majority

# JWT Configuration - IMPORTANT: Change in production
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_123456789
JWT_EXPIRE=3d
JWT_REFRESH_EXPIRE=7d

# Frontend URL (for CORS)
CLIENT_URL=http://localhost:5173
```

---

## 🗄️ MongoDB Setup

### Option A: Local MongoDB

#### 1. Install MongoDB

**Windows:**
- Download from [MongoDB Download Center](https://www.mongodb.com/try/download/community)
- Run installer and follow instructions
- MongoDB will start automatically as a service

**Mac (using Homebrew):**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Linux (Ubuntu):**
```bash
sudo apt-get install mongodb
sudo systemctl start mongodb
```

#### 2. Verify MongoDB is Running

```bash
# Check if MongoDB is running
mongosh

# You should see MongoDB shell
# Exit with: exit
```

#### 3. Use Local Connection String

```env
MONGO_URI=mongodb://localhost:27017/kindernet
```

### Option B: MongoDB Atlas (Cloud) - Recommended for Beginners

#### 1. Create Free Account
- Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Click "Try Free"
- Sign up with email

#### 2. Create Cluster
- Choose "Free Shared" tier
- Select closest region
- Click "Create Cluster" (takes 3-5 minutes)

#### 3. Create Database User
- Go to "Database Access"
- Click "Add New Database User"
- Choose "Password" authentication
- Username: `kindernet-admin`
- Password: Generate secure password
- User Privileges: "Read and write to any database"
- Click "Add User"

#### 4. Whitelist IP Address
- Go to "Network Access"
- Click "Add IP Address"
- Click "Allow Access from Anywhere" (for development)
- Click "Confirm"

#### 5. Get Connection String
- Go to "Database" → "Connect"
- Choose "Connect your application"
- Copy connection string
- Replace `<password>` with your password
- Replace `<dbname>` with `kindernet`

Example:
```env
MONGO_URI=mongodb+srv://kindernet-admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/kindernet?retryWrites=true&w=majority
```

---

## 🔑 JWT Secret Setup

### Generate Secure JWT Secret

#### Option 1: Use Node.js (Recommended)
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

#### Option 2: Use OpenSSL
```bash
openssl rand -hex 64
```

#### Option 3: Online Generator
- Visit: https://randomkeygen.com/
- Copy "Fort Knox Password"

**Update .env:**
```env
JWT_SECRET=your_generated_secret_here
```

⚠️ **Important:** Never commit `.env` file to Git!

---

## ▶️ Start the Server

### Development Mode (with auto-reload)

```bash
npm run dev
```

**Expected output:**
```
🚀 KinderNet API is live on port 5000
📝 Environment: development
🌐 Client URL: http://localhost:5173
✅ MongoDB Connected: cluster0.xxxxx.mongodb.net
📦 Database: KINDERNET
🔗 Mongoose connected to MongoDB
```

### Production Mode

```bash
npm start
```

---

## ✅ Verify Installation

### 1. Health Check

Open browser or use curl:

```bash
curl http://localhost:5000/health
```

**Expected response:**
```json
{
  "success": true,
  "message": "KinderNet API is running",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### 2. Test API with Postman or Thunder Client

#### Test Registration Endpoint

**POST** `http://localhost:5000/api/v1/auth/sign-up`

**Body (JSON):**
```json
{
  "name": "Test Admin",
  "email": "admin@test.com",
  "password": "password123"
}
```

**Expected Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "name": "Test Admin",
    "email": "admin@test.com",
    "role": "ADMIN",
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

## 🛠️ Troubleshooting

### Problem 1: "Cannot find module"

**Solution:**
```bash
rm -rf node_modules
npm install
```

### Problem 2: "MongoDB connection failed"

**Check:**
1. MongoDB is running (local) or credentials are correct (Atlas)
2. IP is whitelisted (Atlas)
3. Connection string is correct in `.env`

**Solution:**
```bash
# For local MongoDB
sudo systemctl start mongodb  # Linux
brew services start mongodb-community  # Mac

# For Atlas, verify:
- Username and password
- Database name
- IP whitelist
```

### Problem 3: Port already in use

**Solution:**
```bash
# Find process using port 5000
# Mac/Linux:
lsof -i :5000
kill -9 <PID>

# Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Or change port in .env
PORT=5001
```

### Problem 4: "JWT malformed" or "Invalid token"

**Check:**
1. JWT_SECRET is set in `.env`
2. Token is passed correctly in Authorization header
3. Token format: `Bearer <token>`

### Problem 5: CORS Error

**Solution:**
Update `CLIENT_URL` in `.env`:
```env
CLIENT_URL=http://localhost:5173
```

---

## 📊 Database Verification

### View MongoDB Data

#### Using MongoDB Compass (GUI)
1. Download [MongoDB Compass](https://www.mongodb.com/products/compass)
2. Connect using your connection string
3. Browse databases and collections

#### Using MongoDB Shell
```bash
mongosh

# List databases
show dbs

# Switch to kindernet database
use KINDERNET

# List collections
show collections

# View users
db.users.find().pretty()

# View organizations
db.organizations.find().pretty()
```

---

## 🔄 Update/Restart Server

### Stop Server
Press `Ctrl + C` in terminal

### Restart Server
```bash
npm run dev
```

---

## 📝 Next Steps

1. ✅ Backend is running
2. ✅ Database is connected
3. ✅ Test registration works

**Now you can:**
- Start the frontend application
- Test all API endpoints
- Create your first organization
- Add students and employees

---

## 🔗 Useful Links

- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [JWT.io](https://jwt.io/)

---

## 🆘 Need Help?

If you encounter issues:

1. Check error messages in terminal
2. Verify all environment variables are set
3. Check MongoDB connection
4. Review logs for details
5. Ensure all prerequisites are installed

---

**Your backend is now ready! 🎉**
