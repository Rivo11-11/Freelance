import { body } from "express-validator";
import { validateRequest } from "../middleware/validateRequest";
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export const createActivityValidator = [
    body('name').notEmpty().withMessage('Name is required'),
    body('address').notEmpty().withMessage('Address is required'),
    body('details').notEmpty().withMessage('Details is required'),
    body('tags').notEmpty().withMessage('Tags is required'),
    body('price').notEmpty().withMessage('Price is required'),
    body('date').notEmpty().withMessage('Date is required'),
    body('time').notEmpty().withMessage('Time is required'),
    body('activityTime').notEmpty().withMessage('Activity time is required'),
    body('medias').notEmpty().withMessage('Medias is required').custom((value, { req }) => {
        const files = req.files as { [fieldname: string]: Express.Multer.File[] };
        const mediaFiles = files?.medias;
        if (!mediaFiles || mediaFiles.length === 0)
            throw new Error('At least one media is required');
        if (mediaFiles.length > 3)
            throw new Error('Medias must be less than 3'); 
        if (!mediaFiles.every((file: Express.Multer.File) => ['image/jpeg', 'image/jpg', 'image/png', 'video/mp4'].includes(file.mimetype))) {
            throw new Error('Only image and video files are allowed');
        }
        if (mediaFiles.some((file: Express.Multer.File) => file.size > MAX_FILE_SIZE)) {
            throw new Error('Media size must be less than 10MB per file');
        }
        return true;
    }),
    validateRequest
]
