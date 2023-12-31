import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getComments, addComment, deleteComment } from "../../api/comment";
import { likedLabo, getLikeStatus, getLaboLikedNumber } from "../../api/labo";
import { getUserLabo, getUserIdByStudentId } from "../../api/user";

import { IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

type Props = {
    labo_id: number;
    prof: string;
    prof_email: string;
    description: string;
    prerequisites: string;
    room_number: string;
    student_field: string[];
}

type CommnetType = {
    id: number;
    labo_id: number;
    user_id: number;
    comment: string;
    timestamp: Date;
    student_id: string;
}

type LikeStatus = {
    liked: boolean;
}

type UserId = {
    id: number;
}

type studentId = {
    student_id: string;
}

export const LaboInfo: React.FC<Props> = ({ labo_id, prof, prof_email, description, prerequisites, room_number, student_field }) => {
    const [comments, setComments] = useState<Array<CommnetType>>([]);
    const [comment, setComment] = useState<string>("");
    const [likedNumber, setLikedNumber] = useState<number>(0);
    const [isLiked, setIsLiked] = useState<boolean>(false);
    const [laboUsers, setLaboUsers] = useState<Array<string>>([]);
    const navi = useNavigate();

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const res = await getComments(labo_id);
                setComments(res);
            } catch (err) {
                console.log(err);
            }
        }
        fetchComments();
    }, [comments, labo_id]);

    useEffect(() => {
        const checkLiked = async () => {
            const userId = Number(localStorage.getItem('user_id'));
            const existingLike: LikeStatus = await getLikeStatus(userId, labo_id);
            setIsLiked(existingLike.liked);
        }
        checkLiked();
    }, [labo_id]);

    useEffect(() => {
        const fetchLaboUsers = async () => {
            try {
                const res = await getUserLabo(labo_id);
                const users: string[] = [];
                res.forEach((user: studentId) => {
                    users.push(user.student_id);
                })
                setLaboUsers(users);
            } catch (err) {
                console.log(err);
            }
        }
        fetchLaboUsers();
    }, [labo_id])

    useEffect(() => {
        const fetchLikedNumber = async () => {
            const res = await getLaboLikedNumber(labo_id);
            setLikedNumber(res.liked_number);
        }
        fetchLikedNumber();
    }, [labo_id, likedNumber]);

    const handleAddComment = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await addComment(labo_id, Number(localStorage.getItem('user_id')), comment);
            alert("コメントを追加しました");
            setComment("");
        } catch (err) {
            console.log(err);
        }
    }

    const handleDeleteComment = async (id: number) => {
        try {
            await deleteComment(id);
            alert("コメントを削除しました");
        } catch (err) {
            console.log(err);
        }
    }

    const handleLike = async () => {
        const userId = Number(localStorage.getItem('user_id'));
        await likedLabo(userId, labo_id);
        const existingLike: LikeStatus = await getLikeStatus(userId, labo_id);
        setIsLiked(existingLike.liked);

        const updatedLikedNumber = await getLaboLikedNumber(labo_id);
        setLikedNumber(updatedLikedNumber.liked_number);
    }

    const handleSudentIdClick = async (student_id: string) => {
        const res: UserId = await getUserIdByStudentId(student_id);
        navi(`/profile/${res.id}`);
    };

    return (
        <>
            <div className="bg-white px-64">
                <div className="mt-8">
                    <div className="flex">
                        <div className="flex-none text-xl font-medium text-black">Professor</div>
                        <div className="ml-4 grow text-xl font-medium text-black">{prof}</div>
                        <div className="flex-none text-xl font-medium text-black">{prof_email}</div>
                    </div>
                    <div className="border-b-slate-800 border-b-2"></div>
                    <div className="mt-4 bg-gray-100 p-4 text-black">
                        {description}<br />
                        {prerequisites && "前提条件: " + prerequisites} <br />
                        {"オフィス: " + room_number + " / " + "フィールド: " + student_field}<br />
                        {
                            laboUsers ? (
                                <div className={`${laboUsers.length > 0 ? "" : "hidden"}`}>
                                    <div className="border-b-slate-500 border-b-2 mt-3 mb-3"></div>
                                    <p className="font-bold">配属生徒</p>
                                    {
                                        laboUsers.map((item: string, index: number) => (
                                            <p key={index} className="text-black font-bold hover:cursor-pointer w-[80px]" onClick={() => handleSudentIdClick(item)}>{item}</p>
                                        ))
                                    }
                                </div>
                            ) : <></>
                        }
                    </div>
                </div>
                <div>
                    <button className={`${isLiked ? ' bg-pink-400' : 'bg-blue'} text-white p-2 rounded-hull mt-3 mb-2`} onClick={() => handleLike()}>
                        {isLiked ? 'あたなはこの研究室に興味を持っています！' : 'この研究室興味あり！'}
                    </button>
                    <h2 className="text-black">{likedNumber}人がこの研究室に興味を持っています!</h2>
                </div>
                <div className="mt-4">
                    <div className="flex flex-row">
                        <div className="text-xl font-medium text-black">Comments</div>
                        {
                            comments.length > 0 && <div className="text-gray-500 ml-3 mt-0.5">{comments.length}comments</div>

                        }
                    </div>
                    <div className="border-b-slate-800 border-b-2"></div>
                    <div className="mt-4">
                        <form onSubmit={handleAddComment}>
                            <textarea className="w-full h-24 p-4 border rounded-lg" placeholder="Write your comment here..." value={comment} onChange={e => setComment(e.target.value)}></textarea>
                            <button className="bg-blue-500 text-white p-2 rounded shadow-lg mb-5">Add Comment</button>
                        </form>
                    </div>
                    <div className="mt-4">
                        {
                            Array.isArray(comments) &&
                            comments.map((item: CommnetType, index: number) => (
                                <div key={index}
                                    className={`flex bg-gray-100 p-4 rounded-lg mt-4 ${item.user_id === Number(localStorage.getItem('user_id')) ? ' border-l-8 border-l-teal-400' : ''}`}
                                >
                                    <div className="flex-none text-lg font-medium text-black hover:cursor-pointer" onClick={() => handleSudentIdClick(item.student_id)}>{item.student_id}</div>
                                    <div className="grow text-black ml-5 mr-5 text-lg font-bold">{item.comment}</div>
                                    <div className="flex-none text-gray-500 text-lg mt-1.5 mr-2">{new Date(item.timestamp).toDateString()}</div>
                                    {
                                        item.user_id === Number(localStorage.getItem('user_id')) ? (
                                            <>
                                                <IconButton onClick={() => handleDeleteComment(item.id)} className=" text-white rounded-full">
                                                    <DeleteIcon color="error" />
                                                </IconButton>
                                            </>
                                        ) : (<> <h3 className="bg-gray-100 ml-5 p-1 text-gray-100">ni</h3></>)
                                    }
                                </div>
                            ))
                        }
                    </div>
                    <div className="border-b-white border-b-2 mt-8"></div>
                </div>
            </div>
        </>
    )
}