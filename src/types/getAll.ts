export interface GetAllResponse<T> {
  data: T[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface GetAllRequest {
  page?: number;
  limit?: number;
  sort?: any;
  filter?: any;
}