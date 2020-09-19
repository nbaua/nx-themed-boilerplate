import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { decodeToken } from 'jwt-node-decoder';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { AuthUser, User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser'))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  public get currentUserRole(): string {
    const localCurrentUser = JSON.parse(localStorage.getItem('currentUser'));
    const currentUser: AuthUser = decodeToken(localCurrentUser.token);
    return currentUser.role;
  }

  login(username: string, password: string) {
    return this.http
      .post<any>(`${environment.apiUrl}/auth/login`, { username, password })
      .pipe(
        map((user) => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          return user;
        })
      );
  }

  register(user: User) {
    // username: string, password: string, role: Roles
    return this.http
      .post<any>(`${environment.apiUrl}/auth/register`, {
        username: user.username,
        password: user.password,
        role: user.role,
        email: user.email,
        mobile: user.mobile,
      })
      .pipe(
        map((result) => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          // localStorage.setItem('currentUser', JSON.stringify(user));
          // this.currentUserSubject.next(user);
          return result;
        })
      );
  }

  logout() {
    const currentUser: User = JSON.parse(localStorage.getItem('currentUser'));

    if (currentUser) {
      const result = this.http
        .post<any>(`${environment.apiUrl}/auth/logout`, {
          username: currentUser.username,
          token: currentUser.token,
        })
        .pipe(
          map((data) => {
            return data;
          })
        )
        .subscribe();
      // console.log(">>>>>>>>>>>>>>>>>>>>>>>>....", currentUser);
      localStorage.removeItem('currentUser');
    }
    // remove user from local storage to log user out
    this.currentUserSubject.next(null);
  }
}
