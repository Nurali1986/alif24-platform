import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { env, connectDatabase, syncDatabase } from './config/index.js';
import routes from './routes/index.js';
import { errorHandler, notFoundHandler } from './middleware/index.js';
import Logger from './utils/Logger.js';

/**
 * Create Express Application
 */
const app = express();

// Security middleware
app.use(helmet());

// CORS configuration
app.use(cors({
  origin: env.corsOrigin,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Request parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// HTTP request logging
if (env.isDevelopment()) {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// API routes
app.use(env.apiPrefix, routes);

// 404 handler
app.use(notFoundHandler);

// Global error handler
app.use(errorHandler);

/**
 * Start Server
 */
const startServer = async () => {
  try {
    // Connect to database
    await connectDatabase();
    
    // Sync database models (in development)
    if (env.isDevelopment()) {
      await syncDatabase({ alter: true });
    }

    // Start server
    app.listen(env.port, () => {
      Logger.info(`🚀 Server running on port ${env.port}`);
      Logger.info(`📚 API available at http://localhost:${env.port}${env.apiPrefix}`);
      Logger.info(`🌍 Environment: ${env.nodeEnv}`);
    });
  } catch (error) {
    Logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  Logger.error('Uncaught Exception:', error);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (error) => {
  Logger.error('Unhandled Rejection:', error);
  process.exit(1);
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  Logger.info('SIGTERM received. Shutting down gracefully...');
  const { closeDatabase } = await import('./config/index.js');
  await closeDatabase();
  process.exit(0);
});

// Start the server
startServer();

export default app;
