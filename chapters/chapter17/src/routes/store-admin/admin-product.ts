import { IRouteableComponent } from '@aurelia/router';
import { IApiService } from '../../services/api-service';
import { IHttpClient } from '@aurelia/fetch-client';

export class Product implements IRouteableComponent {
    static parameters = ['id'];

    private product;

    private image;

    constructor(@IApiService private api: IApiService, @IHttpClient private http: IHttpClient) {

    }

    public async load(params: { id: string }): Promise<void> {
        const request = await this.http.fetch('https://api.thecatapi.com/v1/images/search?mime_types=jpg');
        const response = await request.json();

        this.product = await this.api.getProduct(params.id);

        this.image = response[0].url;
    }

    private save(): void {
        this.api.updateProduct(this.product);
    }
}