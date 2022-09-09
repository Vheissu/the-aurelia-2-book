import { IApiService } from '../../services/api-service';
import { IRouteableComponent } from '@aurelia/router';

export class ProductItem implements IRouteableComponent {
    private product;

    constructor(@IApiService private api: IApiService) {

    }

    public async load(parameters: { id: string }): Promise<void> {
        this.product = await this.api.getProduct(parameters.id);
    }
}