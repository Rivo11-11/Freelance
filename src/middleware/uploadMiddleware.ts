import { Request, Response, NextFunction } from 'express';
import  upload  from '../config/multer';

export const uploadPdfMiddleware = (fieldName: string) => {
  return [
    upload.single(fieldName),
    async (req: Request, res: Response, next: NextFunction) => {
      if (!req.file) {
        return next();
      }
      const b64 = Buffer.from(req.file.buffer).toString('base64');
      const dataURI = `data:${req.file.mimetype};base64,${b64}`;
      req.body[fieldName] = dataURI;
      next();
    }
  ];
};

export const uploadMediasMiddleware = (fieldName: string , maxCount: number = 3) => {
  return [
    upload.array(fieldName, maxCount),
    async (req: Request, res: Response, next: NextFunction) => {
      if (!req.files || req.files.length === 0) {
        return next();
      }

      const files = req.files as Express.Multer.File[]; 
      const dataURIs = files.map(file => {
        const b64 = Buffer.from(file.buffer).toString('base64');
        const dataURI = `data:${file.mimetype};base64,${b64}`;
        return dataURI;
      });

      req.body[fieldName] = dataURIs;
      next();
    }
  ];
};


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

export const uploadMultipleMediaMiddleware = (fields: { name: string; maxCount?: number }[]) => {
  return [
    upload.fields(fields.map(field => ({ name: field.name, maxCount: field.maxCount || 1 }))),
    async (req: Request, res: Response, next: NextFunction) => {
      if (!req.files) {
        return next();
      }

      const files = req.files as { [fieldname: string]: Express.Multer.File[] };
      
      for (const [fieldName, fileArray] of Object.entries(files)) {
        if (fileArray && fileArray.length > 0) {
          if (fieldName === 'medias') {
            const dataURIs = fileArray.map(file => {
              const b64 = Buffer.from(file.buffer).toString('base64');
              return `data:${file.mimetype};base64,${b64}`;
            });
            req.body[fieldName] = dataURIs;
          } else {
            const file = fileArray[0];
            const b64 = Buffer.from(file.buffer).toString('base64');
            const dataURI = `data:${file.mimetype};base64,${b64}`;
            req.body[fieldName] = dataURI;
          }
        }
      }
      next();
    }
  ];
};

export default upload; 