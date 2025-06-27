import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
    name : String,
    age :Number,
    gender : String,
    contact : String,
    address : String,
    medicalHistory : String,
},{
    timestamps : true,
    versionKey : false
})

const patient = mongoose.model('patient', patientSchema);

export default patient