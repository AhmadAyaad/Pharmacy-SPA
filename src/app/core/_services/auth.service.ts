import { Router } from '@angular/router';
import { PharmacyProductDetailsComponent } from './../components/pharmacy-product-details/pharmacy-product-details.component';
import { IUser } from './../_models/IUser.model';
import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, mapTo } from 'rxjs/operators';
import { BehaviorSubject, from, Observable, of } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiURl = `${environment.apiUrl}account`;
  private userNameSubject: BehaviorSubject<string>;
  private tokenSubject: BehaviorSubject<string>;
  private rolesSubject: BehaviorSubject<string[]>;

  public userName: Observable<string>;
  public token: Observable<string>;
  constructor(
    private httpClient: HttpClient,
    private jwtHelper: JwtHelperService,
    private router: Router
  ) {
    this.userNameSubject = new BehaviorSubject<string>(
      JSON.parse(localStorage.getItem('userName'))
    );
    this.tokenSubject = new BehaviorSubject<string>(
      JSON.parse(localStorage.getItem('token'))
    );
    this.rolesSubject = new BehaviorSubject<string[]>(
      JSON.parse(localStorage.getItem('roles'))
    );
    this.userName = this.userNameSubject.asObservable();
    this.token = this.tokenSubject.asObservable();
  }

  public get userNameValue(): string {
    return this.userNameSubject.value;
  }
  public get userToken(): string {
    return this.tokenSubject.value;
  }
  // public get roles(): string[] {
  //   return this.rolesSubject.value;
  // }
  registerUser(registerUserModel) {
    return this.httpClient.post(`${this.apiURl}/register`, registerUserModel);
  }
  login(userData: IUser) {
    return this.httpClient.post(`${this.apiURl}/login`, userData).pipe(
      map((res: any) => {
        console.log(res);
        localStorage.setItem('userName', JSON.stringify(res.userName));
        localStorage.setItem('token', JSON.stringify(res.token));
        localStorage.setItem('roles', JSON.stringify(res.roles));
      })
    );
  }
  get authToken() {
    return localStorage.getItem('token');
  }
  set authToken(token) {
    localStorage.setItem('token', token);
  }
  get refreshToken() {
    return localStorage.getItem('refreshToken');
  }
  set refreshToken(token) {
    localStorage.setItem('refreshToken', token);
  }
  get roles() {
    return localStorage.getItem('roles');
  }

  checkLoign(url: string = null): Observable<boolean> {
    let isAuthenticated = false;
    if (this.authToken && this.refreshToken) {
      isAuthenticated = this.jwtHelper.isTokenExpired(this.authToken);
      if (!isAuthenticated) {
        return this.refreshAccessToken(this.authToken, this.refreshToken).pipe(
          map((loggedInData: any) => {
            this.authToken = loggedInData.jwt.authToken;
            this.refreshToken = loggedInData.refreshToken;
            return true;
          }),
          catchError((err, caught) => {
            this.logout();
            return of(false);
          })
        );
      } else {
        return of(true);
      }
    } else {
      //TODO : rename this route
      this.router.navigate(['/account/sign-in']);
    }
  }

  refreshAccessToken(accessToken: string, refreshToken: string) {
    return this.httpClient.post(
      `${this.apiURl}/refreshAccessToken?token=${accessToken}&refreshToken=${refreshToken}`,
      null,
      { params: { token: accessToken, refreshToken } }
    );
  }
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    this.userNameSubject.next(null);
  }
}
