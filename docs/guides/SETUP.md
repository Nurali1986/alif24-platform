# Alif24 Setup Instructions

## Prerequisites

- **Node.js** 18.x or higher
- **PostgreSQL** 15.x or higher
- **npm** or **yarn**
- **Docker** (optional, for containerized setup)

## Quick Start

### Option 1: Docker Compose (Recommended)

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Nurali1986/alif24-platform.git
   cd alif24-platform
   ```

2. **Create environment file:**
   ```bash
   cp backend/.env.example backend/.env
   # Edit backend/.env with your configuration
   ```

3. **Start all services:**
   ```bash
   docker-compose up -d
   ```

4. **Access the application:**
   - Frontend: http://localhost:80
   - Backend API: http://localhost:5000/api/v1
   - API Health: http://localhost:5000/api/v1/health

### Option 2: Manual Setup

#### Backend Setup

1. **Navigate to backend:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment:**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` with your settings:
   ```env
   NODE_ENV=development
   PORT=5000
   
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=alif24_db
   DB_USER=postgres
   DB_PASSWORD=your_password
   
   JWT_SECRET=your-super-secret-jwt-key
   JWT_REFRESH_SECRET=your-refresh-secret
   
   OPENAI_API_KEY=sk-your-openai-key
   ```

4. **Create database:**
   ```bash
   createdb alif24_db
   ```

5. **Run migrations:**
   ```bash
   npm run migrate
   ```

6. **Seed database (optional):**
   ```bash
   npm run seed
   ```

7. **Start the server:**
   ```bash
   npm run dev
   ```

#### Frontend Setup

1. **Navigate to frontend:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment:**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env`:
   ```env
   VITE_API_URL=http://localhost:5000/api/v1
   VITE_LANGUAGE=uz
   ```

4. **Start development server:**
   ```bash
   npm run dev
   ```

5. **Access at:** http://localhost:5173

## Development Workflow

### Running in Development Mode

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### With Docker (Hot Reload)

```bash
docker-compose --profile dev up
```

This starts:
- PostgreSQL database
- Backend API with nodemon
- Frontend with Vite dev server

### Running Tests

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

### Linting

```bash
# Backend
cd backend
npm run lint
npm run lint:fix

# Frontend
cd frontend
npm run lint
```

## Database Management

### Migrations

```bash
# Create new migration
npx sequelize-cli migration:generate --name migration-name

# Run migrations
npm run migrate

# Undo last migration
npm run migrate:undo

# Undo all migrations
npx sequelize-cli db:migrate:undo:all
```

### Seeders

```bash
# Create new seeder
npx sequelize-cli seed:generate --name seeder-name

# Run all seeders
npm run seed

# Undo all seeders
npm run seed:undo
```

### Reset Database

```bash
npx sequelize-cli db:migrate:undo:all
npm run migrate
npm run seed
```

## Production Deployment

### Build Frontend

```bash
cd frontend
npm run build
# Output in dist/
```

### Environment Variables

Ensure all production environment variables are set:

```env
NODE_ENV=production
PORT=5000

# Database (use connection pooling)
DATABASE_URL=postgres://user:pass@host:5432/dbname

# Security (use strong secrets)
JWT_SECRET=<strong-random-string>
JWT_REFRESH_SECRET=<another-strong-random-string>

# External Services
OPENAI_API_KEY=sk-...
AZURE_STORAGE_CONNECTION_STRING=...

# CORS
CORS_ORIGIN=https://alif24.uz
```

### Docker Production Build

```bash
# Build images
docker-compose -f docker-compose.prod.yml build

# Start services
docker-compose -f docker-compose.prod.yml up -d
```

### Health Checks

- API Health: `GET /api/v1/health`
- Database: Check connection pool status
- Memory: Monitor Node.js heap usage

## Demo Accounts

After seeding, these accounts are available:

| Email | Password | Role |
|-------|----------|------|
| admin@alif24.uz | Admin123! | Admin |
| teacher@alif24.uz | Admin123! | Teacher |
| parent@alif24.uz | Admin123! | Parent |
| student@alif24.uz | Admin123! | Student |

## Troubleshooting

### Database Connection Failed

```
Error: connect ECONNREFUSED 127.0.0.1:5432
```

**Solution:**
1. Ensure PostgreSQL is running
2. Check DB_HOST, DB_PORT in .env
3. Verify database exists: `psql -l`

### Port Already in Use

```
Error: listen EADDRINUSE :::5000
```

**Solution:**
```bash
# Find process using port
lsof -i :5000

# Kill process
kill -9 <PID>
```

### CORS Errors

```
Access-Control-Allow-Origin error
```

**Solution:**
1. Check CORS_ORIGIN in backend .env
2. Ensure frontend URL matches
3. Check for trailing slashes

### OpenAI API Errors

```
Error: Invalid API Key
```

**Solution:**
1. Verify OPENAI_API_KEY in .env
2. Check API key has credits
3. Test key independently

## Support

- **Documentation:** `/docs` folder
- **API Docs:** `/docs/api/API_DOCUMENTATION.md`
- **Database Schema:** `/docs/database/DATABASE_SCHEMA.md`
- **AI Guide:** `/docs/guides/AI_INTEGRATION.md`
