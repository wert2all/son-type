import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { ActionReducer, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { localStorageSync } from 'ngrx-store-localstorage';
import { routes } from './app.routes';
import { settingsFeature } from './features/settings/store/settings.reducers';
import { sharedFeatures } from './shared/store/shared.reducers';

export const metaReducers = [
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  (reducer: ActionReducer<any, any>) =>
    localStorageSync({
      keys: [settingsFeature.name],
      rehydrate: true,
    })(reducer),
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideStore(
      {
        [settingsFeature.name]: settingsFeature.reducer,
        [sharedFeatures.name]: sharedFeatures.reducer,
      },
      { metaReducers }
    ),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
  ],
};
