import { Component, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Customer } from 'src/model/customer';
import { CustomerService } from 'src/service/customer.service';
import { HttpRequestHandlerService } from 'src/service/http.service';
import Swal from 'sweetalert2';
import { AlertMessageService } from '../alert-message.service';

@Component({
  selector: 'app-addloan',
  templateUrl: './addloan.component.html',
  styleUrls: ['./addloan.component.css']
})
export class AddloanComponent {
  constructor(private alertMessage: AlertMessageService, private http: HttpRequestHandlerService,
    private fb: FormBuilder,
    public router: Router,
    private actRoute: ActivatedRoute,
    private customerService: CustomerService,
    private SpinnerService: NgxSpinnerService
  ) { }
  private apiURL = 'api/loan/v1/Addloan'

  loanApp: FormGroup = new FormGroup({});
  listOfLoans: Array<any> = new Array<any>();
  loanAmount: string = "";
  loantype: string = "";
  loanValid = null;
  customerId = "";
  userId = "";
  buttonText: boolean = false;
  customerdata: Customer = new Customer();
  ngOnInit() {
    console.log(this.actRoute.snapshot);
    //reactive form validation
    //Validators.pattern("^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$")
    //Validators.pattern("^([\+0]91)?\-?[7-9]{1}[0-9]{9}$")
    let loantype = [
      { Id: 1, Name: "Personal Loan" },
      { Id: 2, Name: "Home Loan" },
      { Id: 3, Name: "Car Loan" },
      { Id: 4, Name: "Bike Loan" },
      { Id: 5, Name: "Gold Loan" },
    ]
    this.listOfLoans = loantype;
    this.customerId = this.actRoute.snapshot.params['Id'];
    this.userId = JSON.parse(localStorage.getItem('userData') || '{}')['userid'];
    if (this.actRoute.snapshot.url[2].path == 'apply') {
      this.loanApp = this.fb.group({
        loantype: ['', [Validators.required,]],
        loanamt: ['', [Validators.required, Validators.max(2500000)]],
        loanterm: ['', [Validators.required]],
        loanRateOfinterst: ['', [Validators.required]]
      })
      console.log(this.customerId);
      this.getCustomerDetails();
    } else {
      this.http.get('api/loan/v1/loanDetail?loanNumber=' + this.customerId).subscribe(
        (response: any) => {
          console.log(response)
          console.log(response.Data.LoanType)
          console.log(response.Data.Amount)
          this.loanApp = this.fb.group({
            loantype: ['', [Validators.required]],
            loanamt: [response.Data.Amount, [Validators.required, Validators.max(2500000)]],
            loanterm: [response.Data.LoanTerm, [Validators.required]],
            loanRateOfinterst: [response.Data.RateOfinterst, [Validators.required]]
          })
          this.loantype = response.Data.LoanType;
          this.loanAmount = response.Data.Amount;
          this.loanApp.get('loanRateOfinterst')?.disable({ onlySelf: true });
          console.log(this.customerId);
          this.buttonText = true;
          this.getCustomerDetails();
        },
        () => { }
      )

    }

  }

  // method of applying for a loan after login 
  applicationReg() {
    debugger
    this.SpinnerService.show();

    console.log(this.loanApp)
    let applForm = {
      CustomerId: this.customerId,
      Amount: this.loanApp.value.loanamt,
      LoanTerm: this.loanApp.value.loanterm,
      RateOfinterst: this.loanApp.value.loanRateOfinterst,
      LoanType: this.loanApp.value.loantype,
      UserId: this.userId,
      LoanNumber: this.buttonText ? this.customerId : ''
    }
    if (!this.buttonText) {

      applForm.LoanNumber = this.customerId;
      this.http.post(this.apiURL, applForm).subscribe(
        (response: any) => {
          this.SpinnerService.hide();

          console.log(response);
          if (response.IsSuccess) {
            this.alertMessage.successNotification(`${response.Message} +
            Loan-Number ${response.Data.LoanNumber}
            `);
            this.router.navigate(['loan'])
          }
        },
        (error: any) => {
          this.alertMessage.errorNotification('some thing went wrong')
          console.error(error);

          throw error
        }
      )
    } else {
      console.log(applForm)

      this.http.post('api/loan/v1/UpdateLoan', applForm).subscribe(
        (response: any) => {
          console.log('update data: ', response);
          this.SpinnerService.hide();

          if (response.IsSuccess) {
            this.successNotification(`${response.Message} 
            Loan-Id ${response.Data.LoanNumber}
            `);
            this.router.navigate(['loan/' + response.Data.LoanNumber +'/detail'])
          }
        },
        (error: any) => {
          console.error(error);
          this.alertMessage.errorNotification('some thing went wrong')

          throw error
        }
      )
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
  takeAmount(event: any) {
    console.log(this.loanApp.value.loantype)

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

  successNotification(message: string) {
    Swal.fire('', message, 'success');
  }
  getCustomerDetails() {
    this.SpinnerService.show();
    var data = this.customerService.getCustomerDetails(this.customerId).subscribe(
      (response: any) => {
        this.SpinnerService.hide();
        console.log(response)
        if (response.IsSuccess) {
          this.customerdata = response.Data;
        }
      },
      (error: any) => {
        this.SpinnerService.hide();

        console.log(error)

      }
    );
    console.log(data);
  }

}
