import { createFeature, createReducer } from '@ngrx/store';

export const sharedFeatures = createFeature({
  name: 'shared',
  reducer: createReducer({}),
});
