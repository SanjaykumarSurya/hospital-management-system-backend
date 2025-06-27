import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import admin from './routers/admin.js';
import doctor from './routers/doctor.js';
import appointement from './routers/appointments.js';
import patient from './routers/patient.js';
import report from './routers/report.js';
import doctorRouter from './routers/doctor.js';
import patientRouter from './routers/patient.js'


dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const mongodb = process.env.MONGO_URL 

mongoose.connect(mongodb)
.then(()=> {
    console.log("Database connted")
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
app.use('/api', doctorRouter);
app.use('/api', patientRouter);
app.use('/api',admin, doctor, appointement, patient, report)

app.listen(port, (err)=>{
    if(err) throw err;
    console.log(`Server Running port is ${port}`)
})