import {
  ENVIRONMENT_INITIALIZER,
  LOCALE_ID,
  provideExperimentalZonelessChangeDetection,
} from '@angular/core';
import {
  Routes,
  provideRouter,
  withComponentInputBinding,
  withEnabledBlockingInitialNavigation,
  withInMemoryScrolling,
  withRouterConfig,
} from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';

import localePl from '@angular/common/locales/pl';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { registerLocaleData } from '@angular/common';

export interface CoreOptions {
  routes: Routes;
}

registerLocaleData(localePl);

export function provideCore({ routes }: CoreOptions) {
  return [
    provideExperimentalZonelessChangeDetection(),
    provideAnimationsAsync(),
    provideHttpClient(withFetch()),
    provideRouter(
      routes,
      withRouterConfig({
        onSameUrlNavigation: 'reload',
      }),
      withComponentInputBinding(),
      withEnabledBlockingInitialNavigation(),
      withInMemoryScrolling({
        anchorScrolling: 'enabled',
        scrollPositionRestoration: 'enabled',
      })
    ),
    {
      provide: ENVIRONMENT_INITIALIZER,
      multi: true,
      useValue() {},
    },
    {
      provide: LOCALE_ID,
      useValue: 'pl',
    },
  ];
}
