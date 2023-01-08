import { Component, Input } from '@angular/core';
import { ControlContainer, FormGroup, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-sign-up-ie',
  templateUrl: './sign-up-ie.component.html',
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }],
})
export class SignUpIeComponent {
  @Input() email!: string;

  @Input() authForm!: FormGroup;
}
