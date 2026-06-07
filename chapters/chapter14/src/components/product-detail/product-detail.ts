import { IApiService } from './../../services/api-service';
import { bindable, resolve } from 'aurelia';
import { IHttpClient } from '@aurelia/fetch-client';

export class ProductDetail {
    private http: IHttpClient = resolve(IHttpClient);
    private api: IApiService = resolve(IApiService);

    @bindable private product;

    private image;

    

    public async binding(): Promise<void> {
        const request = await this.http.fetch('https://api.thecatapi.com/v1/images/search?mime_types=jpg');
        const response = await request.json();

        this.image = response[0].url;
    }
}