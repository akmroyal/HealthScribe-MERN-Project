import express from 'express';
import cors from 'cors'; 
import authRoutes from './routes/auth.js';

const app = express();
app.use(cors());   
app.use(express.json());   

app.use('/api/auth', authRoutes);
app.get('/',async (req, res) => {
   res.send('Welcome to the HealthScribe API');
})  

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
          