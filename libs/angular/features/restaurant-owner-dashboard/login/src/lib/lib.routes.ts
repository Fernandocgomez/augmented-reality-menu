import { Route } from '@angular/router';

import { LoginComponent } from './login.component';

export const loginRoutes: Route[] = [
  {path: '', pathMatch: 'full', component: LoginComponent}
];
