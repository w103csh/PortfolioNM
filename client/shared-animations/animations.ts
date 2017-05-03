
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

export const embiggen: AnimationEntryMetadata =
  trigger('embiggen', [
    state('big',
      style({
        height: '500px',
      })
    ),
    state('bigger',
      style({
        height: '600px',
      })
    ),
    state('small',
      style({
        height: '250px',
      })
    ),
    state('smaller',
      style({
        height: '200px',
      })
    ),
    transition('big <=> bigger', animate('200ms ease-out')),
    transition('smaller <=> small', animate('200ms ease-out')),
    transition('big <=> smaller', animate('300ms ease-out')),
  ]);

export const beshrinketh: AnimationEntryMetadata =
  trigger('beshrinketh', [
    state('smaller',
      style({
        height: '200px',
      })
    ),
    state('small',
      style({
        height: '500px',
      })
    ),
    transition('smaller <=> small', animate('250ms ease-out')),
  ]);

export const shiftSideToSide: AnimationEntryMetadata =
  trigger('shiftSideToSide', [
    state('left',
      style({
        transform: 'translateX(0)'
      })
    ),
    state('right',
      style({
        transform: 'translateX(700px)'
      })
    ),
    transition('left <=> right', animate('1000ms ease-in-out')),
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