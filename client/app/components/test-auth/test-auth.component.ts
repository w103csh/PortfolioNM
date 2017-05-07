
import {
  Component
} from '@angular/core';
import {
  Router,
  NavigationExtras
} from '@angular/router';

import {
  AuthService,
} from '../../../services/auth.service';
import {
  ContentService,
} from '../../../services/content.service';

import {
  JwtHelper,
} from 'angular2-jwt';

@Component({
  moduleId: module.id,
  selector: 'test-auth',
  templateUrl: './test-auth.component.html',
  styleUrls: [ './test-auth.component.css', '../../../shared-css/doc.css', '../../../shared-css/doc-mobile.css' ]
})
export class TestAuthComponent{

  private header: string = 'Authorization Service Test';
  private docClass: string[] = [];
  private bannerClass: string[] = [];
  private mobileClass: string[] = [];
  private isMobile: boolean;
  private results: any = null;
  private jwtHelper: JwtHelper = new JwtHelper();

  constructor(private router: Router, private authService: AuthService, private contentService: ContentService) {
    contentService.updateHeader(this.header);
    this.docClass = this.contentService.getIsMobile() ? ['doc-content-mobile'] : ['doc-content'];
    this.bannerClass = this.contentService.getIsMobile() ? ['banner-mobile'] : ['banner'];
    this.mobileClass = this.contentService.getIsMobile() ? ['mobile-xdoc'] : [];
    this.isMobile = this.contentService.getIsMobile();
  }

  checkToken() {
    this.results = {};

    this.authService.verify().subscribe(
      response => { 
        this.results.verifyMsg = response ? 'Successful!' : 'Failed!';

        let token = localStorage.getItem('token');
        let payload = this.jwtHelper.decodeToken(token);
        
        if (payload.iat)
          this.results.iat = this.getDate(payload.iat);
        if (payload.exp)
          this.results.exp = this.jwtHelper.getTokenExpirationDate(token);
        if (payload.rememberMe)
          this.results.rememberMe = payload.rememberMe;
        if (payload.sub)
          this.results.sub = payload.sub;
      },
      err => {
        this.results.verifyMsg = err.toString();
      },
    );
  }

  // This uses the same logic as JwtHelper.getTokenExpiration()
  private getDate(time: number): Date {
    let date = new Date(0);
    date.setUTCSeconds(time);
    return date;
  }

}