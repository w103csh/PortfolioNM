
import {
  Component
} from '@angular/core';
import {
  Title
} from '@angular/platform-browser';


import {
  ContentService,
} from '../../../services/content.service';
import {
  embiggen,
  shiftSideToSide,
} from '../../../shared-animations/animations';

@Component({
  moduleId: module.id,
  selector: 'test-animation',
  templateUrl: './test-animation.component.html',
  styleUrls: ['./test-animation.component.css'],
  animations: [embiggen, shiftSideToSide]
})
export class TestAnimationComponent {

  private header: string = 'Animation Test';
  private animation: string = 'shrink';
  private shrunk: boolean = false;

  private img1Embiggen: string = 'big';
  private img2Embiggen: string = 'big';
  private shiftDec: string = 'left';

  constructor(private contentService: ContentService) {
    contentService.updateHeader(this.header);
  }

  embiggen($event: any) {
    switch ($event.target.id) {
      case 'img1':
        if (this.shrunk) this.img1Embiggen = 'small';
        else this.img1Embiggen = 'bigger';
        break;
      case 'img2':
        if (this.shrunk) this.img2Embiggen = 'small';
        else this.img2Embiggen = 'bigger';
        break;
    }
  }

  enlittle($event: any) {
    switch ($event.target.id) {
      case 'img1':
        if (this.shrunk) this.img1Embiggen = 'smaller';
        else this.img1Embiggen = 'big';
        break;
      case 'img2':
        if (this.shrunk) this.img2Embiggen = 'smaller';
        else this.img2Embiggen = 'big';
        break;
    }
  }

  toggleStates() {
    switch (this.animation) {
      case 'shrink':
        this.img1Embiggen = this.img2Embiggen = this.shrunk ? 'big' : 'smaller';
        this.shrunk = !this.shrunk;
        break;
      case 'shift':
        this.shiftDec = this.shiftDec == 'left' ? 'right' : 'left';
        break;
    }
  }
}