import { ApiService } from '../../services/api-service';
import { bindable, inject, HttpClient } from 'aurelia';

@inject(ApiService, HttpClient)
export class ProductDetail {
    @bindable private product;

    private image;

    constructor(private api: ApiService, private http: HttpClient) {

    }

    public async beforeBind(): Promise<void> {
        const loadImage = (await this.http.fetch('https://api.thecatapi.com/v1/images/search')).json();
        this.image = loadImage[0].url;
    }
}