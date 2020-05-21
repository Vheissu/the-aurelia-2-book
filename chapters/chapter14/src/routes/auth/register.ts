import { AuthService } from './../../services/auth-service';
import { IRouteableComponent } from '@aurelia/router';
import { IRouter } from 'aurelia';

export class Register implements IRouteableComponent {
    private username;
    private password;
    private password2;

    constructor(@IRouter private router: IRouter, private auth: AuthService) {

    }

    async submit(): Promise<void> {
        if (this.username && this.password && this.password2 && this.password === this.password2) {
            try {
                await this.auth.register(this.username, this.password);

                this.router.goto('/dashboard');
            } catch (e) {
                window.alert('There was an error registering.')
            }
        }
    }
}