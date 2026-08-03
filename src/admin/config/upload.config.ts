import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { diskStorage } from 'multer';
import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';

// 🛡️ Guard: nilai "dummy_cloud", "dummy_key", dll. dianggap TIDAK valid
const isValidCloudinaryEnv = (val?: string) =>
    Boolean(val) &&
    !val!.toLowerCase().includes('dummy') &&
    val !== 'your_cloud_name' &&
    val !== 'your_cloudinary_api_key' &&
    val !== 'your_cloudinary_api_secret';

const useCloudinary =
    isValidCloudinaryEnv(process.env.CLOUDINARY_CLOUD_NAME) &&
    isValidCloudinaryEnv(process.env.CLOUDINARY_API_KEY) &&
    isValidCloudinaryEnv(process.env.CLOUDINARY_API_SECRET);

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