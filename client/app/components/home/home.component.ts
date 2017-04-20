
import { 
  Component,
  Input,
  DoCheck,
  OnChanges,
  OnDestroy,
}                         from '@angular/core';
import { 
  Router,
}                         from '@angular/router';

import {
  AuthService
}                         from '../../../shared-services/auth.service';

import {
  Subscription
}                         from 'rxjs/Subscription';

@Component({
  moduleId: module.id,
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css', '../../../shared-css/doc.css']
})
export class HomeComponent {
  
  private fragmentIdPrefix: string;

  private sub: Subscription;
  private isSignedIn: boolean;
  private readonly _notSignedInClasses: string[];
  private signedInClasses: string[];

  constructor(private authService: AuthService, private router: Router) {
    // defaults
    this.isSignedIn= false;
    this._notSignedInClasses = [ 'side-margin' ];
    this.fragmentIdPrefix = this.router.url + '#';

    this.sub = authService.isSignedIn$.subscribe((isSignedIn: boolean) => { this.isSignedIn = isSignedIn; });
    this.checkSignedIn();
  }

  checkSignedIn() {
    this.signedInClasses = !this.isSignedIn ? this._notSignedInClasses : [];
  }

  ngDoCheck() {
    this.checkSignedIn();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
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
    <i>Also, some of my programmer musings are gated behind the sign in button in the top right. There should be some cool
    stuff behind there. Really, it just depends on what I am currently toying around with. If you want, make an account, and see.</i>`
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
    first: `I would be remissed without including a skills section. The technologies listed below are all skills with
    which I am an expert (or at least very proficient). In other words, I would be ready to start using any, and all of these 
    technologies immediately upon request with little to no refreshement.`
    ,
    second: `Here is a list of techologies that I have used in the past that I don't really remember that much about. 
    It would take a little bit of time to reaquaint myself with these guys.`
    ,
  };

  // Experience
  private expStart: string[] = [
    `Here is a break down of all of my professional experience so far. Listed is a quick overview of the required duties, along with
    a few project <mark>highlights</mark>.`
    ,
  ]

  private experience: { title: string, description: string, bullets: string[] }[] = [
    { 
      title: '.NET/WEB DEVELOPER',
      description: 'Ramboll Environ, Denver, CO – October 2015 – Present', 
      bullets: [ 
        `Delivered multiple projects that I developed from conception to final release; talked with clients about the scope and 
        purpose of a project, wrote time and cost estimates based on the guidelines, and then worked with a small team or individually
        to create the final release within the given budget.`
        ,
        `Developed a tool that would let entities collect their greenhouse gas inventories into a central database using many different
        methods (forms, bulk uploads from various file formats, etc.). The user could then use the interface to aggregate and display 
        the data dynamically using criteria of their choosing.`
        ,
        `Created websites integrated with ArcGIS maps that would allow the users to alter the map layer information, and subsequently
        see the changes in real time.`
        ,
        `Core applications development was done using ASP.NET MVC 4/5, and ASP.NET.`
        ,
      ]
    },
    { 
      title: 'SOFTWARE ENGINEER',
      description: 'Adeptive Software, Louisville, CO – May 2014 – July 2015', 
      bullets: [
        `Developed a multitude of enhancements, plugins, and bug fixes for ResWare (Adeptive Software’s core application), which is an all-encompassing real estate industry software solution.`
        ,
        `Consistently delivered pieces of larger projects in an agile environment on time and within estimations.`
        ,
        `Developed multiple bank wire integration plugins. Typically the wire transfers used proprietary file formats, encryption, and SFTP.`
        ,
        `Core applications development was done in WinForms, and ASP.NET, with primary web service development being done using WCF, and RESTful.`
        ,
      ]
    },
    { 
      title: 'SOFTWARE DEVELOPER/HELP DESK SPECIALIST',
      description: 'Dimension Technology Solutions, Littleton, CO – Feb 2014 – April 2014', 
      bullets: [
        `Developed the procedures and tools that allowed eMESA to seamlessly integrate with existing ERP systems such as Ellipse, Oracle, and SunSystems.`
        ,
        `Day to day maintenance of around a dozen websites that used Dimension Technology Solution’s core web application eMESA.`
        ,
        `Routinely fixed bugs for legacy versions of eMESA that had been outstanding for years.`
        ,
        `Communicated directly with clients to resolve any issues.`
        ,
        `Core development was done using a proprietary setup of Castle Monorail (C#, nVelocity, nHibernate, MS SQL).`
        ,
      ]
    },
    { 
      title: 'JUNIOR SOFTWARE DEVELOPER',
      description: 'Dimension Technology Solutions, Littleton, CO – Feb 2014 – April 2014', 
      bullets: [
        `All of the same responsibilities listed above with a lesser role in day to day communication with clients.`
        ,
      ]
    },
  ];

  private sections: {
    title: string,
    description?: string,
    ref: string,
  }[] = [
    {
      title: `About This Website`,
      description: `Here is a short description.`,
      ref: `site`,
    },
    {
      title: `Professional Experience`,
      description: `Here is a short description.`,
      ref: `experience`,
    },
    {
      title: `Skills & Knowledge`,
      description: `Here is a short description.`,
      ref: `skills`,
    },
  ];

}