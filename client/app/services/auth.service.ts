
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
// MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA5ROJdDuNL0k4/4aD1xTv
// fm8ohHMMzCAQc4Bnt6Nx6bBtwOhd8NQrNew+E2lUBYyxf5XdrZLUDQX5w8m5FJRg
// Ji96dh5H24f/RiDiBBsShIssZ6BmE45WZa14OJjPJH0GXa4zJbGDV0ds/A05igYk
// r+k3IeJqhqPSlnSUolKKrsQCB+jfrXxR0EPPY5kUWKPrbDnymWFhYssQiBtd6sDS
// 1ZLB9KSI140iBKVdIRRwh4tr5QCqU4jjQWM6xbyf/YPF1VgjCK/t0s6XeSdX9YCo
// nsjdl6yhdxg2wH0FLLh1mamycjChp8F3GCFJNq2oExO4g4ci8IkiszCzVTEaCIhI
// WQIDAQAB
// -----END PUBLIC KEY-----`;

  isLoggedIn: boolean = false;
  // store the URL so we can redirect after logging in
  redirectUrl: string;

  constructor (private http: Http
    //,private authModule: AuthModule
    ) { }

  signin(body: User): Observable<ResponseData> {

    let url = this.baseUrl + 'authenticate';
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    // uses regular http
    return this.http.post(url, body, options)
                    .map((response: Response) => {

                      let data = response.json() && response.json().success && response.json().data;
                      
                      // TODO: proper session logic
                      if(data.token && data.subject) {
                        localStorage.setItem('sessionToken', data.token);
                        localStorage.setItem('sessionUser', JSON.stringify(data.subject));
                      }

                      return response.json();

                    }).catch((error: any) => Observable.throw(error.json().message || 'Server error'));
             
  }

  // should be as lightweight as possible
  verify(): Observable<boolean> {

    let type = 'User';
    let user = JSON.parse(localStorage.getItem('sessionUser'));
    let token = localStorage.getItem('sessionToken');
    // TODO: public key & passphrase

    if (type && user && user._id && token) {

      let url = this.baseUrl + 'verify';
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      //let body = { type: type, id: user._id, key: this.pubKey, token: token };
      let body = { type: type, id: user._id, token: token };

      // uses regular http
      return this.http.post(url, body, options)
                      .map((response: Response) => response.json())
                      .catch((error: any) => Observable.throw(error.json().message || 'Server error'));

    }

    return Observable.of(false);     
  }

  signout(): void {
    this.isLoggedIn = false;
  }
}
