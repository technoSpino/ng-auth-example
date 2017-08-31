import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/catch';
import { environment } from '../environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor() { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Clone the request to add the credentials.
        const authReq = req.clone({ withCredentials: true });
        // Pass on the cloned request instead of the original request.
        return next
            .handle(authReq)
            .catch(err => {
                if (err.status === 403) {
                    window.location.href = environment.loginURL;
                }
                else {
                    console.log(err)
                    return Observable.throw(err);
                }
            });
    }
}