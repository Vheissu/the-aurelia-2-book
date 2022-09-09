import { IApiService } from './../../services/api-service';
import { bindable } from 'aurelia';
import { IHttpClient } from '@aurelia/fetch-client';

export class ProductDetail {
    @bindable private product;

    private image;

    constructor(@IHttpClient private http: IHttpClient, @IApiService private api: IApiService) {

    }

    public async binding(): Promise<void> {
        const request = await this.http.fetch('https://api.thecatapi.com/v1/images/search?mime_types=jpg');
        const response = await request.json();

        this.image = response[0].url;
    }
}