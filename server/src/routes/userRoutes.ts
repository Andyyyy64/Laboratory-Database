import express, { Request, Response } from "express";
import {
  registerUser,
  updateUser,
  deleteUser,
} from "../controllers/userController";
import { authMiddleware } from "../middleware/authMiddleware";
import { JwtPayload } from "jsonwebtoken";

interface DecodedRequest extends Request {
  decoded?: string | JwtPayload | undefined;
}

const userRouter: express.Router = express.Router();

userRouter.post("/register", registerUser);
userRouter.put("/edit/:id", authMiddleware, updateUser);
userRouter.delete("/delete/:id", authMiddleware, deleteUser);
userRouter.get("/me", authMiddleware, (req: DecodedRequest, res: Response) => {
  res.status(200).json({ user: req.decoded });
});

export default userRouter;
