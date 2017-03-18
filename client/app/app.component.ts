
import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'main-app',
  templateUrl: './app.component.html'
})
export class AppComponent {
  titleStart = 'portfolio';
  titleEnd = 'NM';
  title = this.titleStart + this.titleEnd;
}