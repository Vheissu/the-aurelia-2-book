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
      }
  ];
}