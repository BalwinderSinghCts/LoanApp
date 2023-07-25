import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs';
import { Loan } from 'src/model/loan';
import { HttpRequestHandlerService } from 'src/service/http.service';

@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.css']
})
export class LoanComponent implements OnInit {

  constructor(private http: HttpRequestHandlerService) {

  }
  ngOnInit(): void {
    this.getLoanList({PageSize:20, LoanNumber: "", FirstName: "", LastName: "" });
  }
  private apiURL = 'api/loan/v1/searchLoans';
  loanDataList: Loan[] = [];
  filterFormGroup = new FormGroup({
    firstname: new FormControl(null),
    lastname: new FormControl(null),
    loannumber: new FormControl(null)
  });

  search() {
    const loanData = {
      LoanNumber: this.filterFormGroup.value.loannumber,
      FirstName: this.filterFormGroup.value.firstname,
      LastName: this.filterFormGroup.value.lastname,
      PageSize:50,
    };
    this.getLoanList(loanData);
  }

  getLoanList(loanData: any) {
console.log(loanData)
    this.http.post(this.apiURL, loanData).subscribe(
      (response: any) => {
        console.log(response)
        if (response.IsSuccess) {
          this.loanDataList = response.ListData;
          console.log('Loan data List: ', this.loanDataList)
        }
        //this.loanDataList.push();
      },
      (error: any) => {
        console.log(error)
      })
  }
}
