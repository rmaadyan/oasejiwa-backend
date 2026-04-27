import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

const storage = new CloudinaryStorage({
    cloudinary,
    params: async (req, file) => {
        return {
            folder: 'psychologists',
            allowed_formats: ['jpg', 'jpeg', 'png'],
            transformation: [{ width: 500, height: 500, crop: 'limit' }],
        };
    },
});

export const multerConfig = {
    storage,
    fileFilter: (req, file, cb) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
            return cb(new Error('Hanya file gambar yang diizinkan'), false);
        }
        cb(null, true);
    },
    limits: {
        fileSize: 2 * 1024 * 1024, // 2MB
    },
};