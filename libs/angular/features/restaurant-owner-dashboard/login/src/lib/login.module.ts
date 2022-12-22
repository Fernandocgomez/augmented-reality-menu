import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { loginRoutes } from './lib.routes';
import { LoginComponent } from './login.component';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(loginRoutes)],
  declarations: [LoginComponent],
})
export class LoginModule {}
