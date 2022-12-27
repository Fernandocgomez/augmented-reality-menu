import { Component, OnInit } from '@angular/core';
import { LoginFacade } from '@xreats/login-access-data';

@Component({
  selector: 'feature-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent  {
  companyName = 'XrEats';
  companyFoundedYear = '2022';
}
