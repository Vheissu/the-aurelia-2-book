import { IRouteableComponent } from '@aurelia/router';
import { ApiService } from './../../services/api-service';
import { IRouter } from 'aurelia';

export class Login implements IRouteableComponent {
    private username;
    private password;

    constructor(@IRouter private router: IRouter, private auth: ApiService) {

    }
}