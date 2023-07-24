import { Component, Input, OnInit } from "@angular/core";
import { Loan } from "src/model/loan";
import { UserService } from "src/service/user.service";

@Component({
    selector: 'app-viewlist',
    templateUrl: './loan.viewlist.html'
})


export class ViewLoanListComponent implements OnInit {
    /**
     *
     */
    isLogin: boolean = true;
    userDataRole: any = null;
    constructor(private userService: UserService) {

    }
    ngOnInit(): void {
        this.isLogin = this.userService.tokenIsvalidOrNo();
        this.userDataRole = JSON.parse(sessionStorage.getItem('userData') || '{}')['role']
    }
    @Input()
    loandatalist: Array<Loan> = new Array<Loan>();
}
