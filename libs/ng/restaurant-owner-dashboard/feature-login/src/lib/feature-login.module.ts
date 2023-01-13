import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureLoginComponent } from './feature-login.component';
import { RouterModule } from '@angular/router';
import { loginRoutes } from './lib.routes';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { UiMaterialModule, UiNavigationModule, UiAlertModule } from '@xreats/ui';
import { LoginFacadeService } from './services/login-facade.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
	imports: [
		CommonModule, 
		RouterModule.forChild(loginRoutes),
		UiMaterialModule,
		UiNavigationModule,
		UiAlertModule,
		FormsModule,
		ReactiveFormsModule
	],
	declarations: [FeatureLoginComponent, LoginFormComponent],
	providers: [
		LoginFacadeService,
	],
})
export class FeatureLoginModule {}
