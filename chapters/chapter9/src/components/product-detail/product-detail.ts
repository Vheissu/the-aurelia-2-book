import { ICustomElementViewModel } from '@aurelia/runtime';
import { bindable, HttpClient } from 'aurelia';

export class ProductDetail implements ICustomElementViewModel {
    @bindable private product;

    private image;

    constructor(private http: HttpClient) {

    }

    public async beforeBind(): Promise<void> {
        const request = await this.http.fetch('https://api.thecatapi.com/v1/images/search?mime_types=jpg');
        const response = await request.json();

        this.image = response[0].url;
    }

    private addToCart(): void {
        const existingCart = JSON.parse(localStorage.getItem('cart')) ?? [];

        existingCart.push(this.product);

        localStorage.setItem('cart', JSON.stringify(existingCart));
    }
}