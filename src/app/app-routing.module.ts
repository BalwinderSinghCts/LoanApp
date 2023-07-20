import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoanComponent } from './loan/loan.component';
import { LoanDetailsComponent } from './loan/loan.details.component';

const routes: Routes = [
  { path: "", component: AuthComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'loan', component: LoanComponent },
  {
    path: 'loan/:id/detail',
    component: LoanDetailsComponent,
    pathMatch:'full'
  },
  {
    path: 'loan/add',
    component: LoanDetailsComponent,
    pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
