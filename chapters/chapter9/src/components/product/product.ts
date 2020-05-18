import { bindable } from 'aurelia';

export class Product {
    @bindable private product;

    private addToCart(): void {
        const existingCart = JSON.parse(localStorage.getItem('cart')) ?? [];

        existingCart.push(this.product);

        localStorage.setItem('cart', JSON.stringify(existingCart));
    }
}