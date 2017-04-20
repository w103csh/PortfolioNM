
import {
  Component,
  Input
} from '@angular/core';
import {
  Router
} from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'title-bar',
  templateUrl: './title-bar.component.html',
  styleUrls: [ './title-bar.component.css' ],
})
export class TitleBarComponent{

  @Input() titleStart: string;
  @Input() titleEnd: string;
  @Input() isSignedIn: boolean = false;
  
  private navLinks: { text: string, href: string }[] = [
    { text: 'HOME', href: '/home' },
    { text: 'ABOUT', href: '/about' },
    { text: 'CONTACT', href: '/contact' },
  ];

  constructor(private router: Router) {
    // defaults
    this.isSignedIn = false;
  }

  titleClick() {
    if(this.isSignedIn)
      this.router.navigate(['dashboard']);
    else
      this.router.navigate(['home']);
  }
}