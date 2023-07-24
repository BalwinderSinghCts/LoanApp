import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from "rxjs";
import { HttpRequestHandlerService } from "./http.service";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable()
export class CustomerService {
    private apiURL = "api/customer/v1/customerdetail?id=";
    /**
     *
     */
    constructor(private jwtServiceHelper: JwtHelperService, private http: HttpRequestHandlerService) {

    }
    public getCustomerDetails(id: string): Observable<any> {
        return this.http.get(this.apiURL + id)
    }
    tokenisvalidorno(): boolean {
        if (this.jwtServiceHelper.isTokenExpired()) {
            return true;
        }
        else
            return false;
    }
    tokenDetails(): any {
        console.log(this.jwtServiceHelper.decodeToken(JSON.parse(localStorage.getItem('userData') || '{}')['access_token'] ))
        return this.jwtServiceHelper.decodeToken(JSON.parse(localStorage.getItem('userData') || '{}')['access_token'] );
        
    }
    tokenExp(): any {
        console.log(this.jwtServiceHelper.getTokenExpirationDate())
        return this.jwtServiceHelper.getTokenExpirationDate();
        
    }
}