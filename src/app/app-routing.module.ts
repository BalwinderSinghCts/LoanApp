import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoanComponent } from './loan/loan.component';
import { LoanDetailsComponent } from './loan/loan.details.component';
import { AddloanComponent } from './addloan/addloan.component';
import { AddcustomerComponent } from './addcustomer/addcustomer.component';
import { CustomerComponent } from './customer/customer.component';
import { CanActivateGuardService } from './can-activate-guard.service';

const routes: Routes = [
  { path: "", component: AuthComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [CanActivateGuardService],
    data: { roles: ['admin', 'user'] }
  },
  {
    path: 'loan', component: LoanComponent,
  },
  {
    path: 'loan/:Id/apply',
    component: AddloanComponent,
    pathMatch: 'full',
    canActivate: [CanActivateGuardService],
    data: { roles: ['admin'] }

  },
  {
    path: 'loan/:Id/update',
    component: AddloanComponent,
    pathMatch: 'full',
    canActivate: [CanActivateGuardService],
    data: { roles: ['admin'] }
  },
  {
    path: 'loan/:id/detail',
    component: LoanDetailsComponent,
    pathMatch: 'full',
    canActivate: [CanActivateGuardService],
    data: { roles: ['admin', 'user'] }

  },
  {
    path: 'addcustomer',
    component: AddcustomerComponent,
    pathMatch: 'full',
    canActivate: [CanActivateGuardService],
    data: { roles: ['admin'] }
  },
  {
    path: 'customer',
    component: CustomerComponent,
    pathMatch: 'full', canActivate: [CanActivateGuardService],
    data: { roles: ['admin', 'user'] }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
