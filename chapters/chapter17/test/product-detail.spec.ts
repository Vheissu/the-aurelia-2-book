import { BrowserPlatform } from '@aurelia/platform-browser';
import { createFixture, setPlatform } from '@aurelia/testing';

import { enableFetchMocks } from 'jest-fetch-mock';
enableFetchMocks();

const platform = new BrowserPlatform(window);
setPlatform(platform);
BrowserPlatform.set(globalThis, platform);

import { ProductDetail } from './../src/components/product-detail/product-detail';

describe('Product Detail', () => {

  it('should render', async () => {
      const { startPromise, appHost, tearDown } = createFixture('<product-detail product.bind="product"></product-detail>',
        class App {
            product = {
                id: 1234,
                title: 'Test Product',
                price: '1234.56',
            };
        },
        [ ProductDetail ]
      );

      await startPromise;

        expect(appHost.textContent).toContain('Add To Cart');

    await tearDown();
  });
});