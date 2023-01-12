import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterComponent } from './footer.component';

import { MaterialModule } from '@xreats/ui/material';

import {DatePipe} from '@angular/common';

describe('FooterComponent', () => {
	let component: FooterComponent;
	let fixture: ComponentFixture<FooterComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [FooterComponent],
			imports: [MaterialModule],
		}).compileComponents();

		fixture = TestBed.createComponent(FooterComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should display the company brand name', () => {
		const brandInfo = fixture.nativeElement.querySelector('[data-test="footer-brand-info"]');

		expect(brandInfo.textContent).toContain('XrEats');
	});

	it('should display the company founded year "2022"', () => {
		const brandInfo = fixture.nativeElement.querySelector('[data-test="footer-brand-info"]');

		expect(brandInfo.textContent).toContain('2022');
	})

	it('should display the current year', () => {
		const datePipe = new DatePipe('en-US');
		const currentYear = new Date();
		const brandInfo = fixture.nativeElement.querySelector('[data-test="footer-brand-info"]');
	
		expect(brandInfo.textContent).toContain(datePipe.transform(currentYear, 'yyyy'));
	});
});