export class Loan {
    /**
     *
     */
    constructor() {
        this.LoanHistory = new Array<LoanHistory>();
    }
    LoanId: string = "";
    CustomerId: string = "";
    FirstName: string = "";
    LastName: string = "";
    CustomerPhone: string = "";
    CustomerAddress: string = "";
    CustomerPanNo: string = "";
    CustomerGSTNo: string = "";
    LoanNumber: string = "";
    LoanStatus: string = "";
    LoanType: string = "";
    LoanTerm: string = "";
    Amount: string = "";
    RateOfinterst: string = "";
    UserId: string = "";
    LoanHistory: Array<LoanHistory>
}

export class LoanHistory {
    Id: string = "";
    LoanNumber: string = "";
    EMIAmount: string = "";
    EMIDueDate: string = "";
    EMIPaidDate: string = "";
    PaymentStatus: string = "";
}