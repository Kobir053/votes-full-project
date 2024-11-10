import { Router, Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthService } from '../services/auth.service';
import { config } from '../config';
import { authWithBearer } from '../middleware/auth';
import { handleLogin, handleRegister } from '../controllers/authController';

const router = Router();

// Register endpoint
router.route('/register').post(handleRegister);

// Login with Bearer Token
router.route('/login').post(handleLogin);

// Login with Cookie
// router.post('/login/cookie', async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const { username, password } = req.body;
//     const user = await AuthService.validateUser(username, password);

//     const token = jwt.sign(
//       { userId: user.id, username: user.username },
//       config.JWT_SECRET,
//       { expiresIn: '24h' }
//     );

//     res.cookie('jwt', token, config.COOKIE_OPTIONS);
//     res.json({ message: 'Login successful' });
//   } catch (error) {
//     res.status(401).json({ message: 'Invalid credentials' });
//   }
// });

// Test protected routes
// router.get('/protected/token', authWithBearer, (req: Request, res: Response, next: NextFunction) => {
//   try {
//     res.json({ message: 'Protected route accessed with token', user: req.user });
//   } catch (error) {
//     next(error);
//   }
// }); 

export default router;