# KinderNet - Student Management Portal

A comprehensive student management portal for schools built with React, TypeScript, and Tailwind CSS.

## 📚 Documentation

- **[QUICK-START.md](QUICK-START.md)** - Get started in 5 minutes ⚡
- **[CHECKLIST.md](CHECKLIST.md)** - Setup verification checklist ✅
- **[SETUP.md](SETUP.md)** - Detailed setup instructions 📖
- **[FILE-STRUCTURE.md](FILE-STRUCTURE.md)** - Complete file structure guide 📁
- **[CONTRIBUTING.md](CONTRIBUTING.md)** - Development guidelines 💻
- **[PROJECT-INFO.md](PROJECT-INFO.md)** - Complete project documentation 📋

## ✨ Features

- **Dashboard** - Overview of school statistics and analytics
- **Student Management** - Admission forms, student lists, and promotion functionality
- **Employee Management** - Staff management, login credentials, and employee records
- **Class Management** - Create and manage classes with teacher assignments
- **Attendance System** - Track student and employee attendance with reports
- **Fee Management** - Handle fee collection and payment tracking
- **Salary Management** - Manage employee salary and payments
- **Subjects** - Organize and manage school subjects
- **Certificates** - Generate and manage student certificates
- **Authentication** - Secure login with organization setup

## Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **npm** or **yarn** package manager (comes with Node.js)

## Quick Start (First Time Setup)

1. **Extract the project** to your desired location

2. **Open terminal/command prompt** and navigate to the project folder:
   ```bash
   cd path/to/kindernet-student-portal
   ```

3. **Run the migration script** to organize files into proper structure:
   ```bash
   node migrate-to-src.js
   ```
   This will move all source files to the `/src` directory and remove unnecessary files.

4. **Install dependencies**:
   ```bash
   npm install
   ```
   or if you prefer yarn:
   ```bash
   yarn install
   ```

5. **Start the development server**:
   ```bash
   npm run dev
   ```
   or
   ```bash
   yarn dev
   ```

6. **Open your browser** and navigate to **http://localhost:5173**

7. **(Optional) Delete the migration script** after successful setup:
   ```bash
   rm migrate-to-src.js
   ```
   or on Windows:
   ```bash
   del migrate-to-src.js
   ```

## Running the Project (After Setup)

### Development Mode (with hot reload)

```bash
npm run dev
```
or
```bash
yarn dev
```

The application will start on **http://localhost:5173**

Open your browser and navigate to the URL shown in the terminal.

### Production Build

To create an optimized production build:

```bash
npm run build
```
or
```bash
yarn build
```

The build files will be in the `dist` folder.

### Preview Production Build

To preview the production build locally:

```bash
npm run preview
```
or
```bash
yarn preview
```

## Project Structure

```
kindernet-student-portal/
├── public/                  # Static assets
│   └── favicon.svg         # Application icon
├── src/
│   ├── components/         # React components
│   │   ├── auth/          # Authentication pages
│   │   ├── dashboard/     # Dashboard components
│   │   ├── students/      # Student management
│   │   ├── employees/     # Employee management
│   │   ├── classes/       # Class management
│   │   ├── attendance/    # Attendance tracking
│   │   ├── fees/          # Fee management
│   │   ├── salary/        # Salary management
│   │   ├── subjects/      # Subject management
│   │   ├── certificates/  # Certificate generation
│   │   ├── settings/      # Settings pages
│   │   ├── accounts/      # Accounts management
│   │   ├── layout/        # Header and Sidebar
│   │   ├── common/        # Reusable components
│   │   └── ui/            # UI components library
│   ├── context/           # React Context for state management
│   ├── data/              # Mock data and initial data
│   ├── types/             # TypeScript type definitions
│   ├── styles/            # Global CSS styles
│   ├── App.tsx            # Main App component
│   ├── main.tsx           # Application entry point
│   └── vite-env.d.ts      # Vite type definitions
├── index.html             # HTML entry point
├── package.json           # Dependencies and scripts
├── vite.config.ts         # Vite build configuration
├── tsconfig.json          # TypeScript configuration
├── tsconfig.node.json     # TypeScript config for build tools
├── postcss.config.js      # PostCSS/Tailwind configuration
├── .eslintrc.cjs          # ESLint configuration
├── .gitignore             # Git ignore rules
└── README.md              # This file
```

## Default Login Credentials

The system uses a sign-up flow. To get started:

1. Go to the **Sign Up** page
2. Create a new account
3. Complete the **Organization Setup** form
4. You'll be redirected to the dashboard

## Technologies Used

- **React 18** - UI Framework
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Styling
- **Vite** - Build tool
- **Motion (Framer Motion)** - Animations
- **Recharts** - Charts and analytics
- **Lucide React** - Icons
- **Sonner** - Toast notifications

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Troubleshooting

### Port already in use
If port 5173 is already in use, Vite will automatically use the next available port. Check the terminal output for the correct URL.

### Dependencies installation fails
Try clearing npm cache:
```bash
npm cache clean --force
npm install
```

### Build errors
Make sure you're using Node.js v18 or higher:
```bash
node --version
```

## Support

For issues or questions, please refer to the project documentation or contact the development team.

## License

This project is proprietary and confidential.

---

**Built with ❤️ for educational institutions**