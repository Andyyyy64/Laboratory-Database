import axios from "axios";

const API_URL = 'http://localhost:3000/user';

export const register = async (email: string, password: string, grade: number, field_of_interest: string, labo_id: number | null) => {
    const res = await axios.post(`${API_URL}/register`, { email, password, grade, field_of_interest, labo_id });
    return res.data;
}

export const getme = async () => {
    const res = await axios.get(`${API_URL}/me`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
    });
    return res.data;
}

export const getUserById = async (id: number) => {
    const res = await axios.get(`${API_URL}/get/${id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
    });
    return res.data;
}