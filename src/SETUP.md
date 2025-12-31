# KinderNet Setup Guide

This guide will help you set up and run the KinderNet Student Management Portal on your local machine.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [First-Time Setup](#first-time-setup)
3. [File Structure Migration](#file-structure-migration)
4. [Running the Application](#running-the-application)
5. [Common Issues](#common-issues)

## Prerequisites

### Required Software

1. **Node.js (v18 or higher)**
   - Download from: https://nodejs.org/
   - Verify installation: `node --version`
   - Should show v18.0.0 or higher

2. **npm (comes with Node.js)**
   - Verify installation: `npm --version`
   - Should show 9.0.0 or higher

### Optional but Recommended

- **Visual Studio Code** - https://code.visualstudio.com/
- **Git** - https://git-scm.com/downloads

## First-Time Setup

### Step 1: Extract Project

Extract the project folder to your desired location, for example:
- Windows: `C:\Projects\kindernet-student-portal`
- Mac/Linux: `~/Projects/kindernet-student-portal`

### Step 2: Open Terminal

**Windows:**
- Press `Windows Key + R`
- Type `cmd` or `powershell`
- Press Enter
- Navigate to project: `cd C:\Projects\kindernet-student-portal`

**Mac:**
- Press `Cmd + Space`
- Type `Terminal`
- Press Enter
- Navigate to project: `cd ~/Projects/kindernet-student-portal`

**Linux:**
- Press `Ctrl + Alt + T`
- Navigate to project: `cd ~/Projects/kindernet-student-portal`

### Step 3: Verify Location

Make sure you're in the correct directory:

```bash
# Windows
dir

# Mac/Linux
ls
```

You should see files like `package.json`, `index.html`, `README.md`, etc.

## File Structure Migration

### Automated Migration (Recommended)

Run the migration script to organize all files into the proper `/src` structure:

```bash
node migrate-to-src.js
```

**What this does:**
- ✅ Moves `components/` to `src/components/`
- ✅ Moves `context/` to `src/context/`
- ✅ Moves `data/` to `src/data/`
- ✅ Moves `types/` to `src/types/`
- ✅ Moves `styles/` to `src/styles/`
- ✅ Deletes unnecessary files (Attributions.md, guidelines/)
- ✅ Removes the old `App.tsx` from root

**Expected Output:**
```
🚀 Starting migration to /src structure...

✅ Created /src directory
📁 Moving directories to /src...
  - Moving components/ to src/components/
    ✅ Moved components/
  - Moving context/ to src/context/
    ✅ Moved context/
  - Moving data/ to src/data/
    ✅ Moved data/
  - Moving types/ to src/types/
    ✅ Moved types/
  - Moving styles/ to src/styles/
    ✅ Moved styles/

🗑️  Removing unnecessary files...
  ✅ Deleted Attributions.md
  ✅ Deleted App.tsx
  ✅ Deleted guidelines/

✨ Migration complete!

📋 Next steps:
  1. Run: npm install
  2. Run: npm run dev
  3. Delete this migration script: migrate-to-src.js
```

### Manual Migration (If Automated Fails)

If the automated script doesn't work, you can manually reorganize:

1. Create `src` folder in the project root
2. Move these folders into `src`:
   - `components/`
   - `context/`
   - `data/`
   - `types/`
   - `styles/`
3. Copy `App.tsx` to `src/App.tsx`
4. Delete the old root-level folders and files

## Running the Application

### Step 1: Install Dependencies

```bash
npm install
```

This will download all required packages. It may take a few minutes.

**Expected Output:**
```
added 350 packages, and audited 351 packages in 45s
```

### Step 2: Start Development Server

```bash
npm run dev
```

**Expected Output:**
```
  VITE v5.0.8  ready in 1234 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h to show help
```

### Step 3: Open in Browser

1. Open your web browser (Chrome, Firefox, Safari, or Edge)
2. Go to: **http://localhost:5173**
3. You should see the KinderNet login page

### Step 4: Create Your First Account

1. Click "Sign Up" on the login page
2. Fill in:
   - Full Name
   - Email
   - Password
3. Click "Create Account"
4. Complete the Organization Setup form:
   - School/Organization Name
   - Address, City, State, ZIP
   - Phone, Email
   - Principal Name
   - Established Year
   - Registration Number
5. Click "Complete Setup"
6. You'll be redirected to the dashboard

## Project Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Create production build in `/dist` folder |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Check code for errors |

## Common Issues

### Issue 1: "node is not recognized as a command"

**Problem:** Node.js is not installed or not in PATH

**Solution:**
1. Download and install Node.js from https://nodejs.org/
2. Restart your terminal
3. Verify: `node --version`

### Issue 2: "npm install" fails

**Problem:** Network issues or corrupted cache

**Solution:**
```bash
npm cache clean --force
npm install
```

### Issue 3: Port 5173 already in use

**Problem:** Another application is using port 5173

**Solution:** 
- Vite will automatically use the next available port (5174, 5175, etc.)
- Check the terminal output for the correct URL
- Or manually specify a port: `npm run dev -- --port 3000`

### Issue 4: "Cannot find module" errors

**Problem:** Dependencies not installed or migration not complete

**Solution:**
1. Make sure you ran `node migrate-to-src.js`
2. Delete `node_modules` folder
3. Delete `package-lock.json`
4. Run `npm install` again

### Issue 5: Blank white screen in browser

**Problem:** JavaScript errors or incorrect file paths

**Solution:**
1. Open browser DevTools (F12)
2. Check Console tab for errors
3. Make sure migration completed successfully
4. Try: `npm run build` then `npm run preview`

### Issue 6: Migration script not working

**Problem:** File permissions or path issues

**Solution:**
- **Windows:** Run terminal as Administrator
- **Mac/Linux:** Use `sudo node migrate-to-src.js`
- Or manually move folders as described in Manual Migration section

## Development Tips

### Hot Reload

When you edit any `.tsx`, `.ts`, or `.css` file and save it, the browser will automatically refresh to show your changes. No need to restart the server!

### Stopping the Server

To stop the development server:
- Press `Ctrl + C` in the terminal
- Type `Y` if prompted

### Restarting the Server

If you make changes to config files, you may need to restart:
1. Stop the server (`Ctrl + C`)
2. Start it again (`npm run dev`)

## Next Steps

After successful setup:

1. **Explore the Dashboard** - See overview of school statistics
2. **Add Students** - Go to Students → Admission Form
3. **Create Classes** - Go to Classes and add your first class
4. **Add Employees** - Go to Employees → Add Employee
5. **Configure Settings** - Go to Settings → General Settings

## Production Deployment

To create a production build:

```bash
npm run build
```

The optimized files will be in the `/dist` folder. You can:
- Deploy to a web server
- Host on platforms like Netlify, Vercel, or AWS
- Run locally with: `npm run preview`

## Getting Help

If you encounter issues not covered here:

1. Check the main `README.md` file
2. Review error messages in the terminal
3. Check browser DevTools console (F12)
4. Contact your development team

---

**Last Updated:** December 2024  
**Version:** 1.0.0
