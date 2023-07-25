import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/model/customer';
import { HttpRequestHandlerService } from 'src/service/http.service';
import { UserService } from 'src/service/user.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  customerlist: Array<Customer> = new Array<Customer>();
  private apiURL = 'api/customer/v1/customerlist';
  isLogin:boolean =false;
  userDataRole:any=null;
  /**
   *
   */
  constructor(private userService: UserService,private http: HttpRequestHandlerService) {

  }
  ngOnInit(): void {
    this.getCustomer();
    this.isLogin = this.userService.tokenIsvalidOrNo();
    this.userDataRole = JSON.parse(sessionStorage.getItem('userData') || '{}')['role']?.toLowerCase()
  }
  private getCustomer() {
    this.http.get(this.apiURL).subscribe(
      (response: any) => {
        console.log(response)
        if (response.IsSuccess) {
          this.customerlist = response.ListData;
        }
      },
      (error: any) => { }
    )
  }


}
