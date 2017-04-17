
import { Component }          from '@angular/core';
import { Router,
         NavigationExtras }   from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'auth-home',
  templateUrl: './auth-home-child1.component.html',
  styleUrls: [ './auth-home-child1.component.css', '../../../shared-css/doc.css' ]
})
export class AuthHomeChild1Component{

  constructor(public router: Router) { }

  gotoChild2() {
    this.router.navigate(['auth-home-child2']);
  }

}