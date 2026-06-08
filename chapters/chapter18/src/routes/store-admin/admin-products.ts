import { resolve } from 'aurelia';
import { IRouteViewModel } from '@aurelia/router';

import { IApiService } from '../../services/api-service';

export class AdminProducts implements IRouteViewModel {
    private api: IApiService = resolve(IApiService);

    private products = [];

    async binding(): Promise<void> {
        this.products = await this.api.getProducts();
    }
}
