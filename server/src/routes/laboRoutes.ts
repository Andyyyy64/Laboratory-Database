import express from "express";
import { getLabos, getLabosById, getLabosByStudentField, getLabosByProf, getAllProfName, likedLabo, getLikeStatus, getLaboLikedNumber } from "../controllers/laboController";
import { authMiddleware } from "../middleware/authMiddleware";

const laboRouter: express.Router = express.Router();

laboRouter.get("/get/all", authMiddleware, getLabos);
laboRouter.get("/get/:labo_id", authMiddleware, getLabosById);
laboRouter.get("/get/field/:student_field", authMiddleware, getLabosByStudentField);
laboRouter.get("/get/prof/:prof", getLabosByProf);
laboRouter.get("/get/all/prof", getAllProfName);
laboRouter.post("/like", authMiddleware, likedLabo);
laboRouter.get("/isLiked/:user_id/:labo_id", authMiddleware, getLikeStatus);
laboRouter.get("/like/:labo_id", authMiddleware, getLaboLikedNumber);

export default laboRouter;