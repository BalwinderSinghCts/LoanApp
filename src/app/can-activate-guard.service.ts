import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/service/user.service';
import { AlertMessageService, IAlertMessage } from './alert-message.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class CanActivateGuardService implements CanActivate {
  ;
  constructor(private alertMessageService: AlertMessageService, private userService: UserService, private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    const requiredRoles = route.data['roles'] as Array<string>;
    const userRole = this.userService.getUserRole();
    const tokenIsValid = this.userService.tokenIsvalidOrNo();
    if (!tokenIsValid) {
      localStorage.clear();
      this.alertMessageService.errorNotification('User token is expired');
      return false;
    }

    if (userRole == undefined || userRole == null) {
      return false;
    }
    if (requiredRoles.includes(userRole.toLowerCase())) {
      return true;
    } else {
      localStorage.clear();
      this.alertMessageService.infoNotification('User does not have access of this resource');
      return this.router.navigate(['/']);
    }
  }
}
