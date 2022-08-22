import { route } from '@aurelia/router';

@route({
    routes: [
        { path: '', id: 'welcome', component: import('./welcome') },
        { path: 'about', id: 'about', component: import('./about') },
    ]
})
export class MyApp {
}
