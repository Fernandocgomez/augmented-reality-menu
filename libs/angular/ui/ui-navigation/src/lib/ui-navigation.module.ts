import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '@xreats/ui/material';

import { FooterComponent } from './components/footer/footer.component';
import { ToolBarComponent } from './components/tool-bar/tool-bar.component';

@NgModule({
  imports: [CommonModule, MaterialModule],
  declarations: [ToolBarComponent, FooterComponent],
  exports: [ToolBarComponent, FooterComponent],
})
export class UiNavigationModule {}
