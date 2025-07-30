import express from 'express';
import * as adminController from '../controller/admin.js';

const router = express.Router();

router.post('/patients', (req, res) => {
    // const patient = req.body;
    adminController.createPatient(req).then((result) => {
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

router.get('/patients', (req, res) => {
    adminController.getPatient(req).then((result) => {
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

router.put('/patients/:id', (req, res) => {
    adminController.updatePatient(req).then((result) => {
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

router.delete('/patients/:patientId', (req, res) => {
    adminController.deletePatient(req).then((result) => {
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

router.get('/patients/:patientId', (req, res) => {
    adminController.getSinglePatient(req).then((result) => {
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