import { body } from "express-validator";
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB


export const createPropertyValidator = [
    body('type').notEmpty().withMessage('Type is required'),
    body('available').notEmpty().withMessage('Available is required'),
    body('guestNumber').notEmpty().withMessage('Guest number is required'),
    body('bedrooms').notEmpty().withMessage('Bedrooms is required'),
    body('bathrooms').notEmpty().withMessage('Bathrooms is required'),
    body('beds').notEmpty().withMessage('Beds is required'),
    body('address').notEmpty().withMessage('Address is required'),
    body('details').notEmpty().withMessage('Details is required'),
    body('tags').notEmpty().withMessage('Tags is required'),
    body('pricePerNight').notEmpty().withMessage('Price per night is required'),
    body('availableDates').notEmpty().withMessage('Available dates is required'),
    body('maxDays').notEmpty().withMessage('Max days is required'),
    body('ownershipContract').notEmpty().withMessage('Ownership contract is required').
    custom((value, { req }) => {
        const file = req.file;
        if (!file) 
            throw new Error('Ownership contract is required');
        if (!['application/pdf'].includes(file.mimetype)) {
            throw new Error('Only PDF files are allowed for ownership contract');
        }
        if (file.size > MAX_FILE_SIZE) {
            throw new Error('Ownership contract size must be less than 10MB');
        }
        return true;
    }),
    body('facilityLicense').notEmpty().withMessage('Facility license is required').
    custom((value, { req }) => {
        const file = req.file;
        if (!file) 
            return true;
        if (!['application/pdf'].includes(file.mimetype)) {
            throw new Error('Only PDF files are allowed for facility license');
        }
        if (file.size > MAX_FILE_SIZE) {
            throw new Error('Facility license size must be less than 10MB');
        }
        return true;
    }),
    body('medias').notEmpty().withMessage('Medias is required').custom((value, { req }) => {
        const files = req.files;
        if (!files || files.length === 0)
            throw new Error('At least one media is required');
        if (files.length > 3)
            throw new Error('Medias must be less than 3'); 
        if (!files.every((file: Express.Multer.File) => ['image/jpeg', 'image/jpg', 'image/png', 'video/mp4'].includes(file.mimetype))) {
            throw new Error('Only image and video files are allowed');
        }
        if (files.some((file: Express.Multer.File) => file.size > MAX_FILE_SIZE)) {
            throw new Error('Media size must be less than 10MB per file');
        }
        return true;
    }),
    body('vendor').notEmpty().withMessage('Vendor is required'),
]
