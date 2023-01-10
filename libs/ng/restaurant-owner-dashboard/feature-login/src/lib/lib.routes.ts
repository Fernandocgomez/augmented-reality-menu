import { Route } from '@angular/router';
import { FeatureLoginComponent } from './feature-login.component';

export const loginRoutes: Route[] = [
  {
    path: '', 
    pathMatch: 'full', 
    component: FeatureLoginComponent, 
  },
];
