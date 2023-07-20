import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs';
import { Loan } from 'src/model/loan';
import { HttpRequestHandlerService } from 'src/service/http.service';

@Component({
    selector: 'app-loan-details',
    templateUrl: './loan.details.component.html',
    styleUrls: ['./loan.component.css']
})
export class LoanDetailsComponent implements OnInit {
    constructor(private route: ActivatedRoute, private http: HttpRequestHandlerService) { }
    loanno: string = "";
    loanData: Loan = new Loan();
    private apiURL: string = "api/loan/v1/LoanDetail?loanNumber=";
    ngOnInit() {
        //this.id = this.route.snapshot.params.id;
        this.route.paramMap.subscribe((params: any) => {
            this.loanno = params.get('id')?.toString();
            this.getLoanDetails(this.loanno);
        });
    }

    private getLoanDetails(id: string) {
        this.http.get(this.apiURL + this.loanno).subscribe(
            (response: any) => {
                console.log("data: ", response)

                if (response.IsSuccess) {
                    this.loanData = response.Data;
                } else {
                    console.log("data not found")
                }
            },
            (error: any) => {
                console.error('some thing went wrong: ', error)

            }
        )
    }



}