import { ApiService } from './../../services/api-service';
import { IViewModel } from 'aurelia';

export class Cart implements IViewModel {
    private cart = [];

    constructor(private api: ApiService) {

    }

    beforeBind(): void {
        this.cart = this.api.getCart();
    }

    private removeFromCart(id: number): void {
        this.api.removeFromCart(id);

        this.cart = this.api.getCart();
    }
}