import { Request, Response  } from "express";
import db from "../utils/database";

type LaboType = {
  id: number;
  name: string;
  prof: string;
  prof_email: string;
  description: string;
  prerequisites: string;
  room_number: string;
  student_field: string;
};