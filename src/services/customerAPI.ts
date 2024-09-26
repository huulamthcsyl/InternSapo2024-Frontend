import axios from 'axios';
import Customer from '../models/Customer';

const BASE_URL = 'http://localhost:8080/customers';

const INFINITY = 1000000000;

const getCustomersByKeyword = async (keyword: string): Promise<Customer[]> => {
    try {
        const response = await axios.get(BASE_URL, {
            params: {
                pageNum: 0,
                pageSize: INFINITY, // Lấy tất cả khách hàng
                keyword: keyword
            }
        });
        const customers = await response.data.content.map((customer: any) => {
            return Customer.fromJson(customer);
        });
        return customers;
    } catch (error) {
        return [];
    }
}

const getCustomerById = async (id: number): Promise<Customer | null> => {
    try {
        const response = await axios.get(`${BASE_URL}/${id}`);
        return Customer.fromJson(response.data);
    } catch (error) {
        return null;
    }
}

const createCustomer = async (customer: any): Promise<any> => {
    return await axios.post(`${BASE_URL}/create`, customer);
}

export { getCustomersByKeyword, getCustomerById, createCustomer };