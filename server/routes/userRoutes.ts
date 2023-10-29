import express from 'express';
import { registerUser } from '../controllers/userController';

const userRouter: express.Router = express.Router();

userRouter.post("/register", registerUser);

export default userRouter;