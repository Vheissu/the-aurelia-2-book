import { ApiService } from '../../services/api-service';
import { bindable, inject, HttpClient } from 'aurelia';

@inject(ApiService, HttpClient)
export class ProductDetail {
    @bindable private product;

    private image;

    constructor(private api: ApiService, private http: HttpClient) {

    }

    public async beforeBind(): Promise<void> {
        const request = await this.http.fetch('https://api.thecatapi.com/v1/images/search?mime_types=jpg');
        const response = await request.json();

        this.image = response[0].url;
    }
}