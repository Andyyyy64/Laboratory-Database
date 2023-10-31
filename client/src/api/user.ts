import axios from "axios";

const API_URL = 'http://localhost:3000/user/register';

export const register = async (email: string, password: string, grade: number, field_of_interest: string, labo_id: number) => {
    const res = await axios.post(API_URL, { email, password, grade, field_of_interest, labo_id });
    return res.data;
}