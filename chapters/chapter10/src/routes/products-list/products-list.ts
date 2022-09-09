import { IApiService } from './../../services/api-service';
import { ICustomElementViewModel } from 'aurelia';

export class ProductsList implements ICustomElementViewModel {
    private products = [];

    constructor(@IApiService private api: IApiService) {

    }

    async binding(): Promise<any> {
        this.products = await this.api.getProducts();
    }
}