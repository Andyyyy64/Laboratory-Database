import axios from "axios";

const API_URL = import.meta.env.VITE_APP_SERVER_URL;

export const register = async (email: string, password: string, grade: number, field_of_interest: string, labo_id: number | null) => {
    const res = await axios.post(`${API_URL}/user/register`, { email, password, grade, field_of_interest, labo_id });
    return res.data;
}

export const getme = async () => {
    const res = await axios.get(`${API_URL}/user/me`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
    });
    return res.data;
}

export const getUserById = async (id: number) => {
    const res = await axios.get(`${API_URL}/user/get/${id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
    });
    return res.data;
}

export const getUserLabo = async (id: number) => {
    const res = await axios.get(`${API_URL}/user/get/labo/${id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
    });
    return res.data;
}

export const getUserIdByStudentId = async (student_id: string) => {
    const res = await axios.get(`${API_URL}/user/get/id/${student_id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
    });
    return res.data;
}