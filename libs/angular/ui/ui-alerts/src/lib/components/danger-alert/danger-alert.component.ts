import { Component, Input } from '@angular/core';

@Component({
  selector: 'ui-alerts-danger-alert',
  templateUrl: './danger-alert.component.html',
})
export class DangerAlertComponent {
  @Input() errorMessages: string[] = [];

  hasErrorMessages(): boolean {
    return this.errorMessages.length > 0;
  }
}
