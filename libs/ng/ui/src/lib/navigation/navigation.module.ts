import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';

import { UiMaterialModule } from '../material/material.module';
@NgModule({
	imports: [CommonModule, UiMaterialModule],
	declarations: [HeaderComponent],
	exports: [HeaderComponent],
})
export class UiNavigationModule {}
