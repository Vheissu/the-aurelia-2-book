import { ApiService } from '../../services/api-service';
import { IRouteableComponent } from '@aurelia/router';
import { inject, HttpClient } from 'aurelia';

@inject(ApiService, HttpClient)
export class Product implements IRouteableComponent {
    public static parameters = ['id'];
    private product;
    private image;

    constructor(private api: ApiService, private http: HttpClient) {

    }

    public async binding(): Promise<void> {
        const request = await this.http.fetch('https://api.thecatapi.com/v1/images/search?mime_types=jpg');
        const response = await request.json();

        this.image = response[0].url;
    }

    public async load(parameters: { id: string }): Promise<void> {
        this.product = await this.api.getProduct(parameters.id);
    }
}