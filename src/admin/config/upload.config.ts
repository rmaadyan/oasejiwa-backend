import { diskStorage } from 'multer';

export const multerConfig = {
    storage: diskStorage({
        destination: './uploads/psychologists',
        filename: (req, file, cb) => {
        const ext = file.originalname.split('.').pop() || 'jpg';
        const filename =
            Date.now() + '-' + Math.round(Math.random() * 1e9) + '.' + ext;
        cb(null, filename);
        },
    }),
    fileFilter: (req, file, cb) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
        return cb(new Error('Hanya file gambar'), false);
        }
        cb(null, true);
    },
    limits: {
        fileSize: 2 * 1024 * 1024, //2MB
    },
};