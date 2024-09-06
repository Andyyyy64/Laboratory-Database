import express, { Request, Response } from "express";
import {
  registerUser,
  updateUser,
  deleteUser,
  getStudentIdByUserId,
  getUserById,
  getUserLabo,
  getUserIdByStudentId,
  assginLabo,
  getAssginLabo,
  updateAssginLabo
} from "../controllers/userController";
import { authMiddleware } from "../middleware/authMiddleware";
import db from "../utils/database";
import { JwtPayload } from "jsonwebtoken";

interface DecodedRequest extends Request {
  decoded?: string | JwtPayload | undefined;
}

const userRouter: express.Router = express.Router();

userRouter.post("/register", registerUser);
userRouter.put("/edit/:id", authMiddleware, updateUser);
userRouter.delete("/delete/:id", authMiddleware, deleteUser);
userRouter.get("/get/student_id/:id", authMiddleware, getStudentIdByUserId)
userRouter.get("/get/:id", authMiddleware, getUserById);
userRouter.get("/get/labo/:labo_id", authMiddleware, getUserLabo);
userRouter.get("/get/id/:student_id", authMiddleware, getUserIdByStudentId);
userRouter.put('/assign/:id', authMiddleware, assginLabo);
userRouter.get('/get/assign/:id', authMiddleware, getAssginLabo);
userRouter.put('/update/assign/:id', authMiddleware, updateAssginLabo);
userRouter.get("/me", authMiddleware, async (req: DecodedRequest, res: Response) => {
  try {
    // JWTトークンから取得したユーザーIDを使用してDBから最新のユーザー情報を取得
    const userId = (req.decoded as JwtPayload).id;
    const user = await db.get("SELECT * FROM users WHERE id = $1", [userId]);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch user data" });
  }
});

export default userRouter;
