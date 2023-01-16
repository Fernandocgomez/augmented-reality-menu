import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class JwtLocalStorageService {

    private readonly ACCESS_TOKEN_KEY = 'access_token';

    getAccessToken(): string | null {
        return this.getItem(this.ACCESS_TOKEN_KEY);
    }

    removeAccessToken(): void {
        this.removeItem(this.ACCESS_TOKEN_KEY);
    }

    hasAccessToken(): boolean {
        return this.has(this.ACCESS_TOKEN_KEY);
    }

    setAccessToken(token: string): void {
        this.setItem(this.ACCESS_TOKEN_KEY, token);
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