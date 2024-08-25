import { Router } from 'express'
import AuthMiddLeware from '../../middlewares/auth.middleware'
import multer from "multer";
import sharp from 'sharp';
import AWS from 'aws-sdk';

const storage = multer.memoryStorage();
const upload = multer({ storage });

let urlImagem = '';
const productPhotoRoutes = Router()

const s3 = new AWS.S3();
export async function tratamento(req:any, res:any, next:any) {
    req.imagemTratada = [];
  
    for (let i = 0; i < req.files.length; i++) {
      let imgTratada = await sharp(req.files[i].buffer).resize(500).toBuffer();
      req.imagemTratada.push({
        originalname: req.files[i].originalname,
        mimetype: req.files[i].mimetype,
        buffer: imgTratada,
    });
    urlImagem = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${req.files[i].originalname}`
    }
    next();
  }
  
  export async function enviarAWS(req:any, res:any, next:any) {
    for (let i = 0; i < req.imagemTratada.length; i++) {
      await s3.upload(
        {
          Body: req.imagemTratada[i].buffer,
          Bucket: process.env.AWS_BUCKET_NAME+'',
          ContentType: req.imagemTratada[i].mimetype,
          Key: req.imagemTratada[i].originalname,
        },
        (err:any, data:any) => {
            console.log(data);
            urlImagem = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${data.Key}`
          if (err) {
            return console.log(err);
          }else{
          console.log("🚀 ~ file: uploadConfig.ts:37 ~ enviarAWS ~ urlImagem:", urlImagem)
          return urlImagem
          }
        }
      );
    }
    next();
  }
  export let uur = urlImagem
  productPhotoRoutes.post("/upload", upload.array("file", 10), tratamento, enviarAWS,
    (req, res) => {
      let msg = urlImagem
      res.json({urlPhotoAws : msg}).status(200)
  })

export default productPhotoRoutes
