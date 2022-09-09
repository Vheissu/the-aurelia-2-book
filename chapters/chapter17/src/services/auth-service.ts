import { DI } from 'aurelia';
import { IRouter } from '@aurelia/router';

import { IApiService } from './api-service';

export const IAuthService = DI.createInterface<IAuthService>("IAuthService", x => x.singleton(AuthService));

export interface IAuthService extends AuthService { }

export class AuthService {
    public isLoggedIn = false;
    private _user = null;

	constructor(@IApiService private api: IApiService, @IRouter private router: IRouter) {
        const userLocal = sessionStorage.getItem('catstore__auth');

        if (userLocal) {
            this.isLoggedIn = true;
            this._user = JSON.parse(userLocal);
        }
	}

    public async login(username: string, password: string) {
        const user = await this.api.login(username, password);
    
        if (user) {
            this.isLoggedIn = true;
            this._user = user;
    
            sessionStorage.setItem('catstore__auth', JSON.stringify(user));
        }
    }

    public logout(redirect = null) {
        this.isLoggedIn = false;
        this._user = null;
    
        sessionStorage.removeItem('catstore__auth');
    
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
    
            sessionStorage.setItem('catstore__auth', JSON.stringify(this._user));
        }
    }
    
    public getCurrentUser() {
        return this._user;
    }

    public get isAdmin() {
        return this.isLoggedIn && this._user.username === 'admin';
    }
}