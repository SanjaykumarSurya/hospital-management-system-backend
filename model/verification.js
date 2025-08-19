import mongoose from 'mongoose';

const verifiySchema = new mongoose.Schema({
    email : {type: String, require: true},
    code : {type:String, require: true},
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 180
    }
},
{
    versionKey : false,
    timestamps : false
})

export default mongoose.model("verifiycode", verifiySchema)