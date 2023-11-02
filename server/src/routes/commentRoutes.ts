import express from "express";
import { addComment, getComments, deleteComment, editComment } from "../controllers/commentController";
import { authMiddleware } from "../middleware/authMiddleware";

const commentRouter: express.Router = express.Router();

commentRouter.post("/add", authMiddleware, addComment);
commentRouter.get("/get/:labo_id", authMiddleware, getComments);
commentRouter.delete("/delete/:comment_id", authMiddleware, deleteComment);
commentRouter.put("/edit/:comment_id", authMiddleware, editComment);

export default commentRouter;