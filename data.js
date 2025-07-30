import doctorModel from './model/doctor.js';
import patientModel from './model/patient.js';
import express from 'express';

const router = express.Router();


router.get('/getdoctorId', async(req,res)=>{
    try{
        const doctor = await doctorModel.aggregate([
            {$project : {
                _id : 1,
                
                
            }}
        ])
        res.status(200).send(doctor)
    }
    catch(err){
        res.status(500).json({
            message : "Internal error"
        })
    }
})

router.get('/getpatientid', async(req,res)=>{
    try{
        const doctor = await patientModel.aggregate([
            {$project : {
                _id : 1,
                
            }}
        ])
        res.status(200).send(doctor)
    }
    catch(err){
        res.status(500).json({
            message : "Internal error"
        })
    }
})

export default router