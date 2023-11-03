import axios from "axios";

const API_URL = "http://localhost:3000/labo";

export const getLabos = async (searchTerm: string) => {
    const res = await axios.get(`${API_URL}/get/all`, {
        params: { searchTerm },
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
    });
    return res.data;
}

export const getLabosById = async (labo_id: number) => {
    const res = await axios.get(`${API_URL}/get/${labo_id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
    });
    return res.data;
}

export const getLabosByStudentField = async (student_field: string) => {
    const res = await axios.get(`${API_URL}/get/field/${student_field}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
    });
    return res.data;
}

export const getLabosByProf = async (prof: string) => {
    const res = await axios.get(`${API_URL}/get/prof/${prof}`);
    return res.data;
}

export const getAllProfName = async () => {
    const res = await axios.get(`${API_URL}/get/all/prof`);
    return res.data;
}

export const likedLabo = async (user_id: number, labo_id: number) => {
    const res = await axios.post(`${API_URL}/like`, { user_id, labo_id }, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
    });
    return res.data;
}

export const getLikeStatus = async (user_id: number, labo_id: number) => {
    const res = await axios.get(`${API_URL}/isLiked/${user_id}/${labo_id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
    });
    return res.data;
}

export const getLaboLikedNumber = async (labo_id: number) => {
    const res = await axios.get(`${API_URL}/like/${labo_id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
    });
    return res.data;
}