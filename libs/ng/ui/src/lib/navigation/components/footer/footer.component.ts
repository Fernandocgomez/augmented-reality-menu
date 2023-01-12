import { Component } from '@angular/core';

@Component({
	selector: 'ui-footer',
	template: `
		<footer>
			<mat-toolbar color="primary">
				<mat-toolbar-row>
					<section class="mat-typography">
						<h4 data-test="footer-brand-info">XrEats ©2022 - {{ currentYear | date: 'yyyy' }}</h4>
					</section>
				</mat-toolbar-row>
			</mat-toolbar>
		</footer>
	`,
	styles: [],
})
export class FooterComponent {
	currentYear = new Date();
}
