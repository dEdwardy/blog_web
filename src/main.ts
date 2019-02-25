import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
  //处理console
  window.console.log = () => {}
  window.console.info = () => {}
  window.console.warn = () => {}
  window.console.error = () => {}
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
