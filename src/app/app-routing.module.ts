import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { AuthGuardService } from './services/auth-guard.service';
import { DataResolverService } from './services/data-resolver.service';
import { PagenotfoundComponent } from './utilities/pagenotfound/pagenotfound.component';

const routes: Routes = [
  { path: 'auth/:state', component: LoginComponent },
  {
    path: '',
    component: HomepageComponent,
    pathMatch: 'full',
    canActivate: [AuthGuardService],
    resolve: { items: DataResolverService },
  },
  { path: '**', component: PagenotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
