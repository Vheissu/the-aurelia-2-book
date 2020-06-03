import { TestContext, TestConfiguration } from '@aurelia/testing';
import { CustomElement } from '@aurelia/runtime';
import Aurelia from 'aurelia';
import { ProductDetail } from './../src/components/product-detail/product-detail';

describe('Product Detail', () => {
  it('should render', async () => {
    const ctx = TestContext.createHTMLTestContext();

    const host = ctx.createElement('div');

    const viewModel = class Host {
      product = {
        id: 1234,
        title: 'Test',
        price: '1234'
      }
    }

    const component = CustomElement.define({ name: 'app', template: `<product-detail product.bind="product"></product-detail>` }, viewModel);
    const au = new Aurelia(ctx.container).register(TestConfiguration, ProductDetail).app({ host, component });

    await au.start().wait();

    expect(host.textContent).toContain('Add To Cart');

    await au.stop().wait();
  });
});
