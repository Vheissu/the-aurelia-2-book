import { resolve } from 'aurelia';
import { IApiService } from '../../services/api-service';
import { IRouteViewModel } from '@aurelia/router';

export class ProductItem implements IRouteViewModel {
    private api: IApiService = resolve(IApiService);

    private product;

    

    public async loading(parameters: { id: string }): Promise<void> {
        this.product = await this.api.getProduct(parameters.id);
    }
}