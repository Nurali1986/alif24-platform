# AI Integration Guide

## Overview

Alif24 integrates OpenAI's GPT models to provide adaptive, personalized learning content for children aged 4-7. This guide covers the AI features and their implementation.

## Features

### 1. Adaptive Lesson Generation

Generate age-appropriate lesson content based on topic and student level.

**Endpoint:** `POST /api/v1/lessons/generate`

**Usage:**
```javascript
const response = await fetch('/api/v1/lessons/generate', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    topic: 'Addition',
    subjectId: 'uuid-of-math-subject',
    level: 3,
    language: 'uz',
    age: 5
  })
});

const { data } = await response.json();
// data contains: explanation, questions, funFact, activities
```

**Generated Content Structure:**
```json
{
  "explanation": "A simple explanation of addition suitable for a 5-year-old...",
  "questions": [
    {
      "question": "1 + 1 = ?",
      "options": ["1", "2", "3", "4"],
      "correctIndex": 1,
      "hint": "Count on your fingers!"
    }
  ],
  "funFact": "Did you know that you have 10 fingers to help you count?",
  "activities": [
    "Count the apples in your kitchen",
    "Add blocks together to see the sum"
  ]
}
```

### 2. Quiz Question Generation

Generate adaptive quiz questions that match student's current level.

**Function:** `generateQuizQuestions`

```javascript
import { generateQuizQuestions } from '../config/openai.js';

const questions = await generateQuizQuestions({
  topic: 'Colors',
  level: 2,
  count: 5,
  language: 'uz'
});
```

### 3. Performance Analysis

AI-powered analysis of student performance with personalized recommendations.

**Function:** `analyzeStudentPerformance`

```javascript
import { analyzeStudentPerformance } from '../config/openai.js';

const recommendations = await analyzeStudentPerformance({
  recentScores: [85, 72, 90, 65, 88],
  weakTopics: ['subtraction', 'word problems'],
  currentLevel: 4
});

// Returns:
{
  "suggestedTopics": ["subtraction basics", "visual subtraction"],
  "difficultyAdjustment": "maintain",
  "encouragementMessage": "Great job! Keep practicing!",
  "parentTips": ["Practice counting backwards", "Use physical objects"]
}
```

## Configuration

### Environment Variables

```env
# OpenAI Configuration
OPENAI_API_KEY=sk-your-api-key
OPENAI_MODEL=gpt-4
```

### Supported Models

| Model | Best For | Cost |
|-------|----------|------|
| gpt-4 | Complex content generation | Higher |
| gpt-4-turbo | Balance of quality and cost | Medium |
| gpt-3.5-turbo | Simple tasks, faster | Lower |

## Best Practices

### 1. Content Safety

All AI-generated content is designed for children. The system prompt includes:
- Age-appropriate language
- Educational focus
- No harmful or scary content
- Cultural sensitivity for Uzbek/Russian audiences

### 2. Language Support

Content is generated in:
- **Uzbek (uz):** Primary language
- **Russian (ru):** Secondary language

### 3. Level Adaptation

Levels 1-10 correspond to complexity:

| Level | Age Range | Description |
|-------|-----------|-------------|
| 1-2 | 4 years | Very basic concepts |
| 3-4 | 5 years | Simple operations |
| 5-6 | 6 years | Intermediate |
| 7-8 | 6-7 years | More complex |
| 9-10 | 7 years | Advanced for age |

### 4. Error Handling

```javascript
try {
  const content = await generateLessonContent(params);
} catch (error) {
  Logger.error('AI generation failed:', error);
  // Fallback to pre-made content
  return getFallbackContent(params.topic);
}
```

### 5. Rate Limiting

- Implement caching for repeated requests
- Use fallback content during API outages
- Monitor API usage and costs

## Implementation Details

### Backend Service

Location: `backend/src/config/openai.js`

```javascript
import OpenAI from 'openai';
import env from './env.js';

const openai = new OpenAI({
  apiKey: env.openai.apiKey
});

export const generateLessonContent = async ({ topic, level, language, age }) => {
  const response = await openai.chat.completions.create({
    model: env.openai.model,
    messages: [
      {
        role: 'system',
        content: 'You are an expert children\'s educator...'
      },
      {
        role: 'user',
        content: `Generate lesson for ${age}-year-old about ${topic}...`
      }
    ],
    temperature: 0.7,
    response_format: { type: 'json_object' }
  });

  return JSON.parse(response.choices[0].message.content);
};
```

### Frontend Usage

```jsx
import { useState } from 'react';
import { lessonService } from '../services';

const LessonGenerator = () => {
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState(null);

  const generateLesson = async (topic) => {
    setLoading(true);
    try {
      const generated = await lessonService.generateLesson({
        topic,
        subjectId: selectedSubject,
        level: studentLevel,
        language: userLanguage,
        age: studentAge
      });
      setContent(generated);
    } catch (error) {
      // Handle error
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading ? <Loading /> : <LessonPreview content={content} />}
    </div>
  );
};
```

## Future Enhancements

### Planned Features

1. **Voice Generation** - Text-to-speech for younger children
2. **Image Generation** - Custom illustrations for lessons
3. **Adaptive Difficulty** - Real-time adjustment based on performance
4. **Personalized Learning Paths** - AI-curated curriculum
5. **Parent Reports** - AI-generated progress summaries

### Research Areas

- Emotion detection for engagement tracking
- Gamification optimization
- Cultural content adaptation
- Multi-modal learning support

## Monitoring & Analytics

### Key Metrics

- Generation success rate
- Average response time
- Content quality scores
- Student engagement with AI content
- API cost per student

### Logging

```javascript
Logger.info(`AI lesson generated for topic: ${params.topic}`, {
  level: params.level,
  language: params.language,
  responseTime: duration
});
```

## Troubleshooting

### Common Issues

1. **API Key Invalid**
   - Check OPENAI_API_KEY in environment
   - Verify key has sufficient credits

2. **Rate Limited**
   - Implement request queuing
   - Use caching for repeated requests

3. **Content Not Suitable**
   - Review system prompts
   - Add content filtering layer

4. **Generation Taking Too Long**
   - Use streaming responses
   - Consider faster models for simple tasks
