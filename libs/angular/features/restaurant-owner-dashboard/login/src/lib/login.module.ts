import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { loginRoutes } from './lib.routes';
import { LoginComponent } from './login.component';
import { LoginDataAccessModule } from '@xreats/login-access-data';
import { UiNavigationModule } from '@xreats/ui/navigation';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { MaterialModule } from '@xreats/ui/material';

@NgModule({
  imports: [
  CommonModule,
    RouterModule.forChild(loginRoutes),
    LoginDataAccessModule,
    UiNavigationModule,
    MaterialModule
  ],
  declarations: [LoginComponent, LoginFormComponent],
})
export class LoginModule {}
