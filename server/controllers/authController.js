import { PrismaClient } from '@prisma/client';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { z } from "zod";
import dotenv from "dotenv";
dotenv.config();
const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET ;

 if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not set in environment variables");
}



const doctorRegisterSchema = z.object({
  name: z.string().min(1),
  email: z.email(),
  password: z.string().min(6),
  mobile: z.string().min(10).max(15),
  specialty: z.string(),
  licenseNumber: z.string(),
  yearsOfExperience: z.number(),
  boardCertification: z.string(),
  medicalSchool: z.string(),
  graduationYear: z.number(),
  address: z.string(),
  bio: z.string(),
  
})

const patientRegisterSchema = z.object({
  fullName: z.string().min(1),
  email: z.email(),
  password: z.string().min(6),
  mobile: z.string().min(10).max(15),
  age: z.number(),
  agreeTerms: z.boolean().default(false),
})

const loginSchema = z.object({
    email: z.email(),
    password: z.string().min(6),
})

export const doctorRegister = async (req, res) => {
    try{
        const data = doctorRegisterSchema.parse(req.body);

        const existingUser = await prisma.user.findUnique({
            where: { email: data.email } });
            if(existingUser) return res.status(400).json({error:'Email already registred'});
            
            const hashedPassword = await bcrypt.hash(data.password,10);

            const user = await prisma.user.create({
              data: {
                name: data.name,
                email: data.email,
                password: hashedPassword,
                role: "DOCTOR",
              },
            });
             await prisma.doctor.create({
               data: {
                 userId: user.id,
                 name: data.name,
                 email: data.email,
                 mobile: data.mobile,
                 specialty: data.specialty,
                 licenseNumber: data.licenseNumber,
                 yearsOfExperience: data.yearsOfExperience,
                 boardCertification: data.boardCertification,
                 medicalSchool: data.medicalSchool,
                 graduationYear: data.graduationYear,
                 address: data.address,
                 bio: data.bio,
                 verified: true,
               },
             });

            const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1d' });
            res.status(201).json({token,user: {id: user.id, name: user.name, email: user.email, role: user.role }});
    }catch(err){
        if(err instanceof z.ZodError) {
            return res.status(400).json({ error: err.errors });
        }
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const patientRegister = async (req, res) => {
  try {
    const data = patientRegisterSchema.parse(req.body);

    const existingUser = await prisma.user.findUnique({ where: { email: data.email } });
    if (existingUser) return res.status(400).json({ error: 'Email already registered' });

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await prisma.user.create({
      data: {
        name: data.fullName,
        email: data.email,
        password: hashedPassword,
        role: 'PATIENT',
      },
    });

    await prisma.patient.create({
      data: {
        userId: user.id,
        fullName: data.fullName,
        email: data.email,
        mobile: data.mobile,
        age: data.age,
        agreeTerms: data.agreeTerms,
      },
    });

    const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ error: err.errors });
    }
    res.status(500).json({ error: 'Patient registration failed' });
  }
};

export const doctorLogin = async (req, res) => {
  try {
    const data = loginSchema.parse(req.body);

    const user = await prisma.user.findUnique({ where: { email: data.email } });
    if (!user || user.role!=='DOCTOR') return res.status(400).json({ error: 'Invalid credentials' });

    const valid = await bcrypt.compare(data.password, user.password);
    if (!valid) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });

    res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ error: err.errors });
    }
    res.status(500).json({ error: 'Doctor login failed' });
  }
};

export const patientLogin = async (req, res) => {
  try {
    const data = loginSchema.parse(req.body);

    const user = await prisma.user.findUnique({ where: { email: data.email } });
    if (!user || user.role !== 'PATIENT') return res.status(400).json({ error: 'Invalid credentials' });

    const valid = await bcrypt.compare(data.password, user.password);
    if (!valid) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });

    res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ error: err.errors });
    }
    res.status(500).json({ error: 'Patient login failed' });
  }
};
