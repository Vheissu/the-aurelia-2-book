import { ApiService } from '../../services/api-service';
import { IRouteableComponent } from '@aurelia/router';
import { inject } from 'aurelia';
import { newInstanceForScope } from '@aurelia/kernel';

import { IValidationRules, ValidationRules } from '@aurelia/validation';
import { IValidationController } from '@aurelia/validation-html';

@inject(ApiService)
export class Checkout implements IRouteableComponent {
    private details = {
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        address2: '',
        country: '',
        state: '',
        zip: '',
        paymentType: '',
        ccName: '',
        ccNumber: '',
        ccExpiration: '',
        ccCvv: ''
    };

    private cart = [];
    private total;
    private totalItems = 0;

    constructor(private api: ApiService, @newInstanceForScope(IValidationController) private validationController: IValidationController, @IValidationRules validationRules: IValidationRules) {
        validationRules
            .on(this.details)
            .ensure('firstName')
                .required()
            .ensure('lastName')
                .required()
            .ensure('email')
                .email()
                .required()
            .ensure('address')
                .required()
            .ensure('country')
                .required()
            .ensure('state')
                .required()
            .ensure('zip')
                .required()
            .ensure('paymentType')
                .required()
            .ensure('ccName')
                .required()
                .when((p => p.paymentType === 'credit'))
            .ensure('ccNumber')
                .required()
                .when((p => p.paymentType === 'credit'))
            .ensure('ccExpiration')
                .required()
                .when((p => p.paymentType === 'credit'))
            .ensure('ccCvv')
                .required()
                .when((p => p.paymentType === 'credit'))
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