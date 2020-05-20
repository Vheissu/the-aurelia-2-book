import { ApiService } from '../../services/api-service';
import { IRouteableComponent } from '@aurelia/router';
import { inject } from 'aurelia';
import { newInstanceForScope } from '@aurelia/kernel';

import { IValidationRules } from '@aurelia/validation';
import { IValidationController, ValidationResultPresenterService } from '@aurelia/validation-html';

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
        paymentType: 'credit',
        ccName: '',
        ccNumber: '',
        ccExpiration: '',
        ccCvv: ''
    };

    private presenter: ValidationResultPresenterService;

    private cart = [];
    private total;
    private totalItems = 0;

    constructor(private api: ApiService, @newInstanceForScope(IValidationController) private validationController: IValidationController, @IValidationRules validationRules: IValidationRules) {
        this.presenter = new ValidationResultPresenterService();
        this.validationController.addSubscriber(this.presenter);
        
        validationRules
            .on(this.details)
            .ensure('firstName')
                .required()
            .ensure('lastName')
                .required()
            .ensure('email')
                .required()
                .email()
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

    public async submit(): Promise<void> {
        const result = await this.validationController.validate();

        console.log(result);
    }

    private calculateTotal(): void {
        this.total = this.cart.reduce((runningTotal, product) => {
            const total = parseInt(product.quantity) * product.price;

            return runningTotal + total;
        }, 0).toFixed(2);
    }
}