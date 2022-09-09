export class MyApp {
  static routes = [
      {
          id: 'home',
          path: ['', 'home'],
          component: () => import('./routes/home-page/home-page')
      }
  ];
}