// Example: How to quickly create a new resource with CRUD operations

// 1. Create a Model (if you don't have one)
/*
import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  price: number;
  description: string;
  category: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true }
}, {
  timestamps: true
});

export default mongoose.model<IProduct>('Product', ProductSchema);
*/

// 2. Create a Service (extends BaseService)
/*
import ProductModel, { IProduct } from '../models/ProductModel';
import BaseService from '../services/BaseService';

export default class ProductService extends BaseService<IProduct> {
  constructor() {
    super(ProductModel);
  }

  // Add product-specific methods
  async getProductsByCategory(category: string): Promise<IProduct[]> {
    return this.findMany({ category });
  }

  async getProductsByPriceRange(minPrice: number, maxPrice: number): Promise<IProduct[]> {
    return this.findMany({
      price: { $gte: minPrice, $lte: maxPrice }
    });
  }
}
*/

// 3. Create a Controller (extends BaseController)
/*
import { Request, Response } from 'express';
import ProductService from '../services/ProductService';
import BaseController from '../controllers/BaseController';
import ResponseUtils from '../utils/responseUtils';
import { IProduct } from '../models/ProductModel';

export class ProductController extends BaseController<IProduct> {
  private productService: ProductService;
  
  constructor() {
    const productService = new ProductService();
    super(productService);
    this.productService = productService;
  }

  // Add product-specific endpoints
  async getProductsByCategory(req: Request, res: Response) {
    try {
      const { category } = req.params;
      const products = await this.productService.getProductsByCategory(category);
      return ResponseUtils.success(res, products);
    } catch (error) {
      return ResponseUtils.error(res, 500, error);
    }
  }

  async getProductsByPriceRange(req: Request, res: Response) {
    try {
      const { minPrice, maxPrice } = req.query;
      const products = await this.productService.getProductsByPriceRange(
        Number(minPrice), 
        Number(maxPrice)
      );
      return ResponseUtils.success(res, products);
    } catch (error) {
      return ResponseUtils.error(res, 500, error);
    }
  }
}
*/

// 4. Create a Router (using RouterFactory)
/*
import { Router } from 'express';
import { ProductController } from '../controllers/ProductController';
import { RouterFactory } from '../utils/routerFactory';

const router = Router();
const productController = new ProductController();

// Automatically generates all CRUD routes + custom routes
const crudRouter = RouterFactory.createCRUDRoutes(
  productController,
  'products',
  [
    { method: 'get', path: '/category/:category', handler: 'getProductsByCategory' },
    { method: 'get', path: '/price-range', handler: 'getProductsByPriceRange' }
  ]
);

router.use(crudRouter);
export default router;
*/

// 5. Add to main app.ts
/*
import productRouter from './routers/ProductRouter';
app.use('/api', productRouter);
*/

// That's it! You now have a complete CRUD API for products with:
// GET /api/products - Get all products
// GET /api/products/:id - Get product by ID
// POST /api/products - Create new product
// PUT /api/products/:id - Update product
// DELETE /api/products/:id - Delete product
// GET /api/products/category/:category - Get products by category
// GET /api/products/price-range?minPrice=10&maxPrice=100 - Get products by price range 