import express from 'express';
import * as adminController from '../controller/admin.js';
import { createDoctor } from '../controller/admin.js';

const router = express.Router();

router.post('/doctors', (req, res) => {
    const doctor = req.body;
    adminController.createDoctor(req).then((result) => {
        if (!result) {
            res.status(500).send(result);
            return
        }
        res.status(201).json(result);
    })
        .catch(err => res.status(500).send({
            message: err.message
        }))
})
// router.post('/doctors', adminController.createDoctor)

router.get('/doctors', (req,res)=>{
     adminController.getDoctor(req).then((result) => {
        if (!result) {
            res.status(500).send(result);
            return
        }
        res.status(201).send(result)
    })
        .catch(err => res.status(500).send({
            message: err.message
        }))
})

router.put('/doctors', (req,res)=>{
     adminController.updateDoctor(req).then((result) => {
        if (!result) {
            res.status(500).send(result);
            return
        }
        res.status(200).send(result)
    })
        .catch(err => res.status(500).send({
            message: err.message
        }))
})

router.delete('/doctors/:doctorId',(req,res)=>{
     adminController.deleteDoctor(req).then((result) => {
        if (!result) {
            res.status(500).send(result);
            return
        }
        res.status(201).send(result)
    })
        .catch(err => res.status(500).send({
            message: err.message
        }))
})


router.get('/doctors/:doctorId',(req,res)=>{
    adminController.getSingleDoctor(req).then((result) => {
        if (!result) {
            res.status(500).send(result);
            return
        }
        res.status(201).send(result)
    })
        .catch(err => res.status(500).send({
            message: err.message
        }))
})


export default router