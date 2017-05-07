
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

// import 
//  AuthModule
// } from '../modules/auth.module';

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
  Observable
} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class UserService {
  
  // TODO: url
  private readonly baseUrl = __apiUrl + '/user';
  
  constructor (private http: Http) { }

  // create user
  create(body: User): Observable<ResponseData> {

    let url = this.baseUrl + '/create';
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(url, body, options)
                    .map((response: Response) => response.json())
                    .catch((error: any) => Observable.throw(error.json().message || 'Server error'));
                    
  }
}
