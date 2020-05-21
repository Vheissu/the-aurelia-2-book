import { AuthService } from './../../services/auth-service';
import { ApiService } from '../../services/api-service';
import { ICustomElementViewModel } from '@aurelia/runtime';
import { inject, EventAggregator, IDisposable } from 'aurelia';

@inject(ApiService, EventAggregator, AuthService)
export class NavBar implements ICustomElementViewModel {
    private cartTotal = 0;

    private cartAddSubscription: IDisposable;
    private cartRemoveSubscription: IDisposable;

    constructor(private api: ApiService, private ea: EventAggregator, private auth: AuthService) {

    }

    beforeBind(): void {
        this.cartTotal = this.api.getCartTotal();

        this.cartAddSubscription = this.ea.subscribe('cart:add', () => {
            this.cartTotal = this.api.getCartTotal();
        });

        this.cartRemoveSubscription = this.ea.subscribe('cart:remove', () => {
            this.cartTotal = this.api.getCartTotal();
        });
    }

    logout(): void {
        this.auth.logout('/');
    }
}