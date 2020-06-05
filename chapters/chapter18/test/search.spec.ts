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
            showSearch = true;
        }

        const component = CustomElement.define({ name: 'app', template: `<search showing.bind="showSearch"></search>` }, viewModel);
        const au = new Aurelia(ctx.container).register(TestConfiguration, Search).app({ host, component });

        await au.start().wait();

        // Expect showing search class to be present
        expect(host.querySelector('.show-search')).not.toBeNull();

        await au.stop().wait();
    });

    it('should hide search', async () => {
        const ctx = TestContext.createHTMLTestContext();

        const host = ctx.createElement('div');

        const viewModel = class Host {
            showSearch = false;
        }

        const component = CustomElement.define({ name: 'app', template: `<search showing.bind="showSearch"></search>` }, viewModel);
        const au = new Aurelia(ctx.container).register(TestConfiguration, Search).app({ host, component });

        await au.start().wait();

        // Expect hidden search class to be present
        expect(host.querySelector('.hidden-search')).not.toBeNull();

        await au.stop().wait();
    });

    it('display search results', async () => {
        const ctx = TestContext.createHTMLTestContext();

        const host = ctx.createElement('div');

        const viewModel = class Host {
            showSearch = true;
        }

        const component = CustomElement.define({ name: 'app', template: `<search showing.bind="showSearch"></search>` }, viewModel);
        const au = new Aurelia(ctx.container).register(TestConfiguration, Search).app({ host, component });

        await au.start().wait();

        // Mock the search API response with two results
        fetchMock.mockResponseOnce(JSON.stringify([{ id: 1222, title: 'Some Product' }, { id: 392, title: 'Another Product' }]));

        // Get the custom element and view-model
        const componentViewModel: Search = CustomElement.for(host.querySelector('search')).viewModel as any;

        // Replicate populating search value
        componentViewModel['searchValue'] = 'test value';

        // Call the search function
        await componentViewModel.search();

        // Search results are list items, we should have one per result
        const results = host.querySelectorAll('li');

        // Expect two list items
        expect(results).toHaveLength(2);

        await au.stop().wait();
    });

    it('search does not return results', async () => {
        const ctx = TestContext.createHTMLTestContext();

        const host = ctx.createElement('div');

        const viewModel = class Host {
            showSearch = true;
        }

        const component = CustomElement.define({ name: 'app', template: `<search showing.bind="showSearch"></search>` }, viewModel);
        const au = new Aurelia(ctx.container).register(TestConfiguration, Search).app({ host, component });

        await au.start().wait();

        // Mock the search API response with zero results
        fetchMock.mockResponseOnce(JSON.stringify([]));

        // Get the custom element and view-model
        const componentViewModel: Search = CustomElement.for(host.querySelector('search')).viewModel as any;

        // Replicate populating search value
        componentViewModel['searchValue'] = 'test value';

        // Call the search function
        await componentViewModel.search();

        // Search results are list items, we should have one per result
        const results = host.querySelectorAll('li');

        // Expect zero list items
        expect(results).toHaveLength(0);

        await au.stop().wait();
    });
});
