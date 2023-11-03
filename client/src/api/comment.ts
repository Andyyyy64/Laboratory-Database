import axios from 'axios';

const API_URL = 'http://localhost:3000/comment';

export const addComment = async (labo_id: number, user_id: number, comment: string) => {
    const res = await axios.post(`${API_URL}/add`, { labo_id, user_id, comment }, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
    });
    return res.data;
}

export const getComments = async (labo_id: number) => {
    const res = await axios.get(`${API_URL}/get/${labo_id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
    });
    return res.data;
}

export const deleteComment = async (comment_id: number) => {
    const res = await axios.delete(`${API_URL}/delete/${comment_id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        }

    });
    return res.data;
}

export const editComment = async (comment_id: number, comment: string) => {
    const res = await axios.put(`${API_URL}/edit/${comment_id}`, { comment }, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
    });
    return res.data;
}