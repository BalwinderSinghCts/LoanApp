import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpRequestHandlerService } from 'src/service/http.service';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LayoutComponent } from './layout/layout.component';
import { NavBarComponent } from './layout/layout.navbar.component';
import { FooterComponent } from './layout/layout.footer';
import { LoanComponent } from './loan/loan.component';
import { ViewLoanListComponent } from './loan/loan.viewlist.component';
import { LoanDetailsComponent } from './loan/loan.details.component';
import { LoanemiHistoryComponent } from './loanemi-history/loanemi-history.component';
import { AddloanComponent } from './addloan/addloan.component';
import { AddcustomerComponent } from './addcustomer/addcustomer.component';
import { NavheaderComponent } from './navheader/navheader.component';
import { CustomerComponent } from './customer/customer.component';
import { CustomerdetailComponent } from './customerdetail/customerdetail.component';
import { CustomerService } from 'src/service/customer.service';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    DashboardComponent,
    LayoutComponent,
    NavBarComponent,
    FooterComponent,
    LoanComponent,
    ViewLoanListComponent,
    LoanDetailsComponent,
    LoanemiHistoryComponent,
    AddloanComponent,
    AddcustomerComponent,
    NavheaderComponent,
    CustomerComponent,
    CustomerdetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxSpinnerModule
  ],
  providers: [HttpRequestHandlerService,CustomerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
