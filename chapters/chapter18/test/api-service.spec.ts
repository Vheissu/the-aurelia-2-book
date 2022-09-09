import { ApiService } from '../src/services/api-service';
import { EventAggregator } from 'aurelia';
import { HttpClient } from '@aurelia/fetch-client';

import { enableFetchMocks } from 'jest-fetch-mock';
enableFetchMocks();

describe('API Service', () => {
    let sut: ApiService;
    let ea: EventAggregator;
    let http: HttpClient;

    beforeEach(() => {
        ea = new EventAggregator();
        http = new HttpClient();

        sut = new ApiService(http, ea);

        localStorage.clear();
        fetchMock.resetMocks();
    });

    test('Customer has two items in their cart, return an array of products', () => {
        localStorage.setItem('cart', JSON.stringify([{id: 1234, title: 'test', quantity: 1}, { id: 342342, title: 'another test', quantity: 1 }]));

        expect(sut.getCart()).toHaveLength(2);
    });

    test('Customer has nothing in their cart, return an empty array', () => {
        expect(sut.getCart()).toHaveLength(0);
    });

    test('Customer has two items, and a total of six products', () => {
        localStorage.setItem('cart', JSON.stringify([{id: 1234, title: 'test', quantity: 3}, { id: 342342, title: 'another test', quantity: 3 }]));
    
        expect(sut.getCartTotal()).toStrictEqual(6);
    });

    test('API returns two search results from the server', async () => {
        fetchMock.mockResponseOnce(JSON.stringify([{ id: 1222, title: 'Some Product' }, { id: 392, title: 'Another Product' }]));
    
        const results = await sut.search('test term');
    
        expect(results).toHaveLength(2);
        expect(results[0].id).toStrictEqual(1222);
    });

    test('API threw an error trying to perform search', async () => {
        fetchMock.mockReject(new Error('server had an error'));
    
        await expect(sut.search('test term')).rejects.toEqual(new Error('server had an error'));
    });

    test('Add item to empty cart', () => {
        const product = {
            id: 1234,
            title: 'Testing Product'
        };
    
        ea.subscribe('cart:add', (id: number) => {
            expect(id).toStrictEqual(1234);
        });
    
        const cart = sut.addToCart(product);
    
        expect(cart).toHaveLength(1);
    });

    test('Add item to cart, increase quantity', () => {
        localStorage.setItem('cart', JSON.stringify([{id: 1234, title: 'Testing Product', quantity: 1}]));
    
        const product = {
            id: 1234,
            title: 'Testing Product'
        };
    
        const cart = sut.addToCart(product);
    
        expect(cart).toHaveLength(1);
        expect(cart[0].quantity).toStrictEqual(2);
    });
 });