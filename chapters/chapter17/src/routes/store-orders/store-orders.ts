import { IAuthService } from '../../services/auth-service';
import { IApiService } from '../../services/api-service';
import { IRouteableComponent } from '@aurelia/router';

export class StoreOrders implements IRouteableComponent {
    private orders = [];

    constructor(@IApiService private api: IApiService, @IAuthService private auth: IAuthService) {

    }

    public async binding(): Promise<void> {
        this.orders = await this.api.getOrders(this.auth.getCurrentUser().id);
    }
}