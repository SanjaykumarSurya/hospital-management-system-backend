import exp from 'constants';
import multer, { diskStorage } from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination :function (req,file,cb){
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
    const ext = file.originalname.split('.').pop();
    cb(null, `${file.fieldname}-${Date.now()}.${ext}`);
  }
})

const upload = multer({storage : storage})

export default upload