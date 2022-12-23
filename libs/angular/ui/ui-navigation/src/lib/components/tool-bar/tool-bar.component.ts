import { Component, Input } from '@angular/core';


@Component({
  selector: 'ui-navigation-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.scss'],
})
export class ToolBarComponent {
  @Input() title = '';
}
