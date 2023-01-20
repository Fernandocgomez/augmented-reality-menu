import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@xreats/ng/data-access';

import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () =>
      import('@xreats/ng/restaurant-owner-dashboard/feature-login').then((m) => m.FeatureLoginModule),
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [
      AuthGuard
    ],
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { initialNavigation: 'enabledBlocking' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
