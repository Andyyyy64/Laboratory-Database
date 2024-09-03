import axios from "axios";

const API_URL = import.meta.env.VITE_APP_SERVER_URL;

export const getLabos = async (searchTerm?: string) => {
    const res = await axios.get(`${API_URL}/labo/get/all`, {
        params: { searchTerm },
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
    });
    return res.data;
}

export const getLabosById = async (labo_id: number) => {
    const res = await axios.get(`${API_URL}/labo/get/${labo_id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
    });
    return res.data;
}

export const getLabosByStudentField = async (student_field: string) => {
    const res = await axios.get(`${API_URL}/labo/get/field/${student_field}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
    });
    return res.data;
}

export const getLabosByProf = async (prof: string) => {
    const res = await axios.get(`${API_URL}/labo/get/prof/${prof}`);
    return res.data;
}

export const getAllProfName = async () => {
    const res = await axios.get(`${API_URL}/labo/get/all/prof`);
    return res.data;
}

export const likedLabo = async (user_id: number, labo_id: number) => {
    const res = await axios.post(`${API_URL}/labo/like`, { user_id, labo_id }, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
    });
    return res.data;
}

export const getLikeStatus = async (user_id: number, labo_id: number) => {
    const res = await axios.get(`${API_URL}/labo/isLiked/${user_id}/${labo_id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
    });
    return res.data;
}

export const getLaboLikedNumber = async (labo_id: number) => {
    const res = await axios.get(`${API_URL}/labo/like/${labo_id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
    });
    return res.data;
}