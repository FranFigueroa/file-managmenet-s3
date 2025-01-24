import express, { Request, Response } from 'express';
import multer from 'multer';
import AWS from 'aws-sdk';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

// Configu Multer
const upload = multer({ dest: 'uploads/' });

// Config AWS SDK
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});


app.get('/', (req: Request, res: Response) => {
    res.send('Servidor Express con integración S3 🚀');
});

// Upload Files
app.post('/upload', upload.single('file'), async (req: Request, res: Response) => {
    if (!req.file) {
        return res.status(400).send('No se encontró un archivo para subir.');
    }

    // Parámetros S3
    const params = {
        Bucket: process.env.S3_BUCKET_NAME as string,
        Key: req.file.originalname,
        Body: req.file.buffer,
    };

    try {
        // Upload files S3
        const data = await s3.upload(params).promise();
        res.status(200).json({
            message: 'Archivo subido con éxito a S3',
            data,
        });
    } catch (error) {
        console.error('Error subiendo a S3:', error);
        res.status(500).send('Error subiendo el archivo a S3');
    }
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

