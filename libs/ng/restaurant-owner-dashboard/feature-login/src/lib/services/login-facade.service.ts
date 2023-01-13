import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

@Injectable()
export class LoginFacadeService {
    constructor(private readonly store: Store) {}

    dispatchLoginStartAction(username: string, password: string) {
        null;
    }
}