import { HttpClient, json } from '@aurelia/fetch-client';
import { inject, EventAggregator } from 'aurelia';

@inject(HttpClient, EventAggregator)
export class ApiService {
    constructor(private http: HttpClient, private ea: EventAggregator) {
        // Call the configure method to get the configuration object
        http.configure((config) => {
            // Prefix all API requests with this URL, it saves us having to repeat it
            config.withBaseUrl('http://localhost:3002')

            // The configure method expects us to return the config object
            return config;
        })
    }

    public getCart(): any[] {
        return JSON.parse(localStorage.getItem('cart')) ?? [];
    }

    // Gets all projects from the API
    async getProducts(): Promise<any[]> {
        const response = await this.http.get('/products');

        return response.json();
    }

    // Get a product by its ID from the API
    async getProduct(productId: string | number): Promise<any> {
        const response = await this.http.get(`/product/${productId}`);

        return response.json();
    }

    // Get all orders for a user from the API
    async getOrders(userId: string | number): Promise<any[]> {
        const response = await this.http.post('/orders', json({ userId: userId }));

        return response.json();
    }

    // A login method to verify a users login credentials
    async login(username: string, password: string): Promise<any> {
        const response = await this.http.post('/user', json({
            username,
            password
        }));

        return response.json();
    }

    public addToCart(product: any): any[] {
        const existingCart = this.getCart();

        existingCart.push(product);

        localStorage.setItem('cart', JSON.stringify(existingCart));

        this.ea.publish('cart:add', product.id);

        return existingCart;
    }

    public removeFromCart(productId: number): any[] {
        let existingCart = this.getCart();

        existingCart = existingCart.filter((product) => product.id !== productId);

        localStorage.setItem('cart', JSON.stringify(existingCart));

        this.ea.publish('cart:remove', productId);

        return existingCart;
    }
}