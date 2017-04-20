
import {
  animate,
  AnimationEntryMetadata,
  state,
  style,
  transition,
  trigger
} from '@angular/core';

// Component transition animations
export const leftSlideInOutAnimation: AnimationEntryMetadata =
  trigger('leftSlideInOut', [
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
      animate('0.2s ease-in'),
    ]),
    transition(':leave', [
      animate('0.5s ease-out', style({
        opacity: 0,
        transform: 'translateX(-100%)'
      }))
    ])
  ]);

export const rightSlideInAnimation: AnimationEntryMetadata =
  trigger('rightSlideIn', [
    state('*',
      style({
        opacity: 1,
        transform: 'translateX(0)'
      })
    ),
    transition(':enter', [
      style({
        opacity: 0,
        transform: 'translateX(100%)'
      }),
      animate('0.4s ease-in'),
    ]),
  ]);

export const rightSlideInOutAnimation: AnimationEntryMetadata =
  trigger('rightSlideInOut', [
    state('*',
      style({
        opacity: 1,
        transform: 'translateX(0)'
      })
    ),
    transition(':enter', [
      style({
        opacity: 0,
        transform: 'translateX(100%)'
      }),
      animate('0.2s ease-in'),
    ]),
    transition(':leave', [
      animate('0.5s ease-out', style({
        opacity: 0,
        transform: 'translateX(100%)'
      }))
    ])
  ]);