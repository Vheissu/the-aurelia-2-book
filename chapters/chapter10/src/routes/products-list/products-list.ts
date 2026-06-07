import { IApiService } from './../../services/api-service';
import { ICustomElementViewModel, resolve } from 'aurelia';

export class ProductsList implements ICustomElementViewModel {
    private api: IApiService = resolve(IApiService);

    private products = [];

    

    async binding(): Promise<void> {
        this.products = await this.api.getProducts();
    }
}