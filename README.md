# **File Management System with S3**

Este proyecto es un sistema de gestión de archivos desarrollado con **Express**, **AWS S3** y **TypeScript**. Permite subir, descargar y eliminar archivos en un bucket de S3.

## **Requisitos previos**
1. Tener una cuenta de AWS y un bucket S3 configurado.
2. Configurar un usuario IAM con permisos para:
   - Subir (`s3:PutObject`)
   - Descargar (`s3:GetObject`)
   - Eliminar (`s3:DeleteObject`)
3. Instalar las siguientes herramientas:
   - **Node.js** (v16 o superior)
   - **npm** (v8 o superior)

## **Instalación**
1. Clona este repositorio:
   ```bash
   git clone https://github.com/FranFigueroa/file-managmenet-s3
   cd file-management-s3
```

2. Instalar dependencias:
```bash
    npm install
```
3. Configura el archivo .env con tus credenciales de AWS:
```bash
AWS_ACCESS_KEY_ID=your-access-key-id
AWS_SECRET_ACCESS_KEY=your-secret-access-key
AWS_REGION=your-region
S3_BUCKET_NAME=your-bucket-name
```

## ** Uso **
```bash
npm run dev
```
## ** Rutas disponibles **

1. Subir archivo
2. Descargar archivo
3. Eliminar archivo

## ** Pruebas**
Usa Postman, cURL, o cualquier cliente HTTP para probar las rutas. Asegúrate de usar nombres de archivos válidos y verificar las respuestas del servidor.

