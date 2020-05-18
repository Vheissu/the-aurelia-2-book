import { ApiService } from '../../services/api-service';
import { bindable, inject } from 'aurelia';

@inject(ApiService)
export class ProductDetail {
    @bindable private product;

    constructor(private api: ApiService) {

    }

    private addToCart(): void {
        const existingCart = JSON.parse(localStorage.getItem('cart')) ?? [];

        existingCart.push(this.product);

        localStorage.setItem('cart', JSON.stringify(existingCart));
    }
}