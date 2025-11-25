import { Router } from 'express';
import authRoutes from './authRoutes.js';
import userRoutes from './userRoutes.js';
import studentRoutes from './studentRoutes.js';
import lessonRoutes from './lessonRoutes.js';
import gameRoutes from './gameRoutes.js';

const router = Router();

/**
 * API Routes
 * All routes are prefixed with /api/v1
 */

// Health check
router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Alif24 API is running',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Mount routes
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/students', studentRoutes);
router.use('/lessons', lessonRoutes);
router.use('/games', gameRoutes);

export default router;
