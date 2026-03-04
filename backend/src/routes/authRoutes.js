import express from 'express';
import { googleLogin, googleCallback, githubLogin, githubCallback, logout, getCurrentUser, checkAuth } from '../controllers/authController.js';

const router = express.Router();

// Google OAuth routes
router.get('/google', googleLogin);
router.get('/google/callback', googleCallback);

// GitHub OAuth routes
router.get('/github', githubLogin);
router.get('/github/callback', githubCallback);

// Auth routes
router.post('/logout', logout);
router.get('/me', getCurrentUser);
router.get('/check', checkAuth);

export default router;
