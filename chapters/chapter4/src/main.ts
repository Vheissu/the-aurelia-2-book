import Aurelia, { RouterConfiguration } from 'aurelia';
import { App } from './app';

Aurelia
  .register(RouterConfiguration.customize({ useUrlFragmentHash: false }))
  .app(App)
  .start();
