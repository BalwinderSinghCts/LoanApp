import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Customer } from 'src/model/customer';
import { HttpRequestHandlerService } from 'src/service/http.service';
import Swal from 'sweetalert2';
import { AlertMessageService } from '../alert-message.service';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-addcustomer',
  templateUrl: './addcustomer.component.html',
  styleUrls: ['./addcustomer.component.css']
})
export class AddcustomerComponent {
  private apiURL = 'api/Customer/v1/Addcustomer';
  constructor(private SpinnerService: NgxSpinnerService,private router: Router,private alertMessage: AlertMessageService, private http: HttpRequestHandlerService) {

  }
  formGroupCustomer = new FormGroup({
    firstname: new FormControl(null, [Validators.required]),
    lastname: new FormControl(null, [Validators.required]),
    address: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required]),
    phone: new FormControl(null, [Validators.required]),
    panno: new FormControl(null, [Validators.required]),
  });

  addCustomer() {
    debugger
    this.SpinnerService.show();

    console.log(this.formGroupCustomer);
    const customer = {
      FirstName: this.formGroupCustomer.value.firstname,
      LastName: this.formGroupCustomer.value.lastname,
      Address: this.formGroupCustomer.value.address,
      PhoneNumber: this.formGroupCustomer.value.phone,
      PanNo: this.formGroupCustomer.value.panno,
      Email: this.formGroupCustomer.value.email,
    };
    this.http.post(this.apiURL, customer).subscribe(
      (response: any) => {
    this.SpinnerService.hide();

        console.log(response);
        if (response.IsSuccess) {
          this.alertMessage.successNotification(response.Message);
          this.router.navigate(['customer']);
        }
      },
      (error: any) => {
    this.SpinnerService.show();
        
        this.alertMessage.errorNotification(error.Message);
        throw error
      }
    )
  }
  successNotification(message: string) {
    Swal.fire('', message, 'success');
  }
}
