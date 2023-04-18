import { Router, Request, Response } from 'express';
import passport from 'passport';
import AuthController from '../../../Controller/UserController/authUser';
import authMiddleware from '../../../middlewares/auth.middleware';

const authRouter: Router = Router();
const authController = new AuthController();

authRouter.get('/failure', (req: Request, res: Response) => {
    try {
        res.status(400).json({
            status: 400,
            message: 'Invalide password or national id',
        });
    } catch (error) {}
});

authRouter.post(
    '/login',
    passport.authenticate('local', {
        failureRedirect: '/api/users/auth/failure',
    }),
    authController.login
);

authRouter.get('/show', authMiddleware, authController.show);

authRouter.post('/logout', authMiddleware, authController.logout);

export default authRouter;
