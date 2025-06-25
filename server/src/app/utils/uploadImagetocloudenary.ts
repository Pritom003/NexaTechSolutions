import sharp from 'sharp';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import { PassThrough } from 'stream';
import config from '../config';

// ✅ Cloudinary Configuration
cloudinary.config({
  cloud_name: config.cloudinary_cloud_name,
  api_key: config.cloudinary_api_key,
  api_secret: config.cloudinary_api_secret,
});

// ✅ Upload Image to Cloudinary using sharp stream (for large files)
export const uploadToCloudinary = (
  fileBuffer: Buffer,
  fileName: string,
  mimetype: string
): Promise<UploadApiResponse> => {
  return new Promise((resolve, reject) => {
    const fileExtension = mimetype.split('/')[1] || 'jpg'; // fallback to jpg

    const transform = sharp(fileBuffer)
      .resize({ width: 1200 }) // Resize width to 1200px
      .toFormat(fileExtension === 'png' ? 'png' : 'jpeg', { quality: 75 }); // Compress based on type

    const passthrough = new PassThrough();

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: 'image',
        public_id: fileName,
        format: fileExtension, // You can omit this if you want Cloudinary to auto-detect
      },
      (error, result) => {
        if (error) return reject(error);
        if (!result) return reject(new Error('No result returned from Cloudinary.'));
        resolve(result);
      }
    );

    // Pipe the sharp transform stream directly into Cloudinary's upload stream
    transform.pipe(passthrough).pipe(uploadStream);
  });
};
