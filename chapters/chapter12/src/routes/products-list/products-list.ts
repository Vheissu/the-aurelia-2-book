import { IApiService } from './../../services/api-service';
import { ICustomElementViewModel, resolve } from 'aurelia';

export class ProductsList implements ICustomElementViewModel {
    private api: IApiService = resolve(IApiService);

    private products = [];

    

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async binding(): Promise<any> {
        this.products = await this.api.getProducts();
    }
}