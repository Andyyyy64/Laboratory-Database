import React, { useState, useEffect, useContext } from 'react';
import { getComments, addComment, deleteComment } from '../../api/comment';
import { likedLabo, getLikeStatus, getLaboLikedNumber } from '../../api/labo';
import { getUserLabo } from '../../api/user';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { AuthContext } from '../../context/authContext';

type Props = {
  labo_id: number;
  prof: string;
  prof_email: string;
  description: string;
  prerequisites: string;
  room_number: string;
  student_field: string[];
};

type CommentType = {
  id: number;
  labo_id: number;
  user_id: number;
  comment: string;
  timestamp: Date;
  student_id: string;
};

type LikeStatus = {
  liked: boolean;
};

type StudentId = {
  student_id: string;
};

export const LaboInfo: React.FC<Props> = ({
  labo_id,
  prof,
  prof_email,
  description,
  prerequisites,
  room_number,
  student_field,
}) => {
  const [comments, setComments] = useState<Array<CommentType>>([]);
  const [comment, setComment] = useState<string>("");
  const [likedNumber, setLikedNumber] = useState<number>(0);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [laboUsers, setLaboUsers] = useState<Array<string>>([]);
  const authContext = useContext(AuthContext);
  if (authContext === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  const { user } = authContext;

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await getComments(labo_id);
        setComments(res);
      } catch (err) {
        console.log(err);
      }
    };
    fetchComments();
  }, [labo_id]);

  useEffect(() => {
    const checkLiked = async () => {
      if (user) {
        const existingLike: LikeStatus = await getLikeStatus(user.id, labo_id);
        setIsLiked(existingLike.liked);
      }
    };
    checkLiked();
  }, [labo_id, user]);

  useEffect(() => {
    const fetchLaboUsers = async () => {
      try {
        const res = await getUserLabo(labo_id);
        const users: string[] = res.map((user: StudentId) => user.student_id);
        setLaboUsers(users);
      } catch (err) {
        console.log(err);
      }
    };
    fetchLaboUsers();
  }, [labo_id]);

  useEffect(() => {
    const fetchLikedNumber = async () => {
      const res = await getLaboLikedNumber(labo_id);
      setLikedNumber(res.liked_number);
    };
    fetchLikedNumber();
  }, [labo_id, likedNumber]);

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      alert("ログインしてください。");
      return;
    }
    try {
      await addComment(labo_id, user.id, comment);
      alert("コメントを追加しました");
      setComment("");
      const res = await getComments(labo_id);
      setComments(res);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteComment = async (id: number) => {
    try {
      await deleteComment(id);
      alert("コメントを削除しました");
      const res = await getComments(labo_id);
      setComments(res);
    } catch (err) {
      console.log(err);
    }
  };

  const handleLike = async () => {
    if (!user) {
      alert("ログインしてください。");
      return;
    }
    await likedLabo(user.id, labo_id);
    const existingLike: LikeStatus = await getLikeStatus(user.id, labo_id);
    setIsLiked(existingLike.liked);

    const updatedLikedNumber = await getLaboLikedNumber(labo_id);
    setLikedNumber(updatedLikedNumber.liked_number);
  };

  return (
    <div className="bg-white px-4 sm:px-16 lg:px-64">
      <div className="mt-8">
        <div className="flex flex-col sm:flex-row">
          <div className="flex-none text-xl font-medium text-black">
            Professor
          </div>
          <div className="mt-2 sm:mt-0 sm:ml-4 grow text-xl font-medium text-black">
            {prof}
          </div>
          <div className="flex-none text-xl font-medium text-black mt-2 sm:mt-0">
            {prof_email}
          </div>
        </div>
        <div className="border-b-slate-800 border-b-2 mt-4"></div>
        <div className="mt-4 bg-gray-100 p-4 text-black">
          <div>
            {description
              .replace(/\\n/g, "\n")
              .split("\n")
              .map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
          </div>
          <p>{prerequisites && "前提条件: " + prerequisites}</p>
          <p>
            {"オフィス: " +
              room_number +
              " / " +
              "フィールド: " +
              student_field.join(", ")}
          </p>
          {laboUsers.length > 0 && (
            <div className="mt-3 mb-3">
              <div className="border-b-slate-500 border-b-2"></div>
              <p className="font-bold">配属生徒</p>
              <div className="flex flex-wrap gap-2">
                {laboUsers.map((item: string, index: number) => (
                  <p key={index} className="text-black font-bold">
                    {item}
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="mt-4">
        <button
          className={`${
            isLiked ? "bg-pink-400" : "bg-blue"
          } text-white p-2 rounded-full mt-3 mb-2 w-full sm:w-auto`}
          onClick={handleLike}
        >
          {isLiked
            ? "あたなはこの研究室に興味を持っています！"
            : "この研究室興味あり！"}
        </button>
        <h2 className="text-black">
          {likedNumber}人がこの研究室に興味を持っています!
        </h2>
      </div>
      <div className="mt-4">
        <div className="flex flex-col sm:flex-row sm:items-center">
          <div className="text-xl font-medium text-black">Comments</div>
          {comments.length > 0 && (
            <div className="text-gray-500 mt-2 sm:mt-0 sm:ml-3">
              {comments.length} comments
            </div>
          )}
        </div>
        <div className="border-b-slate-800 border-b-2 mt-2"></div>
        <div className="mt-4">
          <form onSubmit={handleAddComment}>
            <textarea
              className="w-full h-24 p-4 border rounded-lg"
              placeholder="Write your comment here..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            ></textarea>
            <button className="bg-blue-500 text-white p-2 rounded shadow-lg mb-5 w-full sm:w-auto">
              Add Comment
            </button>
          </form>
        </div>
        <div className="mt-4">
          {Array.isArray(comments) &&
            comments.map((item: CommentType, index: number) => (
              <div
                key={index}
                className={`flex flex-col sm:flex-row bg-gray-100 p-4 rounded-lg mt-4 ${
                  user && item.user_id === user.id
                    ? "border-l-8 border-l-teal-400"
                    : ""
                }`}
              >
                <div className="flex-none text-lg font-medium text-black">
                  {item.student_id}
                </div>
                <div className="grow text-black mt-2 sm:mt-0 sm:ml-5 text-lg font-bold">
                  {item.comment}
                </div>
                <div className="flex-none text-gray-500 text-lg mt-2 sm:mt-1.5 sm:mr-2">
                  {new Date(item.timestamp).toDateString()}
                </div>
                {user && item.user_id === user.id && (
                  <IconButton
                    onClick={() => handleDeleteComment(item.id)}
                    className="mt-2 sm:mt-0 text-white rounded-full"
                  >
                    <DeleteIcon color="error" />
                  </IconButton>
                )}
              </div>
            ))}
        </div>
        <div className="border-b-white border-b-2 mt-8"></div>
      </div>
    </div>
  );
};
