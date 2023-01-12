import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureLoginComponent } from './feature-login.component';
import { RouterModule } from '@angular/router';
import { loginRoutes } from './lib.routes';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { UiMaterialModule, UiNavigationModule, UiAlertModule } from '@xreats/ui';

@NgModule({
	imports: [
		CommonModule, 
		RouterModule.forChild(loginRoutes),
		UiMaterialModule,
		UiNavigationModule,
		UiAlertModule
	],
	declarations: [FeatureLoginComponent, LoginFormComponent],
})
export class FeatureLoginModule {}
