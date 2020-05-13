import Aurelia, { RouterConfiguration, StyleConfiguration } from 'aurelia';
import { App } from './app';
import shared from './shared-styles.css';

Aurelia
  .register(StyleConfiguration.shadowDOM({
    // optionally add the shared styles for all components
    sharedStyles: [shared]
  }))
  .register(RouterConfiguration.customize({ useUrlFragmentHash: false }))
  .app(App)
  .start();
