import { Model, Document } from 'mongoose';
import { GetAllResponse } from '../types/getAll';
import { GetAllRequest } from '../types/getAll';

export default abstract class BaseService<T extends Document> {
  protected model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  async getAll(): Promise<T[]> {
    return this.model.find();
  }

  async getById(id: string): Promise<T | null> {
    return this.model.findById(id);
  }

  async create(data: Partial<T>): Promise<T> {
    const entity = new this.model(data);
    return entity.save();
  }

  async update(id: string, data: Partial<T>): Promise<T | null> {
    return this.model.findByIdAndUpdate(id, data, { new: true , runValidators: true });
  }

  async delete(id: string): Promise<T | null> {
    return this.model.findByIdAndDelete(id);
  }

  async findOne(filter: any): Promise<T | null> {
    return this.model.findOne(filter);
  }

  async findMany(filter: any): Promise<T[]> {
    return this.model.find(filter);
  }

  async getPaginated(
    options: GetAllRequest = {}
  ): Promise<GetAllResponse<T>> {
    const { page, limit, sort, filter } = options;
    const skip = (page! - 1) * limit!;
    const [data, totalItems] = await Promise.all([
      this.model.find(filter).sort(sort).skip(skip).limit(limit!),
      this.model.countDocuments(filter)
    ]);

    const totalPages = Math.ceil(totalItems / limit!);
    return {
      data,
      totalItems,
      totalPages,
      currentPage: page!,
      pageSize: limit!,
      hasNextPage: page! < totalPages,
      hasPrevPage: page! > 1
    };
  }
}