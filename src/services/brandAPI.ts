import axios from "axios";
import { BrandRequest, BrandResponse } from "../models/ProductInterface";

const BASE_URL = "http://localhost:8080/v1/products/brands";

const INFINITY = 1000000000;

const getAllBrands = async (query: string): Promise<BrandResponse[]> => {
    try {
        const response = await axios.get(BASE_URL, {
            params: {
                page: 0,
                limit: INFINITY,
                query: query,
            },
        });

        return response.data.data;
    } catch (error) {
        return [];
    }
};

const getListOfBrands = async (
    page: number,
    limit: number,
    query: string
): Promise<BrandResponse[]> => {
    try {
        const response = await axios.get(`${BASE_URL}`, {
            params: {
                page: page,
                limit: limit,
                query: query,
            },
        });
        return response.data.data;
    } catch (error) {
        return [];
    }
};

const getNumberOfBrands = async (query: string): Promise<number> => {
    try {
        const response = await axios.get(`${BASE_URL}/total-brands`, {
            params: {
                query: query,
            },
        });
        return parseInt(response.data.data);
    } catch (error) {
        return 0;
    }
};

const createBrand = async (Brand: BrandRequest): Promise<BrandResponse> => {
    const response = await axios.post(`${BASE_URL}/create`, Brand);
    return response.data.data;
};

const updateBrand = async (
    id: number | undefined,
    Brand: BrandRequest
): Promise<BrandResponse> => {
    const response = await axios.put(`${BASE_URL}/${id}/edit`, Brand);
    return response.data.data;
};

const deleteBrand = async (id: number | undefined): Promise<any> => {
    const response = await axios.delete(`${BASE_URL}/${id}`);
    return response.data.data;
};

export {
    getAllBrands,
    getListOfBrands,
    getNumberOfBrands,
    createBrand,
    updateBrand,
    deleteBrand,
};
