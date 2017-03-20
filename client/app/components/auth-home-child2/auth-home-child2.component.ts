
import { Component }          from '@angular/core';
import { Router,
         NavigationExtras }   from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'auth-home',
  templateUrl: './auth-home-child2.component.html',
  styleUrls: [ './auth-home-child2.component.css' ]
})
export class AuthHomeChild2Component{

  constructor(public router: Router) { }

  gotoChild1() {
    this.router.navigate(['auth-home-child1']);
  }

}