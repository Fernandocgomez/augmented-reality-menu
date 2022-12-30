import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AuthService } from './services/auth.service';

import * as fromAuth from './+state/auth.reducer';

import { AuthEffects } from './+state/auth.effects';
import { AuthFacade } from './+state/auth.facade';

@NgModule({
	imports: [
		CommonModule,
		StoreModule.forFeature(fromAuth.AUTH_FEATURE_KEY, fromAuth.authReducer),
		EffectsModule.forFeature([AuthEffects]),
		HttpClientModule,
	],
	providers: [AuthService, AuthFacade],
})
export class AuthModule {}
