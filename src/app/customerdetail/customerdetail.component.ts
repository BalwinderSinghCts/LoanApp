import { Component, Input } from '@angular/core';
import { Customer } from 'src/model/customer';

@Component({
  selector: 'app-customerdetail',
  templateUrl: './customerdetail.component.html',
  styleUrls: ['./customerdetail.component.css']
})
export class CustomerdetailComponent {
  @Input()
  customer: Customer = new Customer()
}
