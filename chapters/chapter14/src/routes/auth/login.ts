import { IRouteableComponent } from '@aurelia/router';
import { ApiService } from '../../services/api-service';
import { IRouter } from 'aurelia';

export class Login implements IRouteableComponent {
    private username;
    private password;

    constructor(@IRouter private router: IRouter, private auth: ApiService) {

    }

    async submit(): Promise<void> {
        if (this.username && this.password) {
            try {
                const login = await this.auth.login(this.username, this.password);

                if (login.username) {
                    this.router.goto('/dashboard');
                }
            } catch (e) {
                window.alert('There was an error.')
            }
        }
    }
}