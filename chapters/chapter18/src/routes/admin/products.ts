import { IRouteableComponent, IRouter } from '@aurelia/router';

export class Products implements IRouteableComponent {
    constructor(@IRouter private router: IRouter) {
        
    }
}