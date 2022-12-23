import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { loginRoutes } from './lib.routes';
import { LoginComponent } from './login.component';
import { LoginDataAccessModule } from '@xreats/login-access-data';

@NgModule({
  imports: [
    CommonModule, 
    RouterModule.forChild(loginRoutes),
    LoginDataAccessModule
  ],
  declarations: [LoginComponent],
})
export class LoginModule {}
