import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpRequestHandlerService } from 'src/service/http.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  /**
   *
   */
  constructor(private router: Router, private httpClient: HttpRequestHandlerService, private http: HttpClient) {

  }
  loginForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required,
    Validators.minLength(6)]),
  });

  onSubmit() {
    debugger
    console.log(this.loginForm);
    const apiURL = 'api/Account/v1/userlogin';
    let userObj = { email: this.loginForm.value.email, password: this.loginForm.value.password };
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
    this.httpClient.post<any>(apiURL, userObj).subscribe(
      (res) => {
        localStorage.setItem('userData', JSON.stringify(res.value))
        localStorage.setItem('token', JSON.stringify(res?.value?.access_token));
        this.router.navigate(['dashboard']);
        console.log(res)
      }, (err) => {
        console.log(err)
      });
  }
}
