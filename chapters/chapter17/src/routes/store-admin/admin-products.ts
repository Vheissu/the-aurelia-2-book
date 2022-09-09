import { IApiService } from '../../services/api-service';
import { IRouteableComponent, IRouter } from '@aurelia/router';

export class AdminProducts implements IRouteableComponent {
    private products = [];
    
    constructor(@IRouter private router: IRouter, @IApiService private api: IApiService) {
        
    }

    async binding(): Promise<void> {
        this.products = await this.api.getProducts();
    }
}