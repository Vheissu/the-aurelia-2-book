import { resolve } from 'aurelia';
import { IRouteableComponent } from '@aurelia/router';

import { IAuthService } from '../../services/auth-service';

export class StoreAdmin implements IRouteableComponent {
    private auth: IAuthService = resolve(IAuthService);

    canLoad() {
        return this.auth.isAdmin || '/login';
    }
}
