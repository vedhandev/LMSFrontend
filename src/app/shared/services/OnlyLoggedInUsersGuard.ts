import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthServiceProvider } from './authentication-service';


@Injectable()
export class OnlyLoggedInUsersGuard implements CanActivate {
  constructor(private userService: AuthServiceProvider, private router: Router) {};

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log('OnlyLoggedInUsers');
    if (this.userService.getToken() === null || this.userService.getToken() === 'null') {
        this.router.navigate(['/']);
      return false;
    } else {
      return true;
    }
  }
}
