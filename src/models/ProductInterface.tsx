export interface ProductResponse {
    id: number;
    name: string;
    categoryId: number;
    categoryName: string;
    brandId: number;
    brandName: string;
    description: string;
    totalQuantity: number;
    status: boolean;
    size: string[];
    color: string[];
    material: string[];
    imagePath: string[];
    createdOn: Date;
    updatedOn: Date;
    variants: VariantResponse[];
}
export interface VariantResponse {
    id: number;
    name: string;
    productId: number;
    productName: string;
    sku: string;
    quantity: number;
    status: boolean;
    size: string;
    color: string;
    material: string;
    imagePath: string;
    createdOn: Date;
    updatedOn: Date;
    initialPrice: number;
    priceForSale: number;
}

export interface ProductRequest {
    name: string;
    categoryId: number;
    brandId: number;
    description: string;
    imagePath: string[] | [];
    createdOn: Date;
    updatedOn: Date;
    variants: VariantRequest[];
}

export interface VariantRequest {
    id?: number;
    name: string;
    productId?: number;
    quantity?: number;
    sku: string;
    size: string;
    color: string;
    material: string;
    imagePath: string | "";
    initialPrice: number;
    priceForSale: number;
}

export interface CategoryResponse {
    id: number;
    name: string;
    code: string;
    description: string;
    createdOn: Date;
    updatedOn: Date;
}

export interface CategoryRequest {
    id?: number;
    name: string;
    code: string;
    description: string;
}

export interface BrandResponse {
    id: number;
    name: string;
    code: string;
    description: string;
    createdOn: Date;
    updatedOn: Date;
}

export interface BrandRequest {
    id?: number;
    name: string;
    code: string;
    description: string;
}
