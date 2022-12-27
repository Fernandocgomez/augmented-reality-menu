import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DangerAlertComponent } from './components/danger-alert/danger-alert.component';

@NgModule({
  imports: [CommonModule],
  declarations: [DangerAlertComponent],
  exports: [DangerAlertComponent]
})
export class UiAlertsModule {}
