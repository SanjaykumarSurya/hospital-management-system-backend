import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import admin from './routers/admin.js';
import doctor from './routers/doctor.js';
import appointment from './routers/appointments.js';
import patient from './routers/patient.js';
import report from './routers/report.js';
import doctorRouter from './routers/doctor.js';
import patientRouter from './routers/patient.js';
import appointmentRouter from './routers/appointments.js';
import reportRouter from './routers/report.js';
import downloadRouter from './routers/download.js';
import data from './data.js';



dotenv.config();

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const port = process.env.PORT || 3000;
const mongodb = process.env.MONGO_URL 

mongoose.connect(mongodb)
.then(()=> {
    console.log("Database Connected")
})
.catch((err)=>{
    console.log("Database ERROR: ", err)
})

app.use(express.json());
app.use(express.urlencoded({extended : true}))
app.use(cors())
app.use(cors({
  origin: ['http://localhost:4200'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use('/api', doctorRouter, data);
app.use('/api', patientRouter);
app.use('/api', appointmentRouter);
app.use('/api', reportRouter)
app.use('/api', downloadRouter);
app.use('/api',admin, doctor, appointment, patient, report);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.listen(port, (err)=>{
    if(err) throw err;
    console.log(`Server Running port is ${port}`)
})