

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
platformBrowserDynamic().bootstrapModule(AppModule);

// import { platformBrowser }    from '@angular/platform-browser';
// import { AppModuleNgFactory } from '../aot/client/app/app.module.ngfactory';
// console.log('Running AOT compiled');
// platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);