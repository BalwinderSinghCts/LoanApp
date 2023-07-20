import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from "rxjs";

@Injectable()
export class HttpRequestHandlerService {
    private baseURL: string = 'https://localhost:7243/'
    private defaultHeader: HttpHeaders = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    constructor(private http: HttpClient) {

    }

    public get<T>(url: string, headers?: HttpHeaders, params?: HttpParams): Observable<T> {
        headers = headers ? headers : this.defaultHeader;
        return this.http.get<T>(this.baseURL + url, { headers, params });
    }

    public post<T>(url: string, body: T, headers?: HttpHeaders, params?: HttpParams): Observable<T> {
        headers = headers ? headers : this.defaultHeader;
        return this.http.post<T>(this.baseURL + url, body, { headers, params }).pipe(
            catchError(this.handleErrorResponce)
        )
    }

    private handleErrorResponce(error: HttpErrorResponse): Observable<never> {
        if (error.error instanceof ErrorEvent) {
            console.log('An Error occured', error.error.message)
        }
        else {
            console.error(`backend returned code ${error.status}
                 body was : ${JSON.stringify(error.error)}`
            )
        }
        return throwError('some thing went wrong, please try again later')
    }
}