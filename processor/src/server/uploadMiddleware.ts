import * as fs from "fs";

const uploadMiddleware = require('multer')

const storage = uploadMiddleware.diskStorage({
    destination: function (req: any, file: any, callback: any) {
        callback(null, 'uploaded_files/')
    },
    filename: function (req: any, file: any, callback: any) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        let filename = file.originalname;

        if (fs.existsSync(`uploaded_files/${file.originalname}`)) {
            const filenameNoExt = filename.split('.')[0]
            filename = `${filenameNoExt}_${uniqueSuffix}.${filename.split('.')[1]}`
        }

        if (!req.body.uploadedFiles) {
            req.body.uploadedFiles = [];
        }

        req.body.uploadedFiles.push(filename)
        callback(null, filename)
    }
})

export default uploadMiddleware({ storage: storage }).array('files')
