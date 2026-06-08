import { ICustomElementViewModel, IEventAggregator, IDisposable, resolve } from 'aurelia';
import { IRouter } from '@aurelia/router';

import { IAuthService } from './services/auth-service';
import { AuthHook } from './auth-hook';

export class MyApp {
    private router: IRouter = resolve(IRouter);
    private auth: IAuthService = resolve(IAuthService);
    private ea: IEventAggregator = resolve(IEventAggregator);

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
            data: { auth: true },
        },
        {
            id: 'orders',
            path: 'orders',
            component: () => import('./routes/store-orders/store-orders'),
            data: { auth: true },
        },
        {
            id: 'order',
            path: 'order/:id',
            component: () => import('./routes/store-orders/store-order'),
            data: { auth: true },
        },
        {
            id: 'admin',
            path: 'admin',
            component: () => import('./routes/store-admin/store-admin'),
            data: {
                auth: true,
                admin: true,
            },
            routes: [
                {
                    id: 'admin-products',
                    path: ['', 'products'],
                    component: () => import('./routes/store-admin/admin-products'),
                    viewport: 'admin',
                    data: {
                        auth: true,
                        admin: true,
                    },
                },
                {
                    id: 'admin-product',
                    path: 'product/:id',
                    component: () => import('./routes/store-admin/admin-product'),
                    viewport: 'admin',
                    data: {
                        auth: true,
                        admin: true,
                    },
                },
            ],
        },
    ];

    

    binding(): void {
        this.searchListener = this.ea.subscribe('search:open', () => this.showSearch = true);
      }
    
      unbinding(): void {
        this.searchListener.dispose();
      }
  }
