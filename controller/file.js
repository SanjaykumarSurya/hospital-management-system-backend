import fileModel from '../model/file.js';

import mongoose from 'mongoose';

const {ObjectId} = mongoose.Types

const uploadFile = async (req) => {
    try {
        const { patientId, doctorName, description, date } = req.body;
        const fileUrl = req.file.path
        if (!fileUrl) {
            return {
                message: "upload file"
            }
        }
        const uploadFile = await fileModel.create({
            patientId, doctorName, description, date, fileUrl: fileUrl
        })
        return {
            message: "successfully upload file",
            uploadFile
        }
    }
    catch (err) {
        return {
            message: err.message
        }
    }
}

// const getFile = async (req) => {
//     try {
//         const data = req.query;
//         const skip = Number(data.skip ?? 0);
//         const limit = Number(data.limit ?? 5);
//         const sortOrder = Number(data.sort ?? -1);
//         const reports = await fileModel.aggregate([
//             {
//                 $lookup: {
//                     from: "patients",
//                     localField: "patientId",
//                     foreignField: "_id",
//                     as: "patient"
//                 }
//             },
//             { $unwind: "$patient" },
//             {
//                 $project : {
//                     _id : 1,
//                     patientName : "$patient.name",
//                     doctorName : 1,
//                     description : 1,
//                     fileUrl : 1,
//                     date : 1
//                 }
//             },
//             {
//                 $facet :{
//                     data : [
//                         {$sort : { date: sortOrder }},
//                         {$skip : skip},
//                         {$limit : limit}
//                     ],
//                     count : [
//                         {$count : "total count"}
//                     ]
//                 }
//             }

//         ]);
//         return {
//             message : "File lists",
//             reports
//         };
//     }  catch (err) {
   
//         return {
//             message: err.message
//         };
//     }
// }
const getFile = async (req) => {
  try {
    const data = req.query;
    const skip = Number(data.skip ?? 0);
    const limit = Number(data.limit ?? 100);
    const sortOrder = Number(data.sort ?? -1);
    
    const result = await fileModel.aggregate([
      {
        $lookup: {
          from: "patients",
          localField: "patientId",
          foreignField: "_id",
          as: "patient"
        }
      },
      { $unwind: "$patient" },
      {
        $project: {
          _id: 1,
          patientId:1,
          patientName: "$patient.name",
          doctorName: 1,
          description: 1,
          fileUrl: 1,
          date: 1
        }
      },
      {
        $facet: {
          data: [
            { $sort: { date: sortOrder } },
            { $skip: skip },
            { $limit: limit }
          ],
          count: [
            { $count: "totalCount" }
          ]
        }
      }
    ]);

    const reports = result[0]?.data ?? [];
    const totalCount = result[0]?.count?.[0]?.totalCount ?? 0;

    return {
      message: "File list fetched",
      reports,
      totalCount
    };
  } catch (err) {
    return {
      message: err.message
    };
  }
};

const getSingleFile = async(req)=>{
    try{
        const fileId = req.params.fileId;
        console.log(fileId)
        return await fileModel.findById({_id : new ObjectId(fileId)})
    }
    catch(err){
        return{
            message : err.message
        }
    }
}

const updateFile = async(req)=>{
    try{
        const {fileId, patientId, doctorName,date, description} = req.body;
        const fileUrl = req.file.path;
        await fileModel.updateOne(
            {_id : new ObjectId(fileId)},
            {$set : {
                patientId, doctorName, description,date, fileUrl : fileUrl
            }}
        )
        return{
            message : "updated successfully"
        }
    }
    catch(err){
        return{
            message : err.message
        }
    }
}

const deleteFile = async(req)=>{
    try{
        const fileId = req.params.fileId;
        await fileModel.deleteOne({_id : new ObjectId(fileId)});
        return{
            message : "file deleted successfully"
        }
    }
    catch(err){
        return {
            message : err.message
        }
    }
}

export {
    uploadFile, getFile, getSingleFile, updateFile, deleteFile
}