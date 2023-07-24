import { Component } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CustomerService } from 'src/service/customer.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  /**
   *
   */
  public isToken: boolean = false;
  public isTokenExp: boolean = false;
  public isTokenDetails: any = null;
  constructor(private customerService: CustomerService) {
    this.isToken = this.customerService.tokenisvalidorno();
    this.isTokenExp = this.customerService.tokenExp();
    this.isTokenDetails= this.customerService.tokenDetails();

  }
}
