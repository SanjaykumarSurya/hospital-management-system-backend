import express from 'express';
import * as adminController from '../controller/admin.js';

const router = express.Router();

router.post('/appointments', (req, res) => {
    const appointment = req.body;
    adminController.createAppointment(req).then((result) => {
        if (!result) {
            res.status(500).send(result);
            return result;
        }
        res.status(201).json(result);
    })
        .catch(err => res.status(500).send({
            message: err.message
        }))
})

router.get('/appointments', (req, res) => {
    adminController.getAppointment(req).then((result) => {
        if (!result) {
            res.status(500).send(result);
            return result;
        }
        res.status(200).send(result)
    })
        .catch(err => res.status(500).send({
            message: err.message
        }))
})

router.put('/appointments/:id', (req, res) => {
    adminController.updateAppointment(req).then((result) => {
        if (!result) {
            return res.status(500).send(result);
            
        }
        res.status(200).send(result)
    })
        .catch(err => res.status(500).send({
            message: err.message
        }))
})

router.delete('/appointments/:appointmentId', (req, res) => {
    adminController.deleteAppointment(req).then((result) => {
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

router.get('/appointments/:appointmentId', (req, res) => {
    adminController.getSingleAppointment(req).then((result) => {
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