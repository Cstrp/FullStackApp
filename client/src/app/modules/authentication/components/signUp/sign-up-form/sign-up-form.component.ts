import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SnackBarService } from '../../../../../shared/services/snack-bar.service';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
})
export class SignUpFormComponent implements OnInit, OnDestroy {
  email = 'email';

  password = 'password';

  private sub!: Subscription;

  public authForm: FormGroup = new FormGroup({
    email: new FormControl(this.email),
    password: new FormControl('2'),
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBarService: SnackBarService,
  ) {}

  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
  }

  ngOnInit(): void {
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{6,16}$'),
        ],
      ],
    });
  }

  onSubmit() {
    if (this.authForm.invalid) return;

    this.authForm.disabled;
    this.sub = this.authService.signUp(this.authForm.value).subscribe(
      () => {
        this.router.navigate(['/sign-in'], {
          queryParams: {
            registered: true,
          },
        });
      },
      (error) => {
        this.snackBarService.showBar(error.error.message, 'close');
        this.authForm.enabled;
      },
    );

    this.authForm.reset();
  }
}
