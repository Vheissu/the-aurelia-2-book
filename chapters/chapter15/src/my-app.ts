import { AuthHook } from './auth-hook';

export class MyApp {
    static dependencies = [AuthHook];

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
  }