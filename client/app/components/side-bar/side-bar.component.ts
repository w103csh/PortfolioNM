
import { Component, HostBinding } from '@angular/core';

import { slideRightLeftAnimation } from '../../../animations.ts';

const anchors: [] = [
  { text: 'HOME', href: '/home' },
  { text: 'SIGN IN', href: '/signin' },
  { text: 'SIGN UP', href: '/signup' }
];

@Component({
  moduleId: module.id,
  selector: 'side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: [ './side-bar.component.css' ],
  animations: [ slideRightLeftAnimation ]
})
export class SideBarComponent{
  @HostBinding('@sideBarAnimation') sideBarAnimation = true;
  // @HostBinding('style.display')   display = 'block';
  // @HostBinding('style.position')  position = 'absolute';

  anchors = anchors;
}