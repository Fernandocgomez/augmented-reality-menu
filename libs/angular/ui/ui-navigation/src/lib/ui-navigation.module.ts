import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolBarComponent } from './components/tool-bar/tool-bar.component';
import { MaterialModule } from '@xreats/ui/material';

@NgModule({
  imports: [CommonModule, MaterialModule],
  declarations: [ToolBarComponent],
  exports: [ToolBarComponent],
})
export class UiNavigationModule {}
