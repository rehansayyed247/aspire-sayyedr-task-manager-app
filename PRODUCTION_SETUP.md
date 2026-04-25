# Task Manager App - Production Grade Implementation for the app

A secure, production-ready Express.js + TypeScript task management API with PostgreSQL backend.

## Overview

This application provides RESTful APIs for task management with enterprise-grade security, error handling, input validation, and logging.

## Fixed Issues

### Original Compilation Errors
1. ✅ **Missing `getTasks` method** - Implemented with database query
2. ✅ **Wrong arguments to `createTask`** - Fixed to accept 4 parameters (title, description, due, status)
3. ✅ **Missing `updateTask` method** - Fully implemented with validation
4. ✅ **Missing `deleteTask` method** - Fully implemented with proper error handling
5. ✅ **Undefined `pool` in task.model** - Added proper import from db config
6. ✅ **TypeScript strict mode errors** - Fixed all type safety issues

## Production-Grade Improvements

### 1. **Security Features**
- ✅ SQL Injection Prevention (Parameterized queries)
- ✅ Request body size limits (10KB max)
- ✅ CORS configuration with allowlist
- ✅ Security headers (X-Content-Type-Options, X-Frame-Options, HSTS)
- ✅ Input validation & sanitization
- ✅ Environment variable validation
- ✅ Type-safe TypeScript with strict mode

### 2. **Error Handling**
- ✅ Global error handler middleware
- ✅ AppError class for custom errors
- ✅ Proper HTTP status codes
- ✅ Error logging
- ✅ Graceful error responses

### 3. **Input Validation**
- ✅ Title validation (required, max 255 chars)
- ✅ Description validation (max 2000 chars)
- ✅ Date format validation
- ✅ Status enum validation (pending, in_progress, completed)
- ✅ Task ID integer validation
- ✅ Request body validation middleware

### 4. **Database**
- ✅ Connection pooling (max 20 connections)
- ✅ Proper pool configuration for production
- ✅ Automatic connection test on startup
- ✅ SQL constraints and triggers
- ✅ Indexes for query performance
- ✅ Automatic timestamp management

### 5. **Logging**
- ✅ Structured logger utility
- ✅ Color-coded console output (development)
- ✅ JSON logging (production)
- ✅ Request logging middleware
- ✅ Error logging with context

### 6. **API Design**
- ✅ RESTful conventions
- ✅ Consistent response format
- ✅ Proper HTTP methods
- ✅ Status code conventions
- ✅ Health check endpoint
- ✅ 404 error handling

### 7. **Development Experience**
- ✅ Path aliases in TypeScript
- ✅ Source maps for debugging
- ✅ TypeScript strict configuration
- ✅ Comprehensive JSDoc comments
- ✅ .env.example for configuration

## Installation

### Prerequisites
- Node.js 14+ 
- PostgreSQL 10+
- npm or yarn

### Setup Steps

1. **Clone repository**
   ```bash
   git clone <repository-url>
   cd aspire-sayyedr-task-manager-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Database Setup**
   ```bash
   # Create database
   createdb tasks_db
   
   # Run initialization script
   psql -d tasks_db -f db-init.sql
   ```

4. **Environment Configuration**
   ```bash
   # Copy example file
   cp .env.example .env
   
   # Edit .env with your values
   nano .env
   ```

5. **Build**
   ```bash
   npm run build
   ```

6. **Development**
   ```bash
   npm run dev
   ```

7. **Production**
   ```bash
   npm start
   ```

## Environment Variables

```env
# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=tasks_db
DB_USER=postgres
DB_PASSWORD=your_secure_password

# Server
PORT=5000
NODE_ENV=development

# Security
CORS_ORIGIN=http://localhost:3000
```

## API Endpoints

### Get All Tasks
```http
GET /api/tasks
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Task 1",
      "description": "Description",
      "due": "2026-05-01",
      "status": "pending",
      "created_at": "2026-04-25T10:00:00Z",
      "updated_at": "2026-04-25T10:00:00Z"
    }
  ],
  "count": 1
}
```

### Create Task
```http
POST /api/tasks
Content-Type: application/json

{
  "title": "New Task",
  "description": "Task description",
  "due": "2026-05-01",
  "status": "pending"
}
```

### Update Task
```http
PUT /api/tasks/:id
Content-Type: application/json

{
  "title": "Updated Task",
  "description": "Updated description",
  "due": "2026-05-02",
  "status": "in_progress"
}
```

### Delete Task
```http
DELETE /api/tasks/:id
```

### Health Check
```http
GET /api/health
```

## Project Structure

```
src/
├── config/
│   └── db.ts           # Database configuration & pool
├── controllers/
│   └── task.controller.ts  # Route handlers
├── models/
│   └── task.model.ts   # Database queries
├── routes/
│   └── task.router.ts  # API routes
├── middleware/
│   ├── errorHandler.ts # Error handling
│   └── validation.ts   # Input validation
├── utils/
│   └── logger.ts       # Logging utility
└── server.ts           # Express app setup

public/              # Static files
db-init.sql         # Database schema
.env.example        # Environment template
tsconfig.json       # TypeScript configuration
```

## Security Best Practices Implemented

1. **SQL Injection Prevention**
   - All queries use parameterized statements ($1, $2, etc.)
   - No string concatenation in SQL

2. **Input Validation**
   - All inputs validated before database operations
   - Length constraints enforced
   - Type checking for all fields
   - Enum validation for status

3. **CORS Security**
   - Whitelist configured origins
   - Specific HTTP methods allowed
   - Credentials configuration

4. **Rate Limiting Ready**
   - Compatible with express-rate-limit middleware
   - Structured for easy addition

5. **Database Security**
   - Connection pooling prevents exhaustion
   - Check constraints at database level
   - Automatic timestamp management

6. **Error Handling**
   - No sensitive data in error responses
   - Environment-specific error messages
   - Proper status codes

## Performance Optimizations

1. **Database Indexes**
   - Indexes on status, due date, created_at
   - Query optimization for sorting

2. **Connection Pooling**
   - Max 20 concurrent connections
   - 30-second idle timeout
   - 2-second connection timeout

3. **Request Size Limits**
   - 10KB body size limit
   - Prevents large payload attacks

## Testing

```bash
# Create a task
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Task",
    "description": "Test description",
    "due": "2026-05-01",
    "status": "pending"
  }'

# Get all tasks
curl http://localhost:5000/api/tasks

# Update task
curl -X PUT http://localhost:5000/api/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated",
    "description": "Updated desc",
    "due": "2026-05-02",
    "status": "in_progress"
  }'

# Delete task
curl -X DELETE http://localhost:5000/api/tasks/1

# Health check
curl http://localhost:5000/api/health
```

## Deployment Considerations

### Docker
Add Dockerfile for containerization:
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist ./dist
EXPOSE 5000
CMD ["node", "dist/server.js"]
```

### Environment
- Use environment-specific .env files
- Ensure DATABASE_URL is set securely
- Use strong passwords for DB credentials
- Enable HTTPS in production

### Monitoring
- Set up application logging aggregation
- Monitor database connection pool
- Track error rates
- Set up alerts for critical errors

## Maintenance

### Database Migrations
Use a migration tool like Knex.js or db-migrate for schema changes.

### Dependencies
- Regularly update dependencies
- Run `npm audit` for security vulnerabilities
- Use npm scripts for automated checks

## License

ISC

## Author

Rehan Sayyed
