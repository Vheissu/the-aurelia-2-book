import { ApiService } from '../../services/api-service';
import { IRouteableComponent } from '@aurelia/router';
import { inject } from 'aurelia';

@inject(ApiService)
export class Product implements IRouteableComponent {
    public static parameters = ['id'];
    private product;

    constructor(private api: ApiService) {

    }

    public async enter(parameters: { id: string }): Promise<void> {
        this.product = await this.api.getProduct(parameters.id);
    }
}