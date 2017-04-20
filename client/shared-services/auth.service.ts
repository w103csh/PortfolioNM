
import {
  Injectable
} from '@angular/core';
import {
  Http,
  Response,
  Headers,
  RequestOptions
} from '@angular/http';

import {
  User
} from '../models/User';
import {
  ResponseData
} from '../models/ResponseData';
import {
  __apiUrl
} from '../../APP_CONFIG.ts';

import {
  Observable
} from 'rxjs/Observable';
import {
  BehaviorSubject
} from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class AuthService {

  //private readonly pubKey = `-----BEGIN PUBLIC KEY-----
  //-----END PUBLIC KEY-----`;
  // TODO: url 
  private readonly baseUrl = __apiUrl + '/auth';
  public redirectUrl: string;

  // observable streams
  private signedInUserSource = new BehaviorSubject<User>(null);
  private isSignedInSource = new BehaviorSubject<boolean>(null);
  public signedInUser$: Observable<User> = this.signedInUserSource.asObservable();
  public isSignedIn$: Observable<boolean> = this.isSignedInSource.asObservable();

  constructor (private http: Http) { }

  private updateUser(user: User) {
    this.isSignedInSource.next(user ? true : false);
    this.signedInUserSource.next(user);
  }

  signin(body: User): Observable<ResponseData> {

    let url = this.baseUrl + '/authenticate';
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(url, body, options)
                    .map((response: Response) => {

                      let data = response.json() && response.json().success && response.json().data;
                      
                      if(data.token && data.subject && data.subject.type && data.subject.id && data.user) {
                        this.updateUser(new User(data.user.email, data.user._id, data.user.firstName, data.user.lastName));
                        delete data.user;
                        localStorage.setItem('token', JSON.stringify(data));
                      }

                      return response.json();

                    })
                    .catch((error: any) => Observable.throw(error.json().message || 'Server error'));
             
  }

  // should be as lightweight as possible
  verify(): Observable<Boolean> {

    let token = JSON.parse(localStorage.getItem('token'));
    let user = this.signedInUserSource.getValue();

    // If there is a signed in user check that the local token subject id && type match the user (could be overkill)
    // but,
    // need to also let users who check the remember me box to go through as well.
    if(( user && token.subject.id === user.id && token.subject.type === 'User') ||
       (!user && token)) {

      let url = this.baseUrl + '/verifyToken';
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });

      // TODO: Consider sending token verification info as headers

      //let body = { type: type, id: user._id, key: this.pubKey, token: token };
      let body = { 
        type: token.subject.type, 
        id: token.subject.id, 
        token: token.token, 
        // Need to re-get user info when browser resets obeservable streams, but 
        // there is still a jwt in local storage (i.e., remember me is checked)
        includeSubject: (!user && token) 
      };

      return this.http.post(url, JSON.stringify(body), options)
                      .map((response: Response) => {
                        // TODO: make a bool that tells the api to return a user or just a bool
                        let success = response.json() && response.json().success;
                        let data = response.json() && response.json().success && response.json().data;
                        if(data) {
                          this.updateUser(new User(data.email, data._id, data.firstName, data.lastName));
                        }
                        return success;
                      })
                      .catch((error: any, caught) => 
                        Observable.throw(error.json().message || 'Server error')
                      );

    }
    else {
      return Observable.of(false);   
    }  
  }

  signout(): void {
    this.updateUser(null);
    localStorage.removeItem('token');
  }
}
