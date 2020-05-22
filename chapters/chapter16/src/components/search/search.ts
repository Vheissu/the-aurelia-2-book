import { ApiService } from '../../services/api-service';
import { ICustomElementViewModel, BindingMode, containerless } from '@aurelia/runtime';
import { inject, EventAggregator, bindable } from 'aurelia';

@inject(ApiService, EventAggregator, Element)
@containerless()
export class Search implements ICustomElementViewModel {
    private results = [];
    private searchValue = '';

    @bindable({ mode: BindingMode.twoWay }) private showing = false;

    constructor(private api: ApiService, private ea: EventAggregator, private element: Element) {

    }

    keypress(event: KeyboardEvent) {
        if (event.key === 'Escape') {
            this.showing = false;
            return false;
        }

        return true;
    }

    async search() {
        this.results = await this.api.search(this.searchValue);
    }
}