import { IApiService } from './../../services/api-service';
import { ICustomElementViewModel } from 'aurelia';

export class StoreCart implements ICustomElementViewModel {
    private cart = [];
    private total = 0.00;

    constructor(@IApiService private api: IApiService) {

    }

    binding(): void {
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