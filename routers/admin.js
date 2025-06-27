import express from 'express';
import * as adminController from '../controller/admin.js';

const router = express.Router();

router.post('/signup', (req, res) => {
    adminController.createSignup(req).then((result) => {
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

router.post('/login', (req, res) => {
    adminController.adminLogin(req).then((result) => {
        if (!result) {
            res.status(500).send(result);
            return
        }
        else if (result.status == "NOTFOUND") {
            res.status().json({
                message: "email or password is wrong"
            })
        }
        else {
            res.status(201).send(result)
        }
    })
        .catch(err => res.status(500).send({
            message: err.message
        }))
})

router.get('/admin',(req, res)=>{
     adminController.getAdmin(req).then((result) => {
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