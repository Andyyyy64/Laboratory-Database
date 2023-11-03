import express from "express";
import { getLabos, getLabosById, getLabosByStudentField, getLabosByProf, getAllProfName } from "../controllers/laboController";
import { authMiddleware } from "../middleware/authMiddleware";

const laboRouter: express.Router = express.Router();

laboRouter.get("/get/all", authMiddleware, getLabos);
laboRouter.get("/get/:labo_id", authMiddleware, getLabosById);
laboRouter.get("/get/field/:student_field", authMiddleware, getLabosByStudentField);
laboRouter.get("/get/prof/:prof", getLabosByProf);
laboRouter.get("/get/all/prof", getAllProfName);

export default laboRouter;