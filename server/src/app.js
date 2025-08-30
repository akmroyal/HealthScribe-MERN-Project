import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

// Routes   
import authRoute from './routes/authRoutes.js';

dotenv.config();
const app = express();

// Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoute);


app.get('/', (req, res) => {
    res.send('Health Scribe Server');
})

export default app;