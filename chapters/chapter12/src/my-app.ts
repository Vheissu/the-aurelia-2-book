export class MyApp {
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
    ];
  }