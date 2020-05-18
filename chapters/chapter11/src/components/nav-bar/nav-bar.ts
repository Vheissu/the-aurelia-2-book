import { ApiService } from '../../services/api-service';
import { ICustomElementViewModel } from '@aurelia/runtime';
import { inject, EventAggregator, IDisposable } from 'aurelia';

@inject(ApiService, EventAggregator)
export class NavBar implements ICustomElementViewModel {
    private cart = [];

    private cartAddSubscription: IDisposable;
    private cartRemoveSubscription: IDisposable;

    constructor(private api: ApiService, private ea: EventAggregator) {

    }

    beforeBind(): void {
        this.cart = this.api.getCart();

        this.cartAddSubscription = this.ea.subscribe('cart:add', () => {
            this.cart = this.api.getCart();
        });

        this.cartRemoveSubscription = this.ea.subscribe('cart:remove', () => {
            this.cart = this.api.getCart();
        });
    }
}