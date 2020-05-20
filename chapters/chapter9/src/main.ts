import { Home } from './routes/home/home';
import Aurelia, { RouterConfiguration } from 'aurelia';
import { App } from './app';

Aurelia
  .register(Home, RouterConfiguration.customize({ useUrlFragmentHash: false }))
  .app(App)
  .start();
