import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { environment } from '../environments/environment';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(private http: Http, private router: Router) {

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.http
      .get(environment.isAuthenticatedUrl, { withCredentials: true })
      .map((response) => {
        if (response.json().success) {
          return true
        }
        this.router.navigate(['/']);
        console.log("Auth failure")
        return false;
      })

  }
}
