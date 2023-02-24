import { DI } from 'aurelia';
import { IRouter } from '@aurelia/router';

import { IApiService } from './api-service';

export const IAuthService = DI.createInterface<IAuthService>('IAuthService', x => x.singleton(AuthService));

export type IAuthService = AuthService;

export class AuthService {
    public isLoggedIn = false;
    private _user = null;

	constructor(@IApiService private api: IApiService, @IRouter private router: IRouter) {

	}

	public async login(username: string, password: string) {
        const user = await this.api.login(username, password);

        if (user) {
            this.isLoggedIn = true;
            this._user = user;
        }
	}

	public logout(redirect = null) {
        this.isLoggedIn = false;
        this._user = null;

		if (redirect) {
			this.router.load(redirect);
		}
    }

    public async register(username: string, password: string) {
        const register = await this.api.register(username, password);

        if (register.success) {
            this.isLoggedIn = true;
            
            this._user = {
                username
            };
        }
    }
    
    public getCurrentUser() {
        return this._user;
    }
}