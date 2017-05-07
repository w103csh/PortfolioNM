
import {
  Component
} from '@angular/core';

import {
  ContentService,
} from '../../../services/content.service';

@Component({
  moduleId: module.id,
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {

  private header: string = 'About this website';
  private isMobile: boolean;

  constructor(private contentService: ContentService) {
    contentService.updateHeader(this.header);
  }

  // Links
  private links: any = {
    // overview
    node1: '<a target="_blank" href="https://nodejs.org">Node</a>',
    mongo1: '<a target="_blank" href="https://www.mongodb.com/">MongoDB</a>',
    nosql: '<a target="_blank" href="https://en.wikipedia.org/wiki/NoSQL">NoSQL</a>',
    dal: '<a target="_blank" href="https://en.wikipedia.org/wiki/Data_access_layer">data access layer</a>',
    mongoose1: '<a target="_blank" href="http://mongoosejs.com/">mongoose</a>',
    github: '<a target="_blank" href="https://github.com/">GitHub</a>',
    repo1: '<a target="_blank" href="https://github.com/w103csh/PortfolioNM">here</a>',
    npm: '<a target="_blank" href="https://www.npmjs.com/">npm</a>',
    //mots1: '<a href="#mots1">(more on this soon)</a>',
    toc1: '<a href="#toc">as you will see</a>',
    dotnet: '<a target="_blank" href="https://www.microsoft.com/net">.NET</a>',
    // server
    ubuntuS: '<a target="_blank" href="https://www.ubuntu.com/server"><strong>Ubuntu (server)</strong></a>',
    nginx: '<a target="_blank" href="https://www.nginx.com/resources/wiki/"><strong>Nginx</strong></a>',
    node2: '<a target="_blank" href="https://nodejs.org"><strong>Node.js</strong></a>',
    express: '<a target="_blank" href="https://expressjs.com/"><strong>Express</strong></a>',
    // database
    mongo2: '<a target="_blank" href="https://www.mongodb.com/"><strong>MongoDB</strong></a>',
    mongoose2: '<a target="_blank" href="http://mongoosejs.com/"><strong>Mongoose.js</strong></a>',
    bluebird: '<a target="_blank" href="http://bluebirdjs.com"><strong>bluebird</strong></a>',
    // client
    ang: '<a target="_blank" href="https://angular.io/"><strong>Angular v4.0</strong></a>',
    angMat: '<a target="_blank" href="https://material.angular.io/"><strong>Angular Material</strong></a>',
    bootstrap: '<a target="_blank" href="http://getbootstrap.com/"><strong>Bootstrap</strong></a>',
    // development environment
    ubuntuD: '<a target="_blank" href="https://www.ubuntu.com/desktop"><strong>Ubuntu (desktop)</strong></a>',
    vscode: '<a target="_blank" href="https://code.visualstudio.com/"><strong>Visual Studio Code</strong></a>',
    git: '<a target="_blank" href="https://git-scm.com/"><strong>Git</strong></a>',
  };


  // Site start
  private siteStart: string[] = [
    `So, what does the <i>NM</i> stand for in <u>PortfolioNM</u>?  Well, the <i>N</i> stands for `
    + this.links.node1 +
    `, and the <i>M</i> stands for `
    + this.links.mongo +
    `, and these are two of the techonologies that power the site` +
    //+ this.links.mots1 + 
    `. Normally, this would not be noteworthy, but `
    + this.links.toc1 +
    `, most of my professional exprience has been within the `
    + this.links.dotnet +
    ` stack. Nevertheless, being the always curious fellow that I am, I decided to tinker with some new technologies, which have
    resulted in the site you see now. Click the button below to skip the details about this site, and see the other interesting
    things I have worked on, and with.`
    ,
  ];

  // Site details
  private serverBullets: string[] = [
    this.links.ubuntuS + ` - OS.`,
    this.links.nginx + ` - Runs a reverse proxy and SSL encryption.`,
    this.links.node2 + ` - Server runtime.`,
    this.links.express + ` - ` + this.links.node1 + ` web application framework that is used as a router for the RESTful API.`,
  ];

  private dbBullets: string[] = [
    this.links.mongo2 + ` - ` + this.links.nosql + ` document based database.`,
    this.links.mongoose2 + ` - Essentially functions as the ` + this.links.dal + `.`,
    this.links.bluebird + ` - Promise library for asynchronous ` + this.links.mongoose1 + ` queries.`,
  ];

  private clientBullets: string[] = [
    this.links.ang + ` - This site currently a full-on angular web application, and uses the built-in angular tools for most of its
      operations.`,
    this.links.angMat + ` - Most of the controls (buttons, tabs, etc.) the site uses are pre-built components from this library.`,
    this.links.bootstrap + ` - Used here and there for some CSS, and JS.`,
  ];

  private deBullets: string[] = [
    this.links.ubuntuD + ` - OS.`,
    this.links.vscode + ` - IDE.`,
    this.links.git + ` - Source control.`,
  ];

  // Site end
  private siteEnd: string[] = [
    `I put a version of the site up on ` + this.links.github + ` you can see ` + this.links.repo1 + ` (clone the repository
    if you want to see it in action yourself).`
    ,
    ` Now that you know about this site, I will describe more about myself and work below.`
    ,
  ];
}