import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class CloudinaryService {
    // Ekstrak public_id dari URL cloudinary
    // Contoh URL: https://res.cloudinary.com/mycloud/image/upload/v123/psychologists/abc123.jpg
    // Public ID: psychologists/abc123
    extractPublicId(url: string): string | null {
        try {
            const parts = url.split('/');
            const uploadIndex = parts.indexOf('upload');
            if (uploadIndex === -1) return null;

            // Skip version segment (v123456789)
            const afterUpload = parts.slice(uploadIndex + 1);
            const withoutVersion = afterUpload[0]?.startsWith('v')
                ? afterUpload.slice(1)
                : afterUpload;

            // Gabungkan folder + filename, hapus ekstensi
            const fullPath = withoutVersion.join('/');
            return fullPath.replace(/\.[^/.]+$/, '');
        } catch {
            return null;
        }
    }

    async deleteImage(url: string): Promise<void> {
        const publicId = this.extractPublicId(url);
        if (!publicId) return;

        try {
            await cloudinary.uploader.destroy(publicId);
        } catch (err: any) {
            console.log('Gagal hapus gambar Cloudinary:', err.message);
        }
    }
}