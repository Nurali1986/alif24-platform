import OpenAI from 'openai';
import env from './env.js';
import Logger from '../utils/Logger.js';

/**
 * OpenAI Configuration
 * Client for AI-powered features like adaptive content generation
 */
const openai = new OpenAI({
  apiKey: env.openai.apiKey
});

/**
 * Generate adaptive lesson content based on student level
 * @param {Object} params - Generation parameters
 * @param {string} params.topic - Lesson topic
 * @param {number} params.level - Student level (1-10)
 * @param {string} params.language - Content language
 * @param {number} params.age - Student age (4-7)
 * @returns {Promise<Object>} Generated lesson content
 */
export const generateLessonContent = async ({ topic, level, language = 'uz', age }) => {
  try {
    const prompt = `Generate an educational lesson for a ${age}-year-old child about "${topic}". 
    The content should be at level ${level}/10 difficulty.
    Language: ${language === 'uz' ? 'Uzbek' : 'Russian'}
    
    Include:
    1. A simple explanation suitable for the age
    2. 3 interactive questions
    3. A fun fact
    4. Suggested activities
    
    Format as JSON with keys: explanation, questions (array), funFact, activities (array)`;

    const response = await openai.chat.completions.create({
      model: env.openai.model,
      messages: [
        {
          role: 'system',
          content: 'You are an expert children\'s educator creating engaging content for kids aged 4-7.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      response_format: { type: 'json_object' }
    });

    return JSON.parse(response.choices[0].message.content);
  } catch (error) {
    Logger.error('Error generating lesson content:', error);
    throw error;
  }
};

/**
 * Generate adaptive quiz questions
 * @param {Object} params - Generation parameters
 * @param {string} params.topic - Quiz topic
 * @param {number} params.level - Difficulty level (1-10)
 * @param {number} params.count - Number of questions
 * @param {string} params.language - Content language
 * @returns {Promise<Array>} Generated questions
 */
export const generateQuizQuestions = async ({ topic, level, count = 5, language = 'uz' }) => {
  try {
    const prompt = `Generate ${count} multiple-choice quiz questions about "${topic}" for young children.
    Difficulty level: ${level}/10
    Language: ${language === 'uz' ? 'Uzbek' : 'Russian'}
    
    Each question should have 4 options with one correct answer.
    Format as JSON array with objects containing: question, options (array of 4), correctIndex (0-3), hint`;

    const response = await openai.chat.completions.create({
      model: env.openai.model,
      messages: [
        {
          role: 'system',
          content: 'You are an expert in creating educational content for children aged 4-7.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      response_format: { type: 'json_object' }
    });

    const result = JSON.parse(response.choices[0].message.content);
    return result.questions || result;
  } catch (error) {
    Logger.error('Error generating quiz questions:', error);
    throw error;
  }
};

/**
 * Analyze student performance and suggest improvements
 * @param {Object} params - Analysis parameters
 * @param {Array} params.recentScores - Recent quiz scores
 * @param {Array} params.weakTopics - Topics needing improvement
 * @param {number} params.currentLevel - Current student level
 * @returns {Promise<Object>} Recommendations
 */
export const analyzeStudentPerformance = async ({ recentScores, weakTopics, currentLevel }) => {
  try {
    const prompt = `Analyze a young student's learning performance:
    Recent scores: ${JSON.stringify(recentScores)}
    Topics needing improvement: ${JSON.stringify(weakTopics)}
    Current level: ${currentLevel}/10
    
    Provide recommendations including:
    1. Suggested topics to review
    2. Recommended difficulty adjustment
    3. Encouragement message for the child
    4. Tips for parents
    
    Format as JSON`;

    const response = await openai.chat.completions.create({
      model: env.openai.model,
      messages: [
        {
          role: 'system',
          content: 'You are an educational advisor specializing in early childhood education.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      response_format: { type: 'json_object' }
    });

    return JSON.parse(response.choices[0].message.content);
  } catch (error) {
    Logger.error('Error analyzing student performance:', error);
    throw error;
  }
};

export default openai;
