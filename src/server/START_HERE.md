# 🚀 KinderNet Backend Server

Welcome to the KinderNet Backend API - A professional, production-ready Node.js + Express + MongoDB backend for school management.

## 📚 Quick Links

- **[Setup Guide](./SETUP_GUIDE.md)** - Complete installation and setup instructions
- **[API Documentation](./API_DOCUMENTATION.md)** - Full API reference with examples
- **[Frontend Integration](./FRONTEND_INTEGRATION.md)** - Connect React frontend to backend
- **[Main README](./README.md)** - Project overview and features

## ⚡ Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Setup environment
cp .env.example .env
# Edit .env with your configuration

# 3. Start server
npm run dev
```

## 📁 What's Inside

```
server/
├── src/
│   ├── configs/         # Database and app configuration
│   ├── models/          # 10 Mongoose models (User, Student, etc.)
│   ├── controllers/     # 10 Controllers with business logic
│   ├── routes/          # 10 API route definitions
│   ├── middlewares/     # Auth, error handling, rate limiting
│   ├── utils/           # Helper functions
│   ├── validators/      # Request validation schemas
│   └── server.js        # Application entry point
└── ...
```

## 🎯 Key Features

✅ **Complete CRUD Operations** for all modules
✅ **JWT Authentication** with access & refresh tokens
✅ **Multi-tenancy** with organization isolation
✅ **Role-based Access Control** (SUPER_USER, ADMIN, TEACHER, etc.)
✅ **Rate Limiting** to prevent abuse
✅ **Input Validation** with Joi
✅ **Error Handling** with custom middleware
✅ **MongoDB Transactions** for data integrity
✅ **Password Hashing** with bcrypt
✅ **CORS Protection** configured
✅ **Security Headers** with Helmet
✅ **Pagination Support** on list endpoints
✅ **Search & Filtering** capabilities
✅ **Bulk Operations** (students, attendance)

## 🗄️ Database Models

1. **User** - Authentication and user management
2. **Organization** - School/institution information
3. **Student** - Student profiles and academic info
4. **Employee** - Staff information with bank details
5. **Class** - Class management with sections
6. **Subject** - Subject catalog with teachers
7. **Fee** - Fee collection and tracking
8. **Salary** - Employee salary management
9. **Attendance** - Student/employee attendance
10. **Category** - General categorization

## 🔐 Security

- **Passwords**: Hashed with bcrypt (salt rounds: 10)
- **Tokens**: JWT with configurable expiry
- **Rate Limiting**: 100 requests/15min, 5 login attempts/15min
- **CORS**: Configurable allowed origins
- **Headers**: Security headers via Helmet
- **Validation**: Input validation on all endpoints

## 🌐 API Endpoints

### Core Modules
- **/auth** - Authentication (login, register, verify)
- **/organizations** - Organization management
- **/students** - Student CRUD + bulk operations
- **/employees** - Employee management
- **/classes** - Class management
- **/subjects** - Subject management
- **/fees** - Fee collection
- **/salaries** - Salary processing
- **/attendance** - Attendance tracking
- **/profile** - User profile
- **/categories** - Category management

See **[API_DOCUMENTATION.md](./API_DOCUMENTATION.md)** for complete endpoint reference.

## 🛠️ Tech Stack

- **Runtime**: Node.js v18+
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (jsonwebtoken)
- **Password**: bcrypt
- **Validation**: Joi
- **Security**: Helmet, CORS
- **Rate Limiting**: express-rate-limit
- **Logging**: Morgan

## 📊 Status Codes

- **200** - Success
- **201** - Created
- **400** - Bad Request / Validation Error
- **401** - Unauthorized / Invalid Token
- **403** - Forbidden / No Permission
- **404** - Not Found
- **500** - Internal Server Error

## 🔄 Development Workflow

```bash
# Start development server (auto-reload)
npm run dev

# Start production server
npm start

# Stop server
Ctrl + C
```

## 📦 Dependencies

**Core:**
- express - Web framework
- mongoose - MongoDB ODM
- jsonwebtoken - JWT implementation
- bcryptjs - Password hashing

**Security:**
- helmet - Security headers
- cors - CORS middleware
- express-rate-limit - Rate limiting

**Utilities:**
- joi - Input validation
- dotenv - Environment variables
- cookie-parser - Cookie parsing
- morgan - HTTP logging

## 🚀 Deployment

Suitable for deployment on:
- Railway
- Render
- Heroku
- AWS (EC2, Elastic Beanstalk)
- DigitalOcean
- Azure
- Google Cloud

## 📝 Environment Setup

Required environment variables:

```env
NODE_ENV=development
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLIENT_URL=http://localhost:5173
```

See `.env.example` for complete list.

## ✅ Testing

1. **Health Check**: `GET /health`
2. **Register**: `POST /api/v1/auth/sign-up`
3. **Login**: `POST /api/v1/auth/sign-in`
4. **Protected Route**: Any endpoint with auth

Use Postman, Thunder Client, or curl to test.

## 📖 Documentation Files

1. **[README.md](./README.md)** - Project overview
2. **[SETUP_GUIDE.md](./SETUP_GUIDE.md)** - Installation guide
3. **[API_DOCUMENTATION.md](./API_DOCUMENTATION.md)** - API reference
4. **[FRONTEND_INTEGRATION.md](./FRONTEND_INTEGRATION.md)** - Integration guide

## 🤝 Contributing

Follow the existing code patterns:
- Use ES6 modules (import/export)
- Add error handling with try-catch
- Use successResponse/errorResponse utilities
- Follow RESTful conventions
- Add validation where needed
- Document new endpoints

## 📞 Support

For issues or questions:
1. Check documentation files
2. Review error messages in console
3. Verify environment variables
4. Check MongoDB connection
5. Review API documentation

---

## 🎉 Ready to Go!

Your backend is production-ready with:
✅ Complete API
✅ Security configured
✅ Database models ready
✅ Authentication working
✅ Documentation complete

**Next Steps:**
1. Follow [SETUP_GUIDE.md](./SETUP_GUIDE.md) to install
2. Configure `.env` file
3. Start server with `npm run dev`
4. Test with Postman or frontend
5. Deploy to production

---

**Built with ❤️ for KinderNet Student Management Portal**

*Version 1.0.0 - Production Ready*
