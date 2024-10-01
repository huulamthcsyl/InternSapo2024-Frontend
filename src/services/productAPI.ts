import axios from "axios";
import Variant from "../models/Variant";
import {
    ProductRequest,
    ProductResponse,
    VariantRequest,
    VariantResponse,
} from "../models/ProductInterface";

const BASE_URL = "http://localhost:8080/v1/products";

const INFINITY = 1000000000;

const getAllVariants = async (query: string): Promise<Variant[]> => {
    try {
        const response = await axios.get(BASE_URL, {
            params: {
                page: 0,
                limit: INFINITY,
                query: query,
            },
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        const variants: Variant[] = [];
        await response.data.data.map((product: any) => {
            product.variants.forEach((variant: any) => {
                variants.push(Variant.fromJson(variant));
            });
        });
        return variants;
    } catch (error) {
        return [];
    }
};

const getListOfProducts = async (
    page: number,
    limit: number,
    query: string
): Promise<ProductResponse[]> => {
    try {
        const response = await axios.get(`${BASE_URL}`, {
            params: {
                page: page,
                limit: limit,
                query: query,
            },
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        return response.data.data;
    } catch (error) {
        return [];
    }
};

const getNumberOfProducts = async (query: string): Promise<number> => {
    try {
        const response = await axios.get(`${BASE_URL}/total-products`, {
            params: {
                query: query,
            },
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        return parseInt(response.data.data);
    } catch (error) {
        return 0;
    }
};

const getProductById = async (
    id: string | undefined
): Promise<ProductResponse> => {
    const response = await axios.get(`${BASE_URL}/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return response.data.data;
};

const createProduct = async (
    product: ProductRequest
): Promise<ProductResponse> => {
    const response = await axios.post(`${BASE_URL}/create`, product, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return response.data.data;
};

const updateProduct = async (
    id: string | undefined,
    product: ProductRequest
): Promise<ProductResponse> => {
    const response = await axios.put(`${BASE_URL}/${id}/edit`, product, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return response.data.data;
};

const deleteProduct = async (id: string | undefined): Promise<any> => {
    const response = await axios.delete(`${BASE_URL}/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return response.data.data;
};

const getListOfVariants = async (
    page: number,
    limit: number,
    query: string
): Promise<VariantResponse[]> => {
    try {
        const response = await axios.get(`${BASE_URL}/variants`, {
            params: {
                page: page,
                limit: limit,
                query: query,
            },
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        return response.data.data;
    } catch (error) {
        return [];
    }
};

const getNumberOfVariants = async (query: string): Promise<number> => {
    try {
        const response = await axios.get(`${BASE_URL}/total-variants`, {
            params: {
                query: query,
            },
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        return parseInt(response.data.data);
    } catch (error) {
        return 0;
    }
};

const createVariant = async (
    id: string | undefined,
    variant: VariantRequest
): Promise<VariantResponse> => {
    const response = await axios.post(
        `${BASE_URL}/${id}/variants/create`,
        variant,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }
    );
    return response.data.data;
};

const deleteVariantByProperty = async (
    id: string | undefined,
    prop: string | undefined,
    value: string
): Promise<any> => {
    const response = await axios.delete(BASE_URL, {
        params: {
            prop: prop,
            value: value,
        },
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return response.data.data;
};

export {
    getAllVariants,
    getListOfProducts,
    getNumberOfProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    getListOfVariants,
    getNumberOfVariants,
    createVariant,
    deleteVariantByProperty,
};
