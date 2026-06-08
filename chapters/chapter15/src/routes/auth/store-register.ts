import { resolve } from 'aurelia';
import { IAuthService } from './../../services/auth-service';
import { IRouteViewModel, IRouter } from '@aurelia/router';

export class StoreRegister implements IRouteViewModel {
    private router: IRouter = resolve(IRouter);
    private auth: IAuthService = resolve(IAuthService);

    private username;
    private password;
    private password2;

    

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