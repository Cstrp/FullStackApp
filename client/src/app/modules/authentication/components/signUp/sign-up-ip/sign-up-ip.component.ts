import { Component, Input } from '@angular/core';
import { ControlContainer, FormGroup, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-sign-up-ip',
  templateUrl: './sign-up-ip.component.html',
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }],
})
export class SignUpIpComponent {
  @Input() password!: string;

  @Input() authForm!: FormGroup;

  public hide: boolean = true;

  constructor() {}
}
