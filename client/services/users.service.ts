
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
  Router
} from '@angular/router';

import {
  User
} from '../models/User';
import {
  ResponseData
} from '../models/ResponseData';
import {
  __apiUrl
} from '../APP_CONFIG';

import {
  AuthHttp
} from 'angular2-jwt';
import {
  Observable
} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class UsersService {

  // TODO: url
  private readonly baseUrl = __apiUrl + '/users';

  constructor(
    private http: Http,
    private authHttp: AuthHttp,
  ) { }

  // create user
  create(body: User): Observable<ResponseData> {

    let url = this.baseUrl + '/create';
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(url, body, options)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().message || 'Server error'));

  }

  read(id: string): Observable<ResponseData> {

    let url = id ? (this.baseUrl + '/' + id) : this.baseUrl;

    return this.authHttp.get(url)
      .map((response: Response) => {

        let resJSON = response && response.json(), resData, data;
        try {
          resData = new ResponseData(resJSON.success, resJSON.message, resJSON.data);
          if (resData.success) {
            // Single user
            if (id) {
              let user = this.createUserFromJSON(resData.data.pop());
              resData.data = user;
            }
            // Mulitple users
            else {
              let users: User[] = [];
              resData.data.forEach((user: any) => {
                users.push(this.createUserFromJSON(user));
              });
              resData.data = users;
            }
          }
        }
        catch (err) {
          resData = new ResponseData(false, 'Read users service response not in correct format.', null);
        }

        return resData;

      })
      .catch((error: any) => this.debugError(error));
  }

  debugResponse(response: Response) {
    console.log('Error *^%$#');
    console.log(response);
    return response.json();
  }

  debugError(error: any) {
    console.log('Error *^%$#');
    console.log(error);
    return Observable.throw(error.json().message || 'Server error');
  }

  // update user
  update(body: User): Observable<ResponseData> {

    let url = this.baseUrl + '/update';

    return this.authHttp.post(url, body)
      .map((response: Response) => {
        
        let resJSON = response && response.json(), resData, data;
        try {
          resData = new ResponseData(resJSON.success, resJSON.message, resJSON.data);
          if (resData.success) {
            let user = this.createUserFromJSON(resData.data);
            resData.data = user;
          }
        }
        catch (err) {
          resData = new ResponseData(false, 'Update users service response not in correct format.', null);
        }
        return resData;

      })
      .catch((error: any) => this.debugError(error));

  }

  createUserFromJSON(user: any): User {
    return new User(
      user.email,
      user._id,
      user.firstName,
      user.lastName,
      user.password,
      user.rememberMe,
      user.address,
      user.address2,
      user.city,
      user.state,
      user.zip,
      user.phone,
    );
  }

}
