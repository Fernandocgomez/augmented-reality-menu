import { Component, Input } from '@angular/core';

@Component({
  selector: 'ui-navigation-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  @Input() companyName = '';
  @Input() companyFoundedYear = '';

  currentYear = new Date();

}
