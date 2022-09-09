import { ICustomElementViewModel } from '@aurelia/runtime-html';
import { IEventAggregator, IDisposable } from 'aurelia';
import { IApiService } from '../../services/api-service';
import { IAuthService } from '../../services/auth-service';

export class NavBar implements ICustomElementViewModel {
    private cartTotal = 0;

    private cartAddSubscription: IDisposable;
    private cartRemoveSubscription: IDisposable;

    constructor(@IApiService private api: IApiService, @IEventAggregator private ea: IEventAggregator, @IAuthService private auth: IAuthService) {

    }

    binding(): void {
        this.cartTotal = this.api.getCartTotal();

        this.cartAddSubscription = this.ea.subscribe('cart:add', () => {
            this.cartTotal = this.api.getCartTotal();
        });

        this.cartRemoveSubscription = this.ea.subscribe('cart:remove', () => {
            this.cartTotal = this.api.getCartTotal();
        });
    }

    logout(): void {
        this.auth.logout('/home');
    }

    showSearch(): void {
        this.ea.publish('search:open');
    }
}