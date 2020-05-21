import { AuthService } from '../../services/auth-service';
import { ApiService } from '../../services/api-service';
import { IRouteableComponent } from '@aurelia/router';
import { inject } from 'aurelia';

@inject(ApiService, AuthService)
export class Order implements IRouteableComponent {
    public static parameters = ['id'];
    private order;

    constructor(private api: ApiService, private auth: AuthService) {

    }

    public async enter(parameters: {id: string}): Promise<void> {
        if (parameters.id) {
            this.order = await this.api.getOrder(this.auth.getCurrentUser().id, parameters.id);

            if (this.order.cart) {
                this.order.cart = JSON.parse(this.order.cart) ?? [];
            }

            console.log(this.order);
        }
    }
}