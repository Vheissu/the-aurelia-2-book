import { ApiService } from './../../services/api-service';
import { IViewModel, inject } from 'aurelia';

@inject(ApiService)
export class Cart implements IViewModel {
    private cart = [];
    private total = 0.00;

    constructor(private api: ApiService) {

    }

    beforeBind(): void {
        this.cart = this.api.getCart();

        this.calculateTotal();
    }

    private removeFromCart(id: number): void {
        this.api.removeFromCart(id);

        this.cart = this.api.getCart();

        this.calculateTotal();
    }

    private updateCart(): void {
        localStorage.setItem('cart', JSON.stringify(this.cart));
        
        this.calculateTotal();
    }

    private calculateTotal(): void {
        this.total = this.cart.reduce((runningTotal, product) => {
            const total = parseInt(product.quantity) * product.price;

            return runningTotal + total;
        }, 0).toFixed(2);
    }
}