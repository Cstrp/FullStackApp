import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  public sidenav!: MatSidenav;

  public active: Boolean = false;

  constructor() {}

  public setSidenav(sidenav: MatSidenav) {
    this.sidenav = sidenav;
  }

  public open(): void {
    this.sidenav.open();
  }

  public close(): void {
    this.sidenav.close();
  }

  public toggle(): void {
    this.active = !this.active;
    this.sidenav.toggle();
  }
}
