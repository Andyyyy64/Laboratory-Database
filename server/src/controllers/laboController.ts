import { Request, Response } from "express";
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

export const getLabos = async (req: Request, res: Response) => {
  const labos = await db.all("SELECT * FROM labos");
  console.log(labos);
  res.json(labos);
}

export const getLabosById = async (req: Request, res: Response) => {
  const { labo_id } = req.params;
  try {
    const labos = await db.get("SELECT * FROM labos WHERE labo_id = $1", [labo_id]);
    if (labos) {
      res.json(labos);
    } else {
      res.json({ message: "指定されたIDのラボは見つかりませんでした" });
    }
  } catch (err) {
    console.log(err);
    res.json({ message: err });
  }
}

export const getLabosByStudentField = async (req: Request, res: Response) => {
  const { student_field } = req.params;
  try {
    const labos = await db.all(
      "SELECT * FROM labos WHERE $1 = ANY(student_field)",
      [student_field]
    );

    if (labos && labos.length > 0) {
      res.json(labos);
    } else {
      res.json({ message: `指定されたフィールド（${student_field}）を含むラボは見つかりませんでした` });
    }
  } catch (err) {
    console.log(err);
    res.json({ message: "データベースエラーが発生しました" });
  }
}

export const getLabosByProf = async (req: Request, res: Response) => {
  const prof = req.params.prof;
  try {
    const labos = await db.all("SELECT * FROM labos WHERE prof = $1", [prof]);
    if (labos && labos.length > 0) {
      res.json(labos);
    } else {
      res.json({ message: "指定された教授のラボは見つかりませんでした" });
    }
  } catch (err) {
    console.log(err);
    res.json({ message: "データベースエラーが発生しました" });
  }
}