import { IRouteableComponent } from '@aurelia/router';
import { ApiService } from '../../services/api-service';
import { IRouter } from 'aurelia';

export class Register implements IRouteableComponent {
    private username;
    private password;
    private password2;

    constructor(@IRouter private router: IRouter, private auth: ApiService) {

    }

    async submit(): Promise<void> {
        if (this.username && this.password && this.password2 && this.password === this.password2) {
            try {
                const register = await this.auth.register(this.username, this.password);

                if (register.success) {
                    this.router.goto('/dashboard');
                }
            } catch (e) {
                window.alert('There was an error registering.')
            }
        }
    }
}