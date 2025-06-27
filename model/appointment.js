import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
    patinetId : mongoose.Schema.Types.ObjectId,
    doctorId : mongoose.Schema.Types.ObjectId,
    date : Date,
    status : {
        type : String,
        enum : ["Booked", "completed", "cancelled"],
        default: "Booked"
    },
    notes : String,
})

const appointement = mongoose.model('appointment', appointmentSchema);

export default appointement