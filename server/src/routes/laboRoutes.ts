import express from "express";
import { getLabos, getLabosById, getLabosByStudentField, getLabosByProf } from "../controllers/laboController";

const laboRouter: express.Router = express.Router();

laboRouter.get("/get/all", getLabos);
laboRouter.get("/get/:labo_id", getLabosById);
laboRouter.get("/get/field/:student_field", getLabosByStudentField);
laboRouter.get("/get/prof/:prof", getLabosByProf);

export default laboRouter;