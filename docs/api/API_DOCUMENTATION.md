# Alif24 API Documentation

## Overview

The Alif24 API provides a RESTful interface for the adaptive learning platform. All endpoints are prefixed with `/api/v1`.

## Base URL

- **Development:** `http://localhost:5000/api/v1`
- **Production:** `https://api.alif24.uz/api/v1`

## Authentication

The API uses JWT (JSON Web Tokens) for authentication.

### Headers

```
Authorization: Bearer <access_token>
```

### Token Refresh

Access tokens expire after 7 days. Use the refresh token endpoint to get new tokens.

---

## Endpoints

### Authentication

#### Register User
```
POST /auth/register

Body:
{
  "email": "user@example.com",
  "password": "Password123!",
  "firstName": "John",
  "lastName": "Doe",
  "role": "student", // student | teacher | parent
  "language": "uz" // uz | ru
}

Response:
{
  "success": true,
  "message": "Registration successful",
  "data": {
    "user": { ... },
    "accessToken": "...",
    "refreshToken": "..."
  }
}
```

#### Login
```
POST /auth/login

Body:
{
  "email": "user@example.com",
  "password": "Password123!"
}

Response:
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": { ... },
    "accessToken": "...",
    "refreshToken": "..."
  }
}
```

#### Refresh Token
```
POST /auth/refresh

Body:
{
  "refreshToken": "..."
}

Response:
{
  "success": true,
  "data": {
    "accessToken": "...",
    "refreshToken": "..."
  }
}
```

#### Get Profile
```
GET /auth/me

Headers: Authorization: Bearer <token>

Response:
{
  "success": true,
  "data": {
    "id": "uuid",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "student",
    "studentProfile": { ... }
  }
}
```

#### Logout
```
POST /auth/logout

Headers: Authorization: Bearer <token>

Response:
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

### Users

#### Get User by ID
```
GET /users/:id

Headers: Authorization: Bearer <token>

Response:
{
  "success": true,
  "data": { ... }
}
```

#### Update User
```
PUT /users/:id

Headers: Authorization: Bearer <token>

Body:
{
  "firstName": "Jane",
  "lastName": "Doe",
  "phone": "+998901234567",
  "language": "ru"
}

Response:
{
  "success": true,
  "message": "Profile updated successfully",
  "data": { ... }
}
```

#### Search Users (Admin Only)
```
GET /users?query=john&role=student&page=1&limit=10

Headers: Authorization: Bearer <admin_token>

Response:
{
  "success": true,
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "totalPages": 5
  }
}
```

---

### Students

#### Get My Profile
```
GET /students/me

Headers: Authorization: Bearer <student_token>

Response:
{
  "success": true,
  "data": {
    "id": "uuid",
    "userId": "uuid",
    "dateOfBirth": "2019-01-01",
    "level": 3,
    "totalPoints": 1500,
    "totalLessonsCompleted": 25,
    ...
  }
}
```

#### Get Student Progress
```
GET /students/:id/progress

Headers: Authorization: Bearer <token>

Response:
{
  "success": true,
  "data": [
    {
      "lessonId": "uuid",
      "status": "completed",
      "score": 85,
      "completedAt": "2024-01-15T10:30:00Z"
    }
  ]
}
```

#### Get Student Achievements
```
GET /students/:id/achievements

Headers: Authorization: Bearer <token>

Response:
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "name": "First Steps",
      "nameUz": "Birinchi qadamlar",
      "earnedAt": "2024-01-10T15:20:00Z"
    }
  ]
}
```

#### Get Student Statistics
```
GET /students/:id/statistics

Headers: Authorization: Bearer <token>

Response:
{
  "success": true,
  "data": {
    "totalPoints": 1500,
    "level": 3,
    "totalLessonsCompleted": 25,
    "totalGamesPlayed": 40,
    "averageScore": 82.5,
    "currentStreak": 5,
    "longestStreak": 12,
    "achievementsCount": 8
  }
}
```

---

### Lessons

#### Get All Lessons
```
GET /lessons?subjectId=uuid&level=3&page=1&limit=10

Response:
{
  "success": true,
  "data": [...],
  "pagination": { ... }
}
```

#### Get Lesson by ID
```
GET /lessons/:id

Response:
{
  "success": true,
  "data": {
    "id": "uuid",
    "title": "Counting Numbers",
    "titleUz": "Raqamlarni sanash",
    "level": 2,
    "type": "interactive",
    "content": { ... },
    "subject": { ... }
  }
}
```

#### Get Lessons for Student
```
GET /lessons/for-me

Headers: Authorization: Bearer <student_token>

Response:
{
  "success": true,
  "data": [...] // Filtered by student's level and age
}
```

#### Start Lesson
```
POST /lessons/:id/start

Headers: Authorization: Bearer <student_token>

Response:
{
  "success": true,
  "message": "Lesson started",
  "data": {
    "status": "in_progress"
  }
}
```

#### Complete Lesson
```
POST /lessons/:id/complete

Headers: Authorization: Bearer <student_token>

Body:
{
  "score": 85,
  "timeSpent": 600, // seconds
  "answers": [
    { "questionId": "q1", "answer": "a" }
  ]
}

Response:
{
  "success": true,
  "message": "Lesson completed",
  "data": {
    "status": "completed",
    "score": 85,
    "pointsEarned": 10
  }
}
```

#### Create Lesson (Teacher/Admin)
```
POST /lessons

Headers: Authorization: Bearer <teacher_token>

Body:
{
  "subjectId": "uuid",
  "title": "New Lesson",
  "titleUz": "Yangi dars",
  "titleRu": "Новый урок",
  "type": "interactive",
  "level": 2,
  "content": { ... }
}

Response:
{
  "success": true,
  "message": "Lesson created successfully",
  "data": { ... }
}
```

#### Generate AI Lesson (Teacher/Admin)
```
POST /lessons/generate

Headers: Authorization: Bearer <teacher_token>

Body:
{
  "topic": "Addition",
  "subjectId": "uuid",
  "level": 3,
  "language": "uz",
  "age": 5
}

Response:
{
  "success": true,
  "message": "Lesson content generated",
  "data": {
    "explanation": "...",
    "questions": [...],
    "funFact": "...",
    "activities": [...]
  }
}
```

---

### Games

#### Get All Games
```
GET /games?subjectId=uuid&type=puzzle&page=1&limit=10

Response:
{
  "success": true,
  "data": [...],
  "pagination": { ... }
}
```

#### Get Game by ID
```
GET /games/:id

Response:
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "Memory Match",
    "nameUz": "Xotira o'yini",
    "type": "memory",
    "level": 2,
    "config": { ... }
  }
}
```

#### Start Game Session
```
POST /games/:id/start

Headers: Authorization: Bearer <student_token>

Body:
{
  "level": 1
}

Response:
{
  "success": true,
  "message": "Game session started",
  "data": {
    "sessionId": "uuid",
    "startedAt": "2024-01-15T10:30:00Z"
  }
}
```

#### End Game Session
```
POST /games/sessions/:sessionId/end

Headers: Authorization: Bearer <student_token>

Body:
{
  "score": 850,
  "timeSpent": 120, // seconds
  "gameData": {
    "correctAnswers": 8,
    "wrongAnswers": 2
  }
}

Response:
{
  "success": true,
  "message": "Game session completed",
  "data": {
    "score": 850,
    "pointsEarned": 5,
    "endedAt": "2024-01-15T10:32:00Z"
  }
}
```

#### Get My Game Sessions
```
GET /games/my-sessions?gameId=uuid

Headers: Authorization: Bearer <student_token>

Response:
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "gameId": "uuid",
      "score": 850,
      "isCompleted": true,
      "startedAt": "...",
      "endedAt": "..."
    }
  ]
}
```

---

## Error Responses

All errors follow this format:

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message",
    "details": [...] // Optional validation errors
  },
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### Common Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| BAD_REQUEST | 400 | Invalid request data |
| UNAUTHORIZED | 401 | Missing or invalid authentication |
| TOKEN_EXPIRED | 401 | JWT token has expired |
| FORBIDDEN | 403 | Insufficient permissions |
| NOT_FOUND | 404 | Resource not found |
| CONFLICT | 409 | Resource already exists |
| VALIDATION_ERROR | 422 | Request validation failed |
| TOO_MANY_REQUESTS | 429 | Rate limit exceeded |
| INTERNAL_SERVER_ERROR | 500 | Server error |

---

## Rate Limiting

- **Window:** 15 minutes
- **Max Requests:** 100 per window

Rate limit headers are included in all responses:

```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1705312200
```

---

## Pagination

Paginated endpoints support these query parameters:

| Parameter | Default | Max | Description |
|-----------|---------|-----|-------------|
| page | 1 | - | Page number |
| limit | 10 | 100 | Items per page |

Response includes pagination metadata:

```json
{
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 150,
    "totalPages": 15,
    "hasNextPage": true,
    "hasPrevPage": false
  }
}
```

---

## Websocket Events (Future)

Coming soon: Real-time updates for:
- Progress notifications
- Achievement unlocks
- Multiplayer games
- Live leaderboards
