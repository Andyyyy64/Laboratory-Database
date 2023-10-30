import axios from 'axios';

const API_URL = 'http://localhost:3000/auth/login';

export const login =async (email: string, password: string) => {
    const res = await axios.post(API_URL, { email, password });
    return res.data;
}