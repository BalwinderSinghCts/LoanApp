import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from "rxjs";
import { HttpRequestHandlerService } from "./http.service";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Route, Router } from "@angular/router";

@Injectable()
export class UserService {
    constructor(private router: Router, private httpClient: HttpRequestHandlerService, private jwtServiceHelper: JwtHelperService, private http: HttpRequestHandlerService) {

    }

    tokenIsvalidOrNo(): boolean {
        if (this.jwtServiceHelper.isTokenExpired()) {
            return true;
        }
        else
            return false;
    }
    tokenDetails(): any {
        console.log(this.jwtServiceHelper.decodeToken(JSON.parse(sessionStorage.getItem('userData') || '{}')['access_token']))
        return this.jwtServiceHelper.decodeToken(JSON.parse(sessionStorage.getItem('userData') || '{}')['access_token']);
    }
    tokenExp(): any {
        console.log(this.jwtServiceHelper.getTokenExpirationDate())
        return this.jwtServiceHelper.getTokenExpirationDate();
    }

    getUserRole(): string {
        debugger;
        const userData = JSON.parse(sessionStorage.getItem('userData') || '{}')['role'];
        //this.jwtServiceHelper.decodeToken(JSON.parse(localStorage.getItem('userData') || '{}')).role;
        return userData != null && !undefined ? userData : null;
    }

    login(userdata: any): Observable<any> {
        const apiURL = 'api/Account/v1/userlogin';
        const headers = new HttpHeaders().set('Content-Type', 'application/json')
        return  this.httpClient.post<any>(apiURL, userdata, headers);
    }
    logout() {
        sessionStorage.clear();
        sessionStorage.clear();
        this.router.navigate(['/']);
    }


}