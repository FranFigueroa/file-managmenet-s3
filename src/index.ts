import express, { Request, Response } from 'express';
import multer from 'multer';
import AWS from 'aws-sdk';
import dotenv from 'dotenv';

dotenv.config();

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});

const app = express();
const PORT = 3000;

const upload = multer();

app.post('/upload', upload.single('file'), async (req: Request, res: Response) => {
    if (!req.file) {
        return res.status(400).send('No se encontró ningún archivo para subir.');
    }

    const params = {
        Bucket: process.env.S3_BUCKET_NAME as string,
        Key: req.file.originalname, // Nombre del archivo en S3
        Body: req.file.buffer,      // Contenido del archivo
    };

    try {
        // Subir archivo a S3
        const data = await s3.upload(params).promise();
        res.status(200).json({
            message: 'Archivo subido exitosamente',
            data,
        });
    } catch (error) {
        console.error('Error al subir el archivo:', error);
        res.status(500).send('Error al subir el archivo a S3.');
    }
});

app.get('/', (req: Request, res: Response) => {
    res.send('Servidor Express con funcionalidad de subida a S3 🚀');
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

