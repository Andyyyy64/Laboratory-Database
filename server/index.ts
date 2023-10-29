import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRouter from './src/routes/authRoutes';
import userRouter from './src/routes/userRoutes';

dotenv.config();

const app: express.Express = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(cors({
    origin: "*", // allow to server to accept request from different origin
    credentials: true, // allow session cookie from browser to pass through
    optionsSuccessStatus: 200
}))

app.use(express.json()); // parse incoming request with JSON payloads
app.use(express.urlencoded({ extended: true })); // parse incoming request with urlencoded payloads

app.use('/auth', authRouter);
app.use('/user', userRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})