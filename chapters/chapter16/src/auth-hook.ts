import { lifecycleHooks } from 'aurelia';
import { Navigation, Parameters, RouterConfiguration, RoutingInstruction } from '@aurelia/router';

@lifecycleHooks()
export class AuthHook {
    private isLoggedIn = true;

    canLoad(viewModel, params: Parameters, instruction: RoutingInstruction, navigation: Navigation) { 
        return this.isLoggedIn;
    }
}