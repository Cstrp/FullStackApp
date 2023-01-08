import { Component } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
})
export class SiteLayoutComponent {
  constructor(public sidebarService: SidebarService) {}

  toggleSidebar() {
    this.sidebarService.toggle();
  }
}
