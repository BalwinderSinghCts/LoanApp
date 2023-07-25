import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpRequestHandlerService } from 'src/service/http.service';
import { UserService } from 'src/service/user.service';
import { AlertMessageService } from '../alert-message.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  /**
   *
   */
  constructor(private alerMessage: AlertMessageService, 
    private userService: UserService, 
    private router: Router, 
    private httpClient: HttpRequestHandlerService, 
    private http: HttpClient,
    private SpinnerService: NgxSpinnerService

    ) {

  }
  loginForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required,
    Validators.minLength(6)]),
  });

  onSubmit() {
    this.SpinnerService.show();
    debugger
    console.log(this.loginForm);
    const apiURL = 'api/Account/v1/userlogin';
    let userObj = { email: this.loginForm.value.email, password: this.loginForm.value.password };
    //const headers = new HttpHeaders().set('Content-Type', 'application/json')
    var data = this.userService.login(userObj).subscribe(
      (res: any) => {
        debugger
        if (res.Value != undefined && res.Value != null && parseInt(res.Value.userid) > 0) {
          sessionStorage.setItem('userData', JSON.stringify(res.Value))
          sessionStorage.setItem('token', JSON.stringify(res?.Value?.access_token));
          console.log(res)
          this.SpinnerService.hide();
          this.router.navigate(['dashboard']);
        } else {
          this.SpinnerService.hide();
          this.userService.logout();
          this.router.navigate(['']);
          this.alerMessage.errorNotification('Some thing went worng');
        }
      }, (err: any) => {
        console.log(err)
        this.SpinnerService.hide();
        this.alerMessage.errorNotification('Some thing went worng');
      });
  }
}
