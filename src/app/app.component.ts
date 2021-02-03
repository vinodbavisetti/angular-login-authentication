import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faBars, faSignInAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  icons = { faBars, faSignInAlt };
  constructor(private router: Router) {}

  logout() {
    sessionStorage.removeItem('token');
    this.router.navigate(['/auth/login']);
  }
}
