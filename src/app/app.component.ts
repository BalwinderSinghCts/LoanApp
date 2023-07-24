import { Component } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'LoanApp';
  isLoagin = false;
  /**
   *
   */
  constructor(private jwtServiceHelper: JwtHelperService) {
    this.isLoagin = localStorage.getItem('token') != undefined ? true : false;
    
  }

}
