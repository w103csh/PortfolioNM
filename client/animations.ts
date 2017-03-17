
import { animate
         ,AnimationEntryMetadata
         ,state
         ,style
         ,transition 
         ,trigger }                 from '@angular/core';

// Component transition animations
export const slideRightLeftAnimation: AnimationEntryMetadata =
  trigger('sideBarAnimation', [
    state('*',
      style({
        opacity: 1,
        transform: 'translateX(0)'
      })
    ),
    transition(':enter', [
      style({
        opacity: 0,
        transform: 'translateX(-100%)'
      }),
      animate('0.3s ease-in')
    ]),
    transition(':leave', [
      style({
        opacity: 0,
        transform: 'translateX(100%)'
      }),
      animate('0.3s ease-out')
    ])
  ]);