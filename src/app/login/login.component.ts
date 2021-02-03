import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { faCalendarAlt } from '@fortawesome/free-regular-svg-icons';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from '../services/authentication.service';
import { ModalContentComponent } from '../utilities/modal-content/modal-content.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  icons = { faCalendarAlt };
  fGroup = new FormGroup({
    name: new FormControl(null, {
      validators: [
        Validators.required,
        Validators.pattern('^[a-zA-z]+([s][a-zA-Z]+)*$'),
      ],
    }),
    email: new FormControl(null, {
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl(null, {
      validators: [
        Validators.required,
        Validators.pattern('^([a-zA-Z0-9@*#]{8,15})$'),
      ],
    }),
    gender: new FormControl('male', {
      validators: [Validators.required],
    }),
    dob: new FormControl(null, {
      validators: [Validators.required],
    }),
  });
  loginState: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthenticationService,
    private modal: NgbModal
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      if (params['state'] === 'signup') {
        this.loginState = false;
        this.reset();
      } else if (params['state'] === 'login') {
        this.loginState = true;
        this.reset();
      } else {
        this.router.navigate(['/auth', 'login']);
      }
    });
  }

  onSubmit() {
    // console.log(this.fGroup);

    this.auth.login(this.fGroup.value).subscribe({
      next: (res) => {
        this.openModal(res, '/');
      },
      error: (err: HttpErrorResponse) => {
        this.openModal(err.error, '/auth/login');
      },
    });
  }

  reset() {
    if (this.loginState) {
      this.fGroup.reset({
        name: 'xxxxxxx',
        gender: 'others',
        dob: {
          year: 2021,
          month: 1,
          day: 1,
        },
      });
      // console.log(this.loginState);
    } else {
      this.fGroup.reset({ gender: 'male' });
    }
  }

  private openModal(msg: string, navigation: string) {
    let modalRef: NgbModalRef = this.modal.open(ModalContentComponent, {
      centered: true,
    });
    modalRef.componentInstance.title = 'submit summary';
    modalRef.componentInstance.content = msg;
    modalRef.result.finally(() => {
      this.router.navigate([navigation]);
      // console.log('logged in modal method');
    });
  }
}
