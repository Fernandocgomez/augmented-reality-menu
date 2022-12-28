import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {
    setItem(key: string, value: string): void {
        window.localStorage.setItem(key, value);
    };

    getItem(key: string): string | null {
        return window.localStorage.getItem(key);
    };

    removeItem(key: string): void {
        window.localStorage.removeItem(key);
    };

    removeAllItems(): void {
        window.localStorage.clear();
    }

    has(key: string): boolean {
        return !!this.getItem(key);
    }
}