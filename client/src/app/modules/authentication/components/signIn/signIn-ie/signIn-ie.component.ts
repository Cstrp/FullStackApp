import { Component, Input } from '@angular/core';
import { ControlContainer, FormGroup, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-sign-in-ie',
  templateUrl: './signIn-ie.component.html',
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }],
})
export class SignInIeComponent {
  @Input() email!: string;

  @Input() authForm!: FormGroup;

  constructor() {}
}
