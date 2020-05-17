import { HttpClient, json } from '@aurelia/fetch-client';

export class ApiService {
    constructor(private http: HttpClient) {
        http.configure((config) => {
            config.withBaseUrl('http://localhost:3002')

            return config;
        })
    }

    async getProducts(): Promise<any[]> {
        const response = await this.http.get('/products');
        
        return response.json();
    }

    async getProduct(productId: string | number): Promise<any> {
        const response = await this.http.get(`/product/${productId}`);

        return response.json();
    }

    async getOrders(userId: string | number): Promise<any[]> {
        const response = await this.http.post('/orders', json({ userId: userId }));

        return response.json();
    }

    async login(username: string, password: string): Promise<any> {
        const response = await this.http.post('/user', json({
            username,
            password
        }));

        return response.json();
    }
}