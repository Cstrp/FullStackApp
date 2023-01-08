import { Component, Input } from '@angular/core';
import { ControlContainer, FormGroup, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-sign-in-ip',
  templateUrl: './signIn-ip.component.html',
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }],
})
export class SignInIpComponent {
  @Input() password!: string;

  @Input() authForm!: FormGroup;

  public hide: boolean = true;

  constructor() {}
}
