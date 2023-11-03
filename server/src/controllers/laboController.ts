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
  const searchTerm = req.query.searchTerm || "";
    const query = `
        SELECT * FROM labos 
        WHERE name ILIKE $1 
        OR prof ILIKE $1 
        OR prof_email ILIKE $1 
        OR description ILIKE $1 
        OR prerequisites ILIKE $1 
        OR room_number ILIKE $1 
    `;
    try {
        const labos = await db.all(query, [`%${searchTerm}%`]);
        res.json(labos);
    } catch (err) {
        console.log(err);
        res.json({ message: "データベースエラーが発生しました" });
    }
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

export const getAllProfName = async (req: Request, res: Response) => {
  try {
    const profs = await db.all("SELECT DISTINCT prof FROM labos");
    if (profs && profs.length > 0) {
      res.json(profs);
    } else {
      res.json({ message: "教授名が見つかりませんでした" });
    }
  } catch (err) {
    console.log(err);
    res.json({ message: "データベースエラーが発生しました" });
  }
}