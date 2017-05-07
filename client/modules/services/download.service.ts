
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
  __apiUrl
} from '../APP_CONFIG';

import {
  Observable
} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class DownloadService {

  private readonly baseUrl = __apiUrl + '/file';

  constructor(private http: Http) { }

  downloadFile(fileName: string) {
    let url = this.baseUrl + '/download/' + fileName;
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers });

    this.http.get(url, options).toPromise().then(this.resData).catch(this.handleError);
  }

  private resData(res: Response) {
    // Wow was I barking up the wrong tree. Saving this code in case I need to actually get a
    // file from the server and parse it for some reason.

    // let mimeType = '';
    // switch(res.headers.get('fileExt')) {
    //   case '.pdf': mimeType = 'application/pdf';
    //   case '.doc': mimeType = 'application/msword';
    //   case '.docx': mimeType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    // }
    // var blob = new Blob([res.text()], { type: mimeType });
    // var url= window.URL.createObjectURL(blob);
    // window.open(url);
    // SaveAs(blob, 'data.pdf');
  }

  private handleError(error: any) {
    console.log(error);
  }
}