
import { Injectable }       from '@angular/core';
import { Http,
         Response,
         Headers,
         RequestOptions }   from '@angular/http';
import { User }             from '../models/User';
import { ResponseData }     from '../models/ResponseData';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class AuthService {

  // TODO: url 
  private readonly baseUrl = 'http://localhost:3000/api/auth/';
//   private readonly pubKey = `-----BEGIN PUBLIC KEY-----
// -----END PUBLIC KEY-----`;

  isLoggedIn: boolean = false;
  // store the URL so we can redirect after logging in
  redirectUrl: string;

  constructor (private http: Http) { }

  signin(body: User): Observable<ResponseData> {

    let url = this.baseUrl + 'authenticate';
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(url, body, options)
                    .map((response: Response) => {

                      let data = response.json() && response.json().success && response.json().data;
                      
                      if(data.token && data.subject) {
                        localStorage.setItem('token', data.token);
                        localStorage.setItem('user', JSON.stringify(data.subject));
                      }

                      return response.json();

                    })
                    .catch((error: any) => Observable.throw(error.json().message || 'Server error'));
             
  }

  // should be as lightweight as possible
  verify(): Observable<boolean> {

    let type = 'User';
    let token = localStorage.getItem('token');
    let user = JSON.parse(localStorage.getItem('user'));

    if (type && user && user._id && token) {

      let url = this.baseUrl + 'verify';
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });

      // TODO: Consider sending token verification info as headers

      //let body = { type: type, id: user._id, key: this.pubKey, token: token };
      let body = { type: type, id: user._id, token: token };

      return this.http.post(url, body, options)
                      .map((response: Response) => response.json())
                      .catch((error: any) => Observable.throw(error.json().message || 'Server error'));

    }

    return Observable.of(false);     
  }

  signout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
}
