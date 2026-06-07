import { beforeEach, describe, expect, test, vi } from 'vitest';
import { EventAggregator } from 'aurelia';
import { ApiService } from '../src/services/api-service';

function createStorage() {
    const items = new Map<string, string>();

    return {
        getItem: vi.fn((key: string) => items.get(key) ?? null),
        setItem: vi.fn((key: string, value: string) => items.set(key, value)),
        removeItem: vi.fn((key: string) => items.delete(key)),
        clear: vi.fn(() => items.clear()),
    };
}

describe('API Service', () => {
    let sut: ApiService;
    let ea: EventAggregator;
    let http: {
        configure: ReturnType<typeof vi.fn>;
        post: ReturnType<typeof vi.fn>;
    };
    let storage: ReturnType<typeof createStorage>;

    beforeEach(() => {
        storage = createStorage();
        vi.stubGlobal('localStorage', storage);

        ea = new EventAggregator();
        http = {
            configure: vi.fn(),
            post: vi.fn(),
        };
        sut = new ApiService(http as any, ea);
    });

    test('Customer has two items in their cart, return an array of products', () => {
        localStorage.setItem('cart', JSON.stringify([{ id: 1234, title: 'test', quantity: 1 }, { id: 342342, title: 'another test', quantity: 1 }]));

        expect(sut.getCart()).toHaveLength(2);
    });

    test('Customer has nothing in their cart, return an empty array', () => {
        expect(sut.getCart()).toHaveLength(0);
    });

    test('Customer has two items, and a total of six products', () => {
        localStorage.setItem('cart', JSON.stringify([{ id: 1234, title: 'test', quantity: 3 }, { id: 342342, title: 'another test', quantity: 3 }]));

        expect(sut.getCartTotal()).toStrictEqual(6);
    });

    test('API returns two search results from the server', async () => {
        http.post.mockResolvedValue({
            json: vi.fn().mockResolvedValue([
                { id: 1222, title: 'Some Product' },
                { id: 392, title: 'Another Product' },
            ]),
        });

        const results = await sut.search('test term');

        expect(http.post).toHaveBeenCalledOnce();
        expect(results).toHaveLength(2);
        expect(results[0].id).toStrictEqual(1222);
    });

    test('API threw an error trying to perform search', async () => {
        http.post.mockRejectedValue(new Error('server had an error'));

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
        localStorage.setItem('cart', JSON.stringify([{ id: 1234, title: 'Testing Product', quantity: 1 }]));

        const product = {
            id: 1234,
            title: 'Testing Product'
        };

        const cart = sut.addToCart(product);

        expect(cart).toHaveLength(1);
        expect(cart[0].quantity).toStrictEqual(2);
    });
});
