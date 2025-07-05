import { Response } from 'express';

interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: any;
}

export default class ResponseUtils {
  static success<T>(res: Response, data?: T): Response {
    const response: ApiResponse<T> = {
      success: true,
      data,
    };
    return res.status(200).json(response);
  }

  static error(res: Response, statusCode: number = 500, error?: any): Response {
    const response: ApiResponse = {
      success: false,
      error: [error],
    };
    return res.status(statusCode).json(response);
  }

  static unprocessableEntity(res: Response, error?: any): Response {
    return this.error(res, 422, error);
  }

  static badRequest(res: Response, error?: any): Response {
    return this.error(res, 400, error);
  }

  static unauthorized(res: Response, error?: any): Response {
    return this.error(res, 401, error);
  }

  static notFound(res: Response, error?: any): Response {
    return this.error(res, 404, error);
  }
}
