import { DI, IEventAggregator } from 'aurelia';
import { IHttpClient, json } from '@aurelia/fetch-client';

export const IApiService = DI.createInterface<IApiService>('IApiService', x => x.singleton(ApiService));

export interface IApiService extends ApiService {  }

export class ApiService {
    constructor(@IHttpClient private http: IHttpClient, @IEventAggregator private ea: IEventAggregator) {
        // Call the configure method to get the configuration object
        http.configure((config) => {
            // Prefix all API requests with this URL, it saves us having to repeat it
            config.withBaseUrl('http://localhost:3002')

            // The configure method expects us to return the config object
            return config;
        })
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

    async processOrder(userId: string | number, checkoutFields: any, cart: any[]): Promise<any> {
        const response = await this.http.post('/processOrder', json({
            userId: userId,
            checkoutFields,
            cart
        }));

        return response.json();
    }

    // A login method to verify a users login credentials
    async login(username: string, password: string): Promise<any> {
        const response = await this.http.post('/user', json({username, password}));

        return response.json();
    }

    async register(username: string, password: string): Promise<any> {
        const response = await this.http.post('/register', json({ username, password}));

        return response.json();
    }

    public addToCart(product: any): any[] {
        const existingCart = this.getCart();
    
        // Do we already have this product in our cart?
        const itemAlreadyExists = existingCart.find(p => p.id === product.id);
    
        // If we already have a product, increment the quantity
        if (itemAlreadyExists) {
            itemAlreadyExists.quantity++;
        } else {
            // This is a new product, set quantity to 1
            product.quantity = 1;
            existingCart.push(product);
        }
    
        // Save the cart
        localStorage.setItem('cart', JSON.stringify(existingCart));
    
        this.ea.publish('cart:add', product.id);
    
        return existingCart;
    }

    public getCart(): any[] {
        return JSON.parse(localStorage.getItem('cart')) ?? [];
    }

    public getCartTotal(): number {
        const cart = this.getCart();
    
        return cart.reduce((runningTotal, product) => {
            return runningTotal + parseInt(product.quantity);
        }, 0);
    }

    public removeFromCart(productId: number): any[] {
        let existingCart = this.getCart();
    
        // Do we already have this product in our cart?
        const itemAlreadyExists = existingCart.find(p => p.id === productId);
    
        // We have this item in our cart and the quantity is greater than zero
        if (itemAlreadyExists && itemAlreadyExists.quantity > 0) {
            itemAlreadyExists.quantity--;
    
            // Did removing the item just set the quantity to zero?
            if (!itemAlreadyExists.quantity) {
                // Remove the item completely
                existingCart = existingCart.filter((product) => product.id !== productId);
            }
        }
    
        // Save the cart
        localStorage.setItem('cart', JSON.stringify(existingCart));
    
        this.ea.publish('cart:remove', productId);
    
        return existingCart;
    }
}