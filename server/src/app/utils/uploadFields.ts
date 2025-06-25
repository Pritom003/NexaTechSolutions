/* middlewares/upload.middleware.ts */
import multer from 'multer';
import { RequestHandler } from 'express';

const storage = multer.memoryStorage();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 25 * 1024 * 1024, // 25MB limit
  },
});



// Reusable function to get upload middleware based on field definitions
export const uploadFields = (fields: { name: string; maxCount?: number }[]): RequestHandler => {
  return upload.fields(fields);
};
