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
            return new Customer(customer.id, customer.code, customer.name, customer.email, customer.phoneNumber, customer.address, customer.gender, new Date(customer.birthday), customer.totalExpense, customer.numberOfOrder);
        });
        return customers;
    } catch (error) {
        return [];
    }
}

export { getCustomersByKeyword };