import { Component } from '@angular/core';

@Component({
  selector: 'app-floating-button',
  templateUrl: './floating-button.component.html',
  styleUrls: ['./floating-button.component.scss'],
})
export class FloatingButtonComponent {
  active: boolean = false;

  links = [
    { url: '/order', icon: 'add' },
    { url: '/category/new', icon: 'category' },
  ];

  constructor() {}
}
