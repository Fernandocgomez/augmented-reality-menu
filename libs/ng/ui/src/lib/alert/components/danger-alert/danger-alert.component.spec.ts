import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiMaterialModule } from '../../../material/material.module';

import { DangerAlertComponent } from './danger-alert.component';

describe('DangerAlertComponent', () => {
	let component: DangerAlertComponent;
	let fixture: ComponentFixture<DangerAlertComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [DangerAlertComponent],
			imports: [UiMaterialModule],
		}).compileComponents();

		fixture = TestBed.createComponent(DangerAlertComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	describe('methods', () => {
		describe('getBackgroundColor()', () => {
			it('should return the correct background color', () => {
				expect(component.getBackgroundColor()).toEqual('bg-red-100');
			});
		});

		describe('getTextColor()', () => {
			it('should return the correct text color', () => {
				expect(component.getTextColor()).toEqual('text-red-700');
			});
		});
	});

	describe('behavior', () => {
		describe('when passing at least one message', () => {
			it('should render the danger alert component', () => {
				component.messages = ['message'];

				fixture.detectChanges();

				const alert = fixture.nativeElement.querySelector('[data-test="alert"]');

				expect(alert).toBeTruthy();
			});

			it('should display the number of message being passed', () => {
				component.messages = ['message 1', 'message 2'];

				fixture.detectChanges();

				const messages = fixture.nativeElement.querySelectorAll('[data-test="message"]');

				expect(messages.length).toEqual(2);
			});

			it('should display the message text is being passed', () => {
				component.messages = ['message 1'];

				fixture.detectChanges();

				const message = fixture.nativeElement.querySelector('[data-test="message-text"]');

				expect(message.textContent).toStrictEqual('message 1');
			});
		});

		describe('when passing no messages', () => {
			it('should not render the danger alert', () => {
				component.messages = [];

				fixture.detectChanges();

				const alert = fixture.nativeElement.querySelector('[data-test="alert"]');

				expect(alert).toBeFalsy();
			});
		});

		describe('when passing an empty string as message', () => {
			it('should not render the empty string message', () => {
				component.messages = ['', 'message 2'];

				fixture.detectChanges();

				const messages = fixture.nativeElement.querySelectorAll('[data-test="message"]');

				expect(messages.length).toBe(1);
			});
		});
	});
});
