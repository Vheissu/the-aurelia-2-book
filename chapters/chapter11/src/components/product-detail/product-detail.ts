import { ApiService } from '../../services/api-service';
import { bindable, inject } from 'aurelia';

@inject(ApiService)
export class ProductDetail {
    @bindable private product;

    constructor(private api: ApiService) {

    }
}