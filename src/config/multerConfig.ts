// import { time } from "console";
// import { Options, diskStorage } from "multer";
// import { resolve } from "path";

import multer from "multer";
import path from "path";

// export const multerConfig = {
//     dest: resolve(__dirname,'..','..','scr/uploads'),
//     storage: diskStorage({
//         destination: (requesr,file,callback) => {
//             callback(null,resolve(__dirname,'..','..','src/uploads'))
//         },
//         filename:(request, file, callback) =>{
//             const filename = `${time}_${file.originalname}`
//         }
//     }),
//     limits: {
//         fileSize: 5 * 1024 * 1024
//     },
//     fileFilter: (request, file, callback) => {
//         const formats = [
//             'image/jpeg',
//             'image/jpg',
//             'image/png',
//         ]

//         if(formats.includes(file.mimetype)){
//             callback(null, true)
//         } else {
//             callback(new Error('Format not accepted'))
//         }
//     }

// } as Options

        // file name will have timestamp as well so that it is unique and not overwritten by other files with same name
        // callback(null, `${time}_${file.originalname}`)


export const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        //destination folder for images to be uploaded in server side
        callback(null,path.resolve("src/uploads")); 
    },
    //name the file
    filename: (req, file, callback) => {
        const time = new Date().getTime();
        
        const nameFile = `${time}_${file.originalname}`
        //file name will have timestamp as well so that it is unique and not overwritten by other files with same name
        callback(null, nameFile)
        return nameFile 
    },
    
})