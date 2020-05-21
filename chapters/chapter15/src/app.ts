import { IRouter, IViewModel, ViewportInstruction } from 'aurelia';

import { AuthService } from './services/auth-service';

export class App implements IViewModel {
  constructor(@IRouter private router: IRouter, private auth: AuthService) {}

  afterBind(): void {
    this.router.addHook(async (instructions: ViewportInstruction[]) => {
        if (this.auth.isLoggedIn) {
            return true;
        }

        // User is not logged in, so redirect them back to login page
        return [this.router.createViewportInstruction('login', instructions[0].viewport)];
    }, {
      include: ['dashboard', 'orders', 'order'],
    });
  }
}
