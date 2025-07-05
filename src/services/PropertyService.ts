import PropertyModel, { IProperty } from '../models/PropertyModel';
import BaseService from './BaseService';

export default class PropertyService extends BaseService<IProperty> {
  constructor() {
    super(PropertyModel);
  }

  // Property-specific methods
  async getAvailableProperties(): Promise<IProperty[]> {
    return this.findMany({ available: true });
  }

  async getPropertiesByType(type: string): Promise<IProperty[]> {
    return this.findMany({ type });
  }

  async getPropertiesByVendor(vendorId: string): Promise<IProperty[]> {
    return this.findMany({ vendor: vendorId });
  }

  async getPropertiesByPriceRange(minPrice: number, maxPrice: number): Promise<IProperty[]> {
    return this.findMany({
      pricePerNight: { $gte: minPrice, $lte: maxPrice }
    });
  }

  async searchProperties(query: string): Promise<IProperty[]> {
    return this.findMany({
      $or: [
        { address: { $regex: query, $options: 'i' } },
        { details: { $regex: query, $options: 'i' } },
        { tags: { $in: [new RegExp(query, 'i')] } }
      ]
    });
  }
} 