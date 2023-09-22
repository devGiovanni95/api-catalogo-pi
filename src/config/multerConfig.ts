import multer from "multer";
import path from "path";

export const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        //destination folder for images to be uploaded in server side
        callback(null,path.resolve("src/uploads")); 
    },
    //name the file
    filename: (req, file, callback) => {
        const time = new Date().getTime();
        
        //file name will have timestamp as well so that it is unique and not overwritten by other files with same name
        callback(null, `${time}_${file.originalname}`)
    },
})