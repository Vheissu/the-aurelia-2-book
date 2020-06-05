import { IRouteableComponent, IRouter } from '@aurelia/router';

export class Admin implements IRouteableComponent {
    constructor(@IRouter private router: IRouter) {
        
    }
}