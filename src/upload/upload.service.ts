import { Injectable, BadRequestException } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { existsSync, mkdirSync } from 'fs';
import { writeFile } from 'node:fs/promises';
import { join } from 'path';

const useCloudinary =
  Boolean(process.env.CLOUDINARY_CLOUD_NAME) &&
  Boolean(process.env.CLOUDINARY_API_KEY) &&
  Boolean(process.env.CLOUDINARY_API_SECRET);

if (useCloudinary) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
}

const uploadsDir = join(process.cwd(), 'uploads');
if (!existsSync(uploadsDir)) {
  mkdirSync(uploadsDir, { recursive: true });
}

@Injectable()
export class UploadService {
  async uploadImage(file: Express.Multer.File): Promise<string> {
    // 🛡️ Null guard — mencegah crash saat Multer tidak menerima file yang valid
    if (!file || !file.buffer) {
      throw new BadRequestException('No file uploaded.');
    }

    if (useCloudinary) {
      return new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ folder: 'oasejiwa/tes' }, (error, result) => {
            if (error || !result) return reject(error);
            resolve(result.secure_url);
          })
          .end(file.buffer);
      });
    }

    const safeName = file.originalname
      .replace(/[^a-zA-Z0-9.\-_.]/g, '_')
      .replace(/_+/g, '_');
    const filename = `${Date.now()}-${safeName}`;
    const filePath = join(uploadsDir, filename);

    await writeFile(filePath, file.buffer);
    return `/uploads/${filename}`;
  }
}