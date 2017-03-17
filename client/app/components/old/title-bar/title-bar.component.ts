
import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'title-bar',
  templateUrl: './title-bar.component.html',
  styleUrls: [ './title-bar.component.css' ]
})
export class TitleBarComponent{
  titleStart = 'portfolio';
  titleEnd = 'NM';
}