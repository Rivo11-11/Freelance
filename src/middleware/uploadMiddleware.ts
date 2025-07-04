import { Request, Response, NextFunction } from 'express';
import  upload  from '../config/multer';



export const uploadImageMiddleware = (fieldName: string) => {
  return [
    upload.single(fieldName) ,
    async (req: Request, res: Response, next: NextFunction) => {
        if (!req.file) {
          return next()
        }
        const b64 = Buffer.from(req.file!.buffer).toString('base64');
        const dataURI = `data:${req.file!.mimetype};base64,${b64}`;
        req.body[fieldName] = dataURI;
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