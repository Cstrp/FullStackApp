import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../../../services/authentication.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { SnackBarService } from '../../../../../shared/services/snack-bar.service';

@Component({
  selector: 'app-sign-in-form',
  templateUrl: './signIn-form.component.html',
})
export class SignInFormComponent implements OnInit, OnDestroy {
  email = 'email';

  password = 'password';

  sub!: Subscription;

  public authForm: FormGroup = new FormGroup({
    email: new FormControl(this.email),
    password: new FormControl('2'),
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private snackBarService: SnackBarService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{3,16}$'),
        ],
      ],
    });

    this.route.queryParams.subscribe((params: Params) => {
      if (params['registered']) {
        this.snackBarService.showBar('Now you can log in using your credentials', 'ok');
      } else if (params['accessDenied']) {
        this.snackBarService.showBar('You need to register to login', 'ok');
      } else if (params['sessionFailed']) {
        this.snackBarService.showBar('Please login again', 'ok');
      }
    });
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  onSubmit() {
    if (this.authForm.invalid) return;

    this.sub = this.authService.signIn(this.authForm.value).subscribe(
      () => {
        this.router.navigate(['/overview']);
      },
      (error) => {
        this.snackBarService.showBar(error.error.message, 'close');
        this.authForm.enabled;
      },
    );

    this.authForm.reset();
  }
}
