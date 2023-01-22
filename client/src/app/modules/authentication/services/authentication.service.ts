import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { User } from '../models/user';
import { LocalStorageService } from '../../../shared/services/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private token: string | null = null;

  constructor(private http: HttpClient, private lsService: LocalStorageService) {}

  signIn(user: User): Observable<{ token: string }> {
    return this.http.post<{ token: string }>('api/auth/signin', user).pipe(
      tap(({ token }) => {
        if (token) {
          this.lsService.saveData('token', token);
          this.setToken(token);
        }
      }),
    );
  }

  signUp(user: User): Observable<User> {
    console.log(user);

    return this.http.post<User>('api/auth/signup', user);
  }

  public setToken(token: string) {
    this.token = token;
  }

  public getToken(): string {
    if (this.token) {
      return this.token;
    }

    return '';
  }

  public isAuth(): boolean {
    return !!this.token;
  }

  public logout() {
    this.setToken('');
    this.lsService.clearData();
  }
}
