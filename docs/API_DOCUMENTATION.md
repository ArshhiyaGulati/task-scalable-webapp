# API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

---

## Authentication Endpoints

### Register User
**POST** `/auth/register`

Register a new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "Test123!",
  "full_name": "John Doe"
}
```

**Response (201):**
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "full_name": "John Doe",
    "created_at": "2024-01-01T00:00:00.000Z"
  }
}
```

**Validation Rules:**
- Email: Valid email format
- Password: Min 8 characters, 1 uppercase, 1 number
- Full Name: 2-100 characters

---

### Login User
**POST** `/auth/login`

Authenticate and receive a JWT token.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "Test123!"
}
```

**Response (200):**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "full_name": "John Doe",
    "created_at": "2024-01-01T00:00:00.000Z"
  }
}
```

---

### Verify Token
**GET** `/auth/verify`

Verify if the current JWT token is valid.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "message": "Token is valid",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "full_name": "John Doe",
    "created_at": "2024-01-01T00:00:00.000Z"
  }
}
```

---

## User Profile Endpoints

### Get Profile
**GET** `/user/profile`

Retrieve the authenticated user's profile.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "full_name": "John Doe",
    "created_at": "2024-01-01T00:00:00.000Z",
    "updated_at": "2024-01-01T00:00:00.000Z",
    "last_login": "2024-01-01T00:00:00.000Z"
  }
}
```

---

### Update Profile
**PUT** `/user/profile`

Update the authenticated user's profile.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "full_name": "Jane Doe",
  "email": "newemail@example.com"
}
```

**Response (200):**
```json
{
  "message": "Profile updated successfully",
  "user": {
    "id": "uuid",
    "email": "newemail@example.com",
    "full_name": "Jane Doe",
    "created_at": "2024-01-01T00:00:00.000Z",
    "updated_at": "2024-01-01T12:00:00.000Z"
  }
}
```

---

### Get User Stats
**GET** `/user/stats`

Get statistics about user's tasks.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "stats": {
    "total_tasks": "15",
    "completed_tasks": "5",
    "in_progress_tasks": "7",
    "pending_tasks": "3"
  }
}
```

---

## Task Endpoints

### Get All Tasks
**GET** `/tasks`

Retrieve all tasks for the authenticated user with filtering, search, and pagination.

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
- `status` (optional): Filter by status (pending, in_progress, completed)
- `priority` (optional): Filter by priority (low, medium, high)
- `search` (optional): Search in title and description
- `page` (optional, default: 1): Page number
- `limit` (optional, default: 10): Items per page

**Example:**
```
GET /tasks?status=pending&priority=high&search=urgent&page=1&limit=10
```

**Response (200):**
```json
{
  "tasks": [
    {
      "id": "uuid",
      "title": "Complete project documentation",
      "description": "Write comprehensive docs",
      "status": "pending",
      "priority": "high",
      "due_date": "2024-12-31",
      "created_at": "2024-01-01T00:00:00.000Z",
      "updated_at": "2024-01-01T00:00:00.000Z"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 3,
    "totalTasks": 25,
    "limit": 10
  }
}
```

---

### Get Single Task
**GET** `/tasks/:id`

Retrieve a specific task by ID.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "task": {
    "id": "uuid",
    "title": "Complete project documentation",
    "description": "Write comprehensive docs",
    "status": "pending",
    "priority": "high",
    "due_date": "2024-12-31",
    "created_at": "2024-01-01T00:00:00.000Z",
    "updated_at": "2024-01-01T00:00:00.000Z"
  }
}
```

---

### Create Task
**POST** `/tasks`

Create a new task.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "title": "Complete project documentation",
  "description": "Write comprehensive documentation",
  "status": "pending",
  "priority": "high",
  "due_date": "2024-12-31"
}
```

**Response (201):**
```json
{
  "message": "Task created successfully",
  "task": {
    "id": "uuid",
    "title": "Complete project documentation",
    "description": "Write comprehensive documentation",
    "status": "pending",
    "priority": "high",
    "due_date": "2024-12-31",
    "created_at": "2024-01-01T00:00:00.000Z",
    "updated_at": "2024-01-01T00:00:00.000Z"
  }
}
```

**Validation Rules:**
- Title: Required, 1-200 characters
- Description: Optional, max 1000 characters
- Status: pending, in_progress, or completed
- Priority: low, medium, or high
- Due Date: Optional, valid date format

---

### Update Task
**PUT** `/tasks/:id`

Update an existing task.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "title": "Updated task title",
  "description": "Updated description",
  "status": "in_progress",
  "priority": "medium",
  "due_date": "2024-12-15"
}
```

**Response (200):**
```json
{
  "message": "Task updated successfully",
  "task": {
    "id": "uuid",
    "title": "Updated task title",
    "description": "Updated description",
    "status": "in_progress",
    "priority": "medium",
    "due_date": "2024-12-15",
    "created_at": "2024-01-01T00:00:00.000Z",
    "updated_at": "2024-01-01T12:00:00.000Z"
  }
}
```

---

### Delete Task
**DELETE** `/tasks/:id`

Delete a task.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "message": "Task deleted successfully"
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Please provide a valid email"
    }
  ]
}
```

### 401 Unauthorized
```json
{
  "message": "No authentication token, access denied"
}
```

### 404 Not Found
```json
{
  "message": "Task not found"
}
```

### 409 Conflict
```json
{
  "message": "User with this email already exists"
}
```

### 500 Internal Server Error
```json
{
  "message": "Internal server error"
}
```

---

## Testing with Postman

1. Import the `API_Collection.json` file into Postman
2. Set the `baseUrl` variable to your backend URL
3. Register a new user or login
4. Copy the returned token
5. Set the `token` variable in Postman
6. All protected endpoints will now use this token automatically

---

## Rate Limiting

Currently, no rate limiting is implemented. For production, consider adding:
- Express Rate Limit middleware
- Redis for distributed rate limiting
- API key authentication for service-to-service calls