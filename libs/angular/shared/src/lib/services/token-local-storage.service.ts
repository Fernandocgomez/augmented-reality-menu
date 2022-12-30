import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class TokenLocalStorageService {
    getAccessToken(): string | null {
        return this.getItem('access_token');
    }

    removeAccessToken(): void {
        this.removeItem('access_token');
    }

    hasAccessToken(): boolean {
        return this.has('access_token');
    }

    setAccessToken(token: string): void {
        this.setItem('access_token', token);
    }

    private setItem(key: string, value: string): void {
        window.localStorage.setItem(key, value);
    };

    private getItem(key: string): string | null {
        return window.localStorage.getItem(key);
    };

    private removeItem(key: string): void {
        window.localStorage.removeItem(key);
    };

    private has(key: string): boolean {
        return !!this.getItem(key);
    }
}