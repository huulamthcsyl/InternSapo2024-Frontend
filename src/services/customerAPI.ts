import axios from 'axios';
import Customer from '../models/Customer';

const BASE_URL = 'http://localhost:8000/customers';

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
const fetchCustomers = async (pageNum: number, pageSize: number, keyword: string): Promise<any> => {
    try {
        const response = await axios.get(BASE_URL, {
            params: {
                pageNum,
                pageSize,
                keyword: keyword || ''
            }
        });

        if (response.status === 404) {
            throw new Error('Không tồn tại khách hàng.');
        }

        return response.data;
    } catch (error) {
        throw error; // Ném lại lỗi để xử lý ở nơi gọi
    }
};

const submitNewCustomer = async (newCustomer: any) => {
    try {
        const response = await axios.post(`${BASE_URL}/create`, newCustomer, {
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (response.status !== 201) {
            if (response.status === 409) {
                throw new Error("Số điện thoại đã tồn tại.");
            }
            throw new Error("Có lỗi xảy ra khi tạo khách hàng mới.");
        }

        return response.data; // Trả về dữ liệu khách hàng vừa tạo
    } catch (error) {
        throw new Error(error.response?.data?.message || error.message);
    }
};
const getCustomerById = async (id: string | undefined): Promise<Customer | null> => {
    try {
        const response = await axios.get(`${BASE_URL}/${id}`);
        return Customer.fromJson(response.data);
    } catch (error) {
        return error;
    }
}

const createCustomer = async (customer: any): Promise<any> => {
    return await axios.post(`${BASE_URL}/create`, customer);
}

const deleteCustomer = async (customerId) => {
    try {
        const response = await axios.delete(`${BASE_URL}/delete/${customerId}`);
        return response.data; // Trả về dữ liệu nhận được từ server
    } catch (error) {
        // Lấy thông báo lỗi từ response nếu có
        throw new Error('Lỗi khi xóa khách hàng: ' + (error.response?.data?.message || error.message));
    }
};
const updateCustomer = async (customerId, customerData) => {
    try {
        const response = await axios.put(`${BASE_URL}/update/${customerId}`, customerData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return response.data; // Trả về dữ liệu nhận được từ server
    } catch (error) {
        // Kiểm tra lỗi 409 và trả về thông báo tương ứng
        if (error.response?.status === 409) {
            throw new Error('Số điện thoại đã tồn tại');
        }
        // Lấy thông báo lỗi từ response nếu có
        throw new Error(error.response?.data?.message || error.message);
    }
};

export { getCustomersByKeyword, getCustomerById, createCustomer, fetchCustomers, submitNewCustomer, deleteCustomer, updateCustomer };
