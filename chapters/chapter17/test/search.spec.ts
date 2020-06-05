import { TestContext, TestConfiguration } from '@aurelia/testing';
import { CustomElement } from '@aurelia/runtime';
import Aurelia from 'aurelia';
import { Search } from './../src/components/search/search';

import { enableFetchMocks } from 'jest-fetch-mock';
enableFetchMocks();

describe('Search', () => {
    it('should render', async () => {
        const ctx = TestContext.createHTMLTestContext();

        const host = ctx.createElement('div');

        const viewModel = class Host {
        }

        const component = CustomElement.define({ name: 'app', template: `<search></search>` }, viewModel);
        const au = new Aurelia(ctx.container).register(TestConfiguration, Search).app({ host, component });

        await au.start().wait();

        const searchInput: HTMLInputElement = host.querySelector('input[type="search"]');

        expect(searchInput).not.toBeUndefined();

        await au.stop().wait();
    });

    it('display search results', async () => {
        const ctx = TestContext.createHTMLTestContext();

        const host = ctx.createElement('div');

        const viewModel = class Host {
            showSearch = true;
            searchValue = 'test value';
        }

        const component = CustomElement.define({ name: 'app', template: `<search showing.bind="showSearch"></search>` }, viewModel);
        const au = new Aurelia(ctx.container).register(TestConfiguration, Search).app({ host, component });

        await au.start().wait();

        fetchMock.mockResponseOnce(JSON.stringify([{ id: 1222, title: 'Some Product' }, { id: 392, title: 'Another Product' }]));

        const componentViewModel: Search = CustomElement.for(host.querySelector('search')).viewModel as any;

        await componentViewModel.search();

        console.log(componentViewModel);

        expect(componentViewModel['results']).toHaveLength(2);

        await au.stop().wait();
    });
});
