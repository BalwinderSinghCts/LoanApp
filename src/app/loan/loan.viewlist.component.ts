import { Component, Input } from "@angular/core";
import { Loan } from "src/model/loan";

@Component({
    selector: 'app-viewlist',
    templateUrl: './loan.viewlist.html'
})


export class ViewLoanListComponent {
    @Input()
    loandatalist: Array<Loan> = new Array<Loan>();
}
