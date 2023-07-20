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
    AddcustomerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [HttpRequestHandlerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
