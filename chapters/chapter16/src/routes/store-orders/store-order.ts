import { resolve } from 'aurelia';
import { IAuthService } from '../../services/auth-service';
import { IApiService } from '../../services/api-service';
import { IRouteViewModel } from '@aurelia/router';

export class StoreOrder implements IRouteViewModel {
    private api: IApiService = resolve(IApiService);
    private auth: IAuthService = resolve(IAuthService);

    private order;

    

    public async loading(parameters: {id: string}): Promise<void> {
        if (parameters.id) {
            this.order = await this.api.getOrder(this.auth.getCurrentUser().id, parameters.id);

            if (this.order.cart) {
                this.order.cart = JSON.parse(this.order.cart) ?? [];
            }
        }
    }
}