

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { AppModule } from './app/app.module';
import { __env } from './APP_CONFIG';

if (__env == 'production') {
  enableProdMode();
}
platformBrowserDynamic().bootstrapModule(AppModule);

// import { platformBrowser }    from '@angular/platform-browser';
// import { AppModuleNgFactory } from '../aot/client/app/app.module.ngfactory';
// console.log('Running AOT compiled');
// platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);