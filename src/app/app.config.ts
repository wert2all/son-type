import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { routes } from './app.routes';
import { settingsFeature } from './features/settings/store/settings.reducers';
import { sharedFeatures } from './shared/store/shared.reducers';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideStore({
      [settingsFeature.name]: settingsFeature.reducer,
      [sharedFeatures.name]: sharedFeatures.reducer,
    }),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
  ],
};
