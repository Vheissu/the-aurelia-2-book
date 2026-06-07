import { IApiService } from '../../services/api-service';
import { ICustomElementViewModel } from '@aurelia/runtime-html';
import { IEventAggregator, IDisposable, resolve } from 'aurelia';

export class NavBar implements ICustomElementViewModel {
    private api: IApiService = resolve(IApiService);
    private ea: IEventAggregator = resolve(IEventAggregator);

    private cartTotal = 0;

    private cartAddSubscription: IDisposable;
    private cartRemoveSubscription: IDisposable;

    

    binding(): void {
        this.cartTotal = this.api.getCartTotal();

        this.cartAddSubscription = this.ea.subscribe('cart:add', () => {
            this.cartTotal = this.api.getCartTotal();
        });

        this.cartRemoveSubscription = this.ea.subscribe('cart:remove', () => {
            this.cartTotal = this.api.getCartTotal();
        });
    }
}