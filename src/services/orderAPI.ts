import axios from 'axios';

const BASE_URL = 'http://localhost:8080/v1/orders';

const createOrder = async (order: any): Promise<any> => {
    return await axios.post(`${BASE_URL}/create`, order);
}

export { createOrder };