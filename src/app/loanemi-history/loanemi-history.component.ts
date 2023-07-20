import { Component, Input } from '@angular/core';
import { LoanHistory } from 'src/model/loan';

@Component({
  selector: 'app-loanemi-history',
  templateUrl: './loanemi-history.component.html',
  styleUrls: ['./loanemi-history.component.css']
})
export class LoanemiHistoryComponent {
  @Input()
  loanhistory: Array<LoanHistory> = new Array<LoanHistory>();
}
