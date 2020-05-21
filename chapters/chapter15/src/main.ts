import Aurelia, { RouterConfiguration } from 'aurelia';
import { ValidationHtmlConfiguration } from '@aurelia/validation-html';
import { FormatDate } from './resources/value-converters/format-date';
import { App } from './app';

Aurelia
  .register(
    ValidationHtmlConfiguration, 
    RouterConfiguration.customize({ useUrlFragmentHash: false }),
    FormatDate
  )
  .app(App)
  .start();
