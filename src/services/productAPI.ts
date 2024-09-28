import axios from "axios";
import Variant from "../models/Variant";

const BASE_URL = 'http://localhost:8080/v1/products';

const INFINITY = 1000000000;

const getAllVariants = async (query: string) : Promise<Variant[]> => {
    try {
        const response = await axios.get(BASE_URL, {
            params: {
                page: 0,
                limit: INFINITY,
                query: query
            }
        });
        let variants : Variant[] = [];
        await response.data.data.map((product: any) => {
            product.variants.forEach((variant: any) => {
                variants.push(Variant.fromJson(variant));
            });
        });
        return variants;
    } catch (error) {
        return [];
    }
}

export { getAllVariants };