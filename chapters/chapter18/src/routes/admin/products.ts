import { ApiService } from '../../services/api-service';
import { IRouteableComponent, IRouter } from '@aurelia/router';

export class Products implements IRouteableComponent {
    private products = [];
    
    constructor(@IRouter private router: IRouter, private api: ApiService) {
        
    }

    async binding(): Promise<void> {
        this.products = await this.api.getProducts();
    }
}