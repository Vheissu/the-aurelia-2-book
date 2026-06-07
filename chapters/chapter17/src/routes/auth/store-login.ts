import { resolve } from 'aurelia';
import { IAuthService } from './../../services/auth-service';
import { IRouteableComponent, IRouter } from '@aurelia/router';

export class StoreLogin implements IRouteableComponent {
    private router: IRouter = resolve(IRouter);
    private auth: IAuthService = resolve(IAuthService);

    private username;
    private password;

    

    async submit(): Promise<void> {
        if (this.username && this.password) {
            try {
                await this.auth.login(this.username, this.password);
    
                if (this.auth.isAdmin) {
                    this.router.load('/admin');
                } else {
                    this.router.load('/dashboard');
                }
            } catch (e) {
                window.alert('There was an error.')
            }
        }
    }
}