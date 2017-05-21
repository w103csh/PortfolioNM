
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
  UsersService,
} from './users.service';
import {
  User,
} from '../models/User';
import {
  ResponseData,
} from '../models/ResponseData';
import {
  __apiUrl,
} from '../APP_CONFIG';

import {
  AuthHttp,
  JwtHelper,
} from 'angular2-jwt';
import {
  Observable,
} from 'rxjs/Observable';
import {
  BehaviorSubject,
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
  private jwtHelper: JwtHelper = new JwtHelper();

  // observable streams
  private signedInUserSource = new BehaviorSubject<User>(null);
  private isSignedInSource = new BehaviorSubject<boolean>(false);
  public signedInUser$: Observable<User> = this.signedInUserSource.asObservable();
  public isSignedIn$: Observable<boolean> = this.isSignedInSource.asObservable();

  constructor(
    private authHttp: AuthHttp,
    private http: Http,
    private usersService: UsersService
  ) { }

  checkToken(): boolean {
    let tokenCookie = JSON.parse(localStorage.getItem('token'));
    return tokenCookie && !this.jwtHelper.isTokenExpired(tokenCookie.token);
  }

  isSignedIn() {
    return this.isSignedInSource.getValue();
  }

  getSignedInUser(): User {
    return this.signedInUserSource.getValue();
  }

  setSignedInUserFromToken() {
    if (this.checkToken() && !this.isSignedIn()) {

      let id = JSON.parse(localStorage.getItem('token')).subject.id;

      this.usersService.read(id).subscribe(
        (response: ResponseData) => {
          if (response && response.success) {
            this.updateSignedInUser(response.data);
          }
          else {
            this.signOut();
          }
        },
        (err) => {
          // TODO: log & something else
          console.log(err);
          this.signOut();
        }
      );
    }
  }

  updateSignedInUser(user: User) {
    this.isSignedInSource.next(user ? true : false);
    this.signedInUserSource.next(user);
  }

  signIn(body: User): Observable<ResponseData> {

    let url = this.baseUrl + '/authenticate';
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    if (!body) {
      body = JSON.parse(localStorage.getItem('token'));
    }

    return this.http.post(url, body, options)
      .map((response: Response) => {

        let resJSON = response && response.json(), resData, data;
        try {
          resData = new ResponseData(resJSON.success, resJSON.message, resJSON.data);
          if (resData.success) {
            if (resData.data.token && resData.data.subject && resData.data.subject.type && resData.data.subject.id) {
              localStorage.setItem('token', JSON.stringify(resData.data));
            }
            else {
              throw new Error('VerifyToken service response not in correct format.');
            }
          }
        }
        catch (err) {
          resData = new ResponseData(false, 'VerifyToken service response not in correct format.', null);
        }
        return resData;

      })
      .catch((error: any) => Observable.throw(error.json().message || 'Server error'));

  }

  verifyToken(): Observable<ResponseData> {

    let token = JSON.parse(localStorage.getItem('token'));
    let user = this.signedInUserSource.getValue();

    if (!token || !token.subject || !token.subject.id || !token.subject.type) {
      return Observable.of(new ResponseData(false, 'Token not in correct format.', null));
    }
    else if (token.subject.type !== 'User') {
      return Observable.of(new ResponseData(false, 'Token does not have correct subject.', null));
    }
    else if (!user) {
      return Observable.of(new ResponseData(false, 'Signed in user service does not have a subject.', null));
    }
    else if (!user || user.id != token.subject.id) {
      return Observable.of(new ResponseData(false, 'Signed in user does not match token subject.', null));
    }
    else {

      let url = this.baseUrl + '/verifyToken';

      return this.authHttp.get(url)
        .map((response: Response) => {

          let resJSON = response && response.json(), resData;
          try {
            resData = new ResponseData(resJSON.success, resJSON.message, resJSON.data);
            if (resData.success) {
              // Do something (template)
            }
          }
          catch (err) {
            resData = new ResponseData(false, 'VerifyToken service response not in correct format.', null);
          }
          return resData;

        })
        .catch((error: any, caught) =>
          Observable.throw(error.json().message || 'Server error')
        );
    }
  }

  signOut(): void {
    this.updateSignedInUser(null);
    localStorage.removeItem('token');
  }
}
