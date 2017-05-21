
import {
  animate,
  AnimationEntryMetadata,
  state,
  style,
  transition,
  trigger
} from '@angular/core';

export const topSlideIn: AnimationEntryMetadata =
  trigger('topSlideIn', [
    state('*',
      style({
        opacity: 1,
        transform: 'translateY(0)'
      })
    ),
    transition(':enter', [
      style({
        opacity: 0,
        transform: 'translateY(-100%)'
      }),
      animate('0.2s ease-in'),
    ])
  ]);

export const topSlideInOut: AnimationEntryMetadata =
  trigger('topSlideInOut', [
    state('*',
      style({
        opacity: 1,
        transform: 'translateY(0)'
      })
    ),
    transition(':enter', [
      style({
        opacity: 0,
        transform: 'translateY(-100%)'
      }),
      animate('0.2s ease-in'),
    ]),
    transition(':leave', [
      style({
        opacity: 0,
        transform: 'translateY(-100%)'
      }),
      animate('0.2s ease-out'),
    ])
  ]);

export const leftSlideInOut: AnimationEntryMetadata =
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
        width: '200px',
        height: '600px',
        margin: 'auto 14px',
      })
    ),
    state('bigger',
      style({
        width: '250px',
        height: '700px',
        margin: 'auto 0',
      })
    ),
    state('small',
      style({
        width: '125px',
        height: '375px',
        margin: 'auto 0',
      })
    ),
    state('smaller',
      style({
        width: '100px',
        height: '300px',
        margin: 'auto 14px',
      })
    ),
    transition('big => bigger', animate('200ms ease-out')),
    transition('bigger => big', animate('200ms ease-in')),
    transition('smaller => small', animate('200ms ease-out')),
    transition('small => smaller', animate('200ms ease-in')),
    transition('big <=> smaller', animate('300ms ease-in')),
  ]);

export const embiggenMobile: AnimationEntryMetadata =
  trigger('embiggenMobile', [
    state('big',
      style({
        width: '100px',
        height: '300px',
        margin: 'auto 14px',
      })
    ),
    state('bigger',
      style({
        width: '113px',
        height: '350px',
        margin: 'auto 0',
      })
    ),
    state('small',
      style({
        width: '64px',
        height: '175px',
        margin: 'auto 0',
      })
    ),
    state('smaller',
      style({
        width: '50px',
        height: '150px',
        margin: 'auto 6px',
      })
    ),
    transition('big => bigger', animate('200ms ease-out')),
    transition('bigger => big', animate('200ms ease-in')),
    transition('smaller => small', animate('200ms ease-out')),
    transition('small => smaller', animate('200ms ease-in')),
    transition('big <=> smaller', animate('300ms ease-in')),
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

export const shiftSideToSideMobile: AnimationEntryMetadata =
  trigger('shiftSideToSideMobile', [
    state('left',
      style({
        transform: 'translateX(0)'
      })
    ),
    state('right',
      style({
        transform: 'translateX(400px)'
      })
    ),
    transition('left <=> right', animate('1000ms ease-in-out')),
  ]);

export const rightSlideIn: AnimationEntryMetadata =
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

export const rightSlideInOut: AnimationEntryMetadata =
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