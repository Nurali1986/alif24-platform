# Alif24 Platform Architecture

## Overview

Alif24 is an adaptive learning platform for children aged 4-7, designed with a modern, scalable architecture that separates concerns and enables easy maintenance and extension.

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER                            │
├─────────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │   Student   │  │   Teacher   │  │   Parent    │             │
│  │   Portal    │  │   Portal    │  │   Portal    │             │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘             │
│         │                │                │                     │
│         └────────────────┼────────────────┘                     │
│                          ▼                                      │
│              ┌─────────────────────┐                           │
│              │   React Frontend    │                           │
│              │   (Vite + Router)   │                           │
│              └──────────┬──────────┘                           │
└─────────────────────────┼───────────────────────────────────────┘
                          │ HTTP/REST
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│                         API LAYER                               │
├─────────────────────────────────────────────────────────────────┤
│              ┌─────────────────────┐                           │
│              │   Express.js API    │                           │
│              │   (Node.js)         │                           │
│              └──────────┬──────────┘                           │
│                         │                                       │
│    ┌────────────────────┼────────────────────┐                 │
│    ▼                    ▼                    ▼                 │
│ ┌──────┐          ┌──────────┐         ┌──────────┐           │
│ │ Auth │          │  Routes  │         │Middleware│           │
│ │      │          │          │         │          │           │
│ └──────┘          └──────────┘         └──────────┘           │
└─────────────────────────┬───────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│                      BUSINESS LAYER                             │
├─────────────────────────────────────────────────────────────────┤
│ ┌─────────────────────────────────────────────────────────────┐│
│ │                      Controllers                            ││
│ │  AuthController │ UserController │ LessonController │ ...   ││
│ └─────────────────────────────────────────────────────────────┘│
│                          │                                      │
│ ┌─────────────────────────────────────────────────────────────┐│
│ │                       Services                              ││
│ │  AuthService │ UserService │ LessonService │ GameService    ││
│ └─────────────────────────────────────────────────────────────┘│
│                          │                                      │
│ ┌─────────────────────────────────────────────────────────────┐│
│ │                     Repositories                            ││
│ │  UserRepository │ StudentRepository │ LessonRepository      ││
│ └─────────────────────────────────────────────────────────────┘│
└─────────────────────────┬───────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│                        DATA LAYER                               │
├─────────────────────────────────────────────────────────────────┤
│ ┌─────────────────────────────────────────────────────────────┐│
│ │                    Sequelize ORM                            ││
│ │  Models │ Associations │ Migrations │ Seeders               ││
│ └─────────────────────────────────────────────────────────────┘│
│                          │                                      │
│              ┌───────────┴───────────┐                         │
│              ▼                       ▼                         │
│      ┌──────────────┐       ┌──────────────┐                  │
│      │  PostgreSQL  │       │  Redis       │                  │
│      │  (Primary)   │       │  (Cache)     │                  │
│      └──────────────┘       └──────────────┘                  │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                    EXTERNAL SERVICES                            │
├─────────────────────────────────────────────────────────────────┤
│ ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│ │   OpenAI     │  │    Azure     │  │   Email      │          │
│ │   (GPT-4)    │  │   Storage    │  │   Service    │          │
│ └──────────────┘  └──────────────┘  └──────────────┘          │
└─────────────────────────────────────────────────────────────────┘
```

## Directory Structure

```
alif24-platform/
├── backend/
│   ├── src/
│   │   ├── config/           # Configuration files
│   │   │   ├── database.js   # Database connection
│   │   │   ├── env.js        # Environment variables
│   │   │   ├── openai.js     # OpenAI integration
│   │   │   └── azure.js      # Azure storage
│   │   │
│   │   ├── core/             # Core abstractions
│   │   │   ├── base/         # Base classes
│   │   │   ├── errors/       # Error classes
│   │   │   └── http/         # HTTP utilities
│   │   │
│   │   ├── controllers/      # Request handlers
│   │   ├── services/         # Business logic
│   │   ├── repositories/     # Data access
│   │   ├── models/           # Sequelize models
│   │   ├── routes/           # API routes
│   │   ├── middleware/       # Express middleware
│   │   ├── validators/       # Zod schemas
│   │   ├── utils/            # Utilities
│   │   ├── migrations/       # DB migrations
│   │   ├── seeders/          # DB seeders
│   │   └── index.js          # Entry point
│   │
│   ├── package.json
│   ├── Dockerfile
│   └── .env.example
│
├── frontend/
│   ├── src/
│   │   ├── components/       # React components
│   │   │   ├── Auth/         # Auth components
│   │   │   ├── Student/      # Student components
│   │   │   ├── Teacher/      # Teacher components
│   │   │   ├── Parent/       # Parent components
│   │   │   ├── Admin/        # Admin components
│   │   │   └── Common/       # Shared components
│   │   │
│   │   ├── pages/            # Page components
│   │   ├── services/         # API services
│   │   ├── hooks/            # Custom hooks
│   │   ├── context/          # React context
│   │   ├── utils/            # Utilities
│   │   ├── styles/           # Global styles
│   │   ├── assets/           # Static assets
│   │   ├── App.jsx           # Root component
│   │   └── main.jsx          # Entry point
│   │
│   ├── package.json
│   ├── vite.config.js
│   ├── Dockerfile
│   └── nginx.conf
│
├── docs/
│   ├── api/                  # API documentation
│   ├── database/             # Database docs
│   └── guides/               # Setup guides
│
├── docker-compose.yml
└── README.md
```

## Design Patterns

### 1. Repository Pattern

Abstracts data access logic from business logic.

```javascript
// BaseRepository provides common CRUD operations
class BaseRepository {
  constructor(model) {
    this.model = model;
  }
  
  async findById(id) { ... }
  async findAll(options) { ... }
  async create(data) { ... }
  async update(id, data) { ... }
  async delete(id) { ... }
}

// Specific repositories extend with custom methods
class UserRepository extends BaseRepository {
  async findByEmail(email) { ... }
}
```

### 2. Service Layer Pattern

Encapsulates business logic.

```javascript
class LessonService extends BaseService {
  async getLessonsForStudent(studentId) {
    // Business logic here
    const student = await studentRepository.findById(studentId);
    const age = student.getAge();
    return lessonRepository.findByAge(age);
  }
}
```

### 3. Controller Pattern

Handles HTTP requests and responses.

```javascript
class LessonController extends BaseController {
  getAll = this.asyncHandler(async (req, res) => {
    const lessons = await this.service.getLessons(req.query);
    return this.paginated(res, lessons.data, ...);
  });
}
```

### 4. Middleware Chain

Request processing pipeline.

```
Request → Auth → Validation → Role Check → Controller → Response
                     ↓
                 Error Handler
```

### 5. Factory Pattern (Validators)

Creates validation middleware dynamically.

```javascript
const validateBody = (schema) => {
  return (req, res, next) => {
    req.body = Validator.validate(schema, req.body);
    next();
  };
};
```

## Security Measures

### Authentication

- JWT-based authentication
- Access tokens (7 days expiry)
- Refresh tokens (30 days expiry)
- Secure password hashing (bcrypt)

### Authorization

- Role-based access control (RBAC)
- Resource-level permissions
- Parent-child relationship validation

### Input Validation

- Zod schema validation
- SQL injection prevention (Sequelize)
- XSS prevention
- Request sanitization

### API Security

- CORS configuration
- Rate limiting
- Helmet security headers
- HTTPS enforcement (production)

## Data Flow

### User Authentication

```
1. Client sends credentials
2. AuthController receives request
3. AuthService validates credentials
4. UserRepository fetches user
5. JWT tokens generated
6. Tokens returned to client
7. Client stores tokens
8. Subsequent requests include token
```

### Lesson Completion

```
1. Student submits lesson completion
2. LessonController receives request
3. Auth middleware validates token
4. Role middleware checks student role
5. LessonService processes completion
6. StudentService updates statistics
7. Achievement check triggered
8. Points awarded
9. Response returned
```

## Scalability Considerations

### Database

- Connection pooling (max 10)
- Index optimization
- Soft deletes for data retention
- Pagination for large datasets

### Caching Strategy

- Session caching (Redis - future)
- API response caching
- Static asset caching (CDN)

### Performance

- Lazy loading of associations
- Efficient queries
- Gzip compression
- Minified frontend assets

## Technology Choices

| Component | Technology | Reason |
|-----------|------------|--------|
| Runtime | Node.js 18 | Modern, fast, good ecosystem |
| Framework | Express.js | Simple, flexible, widely used |
| Database | PostgreSQL | ACID compliance, JSON support |
| ORM | Sequelize | Feature-rich, good documentation |
| Validation | Zod | TypeScript-friendly, lightweight |
| Frontend | React 18 | Component-based, large ecosystem |
| Build Tool | Vite | Fast development, optimized builds |
| AI | OpenAI GPT-4 | Best quality for education content |
| Storage | Azure Blob | Reliable, good Node.js SDK |

## Future Enhancements

1. **Real-time Features**
   - WebSocket for live updates
   - Multiplayer games
   - Live notifications

2. **Mobile App**
   - React Native client
   - Offline support
   - Push notifications

3. **Analytics**
   - Learning analytics dashboard
   - A/B testing framework
   - Performance monitoring

4. **Accessibility**
   - Screen reader support
   - Voice navigation
   - High contrast mode
