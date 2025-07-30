import express from 'express';
import * as adminController from '../controller/admin.js';
import admin from '../model/admin.js';
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

router.get('/admin', (req, res) => {
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

router.post('/sendotp', (req, res) => {
    adminController.sendOtp(req).then((result) => {
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

router.post('/verifyOtp', (req, res) => {
    adminController.verifyOtp(req).then((result) => {
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

router.post('/check-email', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const existingUser = await admin.findOne({ email });

    res.status(200).json({ exists: !!existingUser });
  } catch (err) {
    console.error('Email check error:', err.message);
    res.status(500).json({ message: 'Server error while checking email' });
  }
});




export default router