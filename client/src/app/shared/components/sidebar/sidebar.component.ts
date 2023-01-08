import { AfterViewInit, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver, MediaMatcher } from '@angular/cdk/layout';
import { NavigationEnd, Router } from '@angular/router';
import { delay, filter } from 'rxjs';
import { SidebarService } from '../../services/sidebar.service';
import { AuthenticationService } from '../../../modules/authentication/services/authentication.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements AfterViewInit {
  @ViewChild('sidenav') public sidenav!: MatSidenav;

  constructor(
    protected observer: BreakpointObserver,
    private router: Router,
    private changeDetector: ChangeDetectorRef,
    private media: MediaMatcher,
    private authService: AuthenticationService,
    public sidebarService: SidebarService,
  ) {}

  public links = [
    { url: '/overview', name: 'Overview', icon: 'layers' },
    { url: '/analytics', name: 'Analytics', icon: 'analytics' },
    { url: '/history', name: 'History', icon: 'history' },
    { url: '/order', name: 'Add order', icon: 'add' },
    { url: '/category', name: 'Assortment', icon: 'category' },
  ];

  ngAfterViewInit(): void {
    this.observer
      .observe(['(max-width: 800px)'])
      .pipe(delay(1))
      .subscribe((value) => {
        if (value.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });

    this.router.events.pipe(filter((e) => e instanceof NavigationEnd)).subscribe(() => {
      if (this.sidenav.mode === 'over') {
        this.sidenav.close();
      }
    });

    this.sidebarService.setSidenav(this.sidenav);
  }

  logout(evt: Event): void {
    evt.preventDefault();
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
