# Alif24 Database Schema Documentation

## Overview

The Alif24 platform uses PostgreSQL as its primary database. The schema is designed to support an adaptive learning platform for children aged 4-7.

## Entity Relationship Diagram

```
┌─────────────┐       ┌─────────────┐       ┌─────────────┐
│    Users    │───────│  Students   │───────│  Progress   │
└─────────────┘       └─────────────┘       └─────────────┘
       │                     │                     │
       │                     │                     │
┌──────┴──────┐       ┌──────┴──────┐       ┌──────┴──────┐
│  Teachers   │       │   Parents   │       │  Lessons    │
└─────────────┘       └─────────────┘       └─────────────┘
                            │                     │
                            │               ┌─────┴─────┐
                      ┌─────┴─────┐         │  Subjects │
                      │  Parent   │         └───────────┘
                      │  Students │
                      └───────────┘

┌─────────────┐       ┌─────────────┐       ┌─────────────┐
│    Games    │───────│   Game      │       │Achievements │
└─────────────┘       │  Sessions   │       └─────────────┘
                      └─────────────┘              │
                                            ┌─────┴─────┐
                                            │  Student  │
                                            │Achievements│
                                            └───────────┘
```

## Tables

### Users

Primary user table containing authentication and basic information.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK | Primary key |
| email | VARCHAR(255) | UNIQUE, NOT NULL | User email |
| password | VARCHAR(255) | NOT NULL | Hashed password |
| first_name | VARCHAR(100) | NOT NULL | First name |
| last_name | VARCHAR(100) | NOT NULL | Last name |
| phone | VARCHAR(20) | NULL | Phone number |
| role | ENUM | NOT NULL | student, teacher, parent, admin |
| avatar | VARCHAR(500) | NULL | Avatar URL |
| language | ENUM | DEFAULT 'uz' | uz, ru |
| is_active | BOOLEAN | DEFAULT true | Account status |
| is_verified | BOOLEAN | DEFAULT false | Email verified |
| last_login_at | TIMESTAMP | NULL | Last login time |
| refresh_token | TEXT | NULL | JWT refresh token |
| created_at | TIMESTAMP | NOT NULL | Creation time |
| updated_at | TIMESTAMP | NOT NULL | Last update time |
| deleted_at | TIMESTAMP | NULL | Soft delete time |

**Indexes:**
- `users_email_idx` on `email`
- `users_role_idx` on `role`
- `users_is_active_idx` on `is_active`

---

### Students

Extended profile for student users.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK | Primary key |
| user_id | UUID | FK → users.id | User reference |
| date_of_birth | DATE | NOT NULL | Birth date |
| grade | VARCHAR(50) | NULL | Grade/class |
| level | INTEGER | DEFAULT 1 | Learning level (1-10) |
| total_points | INTEGER | DEFAULT 0 | Accumulated points |
| total_lessons_completed | INTEGER | DEFAULT 0 | Completed lessons count |
| total_games_played | INTEGER | DEFAULT 0 | Games played count |
| average_score | FLOAT | DEFAULT 0 | Average score percentage |
| current_streak | INTEGER | DEFAULT 0 | Current daily streak |
| longest_streak | INTEGER | DEFAULT 0 | Longest streak achieved |
| last_activity_at | TIMESTAMP | NULL | Last activity time |
| preferences | JSONB | DEFAULT {} | User preferences |
| created_at | TIMESTAMP | NOT NULL | Creation time |
| updated_at | TIMESTAMP | NOT NULL | Last update time |

**Preferences JSON Structure:**
```json
{
  "favoriteSubjects": ["math", "reading"],
  "learningStyle": "visual",
  "soundEnabled": true,
  "animationsEnabled": true
}
```

---

### Teachers

Extended profile for teacher users.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK | Primary key |
| user_id | UUID | FK → users.id | User reference |
| specialization | VARCHAR(200) | NULL | Area of expertise |
| qualification | VARCHAR(200) | NULL | Educational qualification |
| years_of_experience | INTEGER | DEFAULT 0 | Teaching experience |
| bio | TEXT | NULL | Biography |
| subjects | TEXT[] | DEFAULT [] | Subjects taught |
| total_students | INTEGER | DEFAULT 0 | Student count |
| total_lessons_created | INTEGER | DEFAULT 0 | Lessons created |
| rating | FLOAT | DEFAULT 0 | Teacher rating (0-5) |
| is_verified | BOOLEAN | DEFAULT false | Verification status |
| verification_documents | JSONB | DEFAULT [] | Uploaded documents |
| created_at | TIMESTAMP | NOT NULL | Creation time |
| updated_at | TIMESTAMP | NOT NULL | Last update time |

---

### Parents

Extended profile for parent users.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK | Primary key |
| user_id | UUID | FK → users.id | User reference |
| occupation | VARCHAR(200) | NULL | Job/occupation |
| notification_preferences | JSONB | DEFAULT {} | Notification settings |
| screen_time_limit | INTEGER | DEFAULT 60 | Daily limit in minutes |
| allowed_time_slots | JSONB | DEFAULT {} | Allowed usage times |
| created_at | TIMESTAMP | NOT NULL | Creation time |
| updated_at | TIMESTAMP | NOT NULL | Last update time |

---

### Parent_Students

Links parents to their children.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK | Primary key |
| parent_id | UUID | FK → parents.id | Parent reference |
| student_id | UUID | FK → students.id | Student reference |
| relationship | ENUM | DEFAULT 'guardian' | mother, father, guardian, other |
| is_primary | BOOLEAN | DEFAULT false | Primary guardian flag |
| created_at | TIMESTAMP | NOT NULL | Creation time |
| updated_at | TIMESTAMP | NOT NULL | Last update time |

**Constraints:**
- UNIQUE(parent_id, student_id)

---

### Subjects

Educational subjects/topics.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK | Primary key |
| name | VARCHAR(100) | NOT NULL | English name |
| name_uz | VARCHAR(100) | NOT NULL | Uzbek name |
| name_ru | VARCHAR(100) | NOT NULL | Russian name |
| description | TEXT | NULL | English description |
| description_uz | TEXT | NULL | Uzbek description |
| description_ru | TEXT | NULL | Russian description |
| icon | VARCHAR(500) | NULL | Icon URL/emoji |
| color | VARCHAR(20) | DEFAULT '#4A90A4' | Theme color |
| order | INTEGER | DEFAULT 0 | Display order |
| is_active | BOOLEAN | DEFAULT true | Active status |
| age_range | JSONB | DEFAULT {"min": 4, "max": 7} | Target age range |
| created_at | TIMESTAMP | NOT NULL | Creation time |
| updated_at | TIMESTAMP | NOT NULL | Last update time |

---

### Lessons

Educational lesson content.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK | Primary key |
| subject_id | UUID | FK → subjects.id | Subject reference |
| teacher_id | UUID | FK → teachers.id | Creator teacher |
| title | VARCHAR(200) | NOT NULL | English title |
| title_uz | VARCHAR(200) | NOT NULL | Uzbek title |
| title_ru | VARCHAR(200) | NOT NULL | Russian title |
| description | TEXT | NULL | Description |
| description_uz | TEXT | NULL | Uzbek description |
| description_ru | TEXT | NULL | Russian description |
| content | JSONB | DEFAULT {} | Lesson content |
| type | ENUM | DEFAULT 'interactive' | video, interactive, reading, quiz, activity |
| level | INTEGER | DEFAULT 1 | Difficulty level (1-10) |
| age_min | INTEGER | DEFAULT 4 | Minimum age |
| age_max | INTEGER | DEFAULT 7 | Maximum age |
| duration | INTEGER | DEFAULT 15 | Duration in minutes |
| points_reward | INTEGER | DEFAULT 10 | Points for completion |
| thumbnail | VARCHAR(500) | NULL | Thumbnail URL |
| video_url | VARCHAR(500) | NULL | Video URL |
| order | INTEGER | DEFAULT 0 | Display order |
| is_active | BOOLEAN | DEFAULT true | Active status |
| is_ai_generated | BOOLEAN | DEFAULT false | AI-generated flag |
| total_completions | INTEGER | DEFAULT 0 | Completion count |
| average_rating | FLOAT | DEFAULT 0 | Average rating |
| created_at | TIMESTAMP | NOT NULL | Creation time |
| updated_at | TIMESTAMP | NOT NULL | Last update time |
| deleted_at | TIMESTAMP | NULL | Soft delete time |

---

### Games

Educational games.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK | Primary key |
| subject_id | UUID | FK → subjects.id | Subject reference (optional) |
| name | VARCHAR(200) | NOT NULL | English name |
| name_uz | VARCHAR(200) | NOT NULL | Uzbek name |
| name_ru | VARCHAR(200) | NOT NULL | Russian name |
| description | TEXT | NULL | Description |
| description_uz | TEXT | NULL | Uzbek description |
| description_ru | TEXT | NULL | Russian description |
| type | ENUM | DEFAULT 'puzzle' | puzzle, memory, matching, quiz, adventure, counting, spelling |
| level | INTEGER | DEFAULT 1 | Difficulty level |
| age_min | INTEGER | DEFAULT 4 | Minimum age |
| age_max | INTEGER | DEFAULT 7 | Maximum age |
| config | JSONB | DEFAULT {} | Game configuration |
| thumbnail | VARCHAR(500) | NULL | Thumbnail URL |
| points_reward | INTEGER | DEFAULT 5 | Points per session |
| time_limit | INTEGER | DEFAULT 0 | Time limit (0 = none) |
| is_active | BOOLEAN | DEFAULT true | Active status |
| total_plays | INTEGER | DEFAULT 0 | Play count |
| average_score | FLOAT | DEFAULT 0 | Average score |
| created_at | TIMESTAMP | NOT NULL | Creation time |
| updated_at | TIMESTAMP | NOT NULL | Last update time |

---

### Progress

Tracks student progress in lessons.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK | Primary key |
| student_id | UUID | FK → students.id | Student reference |
| lesson_id | UUID | FK → lessons.id | Lesson reference |
| status | ENUM | DEFAULT 'not_started' | not_started, in_progress, completed |
| score | FLOAT | DEFAULT 0 | Score percentage (0-100) |
| points_earned | INTEGER | DEFAULT 0 | Points earned |
| time_spent | INTEGER | DEFAULT 0 | Time in seconds |
| attempts | INTEGER | DEFAULT 0 | Number of attempts |
| completed_at | TIMESTAMP | NULL | Completion time |
| answers | JSONB | DEFAULT [] | Quiz answers |
| feedback | TEXT | NULL | Teacher feedback |
| created_at | TIMESTAMP | NOT NULL | Creation time |
| updated_at | TIMESTAMP | NOT NULL | Last update time |

**Constraints:**
- UNIQUE(student_id, lesson_id)

---

### Game_Sessions

Tracks student game sessions.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK | Primary key |
| student_id | UUID | FK → students.id | Student reference |
| game_id | UUID | FK → games.id | Game reference |
| score | INTEGER | DEFAULT 0 | Session score |
| points_earned | INTEGER | DEFAULT 0 | Points earned |
| time_spent | INTEGER | DEFAULT 0 | Time in seconds |
| level | INTEGER | DEFAULT 1 | Level played |
| is_completed | BOOLEAN | DEFAULT false | Completion status |
| game_data | JSONB | DEFAULT {} | Game-specific data |
| started_at | TIMESTAMP | NOT NULL | Start time |
| ended_at | TIMESTAMP | NULL | End time |
| created_at | TIMESTAMP | NOT NULL | Creation time |
| updated_at | TIMESTAMP | NOT NULL | Last update time |

---

### Achievements

Badges and achievements.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK | Primary key |
| name | VARCHAR(100) | NOT NULL | English name |
| name_uz | VARCHAR(100) | NOT NULL | Uzbek name |
| name_ru | VARCHAR(100) | NOT NULL | Russian name |
| description | TEXT | NULL | Description |
| description_uz | TEXT | NULL | Uzbek description |
| description_ru | TEXT | NULL | Russian description |
| icon | VARCHAR(500) | NULL | Icon URL/emoji |
| type | ENUM | DEFAULT 'badge' | badge, trophy, certificate, milestone |
| category | ENUM | DEFAULT 'learning' | learning, streak, social, game, special |
| criteria | JSONB | DEFAULT {} | Unlock criteria |
| points_reward | INTEGER | DEFAULT 50 | Points for earning |
| is_active | BOOLEAN | DEFAULT true | Active status |
| order | INTEGER | DEFAULT 0 | Display order |
| created_at | TIMESTAMP | NOT NULL | Creation time |
| updated_at | TIMESTAMP | NOT NULL | Last update time |

**Criteria JSON Examples:**
```json
// Lessons completed
{ "lessonsCompleted": 10 }

// Streak days
{ "streakDays": 7 }

// Perfect score
{ "perfectScore": true }

// Subject completion
{ "subjectCompleted": "Mathematics" }
```

---

### Student_Achievements

Links students to earned achievements.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK | Primary key |
| student_id | UUID | FK → students.id | Student reference |
| achievement_id | UUID | FK → achievements.id | Achievement reference |
| earned_at | TIMESTAMP | DEFAULT NOW() | Earning time |
| progress | JSONB | DEFAULT {} | Progress towards achievement |
| created_at | TIMESTAMP | NOT NULL | Creation time |
| updated_at | TIMESTAMP | NOT NULL | Last update time |

**Constraints:**
- UNIQUE(student_id, achievement_id)

---

### Notifications

User notifications.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK | Primary key |
| user_id | UUID | FK → users.id | User reference |
| type | ENUM | DEFAULT 'update' | achievement, reminder, update, alert, message |
| title | VARCHAR(200) | NOT NULL | English title |
| title_uz | VARCHAR(200) | NULL | Uzbek title |
| title_ru | VARCHAR(200) | NULL | Russian title |
| message | TEXT | NOT NULL | English message |
| message_uz | TEXT | NULL | Uzbek message |
| message_ru | TEXT | NULL | Russian message |
| data | JSONB | DEFAULT {} | Additional data |
| is_read | BOOLEAN | DEFAULT false | Read status |
| read_at | TIMESTAMP | NULL | Read time |
| created_at | TIMESTAMP | NOT NULL | Creation time |
| updated_at | TIMESTAMP | NOT NULL | Last update time |

---

## Migrations

Migrations are located in `backend/src/migrations/` and should be run in order:

1. `001-create-users.js` - Users table
2. `002-create-profiles.js` - Students, Teachers, Parents, Parent_Students
3. `003-create-content.js` - Subjects, Lessons, Games
4. `004-create-tracking.js` - Progress, Game_Sessions, Achievements, Student_Achievements, Notifications

### Running Migrations

```bash
# Run all migrations
npm run migrate

# Undo last migration
npm run migrate:undo
```

## Seeders

Seeders are located in `backend/src/seeders/`:

1. `001-demo-users.js` - Demo users (admin, teacher, parent, student)
2. `002-subjects-achievements.js` - Default subjects and achievements

### Running Seeders

```bash
# Run all seeders
npm run seed

# Undo all seeders
npm run seed:undo
```
