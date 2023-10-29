import { Request, Response } from "express";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import db from "../utils/database";
import dotenv from "dotenv";

dotenv.config();

const saltRounds = 10;

type UserType = {
  id: number;
  student_id: string;
  email: string;
  password: string;
  grage: number;
  field_of_interest?: string;
  labo_id?: number;
  is_varified: boolean;
  verificationCode: number;
  created_at: Date;
};

export const registerUser = async (req: Request, res: Response) => {
  const { email, password, grade, field_of_interest, labo_id } = req.body;

  const verificationCode = Math.floor(100000 + Math.random() * 900000);

  const hashedPassword = await bcrypt.hash(password, saltRounds);

  try {
    if (!/^[sm].*@u-aizu.ac.jp$/.test(email)) {
      return res.status(400).send("無効なメールアドレスです。");
    }

    const isUserExists: UserType = await db.get(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    if (isUserExists) {
      return res.status(400).send("既に登録されているメールアドレスです。");
    }
    const student_id = email.split("@")[0];

    await db.run(
      "INSERT INTO users (student_id, email, password, grade, field_of_interest, labo_id, verification_code) VALUES ($1, $2, $3, $4, $5, $6, $7)",
      [
        student_id,
        email,
        hashedPassword,
        grade,
        field_of_interest,
        labo_id,
        verificationCode,
      ]
    );

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: email,
      subject: "メールアドレス確認のための認証コードです",
      text: `認証コードは ${verificationCode} です。`,
    });

    const user: UserType = await db.get(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    console.log(user);
    res
      .status(200)
      .json({ message: "ユーザー登録が完了しました。", user: user });
  } catch (err) {
    console.log(err);
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { grade, field_of_interest, labo_id } = req.body;

  try {
    await db.run(
      "UPDATE users SET grade = $1, field_of_interest = $2, labo_id = $3 WHERE id = $4",
      [grade, field_of_interest, labo_id, id]
    );

    const user: UserType = await db.get("SELECT * FROM users WHERE id = $1", [
      id,
    ]);

    res
      .status(200)
      .json({ message: "ユーザー情報を更新しました。", user: user });
  } catch (err) {
    console.log(err);
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await db.run("DELETE FROM users WHERE id = $1", [id]);

    res.status(200).json({ message: "ユーザーを削除しました。" });
  } catch (err) {
    console.log(err);
  }
};