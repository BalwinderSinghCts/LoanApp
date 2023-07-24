import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { UserService } from 'src/service/user.service';

@Component({
  selector: 'app-navheader',
  templateUrl: './navheader.component.html',
  styleUrls: ['./navheader.component.css']
})
export class NavheaderComponent implements OnInit {
  public isLogin: boolean = false;
  userData: any = null;
  constructor(private router: Router, private userService: UserService) {

  }
  ngOnInit(): void {
    this.isLogin = this.userService.tokenIsvalidOrNo();
    this.userData = JSON.parse(sessionStorage.getItem('userData') || '{}')['access_token']
  }

  logout() {
    this.isLogin = false;
    this.userData = null;
    this.userService.logout();
    this.userService.logout();
    this.router.navigate(['/']);
  }
}
