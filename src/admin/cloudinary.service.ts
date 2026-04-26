import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class CloudinaryService {
    extractPublicId(url: string): string | null {
        try {
            const parts = url.split('/');
            const uploadIndex = parts.indexOf('upload');
            if (uploadIndex === -1) return null;

            const afterUpload = parts.slice(uploadIndex + 1);
            const withoutVersion = afterUpload[0]?.startsWith('v')
                ? afterUpload.slice(1)
                : afterUpload;

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