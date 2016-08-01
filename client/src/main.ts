import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';

import { OpComponent, environment } from './app/';

if (environment.production) {
  enableProdMode();
}

bootstrap(OpComponent, [
  HTTP_PROVIDERS,
]).catch(err => console.error(err));
