import express from "express";
import { addComment, getComments, deleteComment, editComment } from "../controllers/commentController";

const commentRouter: express.Router = express.Router();

commentRouter.post("/add", addComment);
commentRouter.get("/get/:labo_id", getComments);
commentRouter.delete("/delete/:comment_id", deleteComment);
commentRouter.put("/edit/:comment_id", editComment);

export default commentRouter;