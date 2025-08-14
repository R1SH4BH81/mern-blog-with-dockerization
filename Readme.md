# MERN Blog App - Backend
This is the backend for the MERN Blog App, built with Node.js, Express, MongoDB, and JWT authentication.
It handles user authentication, blog CRUD operations, and uses Node.js clustering for performance.

## Features
User Authentication (Register & Login)

JWT-based protected routes

Blog CRUD (Create, Read, Update, Delete)

Author-only update & delete permissions

Latest blogs (recent 6)

Author dashboard (only logged-in user's blogs)

MongoDB with Mongoose

Node.js Clustering (uses all CPU cores)

## Folder Structure
backend/
config/db.js -> MongoDB connection
controllers/authController.js -> Authentication logic
controllers/blogController.js -> Blog logic
middleware/authMiddleware.js -> JWT authentication
models/User.js
models/Blog.js
routes/authRoutes.js
routes/blogRoutes.js
.env
package.json
server.js

## API Endpoints
Auth Routes (/api/auth):
POST /register -> Register user
POST /login -> Login user

## Blog Routes (/api/blogs):
GET / -> Get all blogs
GET /latest -> Get recent 6 blogs
POST / -> Create new blog (auth required)
GET /dashboard -> Get blogs of logged-in user (auth required)
PUT /:id -> Update blog (only if author)
DELETE /:id -> Delete blog (only if author)

## Authentication
Uses JWT (JSON Web Tokens)

Token must be passed in Authorization header:
Authorization: Bearer <your_token>

Token expires in 7 days

## Clustering
The server uses Node.js cluster module to spawn a worker for each CPU core

If a worker dies, it's automatically restarted

## Scripts

npm start -> Start in production mode

## Pull Image
```bash
docker pull rishxbh81/test-node:latest
```

