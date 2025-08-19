import express from 'express';
import * as adminController from '../controller/admin.js';
const router = express.Router();
import admin from '../model/admin.js';

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
  } catch (error) {
    console.error('Error checking email:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});
router.post('/send-otp', async (req, res) => {
   adminController.sendotp(req).then((result) => {
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
// router.post('/reset-password',async (req,res) => {
//     adminController. resetPassword(req).then((result )=>{
//         if(!result) {
//             res.status(400).send(result);
//             return
//         }
//         res.status(200).send(result)
//     })
//         .catch(err => res.status(500).send({
//             message:err.message
//     }))

// })
router.post('/reset-password', adminController.resetPassword);
    

export default router