/**
 * Rate Limiting Middleware
 * Protects against brute force attacks and API abuse
 */

import rateLimit from 'express-rate-limit';
import Logger from '../utils/Logger.js';

/**
 * General API rate limiter
 * Limits requests per IP address
 */
export const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: {
    success: false,
    error: 'Too many requests, please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res, next, options) => {
    Logger.warn(`Rate limit exceeded for IP: ${req.ip}`);
    res.status(options.statusCode).json(options.message);
  },
});

/**
 * Auth rate limiter - stricter limits for auth endpoints
 * Protects against brute force password attacks
 */
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 login attempts per windowMs
  message: {
    success: false,
    error: 'Too many login attempts, please try again after 15 minutes.',
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res, next, options) => {
    Logger.warn(`Auth rate limit exceeded for IP: ${req.ip}, endpoint: ${req.path}`);
    res.status(options.statusCode).json(options.message);
  },
  skipSuccessfulRequests: true, // Don't count successful requests
});

/**
 * Registration rate limiter
 * Prevents mass account creation
 */
export const registrationLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // Limit each IP to 5 registration attempts per hour
  message: {
    success: false,
    error: 'Too many accounts created, please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res, next, options) => {
    Logger.warn(`Registration rate limit exceeded for IP: ${req.ip}`);
    res.status(options.statusCode).json(options.message);
  },
});

/**
 * Game session rate limiter
 * Prevents abuse of game endpoints
 */
export const gameLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 60, // Limit each IP to 60 game actions per minute
  message: {
    success: false,
    error: 'Too many game requests, please slow down.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export default {
  generalLimiter,
  authLimiter,
  registrationLimiter,
  gameLimiter,
};
