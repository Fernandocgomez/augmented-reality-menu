import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DataAccessLoginModule } from '@xreats/ng/data-access';
import { UiAlertModule, UiMaterialModule, UiNavigationModule } from '@xreats/ui';

import { LoginFormComponent } from './components/login-form/login-form.component';
import { FeatureLoginComponent } from './feature-login.component';
import { LoginGuard } from './guards/login.guard';
import { loginRoutes } from './lib.routes';

@NgModule({
	imports: [
	CommonModule, 
		RouterModule.forChild(loginRoutes),
		UiMaterialModule,
		UiNavigationModule,
		UiAlertModule,
		FormsModule,
		ReactiveFormsModule,
		DataAccessLoginModule,
	],
	declarations: [FeatureLoginComponent, LoginFormComponent],
	providers: [
		LoginGuard
	],
})
export class FeatureLoginModule {}
