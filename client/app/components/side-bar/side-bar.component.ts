import { Component,
         OnDestroy,
         HostBinding }                from '@angular/core';
import { Router }                     from '@angular/router';

import { AuthService }                from '../../services/auth.service';
import { User }                       from '../../models/User';

@Component({
  moduleId: module.id,
  selector: 'side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: [ './side-bar.component.css' ]
})
export class SideBarComponent {
  
  anchors: { text: string, href: string}[] = [
    { text: 'HOME', href: '/home' },
    { text: 'AUTH-HOME CHILD 1', href: '/auth-home-child1' },
    { text: 'AUTH-HOME CHILD 2', href: '/auth-home-child2' }
  ];

}