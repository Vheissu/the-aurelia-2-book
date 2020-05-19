import { ApiService } from '../../services/api-service';
import { IRouteableComponent } from '@aurelia/router';
import { inject } from 'aurelia';

@inject(ApiService)
export class Checkout implements IRouteableComponent {
    constructor(private api: ApiService) {

    }
}