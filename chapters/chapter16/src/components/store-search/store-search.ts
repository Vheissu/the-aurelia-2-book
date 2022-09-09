import { IApiService } from '../../services/api-service';
import { BindingMode } from '@aurelia/runtime';
import { ICustomElementViewModel } from '@aurelia/runtime-html';
import { bindable } from 'aurelia';

export class StoreSearch implements ICustomElementViewModel {
    private results = [];
    private searchValue = '';

    // Create a bindable property and make it two way, so when we set it to false from this view-model the value goes back out of the component
    @bindable({ mode: BindingMode.twoWay }) private showing = false;

    // Inject the api
    constructor(@IApiService private api: IApiService) {

    }

    // Called on the container and used to close the search dialog if escape is pressed
    keypress(event: KeyboardEvent) {
        // If the user hit escape, set showing to false and return false to stop the event
        if (event.key === 'Escape') {
            this.showing = false;
            return false;
        }

        // Allow the event to continue, so the search input works
        return true;
    }

    // Called when the user types into the search input
    async search(): Promise<void> {
        // Only call the api to search if our search term is 3 or more characters
        if (this.searchValue.length >= 3) {
            this.results = await this.api.search(this.searchValue);
        }
    }

    // Whenever we click a search result, we want to hide the search modal
    resultClick(): void {
        this.showing = false;
    }
}