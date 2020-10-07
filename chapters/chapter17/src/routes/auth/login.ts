import { AuthService } from './../../services/auth-service';
import { IRouteableComponent } from '@aurelia/router';
import { IRouter } from 'aurelia';

export class Login implements IRouteableComponent {
    private username;
    private password;

    constructor(@IRouter private router: IRouter, private auth: AuthService) {

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