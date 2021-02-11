import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { listItems } from '../models/data.model';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class DataResolverService implements Resolve<listItems> {
  constructor(private authservice: AuthenticationService) {}

  resolve(): Observable<listItems> {
    // console.log('in the resolver');
    return this.authservice.getData();
  }
}
