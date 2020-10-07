import { IRouter } from 'aurelia';

import { ApiService } from './api-service';

export class AuthService {
    public isLoggedIn = false;
    private _user = null;

	constructor(private api: ApiService, @IRouter private router: IRouter) {

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