import axios from 'axios';

const BASE_URL = 'http://localhost:8080/v1/orders';

const getAllOrders = async (page: number, limit: number, query: string, startDate: string, endDate: string): Promise<any> => {
    try {
        const response = await axios.get(`${BASE_URL}/`, {
            params: {
                page: page,
                limit: limit,
                query: query,
                startDate: startDate,
                endDate: endDate
            }
        });
        return response.data;
    } catch (error) {
        return [];
    }
}

const getNumberOfOrders = async (query: string, startDate: string, endDate: string): Promise<any> => {
    try {
        const response = await axios.get(`${BASE_URL}/count`, {
            params: {
                query: query,
                startDate: startDate,
                endDate: endDate
            }
        });
        return response.data;
    } catch (error) {
        return 0;
    }
}

const getOrderDetail = async (orderCode: string | undefined): Promise<any> => {
    try {
        const response = await axios.get(`${BASE_URL}/${orderCode}`);
        return response.data;
    } catch (error) {
        return null;
    }
}

const createOrder = async (order: any): Promise<any> => {
    return await axios.post(`${BASE_URL}/create`, order);
}

export { createOrder, getAllOrders, getNumberOfOrders, getOrderDetail };