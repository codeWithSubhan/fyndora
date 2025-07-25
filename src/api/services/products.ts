import api from '../axios';
import {
    Product,
    CreateProductRequest,
    UpdateProductRequest,
    ApiResponse,
    PaginatedResponse
} from '../types';

export const productService = {
    // Get all products with pagination
    async getProducts(params?: {
        page?: number;
        limit?: number;
        category?: string;
        search?: string;
        sortBy?: string;
        sortOrder?: 'asc' | 'desc';
    }): Promise<PaginatedResponse<Product>> {
        const response = await api.get<PaginatedResponse<Product>>('/products', { params });
        return response.data;
    },

    // Get product by ID
    async getProduct(id: string): Promise<Product> {
        const response = await api.get<ApiResponse<Product>>(`/products/${id}`);
        return response.data.data;
    },


}