import multer from 'multer';
import { Request, Response, NextFunction } from 'express';
import { uploadToCloudinary } from '../utils/cloudinaryUtils';
import CustomError from '../utils/errorUtils';

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024
  }
});

const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];
const MAX_SIZE = 5 * 1024 * 1024;

const validateImage = (file: Express.Multer.File | undefined) => {
  if (file && !ALLOWED_TYPES.includes(file.mimetype)) {
    throw new CustomError('Only JPG, JPEG, and PNG images are allowed', 400);
  }
  if (file && file.size > MAX_SIZE) {
    throw new CustomError('Image size must be less than 5MB', 400);
  }
};

export const uploadImageMiddleware = (fieldName: string) => {
  return [
    upload.single(fieldName),
    async (req: Request, res: Response, next: NextFunction) => {
        if (!req.file) {
          return next()
        }
       validateImage(req.file);

        const b64 = Buffer.from(req.file!.buffer).toString('base64');
        const dataURI = `data:${req.file!.mimetype};base64,${b64}`;
        
        const result = await uploadToCloudinary(dataURI, 'user-profiles');
        req.body.imageUrl = result.secure_url;
        next();
       
    }
  ];
};

// Middleware to upload multiple images to Cloudinary
// export const uploadMultipleToCloudinary = (fieldName: string = 'images', maxCount: number = 5) => {
//   return [
//     upload.array(fieldName, maxCount),
//     async (req: Request, res: Response, next: NextFunction) => {
//       try {
//         if (!req.files || req.files.length === 0) {
//           return res.status(400).json({
//             success: false,
//             message: 'No image files provided'
//           });
//         }

//         const uploadPromises = (req.files as Express.Multer.File[]).map(async (file) => {
//           // Convert buffer to base64
//           const b64 = Buffer.from(file.buffer).toString('base64');
//           const dataURI = `data:${file.mimetype};base64,${b64}`;

//           // Upload to Cloudinary
//           const result = await cloudinary.uploader.upload(dataURI, {
//             folder: 'luby-images',
//             resource_type: 'auto',
//             transformation: [
//               { width: 800, height: 600, crop: 'fill' },
//               { quality: 'auto' }
//             ]
//           });

//           return result.secure_url;
//         });

//         const uploadedUrls = await Promise.all(uploadPromises);
//         req.body[fieldName] = uploadedUrls;
        
//         next();
//       } catch (error: any) {
//         console.error('Cloudinary upload error:', error);
//         return res.status(500).json({
//           success: false,
//           message: 'Failed to upload images'
//         });
//       }
//     }
//   ];
// };

export default upload; 