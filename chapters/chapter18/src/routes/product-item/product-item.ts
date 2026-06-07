import { resolve } from 'aurelia';
import { IApiService } from '../../services/api-service';
import { IRouteableComponent } from '@aurelia/router';

export class ProductItem implements IRouteableComponent {
    private api: IApiService = resolve(IApiService);

    private product;

    

    public async load(parameters: { id: string }): Promise<void> {
        this.product = await this.api.getProduct(parameters.id);
    }
}