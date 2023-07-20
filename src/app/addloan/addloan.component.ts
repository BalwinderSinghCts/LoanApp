import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addloan',
  templateUrl: './addloan.component.html',
  styleUrls: ['./addloan.component.css']
})
export class AddloanComponent {
  constructor(private fb: FormBuilder, public router: Router) { }

  loanApp: FormGroup = new FormGroup({});
  listOfLoans: Array<any> = new Array<any>();
  loanAmount = null;
  loanValid = null;

  ngOnInit() {
    //reactive form validation
    this.loanApp = this.fb.group({
      usermob: ['', [Validators.required, Validators.pattern("^([\+0]91)?\-?[7-9]{1}[0-9]{9}$")]],
      useradhaar: ['', [Validators.required, Validators.pattern("^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$")]],
      loantype: ['', [Validators.required,]],
      loanamt: ['', [Validators.required, Validators.max(2500000), Validators.pattern("[0-9]*")]],
    })
    let loantype = [
      { Id: 1, Name: "Personal Loan" },
      { Id: 2, Name: "Home Loan" },
      { Id: 3, Name: "Car Loan" },
      { Id: 4, Name: "Bike Loan" },
      { Id: 5, Name: "Gold Loan" },
    ]
    this.listOfLoans=loantype;
    //retrieves list of loans
    // this.loanService.getAllLoans().subscribe(data => {
    //   this.listOfLoans = data;
    //   // console.log(this.listOfLoans);
    // })
  }

  // method of applying for a loan after login 
  applicationReg() {
    // console.log(this.loanApp.value);
    let customer = "";//JSON.parse(localStorage.getItem('userdata'));
    let applForm = {
      userid: "",
      usermob: this.loanApp.value.usermob,
      useradhaar: this.loanApp.value.useradhaar,
      loanid: this.loanApp.value.loantype,
      loanamt: this.loanApp.value.loanamt,
      appstatus: 'Requested',
    }

    // this.applService.getAllApp().subscribe(resp => {
    //   // console.log(resp);
    //   // console.log(applForm.userid);
    //   // console.log(applForm.loanid);

    //   // filter the loan applications based on the user
    //   let userApplications = resp.filter(app => {
    //     return app.UserId == applForm.userid;
    //   })
    //   // console.log(userApplications);
    //   // console.log(userApplications.length);

    //   // checking if the number of loans applied by the user less than 3
    //   if (userApplications.length < 3) {
    //     let Application = resp.filter(app => {
    //       return app.UserId == applForm.userid && app.LoanId == applForm.loanid;
    //     })
    //     // console.log(Application);
    //     // console.log(Application.length);

    //     // checking the application if the user already applied that loan
    //     if (Application.length == 0) {
    //       // console.log('you can apply');
    //       // console.log(applForm);
    //       this.applService.registerApp(applForm);
    //       alert("Loan application for loan id " + this.loanApp.value.loantype + " applied successfully");
    //       this.router.navigate(['/checkstatus']);
    //     } else {
    //       alert("Sorry, you can't apply for the same loan more than once");
    //     }
    //   }
    //   else {
    //     alert("Sorry, you can't apply for loans more than 3 times");
    //   }
    // })
  }

  // method of retreiving loan amount based on loan id
  takeAmount(value: Number) {
    // this.listOfLoans.forEach(element => {
    //   if (element.LoanId == value) {
    //     // console.log(this.loanAmount);
    //     localStorage.setItem('amount', element.LoanAmt);
    //   }
    // });
    //this.loanAmount = Number(localStorage.getItem('amount'));
    //this.loanValid = Number(localStorage.getItem('amount'));
    //localStorage.removeItem('amount');
  }
}
