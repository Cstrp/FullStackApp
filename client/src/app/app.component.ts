import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './modules/authentication/services/authentication.service';
import { LocalStorageService } from './shared/services/local-storage.service';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {
  constructor(private lsService: LocalStorageService, private authService: AuthenticationService) {}

  ngOnInit(): void {
    const potentialToken = this.lsService.getData('token');

    if (potentialToken !== null) {
      this.authService.setToken(potentialToken);
    }
  }
}
