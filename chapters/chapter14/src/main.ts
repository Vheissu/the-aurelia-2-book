import Aurelia from 'aurelia';
import { RouterConfiguration } from '@aurelia/router';
import { ValidationHtmlConfiguration } from '@aurelia/validation-html';
import { App } from './app';

Aurelia
  .register(ValidationHtmlConfiguration, RouterConfiguration.customize({ useUrlFragmentHash: false }))
  .app(App)
  .start();
