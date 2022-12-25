import { TestBed } from '@angular/core/testing';

import { LoginFormFactoryService } from './login-form-factory.service';

describe('LoginFormFactoryService', () => {
  let service: LoginFormFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginFormFactoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
