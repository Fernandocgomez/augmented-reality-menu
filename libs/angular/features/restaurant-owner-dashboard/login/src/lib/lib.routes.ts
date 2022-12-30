import { Route } from '@angular/router';
import { LoginGuard } from './guards/login.guard';

import { LoginComponent } from './login.component';

export const loginRoutes: Route[] = [
  {
    path: '', 
    pathMatch: 'full', 
    component: LoginComponent, 
    canActivate: [LoginGuard]
  },
];
