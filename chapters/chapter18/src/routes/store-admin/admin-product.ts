import { resolve } from 'aurelia';
import { IRouteableComponent } from '@aurelia/router';
import { IHttpClient } from '@aurelia/fetch-client';

import { IApiService } from '../../services/api-service';

export class AdminProduct implements IRouteableComponent {
    private api: IApiService = resolve(IApiService);
    private http: IHttpClient = resolve(IHttpClient);

    private product;
    private image;

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
