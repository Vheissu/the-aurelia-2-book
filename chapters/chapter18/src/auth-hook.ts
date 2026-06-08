import { lifecycleHooks, resolve } from 'aurelia';
import { Params, RouteNode } from '@aurelia/router';
import { IAuthService } from './services/auth-service';

@lifecycleHooks()
export class AuthHook {
    private auth: IAuthService = resolve(IAuthService);

    canLoad(vm: unknown, params: Params, next: RouteNode, current: RouteNode | null) {
        const routeData = next.data ?? {};

        if (routeData.admin && !this.auth.isAdmin) {
            return '/login';
        }

        if (routeData.auth && !this.auth.isLoggedIn) {
            return '/login';
        }

        return true;
    }
}
