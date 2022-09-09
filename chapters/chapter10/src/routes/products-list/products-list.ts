import { ICustomElementViewModel } from 'aurelia';
import { IApiService } from '../../services/api-service';

export class ProductsList implements ICustomElementViewModel {
    constructor(@IApiService private api: IApiService) {

    }
}