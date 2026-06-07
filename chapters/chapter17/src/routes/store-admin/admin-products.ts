import { resolve } from 'aurelia';
import { IApiService } from '../../services/api-service';
import { IRouteableComponent, IRouter } from '@aurelia/router';

export class AdminProducts implements IRouteableComponent {
    private router: IRouter = resolve(IRouter);
    private api: IApiService = resolve(IApiService);

    private products = [];
    
    

    async binding(): Promise<void> {
        this.products = await this.api.getProducts();
    }
}