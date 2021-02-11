import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomepageComponent } from './homepage/homepage.component';
import { PagenotfoundComponent } from './utilities/pagenotfound/pagenotfound.component';
import { ModalContentComponent } from './utilities/modal-content/modal-content.component';
import { AuthInteceptorService } from './services/auth-inteceptor.service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import {
  NgbDatepickerModule,
  NgbDropdownModule,
  NgbModalModule,
} from '@ng-bootstrap/ng-bootstrap';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PagenotfoundComponent,
    HomepageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbDatepickerModule,
    NgbDropdownModule,
    NgbModalModule,
    FontAwesomeModule,
    MatSidenavModule,
    MatListModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInteceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
  entryComponents: [ModalContentComponent],
})
export class AppModule {}
