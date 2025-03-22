import { createFeature, createReducer, createSelector } from '@ngrx/store';
import { settingsFeature } from '../../features/settings/store/settings.reducers';

export const sharedFeatures = createFeature({
  name: 'shared',
  reducer: createReducer({}),
  extraSelectors: () => ({
    selectTyperSettings: createSelector(
      settingsFeature.selectTyper,
      state => state
    ),
  }),
});
