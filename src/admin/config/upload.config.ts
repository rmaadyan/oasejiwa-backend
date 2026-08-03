import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { diskStorage } from 'multer';
import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';

const useCloudinary =
    Boolean(process.env.CLOUDINARY_CLOUD_NAME) &&
    Boolean(process.env.CLOUDINARY_API_KEY) &&
    Boolean(process.env.CLOUDINARY_API_SECRET);

const localUploadDir = join(process.cwd(), 'uploads');

if (!useCloudinary && !existsSync(localUploadDir)) {
    mkdirSync(localUploadDir, { recursive: true });
}

const storage = useCloudinary
    ? new CloudinaryStorage({
          cloudinary,
          params: async (req, file) => ({
              folder: 'psychologists',
              allowed_formats: ['jpg', 'jpeg', 'png'],
              transformation: [{ width: 500, height: 500, crop: 'limit' }],
          }),
      })
    : diskStorage({
          destination: localUploadDir,
          filename: (req, file, cb) => {
              const timestamp = Date.now();
              const safeName = file.originalname
                  .replace(/[^a-zA-Z0-9.\-_]/g, '_')
                  .replace(/_+/g, '_');
              cb(null, `${timestamp}-${safeName}`);
          },
      });

export const multerConfig = {
    storage,
    fileFilter: (req, file, cb) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png|pdf)$/)) {
            return cb(new Error('Hanya file JPG, JPEG, PNG, atau PDF yang diizinkan'), false);
        }
        cb(null, true);
    },
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB
    },
};