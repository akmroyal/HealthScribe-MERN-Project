import express from 'express';
import { login, signupDoctor, signupPatient, me, logout } from '../controllers/authController.js'

const router = express.Router();

router.post('/signup/doctor', signupDoctor);
router.post('/signup/patient', signupPatient);
router.post('/login', login);
router.get('/me', me);
router.post('/logout', logout);


export default router;