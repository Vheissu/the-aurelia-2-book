import { IAuthService } from './../../services/auth-service';
import { IRouteableComponent, IRouter } from '@aurelia/router';

export class StoreRegister implements IRouteableComponent {
    private username;
    private password;
    private password2;

    constructor(@IRouter private router: IRouter, @IAuthService private auth: IAuthService) {

    }

    async submit(): Promise<void> {
        if (this.username && this.password && this.password2 && this.password === this.password2) {
            try {
                await this.auth.register(this.username, this.password);

                this.router.load('/dashboard');
            } catch (e) {
                window.alert('There was an error registering.')
            }
        }
    }
}