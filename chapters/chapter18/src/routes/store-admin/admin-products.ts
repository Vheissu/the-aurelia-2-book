import { resolve } from 'aurelia';
import { IRouteableComponent } from '@aurelia/router';

import { IApiService } from '../../services/api-service';

export class AdminProducts implements IRouteableComponent {
    private api: IApiService = resolve(IApiService);

    private products = [];

    async binding(): Promise<void> {
        this.products = await this.api.getProducts();
    }
}
