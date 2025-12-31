# KinderNet - Quick Start Guide

Get KinderNet up and running in 5 minutes! ⚡

## Prerequisites Check

✅ Node.js v18+ installed? → Run `node --version`  
✅ npm installed? → Run `npm --version`

❌ Don't have Node.js? → [Download here](https://nodejs.org/)

## Installation (3 Steps)

### 1️⃣ Open Terminal

**Windows**: Press `Win + R`, type `cmd`, press Enter  
**Mac**: Press `Cmd + Space`, type "Terminal", press Enter  
**Linux**: Press `Ctrl + Alt + T`

### 2️⃣ Navigate to Project

```bash
cd path/to/kindernet-student-portal
```

### 3️⃣ Run These Commands

```bash
# Step 1: Organize files into proper structure
node migrate-to-src.js

# Step 2: Install dependencies
npm install

# Step 3: Start the app
npm run dev
```

## Open the App

Once you see:
```
➜  Local:   http://localhost:5173/
```

**Open your browser** and go to: **http://localhost:5173**

## First Time Login

1. Click **"Sign Up"**
2. Enter your details:
   - Full Name
   - Email
   - Password
3. Click **"Create Account"**
4. Fill in **Organization Setup** form:
   - School Name
   - Address
   - Contact Details
   - Principal Name
   - Established Year
5. Click **"Complete Setup"**

🎉 **You're in!** The dashboard will open.

## Common Commands

| What you want to do | Command |
|---------------------|---------|
| Start the app | `npm run dev` |
| Stop the app | Press `Ctrl + C` |
| Create production build | `npm run build` |
| Preview production build | `npm run preview` |

## Quick Troubleshooting

### Problem: "node is not recognized"
**Fix**: Install Node.js from https://nodejs.org/

### Problem: Port already in use
**Fix**: Vite will use next available port automatically. Check terminal for the correct URL.

### Problem: Blank screen
**Fix**: 
1. Press F12 to open DevTools
2. Check Console for errors
3. Try: `npm install` again

### Problem: Changes not showing
**Fix**: Hard refresh browser with `Ctrl + F5` (Windows) or `Cmd + Shift + R` (Mac)

## File Structure (After Migration)

```
kindernet-student-portal/
├── src/                # All source code (after migration)
│   ├── components/     # React components
│   ├── context/        # State management
│   ├── data/           # Mock data
│   ├── types/          # TypeScript types
│   ├── styles/         # CSS files
│   ├── App.tsx         # Main app
│   └── main.tsx        # Entry point
├── public/             # Static files
├── index.html          # HTML template
└── package.json        # Dependencies
```

## What to Do Next

After successful setup:

1. **Explore Dashboard** → See school overview
2. **Add First Student** → Go to Students → Admission
3. **Create Class** → Go to Classes → Add Class
4. **Add Employee** → Go to Employees → Add Employee
5. **Mark Attendance** → Go to Attendance → Students

## Need More Help?

📖 Detailed setup → See `SETUP.md`  
💻 Development guide → See `CONTRIBUTING.md`  
📋 Project info → See `PROJECT-INFO.md`  
📚 General info → See `README.md`

## Stop the Server

To stop the development server:
- Press `Ctrl + C` in the terminal
- Type `Y` if prompted

## Remove Migration Script

After successful setup, you can delete the migration script:

```bash
# Windows
del migrate-to-src.js

# Mac/Linux
rm migrate-to-src.js
```

---

## Still Having Issues?

1. Make sure Node.js v18+ is installed
2. Delete `node_modules` and run `npm install` again
3. Check terminal for error messages
4. Check browser console (F12) for errors

---

**That's it! You're ready to use KinderNet! 🚀**

*Last updated: December 2024*
