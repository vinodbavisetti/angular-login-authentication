import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate, CanActivateChild {
  constructor(
    private authservice: AuthenticationService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> {
    return this.authservice.verifyToken().pipe(
      tap((bool: boolean) => {
        if (!bool) {
          this.router.navigate(['/auth/login']);
        }
      })
    );
  }

  canActivateChild(): Observable<boolean> {
    return this.canActivate();
  }
}
