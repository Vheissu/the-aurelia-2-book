import { IRouter, IViewModel, ViewportInstruction, EventAggregator, IDisposable } from 'aurelia';

import { AuthService } from './services/auth-service';

export class App implements IViewModel {
  private showSearch = false;

  private searchListener: IDisposable;

  constructor(@IRouter private router: IRouter, private auth: AuthService, private ea: EventAggregator) {}

  binding(): void {
    this.searchListener = this.ea.subscribe('search:open', () => this.showSearch = true);
  }

  beforeUnbind(): void {
    this.searchListener.dispose();
  }

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
