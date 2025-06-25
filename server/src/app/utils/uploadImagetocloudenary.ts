import sharp from 'sharp';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import config from '../config';

// Configure Cloudinary
cloudinary.config({
  cloud_name: config.cloudinary_cloud_name,
  api_key: config.cloudinary_api_key,
  api_secret: config.cloudinary_api_secret,
});

export const uploadToCloudinary = (
  fileBuffer: Buffer,
  fileName: string,
  mimetype: string
): Promise<UploadApiResponse> => {
  return new Promise((resolve, reject) => {
    const extension =
      mimetype === 'image/png' ? 'png' :
      mimetype === 'image/jpeg' ? 'jpg' :
      mimetype === 'image/webp' ? 'webp' : 'jpg'; // fallback

    sharp(fileBuffer)
      .resize({ width: 2000, withoutEnlargement: true }) // Optional
      .toFormat(extension, { quality: 80 }) // Compress
      .toBuffer()
      .then((compressedBuffer) => {
        cloudinary.uploader.upload_stream(
          {
            resource_type: 'auto',
            public_id: fileName,
            format: extension,
          },
          (error, result) => {
            if (error) {
              console.error('Cloudinary upload error:', error);
              return reject(error);
            }
            if (!result) {
              return reject(new Error('Upload failed, no result returned from Cloudinary.'));
            }
            resolve(result);
          }
        ).end(compressedBuffer);
      })
      .catch((error) => {
        console.error('Sharp error:', error);
        reject(error);
      });
  });
};
