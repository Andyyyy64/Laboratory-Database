import { Request, Response } from "express";
import db from "../utils/database";

export const addComment = async (req: Request, res: Response) => {
    const { labo_id, user_id, comment } = req.body;
    try {
        const user = await db.get("SELECT student_id FROM users WHERE id = $1", [user_id]);

        await db.run(
            "INSERT INTO comments (labo_id, user_id, comment, student_id) VALUES ($1, $2, $3,$4)",
            [labo_id, user_id, comment, user.student_id]
        );
        res.json({ message: "コメントを投稿しました" });
    } catch (err) {
        console.log(err);
        res.json({ message: "データベースエラーが発生しました" });
    }
}

export const getComments = async (req: Request, res: Response) => {
    const { labo_id } = req.params;

    try {
        const comments = await db.all("SELECT * FROM comments WHERE labo_id = $1", [labo_id]);
        if (comments && comments.length > 0) {
            res.json(comments);
        } else {
            res.json({ message: "指定されたラボのコメントはありません" });
        }
    } catch (err) {
        console.log(err);
        res.json({ message: "データベースエラーが発生しました" });
    }
}

export const deleteComment = async (req: Request, res: Response) => {
    const { comment_id } = req.params;
    try {
        await db.run("DELETE FROM comments WHERE id = $1", [comment_id]);
        res.json({ message: "コメントを削除しました" });
    } catch (err) {
        console.log(err);
        res.json({ message: "データベースエラーが発生しました" });
    }
}

export const editComment = async (req: Request, res: Response) => {
    const { comment_id } = req.params;
    const { comment } = req.body;
    try {
        await db.run("UPDATE comments SET comment = $1 WHERE id = $2", [comment, comment_id]);
        res.json({ message: "コメントを編集しました" });
    } catch (err) {
        console.log(err);
        res.json({ message: "データベースエラーが発生しました" })
    }
}