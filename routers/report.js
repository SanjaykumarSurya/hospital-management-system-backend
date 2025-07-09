import express from 'express';
import * as fileController from "../controller/file.js";
// import upload from '../common/fileupload.js';
import multer from 'multer';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/reports',upload.single('file'),(req,res)=>{
    fileController.uploadFile(req).then((result)=>{
        if(!result){
            res.status(400).json(result)
        }
        res.status(201).json(result)
    })
    .catch(err => res.status(500).send({
        message : err.message
    }))
})

router.get('/reports',(req,res)=>{
    fileController.getFile(req).then((result)=>{
        if(!result){
            res.status(500).send(result)
        }
        res.status(201).send(result)
    })
    .catch(err => res.status(500).send({
        message : err.message
    }))
})

router.get('/reports/:fileId',(req,res)=>{
    fileController.getSingleFile(req).then((result)=>{
        if(!result){
            res.status(500).send(result)
        }
        res.status(201).send(result)
    })
    .catch(err => res.status(500).send({
        message : err.message
    }))
})

router.put('/reports/:fileId',upload.single('report'),(req,res)=>{
    fileController.updateFile(req).then((result)=>{
        if(!result){
            res.status(500).send(result)
        }
        res.status(201).send(result)
    })
    .catch(err => res.status(500).send({
        message : err.message
    }))
})

router.delete('/reports/:fileId',(req,res)=>{
    fileController.deleteFile(req).then((result)=>{
        if(!result){
            res.status(500).send(result)
        }
        res.status(201).send(result)
    })
    .catch(err => res.status(500).send({
        message : err.message
    }))
})

export default router;