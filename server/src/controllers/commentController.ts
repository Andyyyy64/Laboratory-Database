import { Request, Response } from "express";
import db from "../utils/database";

type CommnetType = {
    id: number;
    labo_id: number;
    user_id: number;
    comment: string;
    timestamp: Date;
}

export const addComment = async (req: Request, res: Response) => {
    const { labo_id, user_id, comment } = req.body;
    try {
        const newComment = await db.run(
            "INSERT INTO comments (labo_id, user_id, comment) VALUES ($1, $2, $3)",
            [labo_id, user_id, comment]
        );
        console.log(newComment)
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
        const comment = await db.run("DELETE FROM comments WHERE id = $1", [comment_id]);
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
        const newCommnet = await db.run("UPDATE comments SET comment = $1 WHERE id = $2", [comment, comment_id]);
        res.json({ message: "コメントを編集しました" });
    } catch (err) {
        console.log(err);
        res.json({ message: "データベースエラーが発生しました" })
    }
}