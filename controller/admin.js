import mongoose from "mongoose";
import adminModel from '../model/admin.js';
import doctorModel from '../model/doctor.js';
import patientModel from "../model/patient.js";
import appointmentModel from "../model/appointment.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import sendMail from "../common/sendmail.js";
import verificationModel from "../model/verification.js";
import crypto from 'crypto'
import { otpStore } from "./otp-store.js";

dotenv.config()
// const otpStore = {};

const { ObjectId } = mongoose.Types
export const sendOtp = async (req) => {
    try {
        const { email } = req.body;
        // const code = crypto.randomBytes(3).toString('hex');
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        otpStore[email] = code;
        await verificationModel.create({
            email, code
        })
        sendMail(code, email)
        return {
            message: 'Send Otp successfully'
        }
    }
    catch (err) {
        return {
            message: err.message
        }
    }
}
export const sendotp = async (req) => {
    try {
        const { email } = req.body;
        // const code = crypto.randomBytes(3).toString('hex');
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        otpStore[email] = code;
        await verificationModel.create({
            email, code
        })
        sendMail(code, email)
        return {
            message: 'Send Otp successfully'
        }
    }
    catch (err) {
        return {
            message: err.message
        }
    }
}
export const resetPassword = async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body;

        console.log("Incoming reset password:", req.body);
        console.log("Stored OTP:", otpStore[email]);

        // Check if OTP exists
        if (!otpStore[email]) {
            return res.status(400).json({ message: "OTP expired or not found" });
        }

        // Check if OTP matches
        if (otpStore[email] !== otp) {
            return res.status(400).json({ message: "Invalid OTP" });
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update password in DB
        const updatedUser = await adminModel.findOneAndUpdate(
            { email },
            { password: hashedPassword },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        // Clear OTP after success
        delete otpStore[email];

        res.status(200).json({ message: "Password reset successful" });
    } catch (error) {
        console.error("❌ Error resetting password:", error.message);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};


export const verifyOtp = async (req) => {
    try {
        const { email, code } = req.body;

        const verfiy = await verificationModel.findOne({ email, code })

        if (verfiy) {
            await verificationModel.deleteOne({ _id: verfiy._id });
            return { success: true, message: 'OTP verified successfully' };
        }
        return { success: false, message: 'Invalid or expired OTP' };
    } catch (err) {
        return {
            message: err.message
        }
    }
}

const createSignup = async (req) => {
    try {
        const { name, email, role, password } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)
        const createUser = await adminModel.create({
            name, email, role, password: hashedPassword
        })
        const admin = {
            _id: createUser._id,
            name: createUser.name,
            email: createUser.email,
            role: createUser.role
        }
        let token = jwt.sign(admin, process.env.AUTH_KEY)
        return {
            message: "User Create successfully",
            role: createUser.role,
            admin: {
                name: createUser.name,
                email: createUser.email
            },
            token: token
        }
    }
    catch (err) {
        return {
            message: err.message
        }
    }
}

const getAdmin = async (req) => {
    try {
        return await adminModel.findOne({ role: "admin" })
    }
    catch (err) {
        return {
            message: err.message
        }
    }
}

const getUser = async (req) => {
    try {
        return await adminModel.findOne({ role: "receptionost" })
    }
    catch (err) {
        return {
            message: err.message
        }
    }
}

const adminLogin = async (req) => {
    try {
        const { email, password } = req.body;
        console.log(email)
        const findUser = await adminModel.findOne({ email });
        const checkPassword = await bcrypt.compare(password, findUser.password);
        if (!checkPassword) {
            return {
                status: "NOTFOUND"
            }
        }
        const admin = {
            _id: findUser._id,
            name: findUser.name,
            email: findUser.email,
            role: findUser.role
        }
        let token = jwt.sign(admin, process.env.AUTH_KEY)
        return {
            message: "Login successfull",
            role: findUser.role,
            token: token
        }
    }
    catch (err) {
        return {
            message: err.message
        }
    }
}

const createDoctor = async (req) => {

    try {
        const { name, specialization, email, phone, availabledays, timeslot } = req.body;
        console.log(name)
        const createDoctor = await doctorModel.create({
            name, specialization, email, phone, availabledays, timeslot
        })
        return {
            message: "Doctor created successfully",
            createDoctor
        }
    }
    catch (err) {
        return {
            message: err.message
        }
    }
}

const getDoctor = async (req) => {
    try {
        const data = req.query;
        const sort = Number(data.sort ?? 1);
        const sortField = String(data.sortField ?? "name");
        const limit = Number(data.limit ?? 100);
        const skip = Number(data.skip ?? 0);

        const doctors = await doctorModel.aggregate([
            { $sort: { [sortField]: sort } },
            { $skip: skip },
            { $limit: limit }
        ]);

        const count = await doctorModel.countDocuments();

        return {
            message: "Doctor list fetched successfully",
            doctors,
            totalCount: count
        };
    } catch (err) {
        return {
            message: err.message
        };
    }
}

const getSingleDoctor = async (req) => {
    try {
        const doctorId = req.params.doctorId
        return await doctorModel.findById({ _id: new ObjectId(doctorId) })
    }
    catch (err) {
        return {
            message: err.message
        }
    }
}

const deleteDoctor = async (req) => {
    try {
        const doctorId = req.params.doctorId;
        await doctorModel.deleteOne(
            { _id: new ObjectId(doctorId) }
        )
        return {
            message: "Doctor deleted successfully"
        }
    }
    catch (err) {
        return {
            message: err.message
        }
    }
}

const updateDoctor = async (req) => {
    try {
        const { id } = req.params;
        const { name, specialization, email, phone, availabledays, timeslot } = req.body;
        console.log(id)
        console.log(name)
        console.log(specialization)
        await doctorModel.updateOne(
            { _id: new ObjectId(id) },
            {
                $set: {
                    name, specialization, email, phone, availabledays, timeslot
                }
            }
        );

        return {
            message: "Doctor updated successfully"
        };
    }
    catch (err) {
        return {
            message: err.message
        };
    }
};

const createPatient = async (req) => {
    try {
        const { name, age, gender, contact, address, medicalHistory } = req.body;
        const createPatient = await patientModel.create({
            name, age, gender, contact, address, medicalHistory
        })
        return {
            message: "patient created successfully",
            createPatient
        }
    }
    catch (err) {
        return {
            message: err.message
        }
    }
}

const getPatient = async (req) => {
    try {
        const data = req.query;
        const sort = Number(data.sort ?? 1);
        const sortField = String(data.sortField ?? "name");
        const limit = Number(data.limit ?? 100);
        const skip = Number(data.skip ?? 0);

        const Patients = await patientModel.aggregate([
            { $sort: { [sortField]: sort } },
            { $skip: skip },
            { $limit: limit }
        ]);
        const count = await patientModel.countDocuments();

        return {
            message: "Patient List fetched successfully",
            Patients,
            totalCount: count
        };
    } catch (err) {

        return {
            message: err.message
        };
    }
}

const deletePatient = async (req) => {
    try {
        const patientId = req.params.patientId;
        await patientModel.deleteOne(
            { _id: new ObjectId(patientId) }
        )
        return {
            message: "patient deleted successfully"
        }
    }
    catch (err) {
        return {
            message: err.message
        }
    }
}

const getSinglePatient = async (req) => {
    try {
        const patientId = req.params.patientId;
        return await patientModel.findById({ _id: new ObjectId(patientId) })
    }
    catch (err) {
        return {
            message: err.message
        }
    }
}

const updatePatient = async (req) => {
    try {
        const { id } = req.params;

        const { name, age, gender, contact, address, medicalHistory } = req.body;
        console.log(id)
        console.log(name)
        console.log(age)
        await patientModel.updateOne(
            { _id: new ObjectId(id) },
            {
                $set: {
                    name, age, gender, contact, address, medicalHistory
                }
            }
        );
        return {
            message: " Patient updated successfully"
        };
    }
    catch (err) {
        return {
            message: err.message
        }
    }
}


const createAppointment = async (req) => {
    try {
        const { patientId, doctorId, date, status, notes } = req.body
        const createAppointment = await appointmentModel.create({
            patientId, doctorId, date, status, notes
        })
        return {
            message: "appointment created successfully",
            createAppointment
        }
    }
    catch (err) {
        return {
            message: err.message
        }
    }
}

const getAppointment = async (req) => {
    try {
        const data = req.query;
        const sort = Number(data.sort ?? 1);
        const sortField = String(data.sortField ?? "date");
        const limit = Number(data.limit ?? 70);
        const skip = Number(data.skip ?? 0)
        const getAppointment = await appointmentModel.aggregate([
            {
                $lookup: {
                    from: "patients",
                    localField: "patientId",
                    foreignField: "_id",
                    as: "patient"
                }
            },
            { $unwind: { path: "$patient", preserveNullAndEmptyArrays: true } },
            {
                $lookup: {
                    from: "doctors",
                    localField: "doctorId",
                    foreignField: "_id",
                    as: "doctor"
                }
            },
            { $unwind: { path: "$doctor", preserveNullAndEmptyArrays: true } },
            {
                $project: {
                    _id: 1,
                    date: 1,
                    status: 1,
                    notes: 1,
                    patientId: 1,
                    doctorId: 1,
                    patientName: "$patient.name",
                    doctorName: "$doctor.name"
                }
            },

            { $sort: { [sortField]: sort, _id: 1 } },
            { $skip: skip },
            { $limit: limit }

        ]);
        const count = await appointmentModel.countDocuments();

        return {
            message: "Appointement List fetched successfully",
            getAppointment,
            totalCount: count
        };
    } catch (err) {

        return {
            message: err.message
        };
    }
}

const deleteAppointment = async (req) => {
    try {
        const appointmentId = req.params.appointmentId;
        await appointmentModel.deleteOne({
            _id: new ObjectId(appointmentId)
        })
        return {
            message: "Appointment successfully deleted"
        }
    }
    catch (err) {
        return {
            message: err.message
        }
    }
}

const updateAppointment = async (req) => {
    try {
        const { id } = req.params;
        const { patientId, doctorId, date, status, notes } = req.body;
        console.log(id)
        await appointmentModel.updateOne(
            { _id: new ObjectId(id) },
            {
                $set: {
                    patientId, doctorId, date, status, notes
                }
            }
        );
        return {
            message: "Appointment update successfully"
        };
    }
    catch (err) {
        return {
            message: err.message
        }
    }
}

const getSingleAppointment = async (req) => {
    try {
        const appointmentId = req.params.appointmentId;
        return await appointmentModel.findById({ _id: new ObjectId(appointmentId) })
    }
    catch (err) {
        return {
            message: err.message
        }
    }
}

export {
    createSignup, adminLogin, createDoctor, getDoctor, deleteDoctor, updateDoctor,
    createPatient, getAppointment, deleteAppointment, getPatient, deletePatient,
    updatePatient, createAppointment, getAdmin, getUser, getSingleDoctor,
    getSinglePatient, updateAppointment, getSingleAppointment
}