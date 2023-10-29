import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import db from "../utils/database";

dotenv.config();

type UserType = {
  id: number;
  student_id: string;
  email: string;
  password: string;
  grage: number;
  field_of_interest: string;
  labo_id: number;
  is_verified: boolean;
  verification_code: number;
};

const secretKey = process.env.JWT_SECRET_KEY ?? "";

export const verifyUser = async (req: Request, res: Response) => {
  const { email, verificationCode } = req.body;

  try {
    const user = await db.get(
      "SELECT * FROM users WHERE email = $1 AND verification_code = $2",
      [email, verificationCode]
    );
    if (!user) {
      return res.status(400).send("認証コードが間違っています。");
    }

    await db.run("UPDATE users SET is_verified = true WHERE email = $1", [
      email,
    ]);

    res.send("認証が完了しました。");
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    if (!/^[sm].*@u-aizu.ac.jp$/.test(email)) {
      return res.status(400).send("無効なメールアドレスです。");
    }

    const user: UserType = await db.get(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (!user) {
      console.log("ユーザーが見つかりませんでした。" + email);
      return res.status(400).send("ユーザーが見つかりませんでした。");
    }
    
    if(!user.is_verified) {
      return res.status(400).send("メールアドレスが認証されていません。");
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      console.log("パスワードが間違っています。");
      return res.status(400).send("パスワードが間違っています。");
    }

    const token: string = jwt.sign(
      {
        id: user.id,
        email: user.email,
        student_id: user.student_id,
        grade: user.grage,
        labo_id: user.labo_id,
        interest: user.field_of_interest,
      },
      secretKey,
      { expiresIn: "1w" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    console.log("ログイン成功" + user.email + " " + token);
    res.status(200).send("ログイン成功");
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};
