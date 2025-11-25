import dotenv from 'dotenv';

dotenv.config();

/**
 * Environment configuration
 * Centralized configuration for all environment variables
 */
const env = {
  // Server
  nodeEnv: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT, 10) || 5000,
  apiPrefix: process.env.API_PREFIX || '/api/v1',

  // Database
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    name: process.env.DB_NAME || 'alif24_db',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || '',
    dialect: process.env.DB_DIALECT || 'postgres'
  },

  // JWT
  jwt: {
    secret: process.env.JWT_SECRET || 'your-secret-key',
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    refreshSecret: process.env.JWT_REFRESH_SECRET || 'your-refresh-secret',
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '30d'
  },

  // OpenAI
  openai: {
    apiKey: process.env.OPENAI_API_KEY || '',
    model: process.env.OPENAI_MODEL || 'gpt-4'
  },

  // Azure
  azure: {
    storageConnectionString: process.env.AZURE_STORAGE_CONNECTION_STRING || '',
    containerName: process.env.AZURE_CONTAINER_NAME || 'alif24-assets'
  },

  // Logging
  logLevel: process.env.LOG_LEVEL || 'info',

  // CORS
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173',

  // Rate Limiting
  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS, 10) || 15 * 60 * 1000,
    max: parseInt(process.env.RATE_LIMIT_MAX, 10) || 100
  },

  // Helpers
  isDevelopment() {
    return this.nodeEnv === 'development';
  },

  isProduction() {
    return this.nodeEnv === 'production';
  },

  isTest() {
    return this.nodeEnv === 'test';
  }
};

export default env;
