import Aurelia from 'aurelia';
import { RouterConfiguration } from '@aurelia/router';
import { ValidationHtmlConfiguration } from '@aurelia/validation-html';
import { FormatDate } from './resources/value-converters/format-date';
import { MyApp } from './my-app';

Aurelia
  .register(
    ValidationHtmlConfiguration, 
    RouterConfiguration.customize({ useUrlFragmentHash: false }),
    FormatDate
  )
  .app(MyApp)
  .start();