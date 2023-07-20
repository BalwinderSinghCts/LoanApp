import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Customer } from 'src/model/customer';
import { HttpRequestHandlerService } from 'src/service/http.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-addcustomer',
  templateUrl: './addcustomer.component.html',
  styleUrls: ['./addcustomer.component.css']
})
export class AddcustomerComponent {
  private apiURL = 'api/Customer/v1/Addcustomer'
  constructor(private http: HttpRequestHandlerService) {

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
        console.log(response);
        if (response.IsSuccess) {
          this.successNotification(response.Message);
        }
      },
      (error: any) => {
        throw error
      }
    )
  }
  successNotification(message: string) {
    Swal.fire('', message, 'success');
  }
}