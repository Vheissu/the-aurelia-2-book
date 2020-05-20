import { ApiService } from '../../services/api-service';
import { IRouteableComponent } from '@aurelia/router';
import { inject } from 'aurelia';
import { newInstanceForScope } from '@aurelia/kernel';

import { IValidationRules } from '@aurelia/validation';
import { IValidationController } from '@aurelia/validation-html';

@inject(ApiService)
export class Checkout implements IRouteableComponent {
    private cart = [];
    private total;
    private totalItems = 0;

    constructor(private api: ApiService, @newInstanceForScope(IValidationController) private validationController: IValidationController, ) {

    }

    public beforeBind(): void {
        this.cart = this.api.getCart();
        this.totalItems = this.api.getCartTotal();

        this.calculateTotal();
    }

    private calculateTotal(): void {
        this.total = this.cart.reduce((runningTotal, product) => {
            const total = parseInt(product.quantity) * product.price;

            return runningTotal + total;
        }, 0).toFixed(2);
    }
}