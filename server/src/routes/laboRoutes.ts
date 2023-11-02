import express from "express";
import { getLabos, getLabosById, getLabosByStudentField, getLabosByProf } from "../controllers/laboController";
import { authMiddleware } from "../middleware/authMiddleware";

const laboRouter: express.Router = express.Router();

laboRouter.get("/get/all", authMiddleware, getLabos);
laboRouter.get("/get/:labo_id", authMiddleware, getLabosById);
laboRouter.get("/get/field/:student_field", authMiddleware, getLabosByStudentField);
laboRouter.get("/get/prof/:prof", authMiddleware, getLabosByProf);

export default laboRouter;