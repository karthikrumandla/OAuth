# OAuth Authentication App

A production-ready OAuth authentication system using React, Express.js, MongoDB, and dual OAuth providers (Google & GitHub).

## Features

- Google OAuth 2.0 authentication
- GitHub OAuth 2.0 authentication
- Session-based authentication with 1-hour expiry
- MongoDB session storage
- React with ShadCN UI components
- Protected routes
- Request logging for debugging

## Tech Stack

- **Frontend**: React, Vite, TailwindCSS, ShadCN UI
- **Backend**: Express.js, Passport.js
- **Database**: MongoDB
- **Session**: express-session with MongoDB store

## Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)
- Google OAuth credentials
- GitHub OAuth credentials

## Setup

### 1. Install Dependencies

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Configure OAuth Credentials

#### Google OAuth
1. Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Create OAuth 2.0 credentials
3. Add authorized redirect URI: `http://localhost:5000/api/auth/google/callback`

#### GitHub OAuth
1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click **New OAuth App**
3. Add authorization callback URL: `http://localhost:5000/api/auth/github/callback`

### 3. Configure Environment Variables

Edit `backend/.env`:

```env
# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# GitHub OAuth
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret

# Client URL
CLIENT_URL=http://localhost:5173

# Session Configuration
SESSION_SECRET=your_secure_random_secret
SESSION_MAX_AGE=3600000

# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/oauth_app
```

### 4. Start MongoDB

```bash
mongod
```

### 5. Run the Application

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

### 6. Access the Application

- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## Project Structure

```
OAuth/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── db.js          # MongoDB connection
│   │   │   └── passport.js    # Passport strategies (Google & GitHub)
│   │   ├── controllers/
│   │   │   └── authController.js
│   │   ├── middleware/
│   │   │   └── session.js     # Session configuration
│   │   ├── models/
│   │   │   └── User.js        # User model (supports both OAuth)
│   │   ├── routes/
│   │   │   └── authRoutes.js
│   │   └── server.js
│   ├── .env
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/ui/      # ShadCN components
│   │   ├── hooks/
│   │   │   └── useAuth.jsx    # Auth context
│   │   ├── lib/
│   │   │   ├── api.js         # API client
│   │   │   └── utils.js
│   │   ├── pages/
│   │   │   ├── Login.jsx      # Login with Google & GitHub
│   │   │   └── Dashboard.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   └── package.json
└── README.md
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/auth/google` | Initiate Google OAuth |
| GET | `/api/auth/google/callback` | Google OAuth callback |
| GET | `/api/auth/github` | Initiate GitHub OAuth |
| GET | `/api/auth/github/callback` | GitHub OAuth callback |
| GET | `/api/auth/me` | Get current user |
| GET | `/api/auth/check` | Check authentication status |
| POST | `/api/auth/logout` | Logout user |
| GET | `/api/health` | Health check |

## Session Management

- Sessions stored in MongoDB using `connect-mongo`
- Session expiry: 1 hour (configurable via `SESSION_MAX_AGE`)
- Cookie settings: `httpOnly: true`, `sameSite: lax`

## User Model

The User model supports both OAuth providers:
- `googleId` - Google OAuth user ID
- `githubId` - GitHub OAuth user ID
- Users can login via either provider with the same email

## Production Considerations

1. Set `NODE_ENV=production` in production
2. Set `cookie.secure = true` in production (requires HTTPS)
3. Use a strong, random session secret
4. Update CORS origin to your production domain
5. Update callback URLs in both Google and GitHub OAuth settings
