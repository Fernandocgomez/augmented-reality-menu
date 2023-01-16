import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

// import { DataAccessAuthModule } from '../auth/auth.module';
import { LoginEffects } from './+state/login.effects';
import { DataAccessLoginFacade } from './+state/login.facade';
import * as fromLogin from './+state/login.reducer';
import { LoginService } from './login.service';

@NgModule({
	imports: [
		CommonModule,
		StoreModule.forFeature(fromLogin.LOGIN_FEATURE_KEY, fromLogin.loginReducer),
		EffectsModule.forFeature([LoginEffects]),
		HttpClientModule,
		// DataAccessAuthModule
	],
	providers: [DataAccessLoginFacade, LoginService],
})
export class DataAccessLoginModule {}
