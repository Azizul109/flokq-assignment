// src/types/index.ts
export interface User {
    id: number;
    name: string;
    email: string;
  }
  
  export interface Part {
    id: number;
    name: string;
    brand: string;
    price: number;
    stock: number;
    category: string;
    description?: string;
    image_url?: string;
    created_at?: string;
    updated_at?: string;
  }
  
  export interface AuthResponse {
    message: string;
    token: string;
    user: User;
  }
  
  export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    message?: string;
    error?: string;
    count?: number;
  }