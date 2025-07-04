import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env file
dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  port: process.env.PORT || 5000, 
  default_pass: process.env.DB_PASSWORD,
  NODE_ENV: process.env.NODE_ENV,
  DB_URL: process.env.DB_URL as string,
  bycrypt_pass: process.env.DEFAULT_PASSWORD as string,
 
   
    bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  
    jwt_access_secret: process.env.JWT_ACCESS_SECRET as string,
    jwt_refresh_secret: process.env.JWT_REFRESH_SECRET as string,
    jwt_access_token_expires_in: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN as string,
    jwt_refresh_token_expires_in: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN as string,
  
  
    cloudinary_cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET,
    cloudinary_api_key: process.env.CLOUDINARY_API_KEY,

    emailjs_service_id: process.env.EMAILJS_SERVICE_ID,
emailjs_template_id: process.env.EMAILJS_TEMPLATE_ID,
emailjs_public_key: process.env.EMAILJS_PUBLIC_KEY,
emailjs_private_key: process.env.EMAILJS_PRIVATE_KEY,


};
