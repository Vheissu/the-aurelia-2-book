import { TestContext, TestConfiguration } from '@aurelia/testing';
import { CustomElement } from '@aurelia/runtime';
import Aurelia from 'aurelia';
import { ProductDetail } from './../src/components/product-detail/product-detail';

describe('Product Detail', () => {
  it('should render', async () => {
    const ctx = TestContext.createHTMLTestContext();
    const { container } = ctx;

    const host = ctx.createElement('div');
    const component = CustomElement.define({ name: 'app', template: `<product-detail product.bind="product"></product-detail>` }, class App {
        product = {
            id: 1234,
            title: 'Test',
            price: '1234'
        }
    });
    const au = new Aurelia(container).register(TestConfiguration, ProductDetail).app({ host, component });

    await au.start().wait();

    console.log(host.innerHTML);

    expect(host.textContent).toContain('Add to cart');

    await au.stop().wait();
  });
});
