# ============================================
# KINDERNET BACKEND - ENVIRONMENT VARIABLES
# ============================================
# ⚠️ IMPORTANT: After editing this file, tell me and I'll copy it to .env
# ============================================

# ============================================
# SERVER CONFIGURATION
# ============================================
NODE_ENV=development
PORT=5000

# ============================================
# DATABASE CONFIGURATION
# ============================================
# Choose ONE option below:

# Option 1: Local MongoDB (Default - Install MongoDB first)
MONGO_URI=mongodb://localhost:27017/kindernet

# Option 2: MongoDB Atlas Cloud (Uncomment and update)
# MONGO_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/kindernet?retryWrites=true&w=majority

# ============================================
# JWT CONFIGURATION
# ============================================
# Generate secure secret: node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
JWT_SECRET=dummy_jwt_secret_key_replace_with_real_secret_minimum_32_characters_long_abcdefghij1234567890

# Token expiry duration
JWT_EXPIRE=3d
JWT_REFRESH_EXPIRE=7d

# ============================================
# FRONTEND CONFIGURATION
# ============================================
CLIENT_URL=http://localhost:5173

# ============================================
# OPTIONAL: EMAIL CONFIGURATION
# ============================================
# EMAIL_HOST=smtp.gmail.com
# EMAIL_PORT=587
# EMAIL_USER=your-email@gmail.com
# EMAIL_PASSWORD=your-app-password

# ============================================
# OPTIONAL: WHATSAPP INTEGRATION
# ============================================
# WHATSAPP_API_KEY=your_whatsapp_api_key
# WHATSAPP_PHONE_NUMBER=+1234567890

# ============================================
# QUICK START INSTRUCTIONS
# ============================================
# 
# STEP 1: Update MONGO_URI above (choose one):
#   A) Local MongoDB: Keep default (install MongoDB first)
#   B) MongoDB Atlas: Replace with your connection string
#
# STEP 2: Generate JWT_SECRET (recommended for production):
#   Run: node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
#   Replace JWT_SECRET value above with the output
#
# STEP 3: Save this file and tell me - I'll copy it to .env
#
# STEP 4: Run server:
#   cd server
#   npm install
#   npm run dev
#
# ============================================
