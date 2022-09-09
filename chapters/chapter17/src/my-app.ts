import { ICustomElementViewModel, IEventAggregator, IDisposable } from 'aurelia';
import { IRouter } from '@aurelia/router';

import { IAuthService } from './services/auth-service';
import { AuthHook } from './auth-hook';

export class MyApp {
    static dependencies = [AuthHook];

    private showSearch = false;

    private searchListener: IDisposable;

    static routes = [
        {
            id: 'home',
            path: ['', 'home'],
            component: () => import('./routes/home-page/home-page')
        },
        {
            id: 'products',
            path: 'products',
            component: () => import('./routes/products-list/products-list')
        },
        {
            id: 'product',
            path: 'product/:id',
            component: () => import('./routes/product-item/product-item')
        },
        {
            id: 'cart',
            path: 'cart',
            component: () => import('./routes/store-cart/store-cart')
        },
        {
            id: 'checkout',
            path: 'checkout',
            component: () => import('./routes/store-checkout/store-checkout')
        },
        {
            id: 'login',
            path: 'login',
            component: () => import('./routes/auth/store-login')
        },
        {
            id: 'register',
            path: 'register',
            component: () => import('./routes/auth/store-register')
        },
        {
            id: 'dashboard',
            path: 'dashboard',
            component: () => import('./routes/store-dashboard/store-dashboard'),
        },
        {
            id: 'orders',
            path: 'orders',
            component: () => import('./routes/store-orders/store-orders'),
        },
        {
            id: 'order',
            path: 'order/:id',
            component: () => import('./routes/store-orders/store-order'),
        },
    ];

    constructor(@IRouter private router: IRouter, @IAuthService private auth: IAuthService, @IEventAggregator private ea: IEventAggregator) {}

    binding(): void {
        this.searchListener = this.ea.subscribe('search:open', () => this.showSearch = true);
      }
    
      unbinding(): void {
        this.searchListener.dispose();
      }
  }