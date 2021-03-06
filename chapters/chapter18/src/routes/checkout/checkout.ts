import { AuthService } from '../../services/auth-service';
import { ApiService } from '../../services/api-service';
import { IRouteableComponent, IRouter } from '@aurelia/router';

import { newInstanceForScope } from '@aurelia/kernel';
import { IValidationRules } from '@aurelia/validation';
import { IValidationController, ValidationResultPresenterService } from '@aurelia/validation-html';

const sleep = (ms: number) => setTimeout(() => Promise.resolve(), ms);

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

    private processing = false;

    private presenter: ValidationResultPresenterService;

    private cart = [];
    private total;
    private totalItems = 0;

    constructor(private api: ApiService, private auth: AuthService, @IRouter private router: IRouter, @newInstanceForScope(IValidationController) private validationController: IValidationController, @IValidationRules validationRules: IValidationRules) {
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

    public binding(): void {
        this.cart = this.api.getCart();
        this.totalItems = this.api.getCartTotal();

        this.calculateTotal();
    }

    public async submit(): Promise<void> {
        const result = await this.validationController.validate();
    
        if (result.valid) {
            this.processing = true;
    
            await sleep(1500); // wait 1.5 seconds before going to the server
            const order: { orderId: number; success: boolean } = await this.api.processOrder(this.auth.getCurrentUser().id, this.details, this.cart);
    
            if (order.success) {
                this.router.load(`/order(${order.orderId})`);
            }
    
            this.processing = false;
        }
    }

    private calculateTotal(): void {
        this.total = this.cart.reduce((runningTotal, product) => {
            const total = parseInt(product.quantity) * product.price;

            return runningTotal + total;
        }, 0).toFixed(2);
    }
}