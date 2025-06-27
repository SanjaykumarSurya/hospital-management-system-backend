import mongoose from "mongoose";


const doctorSchema = new mongoose.Schema({
    name : String,
    specialization : String,
    email : String,
    phone : String,
    availabledays : [{type:String}],
    timeslot : String
},{
    versionKey : false,
    timestamps : true
})

const doctor = mongoose.model('doctor', doctorSchema);

export default doctor;