import axios from "axios";
import { CategoryRequest, CategoryResponse } from "../models/ProductInterface";

const BASE_URL = "http://localhost:8080/v1/products/categories";

const INFINITY = 1000000000;

const getAllCategories = async (query: string): Promise<CategoryResponse[]> => {
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

        return response.data.data;
    } catch (error) {
        return [];
    }
};

const getListOfCategories = async (
    page: number,
    limit: number,
    query: string
): Promise<CategoryResponse[]> => {
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

const getNumberOfCategories = async (query: string): Promise<number> => {
    try {
        const response = await axios.get(`${BASE_URL}/total-categories`, {
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

const createCategory = async (
    category: CategoryRequest
): Promise<CategoryResponse> => {
    const response = await axios.post(`${BASE_URL}/create`, category, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
    return response.data.data;
};

const updateCategory = async (
    id: number | undefined,
    category: CategoryRequest
): Promise<CategoryResponse> => {
    const response = await axios.put(`${BASE_URL}/${id}/edit`, category, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
    return response.data.data;
};

const deleteCategory = async (id: number | undefined): Promise<any> => {
    const response = await axios.delete(`${BASE_URL}/${id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
    return response.data.data;
};

export {
    getAllCategories,
    getListOfCategories,
    getNumberOfCategories,
    createCategory,
    updateCategory,
    deleteCategory,
};
