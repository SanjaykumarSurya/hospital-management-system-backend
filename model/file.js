import mongoose from 'mongoose';

const fileSchema = new mongoose.Schema({
    patientId : {type :mongoose.Schema.Types.ObjectId, required: true},
    doctorName : {type: String, required: true},
    description : {type : String,},
    fileUrl : {type : String, required: true},
    date : {type : Date, default:Date.now}
},{
    versionKey : false,
})

const file = mongoose.model('reportFile', fileSchema);

export default file