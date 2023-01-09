import { Component, Input } from '@angular/core';
import { ControlContainer, FormGroup, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-category-input',
  templateUrl: './category-input.component.html',
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }],
})
export class CategoryInputComponent {
  @Input() title: string = '';

  @Input() form!: FormGroup;

  constructor() {}

  reset() {
    this.form.reset();
  }
}
