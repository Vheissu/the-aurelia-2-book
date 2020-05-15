import { IViewModel } from 'aurelia';

import products from './products.json';

export class Products implements IViewModel {
    private products = products;
}