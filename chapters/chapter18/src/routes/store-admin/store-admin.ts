import { resolve } from 'aurelia';
import { IRouteViewModel } from '@aurelia/router';

import { IAuthService } from '../../services/auth-service';

export class StoreAdmin implements IRouteViewModel {
    private auth: IAuthService = resolve(IAuthService);

    canLoad() {
        return this.auth.isAdmin || '/login';
    }
}
