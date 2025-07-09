import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
    patientId : mongoose.Schema.Types.ObjectId,
    doctorId : mongoose.Schema.Types.ObjectId,
    date: {
        type: Date,
        required: true
    },
    status : {
        type : String,
        enum : ["Booked", "Completed", "Cancelled"],
        default: "Booked"
    },
    notes : String
},{
    
    versionKey : false,
    timestamps : true
})


const appointment = mongoose.model('appointment', appointmentSchema);

export default appointment;