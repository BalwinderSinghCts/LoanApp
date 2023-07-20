import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from "rxjs";
import { HttpRequestHandlerService } from "./http.service";

@Injectable()
export class CustomerService {
    private apiURL = "api/customer/v1/customerdetail?id=";
    /**
     *
     */
    constructor(private http: HttpRequestHandlerService) {

    }
    public getCustomerDetails(id: string): Observable<any> {
        return this.http.get(this.apiURL + id)
    }
}