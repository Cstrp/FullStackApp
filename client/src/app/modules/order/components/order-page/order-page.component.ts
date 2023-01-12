import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
})
export class OrderPageComponent implements OnInit {
  public isOrder!: boolean;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        this.isOrder = this.router.url === '/order';
      }
    });
  }
}
