# KinderNet Backend API

Professional MongoDB + Express.js backend for the KinderNet Student Management Portal.

## 🚀 Quick Start

### Prerequisites

- Node.js (v18.0.0 or higher)
- npm (v9.0.0 or higher)
- MongoDB (Local or Atlas)

### Installation

1. **Navigate to server directory:**
   ```bash
   cd server
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Setup environment variables:**
   ```bash
   cp .env.example .env
   ```

4. **Edit `.env` file with your configuration:**
   ```env
   NODE_ENV=development
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/kindernet
   JWT_SECRET=your_secret_key_here
   CLIENT_URL=http://localhost:5173
   ```

5. **Start the server:**
   ```bash
   # Development mode (with auto-reload)
   npm run dev

   # Production mode
   npm start
   ```

## 📁 Project Structure

```
server/
├── src/
│   ├── configs/              # Configuration files
│   │   └── db.js            # MongoDB connection
│   ├── models/              # Mongoose models
│   │   ├── user.model.js
│   │   ├── organization.model.js
│   │   ├── student.model.js
│   │   ├── employee.model.js
│   │   ├── class.model.js
│   │   ├── subject.model.js
│   │   ├── fee.model.js
│   │   ├── salary.model.js
│   │   ├── attendance.model.js
│   │   └── category.model.js
│   ├── controllers/         # Business logic
│   │   ├── auth.controller.js
│   │   ├── organization.controller.js
│   │   ├── student.controller.js
│   │   ├── employee.controller.js
│   │   ├── class.controller.js
│   │   ├── subject.controller.js
│   │   ├── fee.controller.js
│   │   ├── salary.controller.js
│   │   ├── attendance.controller.js
│   │   ├── profile.controller.js
│   │   └── category.controller.js
│   ├── routes/              # API routes
│   │   ├── auth.route.js
│   │   ├── organization.route.js
│   │   ├── student.route.js
│   │   ├── employee.route.js
│   │   ├── class.route.js
│   │   ├── subject.route.js
│   │   ├── fee.route.js
│   │   ├── salary.route.js
│   │   ├── attendance.route.js
│   │   ├── profile.route.js
│   │   └── category.route.js
│   ├── middlewares/         # Custom middleware
│   │   ├── auth.middleware.js
│   │   ├── errorHandler.middleware.js
│   │   └── rateLimiter.middleware.js
│   ├── utils/               # Helper functions
│   │   ├── response.util.js
│   │   ├── token.utils.js
│   │   └── authorization.js
│   ├── validators/          # Request validation
│   │   └── employee.validator.js
│   └── server.js           # Entry point
├── .env.example            # Environment variables template
├── package.json            # Dependencies
└── README.md              # This file
```

## 🔐 API Endpoints

### Authentication
```
POST   /api/v1/auth/sign-up          # Register admin
POST   /api/v1/auth/sign-in          # Login
POST   /api/v1/auth/logout           # Logout
GET    /api/v1/auth/verify           # Verify token
```

### Organization
```
POST   /api/v1/organizations         # Create organization
GET    /api/v1/organizations         # Get all organizations
GET    /api/v1/organizations/:id     # Get organization details
PATCH  /api/v1/organizations/:id     # Update organization
```

### Students
```
POST   /api/v1/students              # Add student
POST   /api/v1/students/bulk         # Bulk add students
POST   /api/v1/students/promote      # Promote students
GET    /api/v1/students/organization/:id  # Get students by organization
GET    /api/v1/students/search/:query     # Search students
GET    /api/v1/students/:id          # Get student details
PATCH  /api/v1/students/:id          # Update student
DELETE /api/v1/students/:id          # Delete student
```

### Employees
```
POST   /api/v1/employees             # Add employee
GET    /api/v1/employees             # Get all employees
GET    /api/v1/employees/:id         # Get employee details
PATCH  /api/v1/employees/:id         # Update employee
DELETE /api/v1/employees/:id         # Delete employee
```

### Classes
```
POST   /api/v1/classes               # Create class
GET    /api/v1/classes               # Get all classes
GET    /api/v1/classes/:id           # Get class details
PATCH  /api/v1/classes/:id           # Update class
DELETE /api/v1/classes/:id           # Delete class
```

### Subjects
```
POST   /api/v1/subjects              # Create subject
GET    /api/v1/subjects              # Get all subjects
PATCH  /api/v1/subjects/:id          # Update subject
DELETE /api/v1/subjects/:id          # Delete subject
```

### Fees
```
POST   /api/v1/fees                  # Create fee
GET    /api/v1/fees                  # Get all fees
PATCH  /api/v1/fees/:id/pay          # Pay fee
DELETE /api/v1/fees/:id              # Delete fee
```

### Salaries
```
POST   /api/v1/salaries              # Generate salary
GET    /api/v1/salaries              # Get all salaries
PATCH  /api/v1/salaries/:id          # Update salary
PATCH  /api/v1/salaries/:id/pay      # Pay salary
DELETE /api/v1/salaries/:id          # Delete salary
```

### Attendance
```
POST   /api/v1/attendance            # Mark attendance
POST   /api/v1/attendance/bulk       # Bulk mark attendance
GET    /api/v1/attendance            # Get attendance records
GET    /api/v1/attendance/report     # Get attendance report
DELETE /api/v1/attendance/:id        # Delete attendance
```

### Profile
```
GET    /api/v1/profile               # Get profile
PATCH  /api/v1/profile               # Update profile
PATCH  /api/v1/profile/change-password  # Change password
```

### Categories
```
POST   /api/v1/categories            # Create category
GET    /api/v1/categories            # Get all categories
PATCH  /api/v1/categories/:id        # Update category
DELETE /api/v1/categories/:id        # Delete category
```

## 🔒 Security Features

- **JWT Authentication** - Secure token-based authentication
- **Password Hashing** - bcrypt with salt rounds
- **Rate Limiting** - Prevents brute force attacks
- **CORS Protection** - Configurable cross-origin requests
- **Helmet.js** - Security headers
- **Input Validation** - Joi validation schemas
- **Organization Isolation** - Multi-tenancy support

## 🗄️ Database Models

### User
- Authentication and authorization
- Roles: SUPER_USER, ADMIN, TEACHER, STAFF, STUDENT, EMPLOYEE

### Organization
- School/institution information
- Multi-tenancy support

### Student
- Student personal information
- Class, section, roll number
- Guardian details

### Employee
- Employee personal and professional information
- Bank details
- Department and role

### Class
- Class with sections
- Class teacher assignment
- Tuition fees

### Subject
- Subject information
- Teacher assignment
- Category classification

### Fee
- Student fee management
- Payment tracking
- Multiple fee types

### Salary
- Employee salary generation
- Allowances and deductions
- Payment tracking

### Attendance
- Student and employee attendance
- Daily tracking
- Multiple status types

## 🛠️ Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Environment (development/production) | development |
| `PORT` | Server port | 5000 |
| `MONGO_URI` | MongoDB connection string | - |
| `JWT_SECRET` | JWT secret key | - |
| `JWT_EXPIRE` | Access token expiry | 3d |
| `JWT_REFRESH_EXPIRE` | Refresh token expiry | 7d |
| `CLIENT_URL` | Frontend URL for CORS | http://localhost:5173 |

## 📊 Response Format

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error message",
  "data": {}
}
```

## 🧪 Testing

```bash
# Run tests (when implemented)
npm test
```

## 📝 Logging

- **Development**: Detailed console logs with `morgan` (dev format)
- **Production**: Combined logs with `morgan` (combined format)

## 🚢 Deployment

### Local Deployment
```bash
npm start
```

### Production Deployment

1. **Set environment to production:**
   ```env
   NODE_ENV=production
   ```

2. **Deploy to platforms:**
   - Railway
   - Render
   - Heroku
   - AWS EC2
   - DigitalOcean

## 🔧 Development

```bash
# Start development server with auto-reload
npm run dev

# Watch for changes
nodemon will automatically restart on file changes
```

## 📚 Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Joi** - Validation
- **Helmet** - Security
- **CORS** - Cross-origin requests
- **Morgan** - HTTP logging

## 🤝 Contributing

1. Follow the existing code style
2. Use ES6 modules (import/export)
3. Add proper error handling
4. Follow RESTful conventions
5. Document new endpoints

## 📄 License

Proprietary - All rights reserved

## 📧 Contact

For questions or support, contact the development team.
