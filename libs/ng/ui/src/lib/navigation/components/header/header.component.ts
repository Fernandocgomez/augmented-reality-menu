import { Component } from '@angular/core';

@Component({
	selector: 'ui-header',
	template: `
		<mat-toolbar
			color="primary"
			class="mat-elevation-z6"
		>
			<mat-toolbar-row>
				<span data-test="brand-name">XrEats</span>
			</mat-toolbar-row>
		</mat-toolbar>
	`
})
export class HeaderComponent {}
