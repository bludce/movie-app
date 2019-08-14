import { Router } from 'express';

import UserController from '../controllers/user';
import { authenticate } from '../middleware/authenticate';

const router = Router();

router.post('/register', async (req, res) => {
  UserController.registerUser(req, res);
});

router.post('/login', async (req, res) => {
  UserController.loginUser(req, res);
});

router.get('/me', authenticate, async (req, res) => {
  UserController.profileUser(req, res);
});

router.delete('/me', authenticate, async (req, res) => {
  UserController.deleteUser(req, res);
});

router.put('/logout', authenticate, async (req, res) => {
  UserController.logoutUser(req, res);
});

export default router;