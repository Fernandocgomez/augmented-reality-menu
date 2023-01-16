import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

import { DataAccessAuthFacade } from './+state/auth.facade';
import * as fromAuth from './+state/auth.reducer';
import { AuthService } from './auth.service';

@NgModule({
	imports: [
	CommonModule,
		StoreModule.forFeature(fromAuth.AUTH_FEATURE_KEY, fromAuth.authReducer),
		HttpClientModule,
	],
	providers: [AuthService, DataAccessAuthFacade],
})
export class DataAccessAuthModule {}
