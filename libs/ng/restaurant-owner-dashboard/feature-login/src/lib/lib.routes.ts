import { Route } from '@angular/router';
import { FeatureLoginComponent } from './feature-login.component';
import { LoginGuard } from './guards/login.guard';

export const loginRoutes: Route[] = [
  {
    path: '', 
    pathMatch: 'full', 
    component: FeatureLoginComponent,
    canActivate: [LoginGuard],
  },
];
