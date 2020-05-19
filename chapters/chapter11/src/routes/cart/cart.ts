import { ApiService } from './../../services/api-service';
import { IViewModel } from 'aurelia';

export class Cart implements IViewModel {
    private cart = [];

    constructor(private api: ApiService) {

    }

    beforeBind(): void {
        this.cart = this.api.getCart();
    }
}