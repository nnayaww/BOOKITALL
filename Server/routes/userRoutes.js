import { Router } from 'express';
const router = Router();
import { register, login, getUserProfile } from '../controllers/userController.js';
import { auth } from '../middleware/auth';

router.post('/register', register);
router.post('/login', login);
router.get('/profile', auth, getUserProfile);

export default router;
