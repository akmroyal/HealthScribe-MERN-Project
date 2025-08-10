import express from 'express';

import {
  doctorRegister,
  patientRegister,
  doctorLogin,
  patientLogin,
} from "../controllers/authController.js";

const router = express.Router();

router.post('/doctor/register', doctorRegister);
router.post('/doctor/login', doctorLogin);
router.post('/patient/register', patientRegister);
router.post('/patient/login', patientLogin);

export default router;