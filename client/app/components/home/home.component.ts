
import { Component, } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../../shared-services/auth.service';
import { User } from '../../../models/User';

import { Subscription } from 'rxjs/Subscription';

@Component({
  moduleId: module.id,
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

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
    nginx: '<a target="_blank" href="https://www.nginx.com/resources/wiki/"><strong>NGINX</strong></a>',
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

  // Drop caps
  private dropCaps: any = {
    W: '<span here style="font-size: 20px; color: hsl(160, 80%, 20%); ">W</span>',
  };

  // Header
  private header: string = `Hello, world!`;

  // Banner
  private banner: string = `My name is Colin Hughes. I am a developer currently based out of Denver, CO.`;

  // Disclaimer
  private disclaimers: any = {
    intro: `<strong>Note</strong> - This site is a work in progress. I could be working on it right now...<br />
    <br />
    <i>Also, some of my programmer musings are gated behind the sign in button in the top right. There might be some cool stuff
    behind there, or not. It depends on what I am currently toying around with. If you want, make an account, and see.</i>`
    ,
    site: `<strong>Note</strong> - If you clone the repository you have to have ` + this.links.npm + `, and ` + this.links.node1 + `
    installed. Then just run <code>npm install</code>. Also, the RESTful api that the 
    services use requires an instance of ` + this.links.mongo1 + ` running. You can find validation and collection information in the
    <code>mongoscript.js</code> file, but the base site should still work without it.`
    ,
  };

  // Introduction
  private intros: string[] = [
    `Welcome to my tiny little spot on the internet.  I first started work on this website because I needed a place to quickly try
    out ideas that I had. Like many developers, random ideas would occur to me that I was curious about, and, at the time, I 
    didn't have a website that I could use to give those ideas a test drive.  Well now I do, and here we are!`
    ,
  ];

  // Overview
  private overviews: string[] = [
    `This page of the site is dedicated to giving <i>you</i>, the visitor, a summary of what my skills are. Its basically
    a digital résumé, and everything you see now is designed to be seen by interested parties.  I have been working primarily as
    a <i>full stack</i> developer since I graduated from college, and the information below describes some of the things I have
    done as such.  The site is called <u>PortfolioNM</u>. Again, welcome.`
    ,
  ];

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
    this.links.nginx + ` - Runs a reverse proxy and SSL link.`,
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

  // Skills
  private skills: any = {
    first: `I would be remissed without the obligatory skills section. The technologies listed below are all things that
    I have either worked with professionally, or used during my undergraduate studies. I have only listed things 
    that I used to accomplish some kind of goal. In other words, I would be ready to start using any, and all of these
    technologies immediately upon request with little to no refreshement.`
    ,
    second: `Here is a list of techologies that I have used in the past that I don't really remember that much about. 
    It would take a little bit of time to reaquaint myself with these guys.`
    ,
  };

  // Experience

  private sections: {
    title: string,
    description?: string,
    ref: string,
  }[] = [
    {
      title: `About this website`,
      description: `Here is a short description.`,
      ref: `site`,
    },
    {
      title: `Professional experience`,
      description: `Here is a short description.`,
      ref: `experience`,
    },
    {
      title: `Skills & knowledge`,
      description: `Here is a short description.`,
      ref: `skills`,
    },
  ];

  private sub: Subscription;
  private user: User;

  constructor(private authService: AuthService, private router: Router) {
    this.sub = authService.signedInUser$.subscribe(
      (user: User) => {
        this.user = user;
      }
    )
  }

  signIn() {
    this.router.navigate(['signin']);
  }

  private siteToggle: boolean = true;
  private skillsToggle: boolean = true;

  showDetails(template: any) {
    let id = template._elementRef.nativeElement.getAttribute('id');
    switch (id) {
      case 'siteListToggleBtn': this.siteToggle = !this.siteToggle; break;
      case 'skillsListToggleBtn': this.skillsToggle = !this.skillsToggle; break;
    }
  }

}