import jwt from 'jsonwebtoken';
import { env } from '../config/index.js';
import { User } from '../models/index.js';
import { UnauthorizedError, TokenExpiredError } from '../core/errors/index.js';
import Logger from '../utils/Logger.js';

/**
 * Authentication Middleware
 * Verifies JWT token and attaches user to request
 */
export const authenticate = async (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedError('No token provided');
    }

    const token = authHeader.split(' ')[1];

    // Verify token
    let decoded;
    try {
      decoded = jwt.verify(token, env.jwt.secret);
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw new TokenExpiredError('Token has expired');
      }
      throw new UnauthorizedError('Invalid token');
    }

    // Find user
    const user = await User.findByPk(decoded.userId, {
      attributes: { exclude: ['password', 'refreshToken'] }
    });

    if (!user) {
      throw new UnauthorizedError('User not found');
    }

    if (!user.isActive) {
      throw new UnauthorizedError('User account is deactivated');
    }

    // Attach user to request
    req.user = user;
    req.userId = user.id;

    next();
  } catch (error) {
    next(error);
  }
};

/**
 * Optional Authentication Middleware
 * Attaches user to request if token is valid, but doesn't require it
 */
export const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return next();
    }

    const token = authHeader.split(' ')[1];

    try {
      const decoded = jwt.verify(token, env.jwt.secret);
      const user = await User.findByPk(decoded.userId, {
        attributes: { exclude: ['password', 'refreshToken'] }
      });

      if (user && user.isActive) {
        req.user = user;
        req.userId = user.id;
      }
    } catch {
      // Token invalid, but that's okay for optional auth
      Logger.debug('Optional auth: Invalid token provided');
    }

    next();
  } catch (error) {
    next(error);
  }
};

/**
 * Generate Access Token
 * @param {Object} user - User object
 * @returns {string} JWT access token
 */
export const generateAccessToken = (user) => {
  return jwt.sign(
    { 
      userId: user.id, 
      email: user.email, 
      role: user.role 
    },
    env.jwt.secret,
    { expiresIn: env.jwt.expiresIn }
  );
};

/**
 * Generate Refresh Token
 * @param {Object} user - User object
 * @returns {string} JWT refresh token
 */
export const generateRefreshToken = (user) => {
  return jwt.sign(
    { userId: user.id },
    env.jwt.refreshSecret,
    { expiresIn: env.jwt.refreshExpiresIn }
  );
};

/**
 * Verify Refresh Token
 * @param {string} token - Refresh token
 * @returns {Object} Decoded token payload
 */
export const verifyRefreshToken = (token) => {
  try {
    return jwt.verify(token, env.jwt.refreshSecret);
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      throw new TokenExpiredError('Refresh token has expired');
    }
    throw new UnauthorizedError('Invalid refresh token');
  }
};

export default {
  authenticate,
  optionalAuth,
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken
};
