import { Component, Input } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';

@Component({
	template: '',
})
export abstract class AlertComponent {
	@Input() messages: string[] = [];

	abstract getBackgroundColor(): string;

	abstract getTextColor(): string;

	abstract getIcon(): SafeHtml;
}
