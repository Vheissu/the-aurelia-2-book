import { AuthService } from '../../services/auth-service';
import { ApiService } from '../../services/api-service';
import { IRouteableComponent } from '@aurelia/router';
import { inject } from 'aurelia';

@inject(ApiService, AuthService)
export class Orders implements IRouteableComponent {
    private orders = [];

    constructor(private api: ApiService, private auth: AuthService) {

    }

    public async beforeBind(): Promise<void> {
        this.orders = await this.api.getOrders(this.auth.getCurrentUser().id);
    }
}