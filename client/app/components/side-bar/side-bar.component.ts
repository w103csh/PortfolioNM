import { Component,
         OnDestroy,
         HostBinding }                from '@angular/core';
import { Router }                     from '@angular/router';

import { AuthService }                from '../../../services/auth.service';
import { User }                       from '../../../models/User';

@Component({
  moduleId: module.id,
  selector: 'side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: [ './side-bar.component.css' ]
})
export class SideBarComponent {
  
  navLinks: { label: string, href: string}[] = [
    { label: 'AUTH-HOME', href: '/auth-home' },
    { label: 'AUTH-HOME CHILD 1', href: '/auth-home-child1' },
    { label: 'AUTH-HOME CHILD 2', href: '/auth-home-child2' }
  ];

}