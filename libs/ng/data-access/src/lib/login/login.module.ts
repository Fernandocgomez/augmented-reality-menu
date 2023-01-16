import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { LoginEffects } from './+state/login.effects';
import { LoginFacade } from './+state/login.facade';
import * as fromLogin from './+state/login.reducer';
import { HttpClientModule } from '@angular/common/http';
import { LoginService } from './login.service';

@NgModule({
	imports: [
CommonModule,
		StoreModule.forFeature(fromLogin.LOGIN_FEATURE_KEY, fromLogin.loginReducer),
		EffectsModule.forFeature([LoginEffects]),
		HttpClientModule
	],
    providers: [
        LoginFacade,
		LoginService
    ]
})
export class DataAccessLoginModule {}
