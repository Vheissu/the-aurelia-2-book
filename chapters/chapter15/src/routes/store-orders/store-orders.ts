import { resolve } from 'aurelia';
import { IAuthService } from '../../services/auth-service';
import { IApiService } from '../../services/api-service';
import { IRouteViewModel } from '@aurelia/router';

export class StoreOrders implements IRouteViewModel {
    private api: IApiService = resolve(IApiService);
    private auth: IAuthService = resolve(IAuthService);

    private orders = [];

    

    public async binding(): Promise<void> {
        this.orders = await this.api.getOrders(this.auth.getCurrentUser().id);
    }
}