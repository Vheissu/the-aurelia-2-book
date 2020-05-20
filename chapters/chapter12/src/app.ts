import { IViewModel, IRouter } from 'aurelia';

export class App implements IViewModel {
    constructor(@IRouter private router: IRouter) {

    }
}
