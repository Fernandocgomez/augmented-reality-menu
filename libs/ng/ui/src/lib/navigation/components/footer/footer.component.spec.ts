import { DatePipe } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiMaterialModule } from '../../../material/material.module';

import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
	let fixture: ComponentFixture<FooterComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [FooterComponent],
			imports: [UiMaterialModule],
		}).compileComponents();

		fixture = TestBed.createComponent(FooterComponent);
		fixture.detectChanges();
	});

	it('should display the company brand name', () => {
		const brandInfo = fixture.nativeElement.querySelector('[data-test="footer-brand-info"]');

		expect(brandInfo.textContent).toContain('XrEats');
	});

	it('should display the company founded year "2022"', () => {
		const brandInfo = fixture.nativeElement.querySelector('[data-test="footer-brand-info"]');

		expect(brandInfo.textContent).toContain('2022');
	});

	it('should display the current year', () => {
		const datePipe = new DatePipe('en-US');
		const currentYear = new Date();
		const brandInfo = fixture.nativeElement.querySelector('[data-test="footer-brand-info"]');

		expect(brandInfo.textContent).toContain(datePipe.transform(currentYear, 'yyyy'));
	});
});
