import { lifecycleHooks, resolve } from 'aurelia';
import { Navigation, Parameters, RoutingInstruction } from '@aurelia/router';
import { IAuthService } from './services/auth-service';

@lifecycleHooks()
export class AuthHook {
    private auth: IAuthService = resolve(IAuthService);

    canLoad(viewModel, params: Parameters, instruction: RoutingInstruction, navigation: Navigation) { 
        const routeData = instruction?.match?.data ?? {};

        if (routeData.admin && !this.auth.isAdmin) {
            return '/login';
        }

        if (routeData.auth && !this.auth.isLoggedIn) {
            return '/login';
        }

        return true;
    }
}
