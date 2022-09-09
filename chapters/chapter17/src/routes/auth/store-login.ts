import { IAuthService } from './../../services/auth-service';
import { IRouteableComponent, IRouter } from '@aurelia/router';

export class StoreLogin implements IRouteableComponent {
    private username;
    private password;

    constructor(@IRouter private router: IRouter, @IAuthService private auth: IAuthService) {

    }

    async submit(): Promise<void> {
        if (this.username && this.password) {
            try {
                await this.auth.login(this.username, this.password);

                this.router.load('/dashboard');
            } catch (e) {
                window.alert('There was an error.')
            }
        }
    }
}