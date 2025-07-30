import nodemailer from 'nodemailer';
import 'dotenv/config'

const sendemail = (code, email) => {

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_ID,
            pass: process.env.PASS
        }
    })

    const sendOptions = {
        to: email,
        subject: 'Two step Verification',
        text: `Your otp code is ${code}`
    }
    transporter.sendMail(sendOptions, (error, Info) => {
        if (error) {
            console.log(error)
        }
        else {
            console.log("mail send successful")
        }
    })
}

export default sendemail;