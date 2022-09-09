import { IAuthService } from '../../services/auth-service';
import { IApiService } from '../../services/api-service';
import { IRouteableComponent } from '@aurelia/router';

export class StoreOrder implements IRouteableComponent {
    private order;

    constructor(@IApiService private api: IApiService, @IAuthService private auth: IAuthService) {

    }

    public async load(parameters: {id: string}): Promise<void> {
        if (parameters.id) {
            this.order = await this.api.getOrder(this.auth.getCurrentUser().id, parameters.id);

            if (this.order.cart) {
                this.order.cart = JSON.parse(this.order.cart) ?? [];
            }
        }
    }
}