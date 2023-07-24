import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserService } from 'src/service/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  /**
   *
   */
  public isToken: boolean = false;
  public isTokenExp: boolean = false;
  public isTokenDetails: any = null;
  constructor(private router: Router, private customerService: UserService) {

  }
  ngOnInit(): void {
    //this.getCustomer();
    this.isToken = this.customerService.tokenIsvalidOrNo();
    this.isTokenExp = this.customerService.tokenExp();
    this.isTokenDetails = this.customerService.tokenDetails();
    this.router.navigateByUrl('/dashboard', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/dashboard']);
    });
  }
}
