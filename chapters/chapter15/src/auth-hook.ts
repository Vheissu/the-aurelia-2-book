import { lifecycleHooks } from 'aurelia';

@lifecycleHooks()
export class AuthHook {
    private isLoggedIn = true;

    canLoad() { 
        return this.isLoggedIn;
    }
}