import { ApplicationConfig,importProvidersFrom  } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './TriNnovatorApp.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch, HttpClientModule  } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {httpInterceptProviders} from './http-interceptor/index'

// Added provideAnimations() to fix animationn Issue
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideClientHydration(),
    provideAnimations(),
    provideHttpClient(withFetch()), provideAnimationsAsync(),
    importProvidersFrom(HttpClientModule),
    httpInterceptProviders, provideAnimationsAsync(),
  ],
};
