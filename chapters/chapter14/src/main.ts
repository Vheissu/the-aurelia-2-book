import Aurelia from 'aurelia';
import { RouterConfiguration } from '@aurelia/router';
import { ValidationHtmlConfiguration } from '@aurelia/validation-html';
import { MyApp } from './my-app';

Aurelia
  .register(ValidationHtmlConfiguration, RouterConfiguration.customize({ useUrlFragmentHash: false }))
  .app(MyApp)
  .start();