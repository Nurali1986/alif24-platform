# Alif24 Platform 📚

An adaptive learning platform for children aged 4-7, featuring personalized lessons, educational games, and progress tracking with AI-powered content generation.

## 🌟 Features

- **Adaptive Learning** - Content adjusts to each child's level and pace
- **Educational Games** - Fun, interactive games that reinforce learning
- **Multi-language Support** - Available in Uzbek and Russian
- **Progress Tracking** - Detailed analytics for parents and teachers
- **Achievement System** - Badges and rewards to motivate learners
- **AI-Powered Content** - OpenAI integration for personalized lessons
- **Role-Based Access** - Separate portals for students, parents, teachers, and admins

## 🛠️ Technology Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React 18, Vite, React Router |
| **Backend** | Node.js, Express.js |
| **Database** | PostgreSQL, Sequelize ORM |
| **Authentication** | JWT |
| **Validation** | Zod |
| **AI Integration** | OpenAI GPT-4 |
| **Storage** | Azure Blob Storage |
| **DevOps** | Docker, Docker Compose |

## 📁 Project Structure

```
alif24-platform/
├── backend/                 # Backend API (Node.js/Express)
│   ├── src/
│   │   ├── config/         # Configuration files
│   │   ├── controllers/    # Route handlers
│   │   ├── core/           # Base classes & utilities
│   │   ├── middleware/     # Express middleware
│   │   ├── models/         # Sequelize models
│   │   ├── repositories/   # Data access layer
│   │   ├── routes/         # API routes
│   │   ├── services/       # Business logic
│   │   ├── validators/     # Zod schemas
│   │   ├── migrations/     # Database migrations
│   │   └── seeders/        # Database seeders
│   ├── Dockerfile
│   └── package.json
│
├── frontend/               # Frontend App (React/Vite)
│   ├── src/
│   │   ├── components/     # React components by feature
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   ├── hooks/          # Custom React hooks
│   │   ├── context/        # React context providers
│   │   ├── styles/         # Global styles
│   │   └── utils/          # Utility functions
│   ├── Dockerfile
│   └── package.json
│
├── docs/                   # Documentation
│   ├── api/                # API documentation
│   ├── database/           # Database schema docs
│   └── guides/             # Setup & integration guides
│
└── docker-compose.yml      # Docker orchestration
```

## 🚀 Quick Start

### Using Docker (Recommended)

```bash
# Clone the repository
git clone https://github.com/your-org/alif24-platform.git
cd alif24-platform

# Copy environment file
cp backend/.env.example backend/.env
# Edit backend/.env with your configuration

# Start all services
docker-compose up -d

# Access the application
# Frontend: http://localhost:80
# API: http://localhost:5000/api/v1
```

### Manual Setup

**Backend:**
```bash
cd backend
npm install
cp .env.example .env
# Configure .env file

npm run migrate      # Run migrations
npm run seed        # Seed demo data
npm run dev         # Start development server
```

**Frontend:**
```bash
cd frontend
npm install
cp .env.example .env
npm run dev         # Start development server
```

## 📖 Documentation

- [API Documentation](./docs/api/API_DOCUMENTATION.md)
- [Database Schema](./docs/database/DATABASE_SCHEMA.md)
- [Architecture Overview](./docs/ARCHITECTURE.md)
- [Setup Guide](./docs/guides/SETUP.md)
- [AI Integration Guide](./docs/guides/AI_INTEGRATION.md)

## 🔐 Demo Accounts

After seeding the database:

| Email | Password | Role |
|-------|----------|------|
| admin@alif24.uz | Admin123! | Admin |
| teacher@alif24.uz | Admin123! | Teacher |
| parent@alif24.uz | Admin123! | Parent |
| student@alif24.uz | Admin123! | Student |

## 🧪 Testing

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

## 📝 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /auth/register | Register new user |
| POST | /auth/login | User login |
| GET | /auth/me | Get current user |
| GET | /lessons | List lessons |
| POST | /lessons/:id/complete | Complete a lesson |
| GET | /games | List games |
| POST | /games/:id/start | Start game session |
| GET | /students/:id/statistics | Get student stats |

See [API Documentation](./docs/api/API_DOCUMENTATION.md) for complete details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

Alif24 Development Team

## 📧 Contact

For questions or support, please contact: support@alif24.uz