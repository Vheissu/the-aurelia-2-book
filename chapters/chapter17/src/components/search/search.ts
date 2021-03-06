import { ApiService } from '../../services/api-service';
import { ICustomElementViewModel, BindingMode } from '@aurelia/runtime';
import { inject, EventAggregator, bindable } from 'aurelia';

@inject(ApiService, EventAggregator, Element)
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
        if (this.searchValue.length >= 3) {
            this.results = await this.api.search(this.searchValue);
        }
    }

    resultClick(): void {
        this.showing = false;
    }
}